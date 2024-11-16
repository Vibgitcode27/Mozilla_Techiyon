
'use client'
import { Flex, Button } from "antd";
import { Fira_Sans_Condensed, Schibsted_Grotesk } from "next/font/google";
import { TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Modal, Card, Form, Input, Typography, Tabs } from "antd";
import { UserOutlined, LockOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
const { TabPane } = Tabs;
const { Title, Text } = Typography;
const firaSansCondensed = Fira_Sans_Condensed({
    weight: "700",
    subsets: ["latin"], // Add the subset here
});


export default function Navbar() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const [form] = Form.useForm();
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinishSignUp = (values: any) => {
        console.log('Sign up values:', values);
        // Handle sign-up logic here
    }
    const onFinishSignIn = (values: any) => {
        console.log('Sign in values:', values);
        // Handle sign-in logic here
    }
    const showModal = () => {
        setIsModalVisible(true);
    }
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
                    <Flex gap={10}>
                        <Button onClick={showModal} style={{ border: "2px solid black", backgroundColor: "black", color: "white", borderRadius: "12px" }}>SIGN IN</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Modal
                title="Sign In"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent' }}
            >
                <Card style={{ width: 400 }}>
                    <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Team Authentication</Title>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
                        <TabPane tab="Sign Up" key="1">
                            <Form form={form} name="sign-up" onFinish={onFinishSignUp} scrollToFirstError>
                                <Form.Item
                                    name="teamName"
                                    rules={[{ required: true, message: 'Please input your team name!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Team Name" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                                </Form.Item>
                                <Form.List name="teamMembers" initialValue={['']}>
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: "Please input team member's name or delete this field.",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder={`Team Member ${index + 1}`}
                                                            style={{ width: '60%' }}
                                                        />
                                                        <Input
                                                            placeholder="Enrollment No."
                                                            style={{ width: '30%', marginLeft: '8px' }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 1 && (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                            style={{ marginLeft: 8 }}
                                                        />
                                                    )}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    icon={<PlusOutlined />}
                                                    disabled={fields.length >= 5}
                                                >
                                                    Add Team Member
                                                </Button>
                                                <Text type="secondary" style={{ marginLeft: 8 }}>
                                                    (Up to 5 members)
                                                </Text>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab="Sign In" key="2">
                            <Form name="sign-in" onFinish={onFinishSignIn}>
                                <Form.Item
                                    name="teamName"
                                    rules={[{ required: true, message: 'Please input your team name!' }]}
                                >
                                    <Input prefix={<UserOutlined />} placeholder="Team Name" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        Sign In
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Text type="secondary">
                            {activeTab === '1' ? "Already have an account? " : "Don't have an account? "}
                            <Button type="link" onClick={() => setActiveTab(activeTab === '1' ? '2' : '1')} style={{ padding: 0 }}>
                                {activeTab === '1' ? "Sign In" : "Sign Up"}
                            </Button>
                        </Text>
                    </div>
                </Card>
            </Modal>
        </div>
    );
}