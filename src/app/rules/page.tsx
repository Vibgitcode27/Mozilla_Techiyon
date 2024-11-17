import Navbar from "@/components/Navbar";
import "@/styles/rules.css";
import { Flex , Image } from "antd";
import rules_img1 from "@/assets/rules/download__9_-removebg-preview.png";
import rules_img2 from "@/assets/rules/download__11_-removebg-preview.png";
export default function RulesPage() {
    const sections = [
        {
            title: "How to Participate: War for Treasure",
            content: "An interactive, team-based event combining a treasure hunt with competitive trivia. Teams move through zones to earn buffs and race to victory in a high-speed Final Battle.",
            img : rules_img1,
        },
        {
            title: "Participation Rules",
            content: `
            1. **Team Composition**: Teams consist of 3-5 members, working together to solve trivia and strategize.
            2. **Event Phases**: Explore zones, collect buffs, and compete in the Final Battle.
            3. **Zones and Trivia**: Themed zones with image-based trivia. Quick and accurate answers earn buffs.
            `
        },
        {
            title: "Event Flow",
            content: `
            1. **Registration**: Teams register and receive a briefing.
            2. **Zone Exploration**: Solve trivia to gather buffs.
            3. **Final Battle**: Compete in a timed trivia showdown. Use buffs strategically for an edge.
            `
        },
        {
            title: "Winning Criteria",
            content: "The fastest team to solve Final Battle questions wins. Strategic use of buffs enhances victory chances.",
            img : rules_img2,
        }
    ];

    // Function to process content and handle markdown-style formatting
    interface Section {
        title: string;
        content: string;
    }

    interface ProcessedContentProps {
        content: string;
    }

    const processContent = (content: string): JSX.Element[] => {
        const lines = content.trim().split('\n');
        return lines.map((line, index) => {
            line = line.trim();
            if (line.match(/^\d+\./)) {
                // Handle numbered items
                const [number, text] = line.split('.');
                const cleanText = text.replace(/\*\*/g, '').trim();
                return (
                    <div key={index} className="manga-list-item">
                        <div className="manga-number">{number}</div>
                        <div className="manga-bubble">{cleanText}</div>
                    </div>
                );
            }
            // Handle regular text
            return (
                <p key={index} className="manga-text">
                    {line.replace(/\*\*/g, '')}
                </p>
            );
        });
    };

    return (
        <div className="main-div-rules">
            <Navbar />
            <Flex justify="center" align="center" style={{ height: "100%", width: "100%" }}>
                <div className="main-container">
                    {sections.map((section, index) => (
                        <div className="content-section" key={index}>
                            {/* Corner decorations */}
                            <div className="corner-top-left" />
                            <div className="corner-top-right" />
                            <div className="corner-bottom-left" />
                            <div className="corner-bottom-right" />
                            
                            {/* Speed lines background */}
                            <div className="speed-lines" />
                            
                            {/* Title area */}
                            <div className="title-wrapper">
                                <h2 className="section-title">{section.title}</h2>
                                <div className="title-underline" />
                                <div className="title-underline-short" />
                            </div>
                            
                            {/* Content area */}
                            <div className="section-content">
                                {processContent(section.content)}
                            </div>
                                {section.img && <Image src={section.img.src} preview={false} alt="rules_img1" />}
                        </div>
                    ))}
                </div>
            </Flex>
        </div>
    );
}