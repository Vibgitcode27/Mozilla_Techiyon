"use client"
import Image from 'next/image';
import React from 'react';
import './MangaGrid.css';
import { Input, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const MangaGrid = ({ images, onSubmit }: { images: string[], onSubmit: (inputValue: string) => void }) => {
    const [inputValue, setInputValue] = React.useState("");

    return (
        <div className="manga-grid-container">
            <div className='manga-grid-subcontainer'>

                <div className="manga-grid">
                    {images.map((image, index) => (
                        <div key={index} className={`image image-${index + 1}`}>
                            <Image src={image} alt={`Manga Panel ${index + 1}`} layout="fill" objectFit="cover" />
                        </div>
                    ))}
                </div>
                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '3px solid red',
                        borderRadius: '50px',
                        padding: '5px',
                        background: '#fff'
                    }}>
                        <Input
                            style={{
                                border: 'none',
                                boxShadow: 'none',
                                fontSize: '16px',
                                padding: '10px 15px',
                                flex: 1,
                                background: 'transparent'
                            }}
                            placeholder="Enter your text here"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#f5222d',
                                borderColor: '#f5222d',
                                borderRadius: '50%',
                                height: '40px',
                                width: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '5px'
                            }}
                            icon={<ArrowRightOutlined />}
                            onClick={() => onSubmit(inputValue)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MangaGrid;
