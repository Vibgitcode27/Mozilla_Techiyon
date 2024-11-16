"use client"

import { Flex, Button } from "antd";
import { Fira_Sans_Condensed } from "next/font/google";
import { TwitterOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import "../styles/navbar.css";
import { useRouter } from "next/dist/client/components/navigation";

const firaSansCondensed = Fira_Sans_Condensed({
  weight: "700",
  subsets: ["latin"], // Add the subset here
});

export default function Navbar() {

    const router = useRouter();

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        className="navbar"
      >
        <Flex>
          <h1 className={firaSansCondensed.className} style={{ fontWeight: "800", fontSize: "20px" }}>
            WAR.FOR.TREASURE
          </h1>
        </Flex>
        <Flex gap={90} justify="center" align="center" className="navbar-links">
          <Flex justify="center" gap={20} style={{ fontWeight: "600" }} className="navbar-nav-links">
            <h1 onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1")}} >EVENT</h1>
            <h1 onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1")}} >MANGA</h1>
            <h1 onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1")}} >DESIGN</h1>
            <h1 onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1")}} >TREASURE HUNT</h1>
          </Flex>
          <Flex gap={10} className="navbar-buttons">
            <Button onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1")}} style={{ border: "2px solid black", fontWeight: "600", borderRadius: "12px" }}>
              SIGN UP
            </Button>
            <Button
              onClick={() => { router.push("https://www.youtube.com/watch?v=j5a0jTc9S10&list=PLrXk_RHmNdhHW95zl63D6IhFn9OW5Ia1N&index=1")}}
              style={{
                border: "2px solid black",
                backgroundColor: "black",
                color: "white",
                borderRadius: "12px",
              }}
            >
              SIGN IN
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
