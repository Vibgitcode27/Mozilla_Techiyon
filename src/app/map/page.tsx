'use client'
import React, { use, useEffect, useState } from 'react'
import './Map.css';
import { LocateIcon } from 'lucide-react';
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useZones } from '../../lib/zoneSlice'; // Adjust the import according to your file structure
import { useRouter } from 'next/navigation';
import { Modal, Spin } from 'antd';
import { message } from 'antd';
export default function Map_page() {
    const { zones, initialize } = useZones();
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cookies = parseCookie(document.cookie);
        const jwt = cookies.get('jwt');
        const teamId = cookies.get('teamId');
        console.log(jwt);
        if (!jwt || !teamId) {
            window.location.href = "/";
        }
        const myHeaders = new Headers();
        const token = jwt;
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/game-status`, requestOptions)
            .then(response => response.json())
            .then(result => {
                initialize(result.zones);
                console.log('zones', result.zones);
                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                setLoading(false);
            });



        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/check-lock`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!result.success) {
                    setShowModal(true);
                }
            })
            .catch(error => console.log('error', error));


        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL || "");
        ws.onopen = () => {
            ws.send(JSON.stringify({ "event": "team-connect", "data": { "teamId": teamId } }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === "broadcast") {
                messageApi.info(data.data.message);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };


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

    const tags = zones && zones.length > 0 ? [
        { top: '20%', left: '40%', tooltip: zones[0].name, id: zones[0].id },
        { top: '53%', left: '61%', tooltip: zones[1].name, id: zones[1].id },
        { top: '70%', left: '30%', tooltip: zones[2].name, id: zones[2].id },
        { top: '87%', left: '90%', tooltip: zones[3].name, id: zones[3].id },
        { top: '29%', left: '90%', tooltip: zones[4].name, id: zones[4].id },
    ] : [];

    return (
        <>
        
        {contextHolder}
        <div className="map-container">
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="tag"
                            style={{ top: tag.top, left: tag.left }}
                            onClick={() => handleTagClick(tag.id)}
                        >
                            <LocateIcon style={{ color: 'rgb(174, 0, 255)', backgroundColor: "transparent" }} />
                            <div className="tooltip">{tag.tooltip}</div>
                        </div>
                    ))}
                    <Modal open={showModal} closable={false} footer={null}>
                        <div className="tenor-gif-embed" data-postid="17312966" data-share-method="host" data-aspect-ratio="1.33333" data-width="100%"><a href="https://tenor.com/view/carryminati-ajey-nagar-indian-you-tuber-carryminati-roast-carry-gif-17312966">Carryminati Ajey Nagar GIF</a>from <a href="https://tenor.com/search/carryminati-gifs">Carryminati GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                    </Modal>
                </>
            )}
        </div>
        </>  
    );
};
