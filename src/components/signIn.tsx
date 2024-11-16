import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default function Component() {
    const [activeTab, setActiveTab] = useState('1');
    const [form] = Form.useForm();

    const onFinishSignUp = (values: any) => {
        console.log('Sign up values:', values);
        // Handle sign-up logic here
    };

    const onFinishSignIn = (values: any) => {
        console.log('Sign in values:', values);
        // Handle sign-in logic here
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>

        </div>
    );
}