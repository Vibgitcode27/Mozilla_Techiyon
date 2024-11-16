'use client'
import "../../../styles/trivia.css";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Button, Flex, Image, message, Modal } from "antd";
import { Fira_Sans_Condensed, M_PLUS_2 } from "next/font/google";
import MangaGrid from "@/components/mangaGrid";
import { useParams } from "next/navigation";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
function trivia() {
    const { id: zoneId } = useParams(); // Ensure the parameter name matches
    const [messageApi, contextHolder] = message.useMessage();
    const [images, setImages] = React.useState<string[]>([]);
    const [teamId, setTeamId] = React.useState<string | null>(null);
    const [answer, setAnswer] = React.useState<string>("");
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    useEffect(() => {
        const cookies = parseCookie(document.cookie);
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
                    const updatedImages = result.images.map((image: string) => image.replace(/\+/g, '%2B'));
                    setImages(updatedImages);
                })
                .catch((error) => console.error(error));
        }
    }, []);


    useEffect(() => {

        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL || "");
        ws.onopen = () => {
            ws.send(JSON.stringify({ "event": "team-connect", "data": { "teamId": teamId } }));
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === "broadcast") {
                messageApi.info(data.data.message);
            }
            if (data.event === "team-unlock") {
                setIsModalOpen(false);
                messageApi.success("Team unlocked!");
            }

        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

    }, [teamId]);

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
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTNqd2NuMXkwMDAwdzFybG5xemI3cGc5IiwiaWF0IjoxNzMxNzQ1MTU2LCJleHAiOjE3MzIzNDk5NTZ9.J8Y9XkvbywUo5H8NWvVSjeeSU4OqEq9kgiUM-qrGOg8");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };

        fetch("http://localhost:5000/public/check-lock", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                if (result === "success") {
                    setIsModalOpen(true);
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Navbar />
            {contextHolder}
            <div className="container">

                <Flex justify="space-between" align="center" gap={100} style={{ background: "transparent", width: "100%", height: 'auto' }}>
                    <Flex style={{ position: "relative", width: "100%" }}>
                        <MangaGrid images={images} onSubmit={handleSubmit} />
                    </Flex>
                </Flex>
            </div>
            <Modal title="Please wait" visible={isModalOpen} footer={null} closable={false}>
                <div className="tenor-gif-embed" data-postid="2178263242676691188" data-share-method="host" data-aspect-ratio="1.16489" data-width="100%"><a href="https://tenor.com/view/asdf-movie-punt-kick-donewithus-gif-2178263242676691188">Asdf Movie GIF</a>from <a href="https://tenor.com/search/asdf-gifs">Asdf GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
            </Modal>
        </>
    )
}
export default trivia;