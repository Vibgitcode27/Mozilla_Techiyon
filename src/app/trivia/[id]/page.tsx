'use client'
import "../../../styles/trivia.css";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Button, Flex, Image, message } from "antd";
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

        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
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
        </>
    )
}
export default trivia;