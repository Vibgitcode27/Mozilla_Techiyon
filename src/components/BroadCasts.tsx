'use client'

import React, { useEffect, useState } from 'react'
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { Modal } from 'antd'
import { Button } from '@/components/ui/button'
import { Flag } from 'lucide-react'

interface Team {
    id: string
    teamName: string
    capturedZones: { id: string; name: string }[]
}

export default function BroadCast() {
    const [data, setData] = useState<Team[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [messages, setMessages] = useState<string[]>([])

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
                method: "GET",
                redirect: "follow" as RequestRedirect,
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/`, requestOptions)
            const result = await response.json()
            if (result.length > 0) {
                setMessages(result.map((item: { message: string }) => item.message))
            }

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
                className="fixed bottom-5 left-5 rounded-full p-4"
                size="icon"
            >
                <Flag className="h-6 w-6" />
                <span className="sr-only">Show Hints</span>
            </Button>
            <Modal open={isModalVisible} footer={null}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <Flag className="mr-2 h-6 w-6 text-yellow-500" />
                        Hints
                    </h2>
                    {messages.length > 0 && (
                        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                            {messages.map((msg, index) => (
                                <p key={index}>{msg}</p>
                            ))}
                        </div>
                    )}
                    <Button onClick={handleClose} className="mt-4">Close</Button>
                </div>
            </Modal>
        </>
    )
}