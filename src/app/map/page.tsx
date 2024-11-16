import React from 'react'
import './Map.css';


export default function Map_page() {
    const tags = [
                { top: '20%', left: '40%', tooltip: 'Location 1' },
                { top: '53%', left: '61%', tooltip: 'Location 2' },
                { top: '70%', left: '30%', tooltip: 'Location 3' },
                { top: '87%', left: '90%', tooltip: 'Location 4' },
                { top: '29%', left: '90%', tooltip: 'Location 5' },
                { top: '53%', left: '10%', tooltip: 'Location 6' },
            ];
        
            return (
                <div className="map-container">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="tag"
                            style={{ top: tag.top, left: tag.left }}
                        >
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="tooltip">{tag.tooltip}</div>
                        </div>
                    ))}
                </div>
            );
        };

