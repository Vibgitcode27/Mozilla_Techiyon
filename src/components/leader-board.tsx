'use client'

import React, { useEffect, useState } from 'react'
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { Modal } from 'antd'
import { Button } from '@/components/ui/button'
import { Trophy, Flag } from 'lucide-react'

interface Team {
    id: string
    teamName: string
    capturedZones: { id: string; name: string }[]
}

export default function LeaderBoard() {
    const [data, setData] = useState<Team[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const cookie = parseCookie(document.cookie)
            const jwt = cookie.get('jwt')
            const myHeaders = new Headers()
            myHeaders.append("Authorization", "Bearer " + jwt)

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({}),
                redirect: "follow" as RequestRedirect,
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/leaderboard`, requestOptions)
            const result = await response.json()
            const filteredData = result.filter((team: Team) => team.capturedZones.length > 0)
            setData(filteredData)
        } catch (error) {
            console.error('Error fetching leaderboard data:', error)
        }
    }

    const showModal = () => setIsModalVisible(true)
    const handleClose = () => setIsModalVisible(false)

    return (
        <>
            <Button
                onClick={showModal}
                className="fixed bottom-5 right-5 rounded-full p-4"
                size="icon"
            >
                <Trophy className="h-6 w-6" />
                <span className="sr-only">Show Leader Board</span>
            </Button>
            <Modal open={isModalVisible} footer={null}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
                        Leader Board
                    </h2>
                    {data.length > 0 ? (
                        <ul className="space-y-4">
                            {data.map((team, index) => (
                                <li key={team.id} className="bg-muted p-4 rounded-lg">
                                    <ul className="space-y-2">
                                        {team.capturedZones.map((zone, zoneIndex) => (
                                            <li key={zone.id} className="flex flex-col items-start text-sm">
                                                <h4 className="font-semibold">{zoneIndex + 1}. {zone.name}</h4>
                                                <span className="text-muted-foreground">captured by {team.teamName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No zones have been captured yet
                        </div>
                    )}
                    <Button onClick={handleClose} className="mt-4">Close</Button>
                </div>
            </Modal>
        </>
    )
}