
'use client'
import React, { useState } from 'react';

import Navbar from "@/components/Navbar";
import "../styles/home.css";
import { Button, Flex, Image, Modal } from "antd";
import img1 from "@/assets/girsl-images-removebg-preview.png";
import img2 from "@/assets/min-image.jpeg";
import img3 from "@/assets/image3_side.png";
import side from "@/assets/sideSkirt-removebg-preview.png";

import { Fira_Sans_Condensed, M_PLUS_2 } from "next/font/google";

import footerImg from "@/assets/gojo satoru.jpg"

import { useRouter } from "next/dist/client/components/navigation";

import section2_1 from "@/assets/section2/download (5).jpg"
import section2_2 from "@/assets/section2/Illustration_section1_2.png"
import section2_3 from "@/assets/section2/final_section1_3.png"

import section3_4 from "@/assets/section3/section3_4_final.png"
import section3_3 from "@/assets/section3/section3_3_edited.png"
import section3_2 from "@/assets/section3/section3_3_final.png"
import section3_1 from "@/assets/section3/mostly_notfinal_edited.png"

import sorry from "@/assets/sorry.png"

import { TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";


const firaSansCondensed = Fira_Sans_Condensed({
  weight: "700",
  subsets: ["latin"],
});

const japanese = M_PLUS_2({
  weight: "900",
  subsets: ["latin"],
});

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="main-div">
        <Flex vertical style={{ fontFamily: "fantasy", fontSize: "35px", fontWeight: "800", paddingLeft: "400px", paddingTop: "10px" }} justify="start">
          <h1 className={`${firaSansCondensed.className} half-top-border element`} style={{ color: "black", paddingLeft: "10px" }}><span style={{ color: "red" }}>WA</span>R.FOR</h1>
          <h1 className={`${firaSansCondensed.className} element2`} style={{ color: "black", marginLeft: "40px", paddingLeft: "12px" }}>TREASURE</h1>
        </Flex>
        <Flex justify="space-between" align="center" gap={100} style={{ background: "transparent", width: "100%" }}>
          <Flex style={{ position: "relative", width: "410px", height: "310px" }}>
            <Flex
              style={{
                position: "absolute",
                top: "20px",
                fontWeight: "700"
              }}
              vertical
            >
              <h1 style={{ color: "black", width: "200px" }}>r Social Media</h1>
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
          <Flex vertical style={{ paddingInline: "30px" }}>
            <h2 style={{ color: "black", paddingLeft: "10px", fontSize: "25px", width: "auto" }} className={`${firaSansCondensed.className} element2`}>MOZILLA PHEO<span style={{ color: "red" }}>NIX CL</span>UB</h2>
            <h1 style={{ color: "black", fontSize: "70px" }} className={`${japanese.className}`}>ウブは決して死ぬ</h1>
            <h2 style={{ color: "black" }} className={`${firaSansCondensed.className}`}>Unlock the Treasure, Conquer the Battle, Live the Adventure.</h2>
          </Flex>
          <Flex gap={20} style={{ paddingRight: "20px" }}>
            <Button onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1") }} style={{ backgroundColor: "#bebebebb", color: "black", fontSize: "22px", fontWeight: "700", borderRadius: "20px", height: "55px", width: "170px" }}>PLAY NOW</Button>
            <Button onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1") }} style={{ border: "2px solid black", fontWeight: "600", fontSize: "22px", backgroundColor: "black", color: "white", height: "55px", width: "170px", borderRadius: "20px" }}>CONTACT US</Button>

          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <h1></h1>
          <Flex justify="center" align="center">
            <h1 className={firaSansCondensed.className} style={{ color: "black", fontSize: "36px" }}><span style={{ color: "gray" }}>2024</span>_2025</h1>
            <Image preview={false} style={{ width: "500px" }} src={side.src} />
          </Flex>
        </Flex>
      </div>
      <div className="section2">
        {/* Top Left Panel */}
        {/* <div className="panel panel-top-left">
          <img src={img1.src} alt="Top Left Image" />
        </div> */}

        {/* Top Right Panel */}
        {/* <div className="panel panel-top-right">
          <img src={img2.src} alt="Top Right Image" />
        </div> */}

        {/* Center Diagonal Panel */}
        <div className="panel2 panel2-center scale">
          <Flex justify="center" align="center" vertical>
            <span style={{ color: "black", fontSize: "50px" }}>Welcome to War for Treasure</span>
            <span style={{ color: "black", fontSize: "24px" }}>宝のため<span style={{ color: "red" }}>の戦 争へ</span>ようこそ!</span>
          </Flex>
          <img src={section2_1.src} alt="Center Diagonal Image" />
        </div>

        {/* Bottom Left Panel */}
        <div className="panel2 panel2-bottom-left">
          <img src={section2_2.src} alt="Bottom Left Image" />
        </div>
        {/* Bottom Right Panel */}
        <div className="panel2 panel2-bottom-right">
          <img src={section2_3.src} alt="Bottom Right Image" />
        </div>
      </div>

      <div className="super_saiyan">
        {/* Panel 1 with Diagonal Cut */}
        <div
          className="panel panel-diagonal-1"
          style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
        >
          <img
            src={section3_2.src}
            alt="Manga Panel 1"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        {/* Panel 2 with Diagonal Cut and Text Box */}
        <div className="panel panel-diagonal-2">
          <img src={section3_1.src} alt="Manga Panel 2" />
        </div>

        {/* Panel 3 with Diagonal Cut */}
        <div className="panel panel-diagonal-3">
          <img src={section3_3.src} alt="Manga Panel 2" />
        </div>

        <div className="panel panel-diagonal-4">
          <img src={section3_4.src} alt="Manga Panel 2" />
        </div>
      </div>


      <div className="mobile-message" style={{ display: "none", height: "100%" }}>
        <h1>Developers Left The Job!</h1>
        <p>This event is desktop-only. Please switch to a larger screen to experience it.</p>
        <img src={sorry.src} alt="Apology" />
        <p>But if you think you are special, we have something for you</p>
        <Button style={{ marginTop: "10px", fontWeight: "700" }} onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1") }}>Gift</Button>
      </div>

      <footer className="footer-d" style={{
        backgroundColor: "black",
        height: "auto",
        color: "white",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        fontFamily: "'Fira Sans Condensed', sans-serif",
      }}>
        {/* Event Name */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "800",
            letterSpacing: "3px",
            color: "red",
          }}>
            WAR FOR TREASURE
          </h1>
          <p style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "white",
          }}>
            Organized by Mozilla Phoenix Club
          </p>
        </div>

        {/* Image */}
        <Flex
          justify="center"
          style={{
            width: "100%",
            textAlign: "center",
          }}>
          <img
            src={footerImg.src}
            alt="Event Illustration"
            style={{
              maxWidth: "300px",
              maxHeight: "200px",
              objectFit: "contain",
              borderRadius: "10px",
              border: "2px solid white",
            }}
          />
        </Flex>

        {/* Credits */}
        <div style={{
          marginBottom: "20px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "16px", color: "gray", margin: "0" }}>Credits to the team:</p>
          <p style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "white",
            margin: "5px 0",
          }}>
            Vibhor Phalke | Tanish Bhole | Shashwat Singh
          </p>
          <p style={{
            fontSize: "12px",
            color: "gray",
          }}>
            © Mozilla Phoenix Club, 2024
          </p>
        </div>
      </footer>
    </div>
  );
}