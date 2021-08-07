import Head from "next/head";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Koutou Lottery" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Sidebar />
    <section className="relative min-h-screen top-0 left-14 p-4 overflow-auto">{children}</section>
  </>
);

export default Layout;
