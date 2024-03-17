"use client";

import React from "react";
import "./globals.css";
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";
import Providers from "./utils/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import Footer from "@/components/Footer";
import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

interface Props {
  children?: React.ReactNode;
  pageProps?: AppProps;
}

// @ts-ignore
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// const NextProvider = ({ children, pageProps }: Props) => {
const NextProvider = ({ children }: Props) => {
  return (
    <Providers>
      {/* <SessionProvider session={session}> */}
      <SessionProvider>
        <SessionContextProvider supabaseClient={supabase}>
          {/* <Layout> */}
          {children}
          <ToastContainer />
          {/* </Layout> */}
        </SessionContextProvider>
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
