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

interface Props {
  children?: React.ReactNode;
}

const NextProvider = ({ children }: Props) => {
  return (
    <Providers>
      <SessionProvider>
        <Layout>
          {children}
          <ToastContainer />
        </Layout>
      </SessionProvider>
    </Providers>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};

export default NextProvider;
