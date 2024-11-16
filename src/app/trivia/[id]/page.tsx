'use client'
import "../../../styles/trivia.css";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Button, Flex, Image } from "antd";
import { Fira_Sans_Condensed, M_PLUS_2 } from "next/font/google";
import MangaGrid from "@/components/mangaGrid";
import { useParams } from "next/navigation";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
const firaSansCondensed = Fira_Sans_Condensed({
    weight: "700",
    subsets: ["latin"],
});
const japanese = M_PLUS_2({
    weight: "900",
    subsets: ["latin"],
});
function trivia() {
    const {zoneId} = useParams();
    useEffect(() => {
        const cookies = parseCookie(document.cookie);
        const jwt = cookies.get('jwt');
        console.log(jwt);
        if (!jwt) {
            window.location.href = "/";
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + jwt);
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "teamId": "cm3k5kt4600001x8fkhwc7lsa",
                "zoneId": zoneId
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect
            };

            fetch("http://localhost:5000/public/teams/next-question", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        }
    }, [zoneId]);
    const images = [
        "https://manga-more.com/wp-content/uploads/2017/07/0191d4ee16fb2babc0fed2cfedc4f867198bcb74e8.jpg",
        "https://xn--w8jtkjf8c570x.com/wp-content/uploads/2019/01/50BF0A45-45EC-4DAE-B036-958A5991F112.jpeg",
        "https://i.pinimg.com/originals/2d/c8/12/2dc812d62b7bb14f0f7105ef62a28664.png",
    ];
    return (
        <>
            <Navbar />
            <div className="container">
                <Flex justify="space-between" align="center" gap={100} style={{ background: "transparent", width: "100%", height: 'auto' }}>
                    <Flex style={{ position: "relative", width: "100%" }}>
                        <MangaGrid images={images} />
                    </Flex>
                </Flex>

            </div>
        </>
    )
}
export default trivia;