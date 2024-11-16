'use client'
import { Flex, Button } from "antd";
import { Fira_Sans_Condensed, Schibsted_Grotesk } from "next/font/google";
import { TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import SignInModal from "./signIn";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
const firaSansCondensed = Fira_Sans_Condensed({
    weight: "700",
    subsets: ["latin"],
});

export default function Navbar() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showAuthButtons, setShowAuthButtons] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const cookies = parseCookie(document.cookie);
    const jwt = cookies.get("jwt");

    useEffect(() => {
        if (pathname !== "/" || jwt) {
            setShowAuthButtons(false);
        }
    }, [pathname]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Flex justify="space-between" align="center" style={{ paddingInline: "70px", paddingTop: "10px" }}>
                <Flex>
                    <h1 className={firaSansCondensed.className} style={{ fontWeight: "800", fontSize: "20px" }}>WAR.FOR.TREASURE</h1>
                </Flex>
                <Flex gap={90} justify="center" align="center">
                    <Flex justify="center" gap={20} style={{ fontWeight: "600" }}>
                        <h1>EVENT</h1>
                        <h1>MANGA</h1>
                        <h1>DESIGN</h1>
                        <h1>TRESARUE HUNT</h1>
                    </Flex>
                    {showAuthButtons && (
                        <Flex gap={10}>
                            <Button style={{ border: "2px solid black", fontWeight: "600", borderRadius: "12px" }}>SIGN UP</Button>
                            <Button onClick={showModal} style={{ border: "2px solid black", fontWeight: "600", borderRadius: "12px" }}>SIGN IN</Button>
                        </Flex>
                    )}
                </Flex>
            </Flex>
            <SignInModal isOpen={isModalVisible} onClose={handleCancel} />
        </div>
    );
}