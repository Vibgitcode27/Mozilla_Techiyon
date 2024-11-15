import Navbar from "@/components/Navbar";
import "../styles/home.css";
import { Button, Flex, Image } from "antd";
import img1 from "@/assets/girsl-images-removebg-preview.png";
import img2 from "@/assets/min-image.jpeg";
import img3 from "@/assets/image3_side.png";
import side from "@/assets/sideSkirt-removebg-preview.png";
import section1_1 from "@/assets/section1/download ( 5)_inverted.png"
import section1_2 from "@/assets/section1/fiinal_section1_2.png"
import section1_3 from "@/assets/section1/fiinal_section1_3.png"
import { Fira_Sans_Condensed , M_PLUS_2} from "next/font/google";
import { TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";

const firaSansCondensed =  Fira_Sans_Condensed({
  weight: "700",
  subsets: ["latin"],
});


const japanese =  M_PLUS_2({
  weight: "900",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-div">
        <Flex vertical style={{ fontFamily : "fantasy" , fontSize : "35px" , fontWeight : "800" , paddingLeft : "400px" , paddingTop : "10px"}} justify="start">
          <h1 className={`${firaSansCondensed.className} half-top-border element`} style={{ color : "black" , paddingLeft : "10px"}}><span style={{ color : "red"}}>WA</span>R.FOR</h1>
          <h1 className={`${firaSansCondensed.className} element2`} style={{ color : "black" , marginLeft : "40px" , paddingLeft : "12px"}}>TREASURE</h1>
        </Flex>
        <Flex justify="space-between" align="center" gap={100} style={{ background: "transparent", width: "100%" }}>
          <Flex style={{ position: "relative", width: "410px", height: "310px" }}>
            <Flex
              style={{
                position: "absolute",
                top: "20px",
                fontWeight : "700"
              }}
              vertical
            >
              <h1 style={{ color : "black" , width : "200px"}}>r Social Media</h1>
                <Flex
                  gap={20}
                  style={{
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "8px"
                  }}
                >
                <TwitterOutlined style={{ fontSize: "30px", color: "white", margin: "5px" }} />
                <InstagramOutlined style={{ fontSize: "30px", color: "white", margin: "5px" }} />
                <WhatsAppOutlined style={{ fontSize: "30px", color: "white", margin: "5px" }} />
              </Flex>
            </Flex>
            <Image src={img1.src} style={{ width: "500px", height: "100%" }} preview={false} alt="hero" />
          </Flex>
          <Image src={img2.src} style={{ width: "470px", height: "auto", border: "2.5px solid black" }} preview={false} alt="hero" />
          <Image src={img3.src} style={{ width: "420px", height: "auto", border: "2.5px solid black" }} preview={false} alt="hero" />
        </Flex>
        <Flex justify="space-between" align="center">
          <Flex vertical style={{ paddingInline : "30px"}}>
             <h2 style={{ color : "black" , paddingLeft : "10px" , fontSize : "25px" , width : "auto"}} className={`${firaSansCondensed.className} element2`}>MOZILLA PHEO<span style={{ color : "red"}}>NIX CL</span>UB</h2>
             <h1 style={{ color : "black" , fontSize : "70px"}} className={`${japanese.className}`}>ウブは決して死ぬ</h1>
             <h2 style={{ color : "black"}} className={`${firaSansCondensed.className}`}>Unlock the Treasure, Conquer the Battle, Live the Adventure.</h2>
          </Flex>
          <Flex gap={20}  style={{ paddingRight : "20px"}}>
            <Button style={{backgroundColor : "#bebebebb" , color : "black" , fontSize : "22px" , fontWeight : "700" , borderRadius : "20px" , height : "55px" , width : "170px" }}>PLAY NOW</Button>
            <Button style={{ border : "2px solid black", fontWeight : "600" ,  fontSize : "22px" , backgroundColor : "black"  , color : "white" , height : "55px" , width : "170px" , borderRadius : "20px"}}>CONTACT US</Button>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <h1></h1>
          <Flex justify="center" align="center">
            <h1 className={firaSansCondensed.className} style={{ color : "black" , fontSize : "36px"}}><span style={{ color : "gray"}}>2024</span>_2025</h1>
            <Image preview={false} style={{ width : "500px"}} src={side.src}/>
          </Flex>
        </Flex>
      </div>
      <div className="super_saiyan">
        {/* Top Left Panel */}
        {/* <div className="panel panel-top-left">
          <img src={img1.src} alt="Top Left Image" />
        </div> */}
        
        {/* Top Right Panel */}
        {/* <div className="panel panel-top-right">
          <img src={img2.src} alt="Top Right Image" />
        </div> */}
        
        {/* Center Diagonal Panel */}
        <div className="panel panel-center">
          <Flex justify="center" align="center" vertical>
            <span style={{ color : "white" , fontSize : "38px"}}>Welcome to War for Treasure</span>
            <span style={{ color : "white" , fontSize : "22px"}}>宝のため<span style={{ color : "red"}}>の戦 争へ</span>ようこそ!</span>
          </Flex>
          <img src={section1_1.src} alt="Center Diagonal Image"/>
        </div>
        
        {/* Bottom Left Panel */}
        <div className="panel panel-bottom-left">
          <img src={section1_2.src} alt="Bottom Left Image" />
        </div>
        {/* Bottom Right Panel */}
        <div className="panel panel-bottom-right">
          <img src={section1_3.src} alt="Bottom Right Image" />
        </div>
      </div>
    </div>
  );
}
