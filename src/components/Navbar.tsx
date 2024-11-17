'use client'
import { Flex, Button } from "antd";
import { Fira_Sans_Condensed, Schibsted_Grotesk } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
                    <h1 className={firaSansCondensed.className} style={{ fontWeight: "800", fontSize: "20px" , color : "black" , cursor : "pointer" , userSelect : "none" }} onClick={() => {router.push("/s")}}>WAR.FOR.TREZOR</h1>
                </Flex>
                <Flex gap={90} justify="center" align="center">
                    <Flex justify="center" gap={20} style={{ fontWeight: "600" }}>
                        <h1 onClick={() => { router.push("/rules")}} style={{ cursor : "pointer" , userSelect : "none"  , color : "black"}}>RULES</h1>
                        <h1 style={{ cursor : "pointer" , userSelect : "none"  , color : "black"}}>MANGA</h1>
                        <h1 style={{ cursor : "pointer" , userSelect : "none"  , color : "black"}}>DESIGN</h1>
                    </Flex>

                    {showAuthButtons && (
                        <Flex gap={10}>
                            <Button onClick={showModal} style={{ border: "2px solid black", fontWeight: "600", borderRadius: "12px" }}>SIGN IN</Button>
                        </Flex>
                    )}

                    {pathname !== "/" && pathname !== "/map" && (
                        <Button onClick={() => router.push('/map')} style={{ border: "2px solid black", fontWeight: "600", borderRadius: "12px" }}>MAP</Button>
                    )}
                </Flex>
            </Flex>
            <SignInModal isOpen={isModalVisible} onClose={handleCancel} />
        </div>
    );
}