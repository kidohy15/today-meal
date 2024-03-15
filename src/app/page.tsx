"use client";

import Layout from "@/components/Layout";
import { useEffect } from "react";
import MainSlidePage from "@/components/mainPage/MainSlidePage";
import SideNavbar from "@/components/mainPage/SideNavbar";
// import { QueryClient } from "react-query";

export default function Home() {
  // const queryClient = new QueryClient();
  useEffect(() => {}, []);

  return (
    <>
      <div className="h-screen ">
        <div className="h-full pt-[112px]">
          <MainSlidePage />
        </div>
      </div>
    </>
  );
}
