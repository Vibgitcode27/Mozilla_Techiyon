'use client'
import { FloatButton, Modal, Radio, Button, message } from "antd";
import { useState, useEffect } from "react";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function BuffsDebuffs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableBuffs, setAvailableBuffs] = useState<{ type: string; description: string }[]>([]);
    const [targetTeams, setTargetTeams] = useState<{ teamName: string }[]>([]);
    const [selectedBuff, setSelectedBuff] = useState<string | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
        fetchAvailableBuffs();
    };

    useEffect(() => {
        const cookies = parseCookie(document.cookie);
        const jwt = cookies.get("jwt");
        if (!jwt) {
            window.location.href = "/";
        }

        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL || "");
        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Handle incoming messages
            console.log('Received message:', data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const fetchAvailableBuffs = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTNqd2NuMXkwMDAwdzFybG5xemI3cGc5IiwiaWF0IjoxNzMxNzQ1MTU2LCJleHAiOjE3MzIzNDk5NTZ9.J8Y9XkvbywUo5H8NWvVSjeeSU4OqEq9kgiUM-qrGOg8");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: "",
            redirect: "follow" as RequestRedirect
        };

        fetch("http://localhost:5000/public/teams/available-buffs", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setAvailableBuffs(result.availableBuffs);
                setTargetTeams(result.targetTeams);
            })
            .catch((error) => console.error(error));
    };

    const applyBuff = () => {
        if (selectedBuff && selectedTeam) {
            const token = parseCookie(document.cookie);
            const jwt = token.get("jwt");
            fetch("http://localhost:5000/private/teams/apply-buff-debuff", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    type: selectedBuff,
                    targetTeamId: selectedTeam
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        message.success("Buff/Debuff applied successfully");
                        setIsModalOpen(false);
                    } else {
                        message.error(`Error: ${data.error}`);
                    }
                })
                .catch((error) => {
                    console.error("Error applying buff/debuff:", error);
                    message.error("Failed to apply buff/debuff");
                });
        } else {
            message.warning("Please select both a buff/debuff and a team.");
        }
    };

    return (
        <>
            <FloatButton onClick={openModal} />
            <Modal
                title="Apply Buff/Debuff"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="apply" type="primary" onClick={applyBuff}>
                        Apply Buff/Debuff
                    </Button>
                ]}
            >
                <h3>Select a Buff/Debuff</h3>
                <Radio.Group
                    onChange={(e) => setSelectedBuff(e.target.value)}
                    value={selectedBuff}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    {availableBuffs.map((buff) => (
                        <Radio key={buff.type} value={buff.type}>
                            <strong>{buff.type}</strong>: {buff.description}
                        </Radio>
                    ))}
                </Radio.Group>
                <h3 style={{ marginTop: 20 }}>Select a Team</h3>
                <Radio.Group
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    value={selectedTeam}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    {targetTeams.map((team) => (
                        <Radio key={team.teamName} value={team.teamName}>
                            {team.teamName}
                        </Radio>
                    ))}
                </Radio.Group>
            </Modal>
        </>
    );
}