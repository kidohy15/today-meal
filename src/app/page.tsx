"use client";

import Layout from "@/components/Layout";

import Link from "next/link";
import { useEffect } from "react";
import Carousel from "@/components/Carousel";
import MainSlidePage from "@/components/MainSlidePage";
import SideNavbar from "@/components/SideNavbar";
// import { QueryClient } from "react-query";

export default function Home() {
  // const queryClient = new QueryClient();
  useEffect(() => {
    console.log("start");
  }, []);

  return (
    <>
      <SideNavbar />
      <MainSlidePage />
    </>
  );
}
