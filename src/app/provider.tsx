"use client";

import React from "react";
import "./globals.css";
import Layout from "@/components/Layout";
import Header from "@/components/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import Providers from "./utils/Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import Carousel from "@/components/Carousel";
import SideNavbar from "@/components/mainPage/SideNavbar";
import MainSlidePage from "@/components/mainPage/MainSlidePage";
import Footer from "@/components/Footer";

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
      <Header />
      <div className="inner">
        {/* <Carousel /> */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default NextProvider;
