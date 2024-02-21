"use client";

import Layout from "@/components/Layout";

import Link from "next/link";
import { useEffect } from "react";
import Carousel from "@/components/Carousel";
import MainSlidePage from "@/components/mainPage/MainSlidePage";
import SideNavbar from "@/components/mainPage/SideNavbar";
// import { QueryClient } from "react-query";

export default function Home() {
  // const queryClient = new QueryClient();
  useEffect(() => {
    console.log("start");
  }, []);

  return (
    <>
      <div className="h-screen ">
        <div className="h-full pt-[96px]">
          <SideNavbar />
          <MainSlidePage />
        </div>
      </div>
    </>
  );
}
