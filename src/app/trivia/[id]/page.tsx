'use client'
import "../../../styles/trivia.css";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Button, Flex, Image, message, Modal } from "antd";
import MangaGrid from "@/components/mangaGrid";
import { useParams } from "next/navigation";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useDispatch } from 'react-redux';
import { updateLeaderboard } from '../../../lib/leaderboardSlice'; // Adjust the import according to your file structure
import { useZones } from '../../../lib/zoneSlice'; // Adjust the import according to your file structure
import BuffsDebuffs from "@/components/Buffs-Debuffs";
function trivia() {
    const { id: zoneId } = useParams(); // Ensure the parameter name matches
    const { zones, initialize } = useZones();
    const [messageApi, contextHolder] = message.useMessage();
    const [images, setImages] = React.useState<string[]>([]);
    const [teamId, setTeamId] = React.useState<string | null>(null);
    const [showModal, setShowModal] = React.useState(false);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modelShow, setModelShow] = React.useState(false);
    const cookies = parseCookie(document.cookie);
    const [capturedModal, SetCapturedModal] = React.useState(false);
    const [zoneLockedModal, SetZoneLockedModal] = React.useState(false);
    useEffect(() => {

        const jwt = cookies.get('jwt');
        const teamId = cookies.get('teamId');
        setTeamId(teamId || null);
        if (!jwt) {
            window.location.href = "/";
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + jwt);
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "teamId": teamId,
                "zoneId": zoneId
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect
            };


            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/teams/next-question`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.error == 'Zone is already captured') {
                        console.log('Zone is already captured');
                        setModelShow(true);
                    }
                    if (result.error == 'You have already captured a zone in Phase 1. Wait for Phase 2 to capture more zones.') {
                        SetCapturedModal(true);
                    }
                    const updatedImages = result.images.map((image: string) => image.replace(/\+/g, '%2B'));
                    setImages(updatedImages);

                })
                .catch((error) => console.error(error));

            callAdminCheckLockAPI();



        }

    }, []);
    useEffect(() => {
        const teamId = cookies.get('teamId');
        const ws = new WebSocket('ws://ec2-13-127-35-120.ap-south-1.compute.amazonaws.com:3000');
        checkLock();
        ws.onopen = () => {
            console.log('WebSocket connection opened');
            ws.send(JSON.stringify({ event: 'team-connect', data: { teamId: teamId } }));
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === 'broadcast') {
                messageApi.info({
                    content: data.data.message,
                    duration: 5,
                });
            } else if (data.event === 'leaderboard-update') {
                dispatch(updateLeaderboard(data.data));
            } else if (data.event === 'zone-update') {
                const updatedZones = zones.map(zone =>
                    zone.id === data.data.zoneId
                        ? { ...zone, name: `${data.data.zoneName} - Captured by ${data.data.teamName}` }
                        : zone
                );
                initialize(updatedZones);
                messageApi.info(`Zone ${data.data.zoneName} captured by ${data.data.teamName}`);
            } else if (data.event === 'teams-locked') {
                setShowModal(true);
            }
            else if (data.event === 'teams-unlocked') {
                setShowModal(false);
            }
            else if (data.event === 'team-unlocked') {
                setShowModal(false);
                messageApi.success('Team unlocked!');
            }
            else if (data.event === 'team-locked') {
                if (data.data.teamId === teamId) {
                    messageApi.error('Team locked!');
                    setShowModal(true);
                }
            }
            else if (data.event === 'Leaderboard-update') {
                dispatch(updateLeaderboard(data.data));
            }
            else if (data.event === 'zone-captured') {
                messageApi.warning({
                    content: `Zone ${data.data.zoneName} captured by ${data.data.teamName}`,
                    duration: 10,
                });
            }
            else if (data.event === 'zone-unlocked') {
                SetZoneLockedModal(false);
            }
            else if (data.event === 'zone-locked') {
                console.log(data.data.id, zoneId);
                if (data.data.id === zoneId) {
                    SetZoneLockedModal(true);
                }
            }
            else {
                console.log('Unhandled event type:', data.event);
            }
        };

    }, []);

    const handleSubmit = (answer: string) => {
        const cookies = parseCookie(document.cookie);
        const jwt = cookies.get('jwt');
        const myHeaders = new Headers();
        console.log(answer);
        myHeaders.append("Authorization", "Bearer " + jwt);
        myHeaders.append("Content-Type", "application/json");
        console.log(jwt);
        const raw = JSON.stringify({
            "zoneId": zoneId,
            "answer": answer
        });
        console.log(raw);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/teams/answer`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.success) {
                    messageApi.success("Answer submitted successfully!");
                    window.location.reload();
                } else {
                    messageApi.error("Failed to submit answer.");
                }
            })
            .catch((error) => console.error(error));
    };

    const checkLock = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + parseCookie(document.cookie).get('jwt'));

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/check-lock`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                if (result === "success") {
                    setIsModalOpen(true);
                }
            })
            .catch((error) => console.error(error));
    };

    function callAdminCheckLockAPI() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTNrZGtlamowMDAwMTBqZDBuZXZyMWNvIiwiaWF0IjoxNzMxODI3NDUyLCJleHAiOjE3MzI0MzIyNTJ9.BHB-dmBVzCZIkUMCIOTipFG3dqVdOJNHxpYqxysm8yI");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "zoneId": zoneId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };


        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/admin/zones/check-lock`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.isLocked) {
                    SetZoneLockedModal(true);
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Navbar />
            {contextHolder}
            <div className="trivia-container">

                <Flex justify="space-between" align="center" gap={100} style={{ background: "transparent", width: "100%", height: 'auto' }}>
                    <Flex style={{ position: "relative", width: "100%" }}>
                        <MangaGrid images={images} onSubmit={handleSubmit} />
                    </Flex>
                </Flex>
            </div>
            <BuffsDebuffs />
            <Modal title="Please wait" visible={showModal} footer={null} closable={false}>
                <div className="tenor-gif-embed" data-postid="2178263242676691188" data-share-method="host" data-aspect-ratio="1.16489" data-width="100%"><a href="https://tenor.com/view/asdf-movie-punt-kick-donewithus-gif-2178263242676691188">Asdf Movie GIF</a>from <a href="https://tenor.com/search/asdf-gifs">Asdf GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
            </Modal>
            <Modal title="Zone Already Captured" visible={modelShow} footer={null} closable={false}>
                <div className="tenor-gif-embed" data-postid="18032821" data-share-method="host" data-aspect-ratio="1.83908" data-width="100%"><a href="https://tenor.com/view/war-paradise-paradise-war-gif-18032821">War Paradise GIF</a>from <a href="https://tenor.com/search/war-gifs">War GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
            </Modal>
            <Modal title="Zone Captured By Your Team" visible={capturedModal} footer={null} closable={false}>
                <div className="tenor-gif-embed" data-postid="18032821" data-share-method="host" data-aspect-ratio="1.83908" data-width="100%"><a href="https://tenor.com/view/war-paradise-paradise-war-gif-18032821">War Paradise GIF</a>from <a href="https://tenor.com/search/war-gifs">War GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
            </Modal>
            <Modal title="Zone Not Available to Capture" visible={zoneLockedModal} footer={null} closable={false}>
                <div className="tenor-gif-embed" data-postid="14949853" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/verdrietig-sad-cry-lonely-gif-14949853">Verdrietig Sad Sticker</a>from <a href="https://tenor.com/search/verdrietig-stickers">Verdrietig Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
            </Modal>

        </>
    )
}
export default trivia;