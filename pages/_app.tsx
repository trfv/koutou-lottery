import React from "react";
import { RecoilRoot } from "recoil";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
			<Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
