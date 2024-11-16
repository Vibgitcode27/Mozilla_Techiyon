'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons'
import { message } from 'antd';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { saveJwt, saveTeamId } from '@/lib/authSlice';

export default function SignInModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [activeTab, setActiveTab] = useState('sign-up');
    const [teamMembers, setTeamMembers] = useState(['']);
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const teamName = formData.get('teamName') as string
        const password = formData.get('password') as string
        const members = teamMembers.map((_, index) => ({
            enrollmentNo: formData.get(`enrollment${index + 1}`) as string,
            name: formData.get(`teamMember${index + 1}`) as string,
        }))

        const raw = JSON.stringify({
            teamName,
            password,
            members,
        });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, requestOptions)
            const result = await response.json();
            console.log(result);
            router.push('/wait')
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
            });
        } catch (error) {
            console.error('Error during sign up:', error)
        }
    }

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const teamName = formData.get('teamName') as string
        const password = formData.get('password') as string

        const raw = JSON.stringify({
            teamName,
            password,
        });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };

        try {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, requestOptions)
            // const result = await response.json();
            // console.log(result);
            // Cookies.set('jwt', result.token, { expires: 7 })
            // Cookies.set('teamId', result.teamId, { expires: 7 })

            // messageApi.open({
            //     type: 'success',
            //     content: 'Successfully signed in',
            // });
            // router.push('/map')
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        } catch (error) {
            console.error('Error during sign in:', error)
            messageApi.open({
                type: 'error',
                content: 'Sign in failed',
            });
        }
    }

    const addTeamMember = () => {
        if (teamMembers.length < 5) {
            setTeamMembers([...teamMembers, ''])
        }
    }

    const removeTeamMember = (index: number) => {
        const newTeamMembers = teamMembers.filter((_, i) => i !== index)
        setTeamMembers(newTeamMembers)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Team Authentication</DialogTitle>
                    <DialogDescription>Sign up or sign in to your team account.</DialogDescription>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-up">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Team Account</CardTitle>
                                <CardDescription>Enter your team details to create an account.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handleSignUp}>
                                    <div className="space-y-2">
                                        <Label htmlFor="teamName">Team Name</Label>
                                        <Input id="teamName" name="teamName" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <Label>Team Members (up to 5)</Label>
                                        {teamMembers.map((_, index) => (
                                            <div key={index} className="flex space-x-2">
                                                <Input
                                                    placeholder={`Team Member ${index + 1}`}
                                                    name={`teamMember${index + 1}`}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Enrollment No."
                                                    name={`enrollment${index + 1}`}
                                                    required
                                                />
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => removeTeamMember(index)}
                                                    >
                                                        <MinusCircledIcon className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        {teamMembers.length < 5 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={addTeamMember}
                                                className="mt-2"
                                            >
                                                <PlusCircledIcon className="mr-2 h-4 w-4" />
                                                Add Team Member
                                            </Button>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full mt-4">Sign Up</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sign-in">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign In to Your Team Account</CardTitle>
                                <CardDescription>Enter your team credentials to sign in.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handleSignIn}>
                                    <div className="space-y-2">
                                        <Label htmlFor="signInTeamName">Team Name</Label>
                                        <Input id="signInTeamName" name="teamName" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signInPassword">Password</Label>
                                        <Input id="signInPassword" name="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full mt-4">Sign In</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        {activeTab === 'sign-up' ? "Already have an account? " : "Don't have an account? "}
                        <Button
                            variant="link"
                            className="p-0"
                            onClick={() => setActiveTab(activeTab === 'sign-up' ? 'sign-in' : 'sign-up')}
                        >
                            {activeTab === 'sign-up' ? "Sign In" : "Sign Up"}
                        </Button>
                    </p>
                </CardFooter>
            </DialogContent>
        </Dialog>
    )
}