import { Flex , Button } from "antd";
import { Fira_Sans_Condensed , Schibsted_Grotesk } from "next/font/google";
import { TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";

const firaSansCondensed =  Fira_Sans_Condensed({
  weight: "700",
  subsets: ["latin"], // Add the subset here
});

export default function Navbar(){
    return (
        <div>
            <Flex justify="space-between" align="center" style={{ paddingInline : "70px" , paddingTop : "10px"}}>
                <Flex>
                    <h1 className={firaSansCondensed.className} style={{ fontWeight : "800" , fontSize : "20px"  }}>WAR.FOR.TREASURE</h1>
                </Flex>
                <Flex gap={90} justify="center" align="center">
                    <Flex justify="center" gap={20} style={{ fontWeight : "600"}}>
                        <h1>EVENT</h1>
                        <h1>MANGA</h1>
                        <h1>DESIGN</h1>
                        <h1>TRESARUE HUNT</h1>
                    </Flex>
                    <Flex gap={10}>
                        <Button style={{ border : "2px solid black" , fontWeight : "600" , borderRadius : "12px" }}>SIGN UP</Button>
                        <Button style={{ border : "2px solid black" , backgroundColor : "black"  , color : "white" , borderRadius : "12px"}}>SIGN IN</Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}