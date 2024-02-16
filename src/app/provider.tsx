"use client";

import React from "react";
import "./globals.css";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import Providers from "./utils/Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import Carousel from "@/components/Carousel";
import SideNavbar from "@/components/SideNavbar";
import MainSlidePage from "@/components/MainSlidePage";

interface Props {
  children?: React.ReactNode;
  pageProps?: AppProps;
}

// const NextProvider = ({ children, pageProps }: Props) => {
const NextProvider = ({ children }: Props) => {
  // const { session }:any = pageProps
  return (
    <Providers>
      {/* <SessionProvider session={session}> */}
      <SessionProvider>
        {/* <Layout> */}
        {children}
        <ToastContainer />
        {/* </Layout> */}
      </SessionProvider>
    </Providers>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    // <div className="layout">
    <div className="layout">
      <Navbar />
      <div className="inner">
        {/* <Carousel /> */}
        {children}
      </div>
    </div>
  );
};

export default NextProvider;
