'use client'
import LeaderBoard from '@/components/leader-board';
import React, { use, useEffect, useState } from 'react'
import './Map.css';
import { LocateIcon } from 'lucide-react';
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useZones } from '../../lib/zoneSlice'; // Adjust the import according to your file structure
import { useRouter } from 'next/navigation';
import { Modal, Spin } from 'antd';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateLeaderboard } from '../../lib/leaderboardSlice'; // Adjust the import according to your file structure

export default function Map_page() {
    const { zones, initialize } = useZones();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cookies = parseCookie(document.cookie);
    useEffect(() => {

        const jwt = cookies.get('jwt');
        const teamId = cookies.get('teamId');
        if (!jwt || !teamId) {
            window.location.href = '/';
        }
        const myHeaders = new Headers();
        const token = jwt;
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect,
        };
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/game-status`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                initialize(result.zones);
                console.log('zones', result.zones);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/check-lock`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (!result.success) {
                    setShowModal(true);
                }
            })
            .catch((error) => console.log('error', error));

        const options = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect,
        };

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/zoneStatus`, options)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log('error', error));

    }, []);


    useEffect(() => {
        const teamId = cookies.get('teamId');
        let retryCount = 0;
        const maxRetries = 5;

        const connectWebSocket = () => {
            const ws = new WebSocket('ws://ec2-13-127-35-120.ap-south-1.compute.amazonaws.com:3000');
            console.log('ws', ws);

            ws.onopen = () => {
                console.log('WebSocket connection opened');
                ws.send(JSON.stringify({ event: 'team-connect', data: { teamId: teamId } }));
                retryCount = 0; // Reset retry count on successful connection
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
                    messageApi.info({
                        content: `Zone ${data.data.name} is now available to capture`,
                        duration: 10,
                    });
                }
                else if (data.event === 'zone-locked') {
                    messageApi.error({
                        content: `Zone ${data.data.name} is locked to Capture for Now`,
                        duration: 10,
                    });
                }
                else if (data.event === 'phase-change') {
                    const phase = data.data.phase;
                    messageApi.success(`Phase Changed to ${phase}`);
                }
                else if (data.event === 'phase3-eligible-team') {
                    if (data.data.teams.some(team => team.id === teamId)) {
                        messageApi.success('Your team is eligible for Phase 3');
                        router.push('/trivia');
                    }
                    else {
                        messageApi.error('Your team is not eligible for Phase 3');
                    }
                }
                else {
                    console.log('Unhandled event type:', data.event);
                }

            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = (event) => {
                console.log('WebSocket connection closed:', event);
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(connectWebSocket, 2000); // Retry connection after 2 seconds
                } else {
                    console.error('Max retries reached. Could not connect to WebSocket.');
                }
            };
        };

        connectWebSocket();

    }, []);




    interface Tag {
        top: string;
        left: string;
        tooltip: string;
        id: string;
    }

    const handleTagClick = (zoneId: string) => {
        router.push(`/trivia/${zoneId}`);
    };

    const tags =
        zones && zones.length > 0
            ? [
                { top: '30%', left: '40%', tooltip: zones[0].name, id: zones[0].id },
                { top: '53%', left: '61%', tooltip: zones[1].name, id: zones[1].id },
                { top: '70%', left: '30%', tooltip: zones[2].name, id: zones[2].id },
                { top: '87%', left: '75%', tooltip: zones[3].name, id: zones[3].id },
                { top: '90%', left: '20%', tooltip: zones[4].name, id: zones[4].id },
            ]
            : [];

    return (
        <div className='container'>
            {contextHolder}
            <div className='map-container'>
                {loading ? (
                    <Spin size='large' />
                ) : (
                    <>
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className='tag'
                                style={{ top: tag.top, left: tag.left }}
                                onClick={() => handleTagClick(tag.id)}
                            >
                                <LocateIcon style={{ color: 'rgb(174, 0, 255)', backgroundColor: 'transparent' }} />
                                <div className='tooltip'>{tag.tooltip}</div>
                            </div>
                        ))}
                        <Modal open={showModal} closable={false} footer={null}>
                            <div
                                className='tenor-gif-embed'
                                data-postid='17312966'
                                data-share-method='host'
                                data-aspect-ratio='1.33333'
                                data-width='100%'
                            >
                                <a href='https://tenor.com/view/carryminati-ajey-nagar-indian-you-tuber-carryminati-roast-carry-gif-17312966'>
                                    Carryminati Ajey Nagar GIF
                                </a>
                                from <a href='https://tenor.com/search/carryminati-gifs'>Carryminati GIFs</a>
                            </div>{' '}
                            <script type='text/javascript' async src='https://tenor.com/embed.js'></script>
                        </Modal>
                    </>
                )}
                <BroadCast />
                <LeaderBoard />
            </div>
        </div>
    );
}
