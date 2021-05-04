import Layout from "components/Layout";
import { useRouter } from "next/router";
import * as React from "react";

const LotteryPage = () => {
  const router = useRouter();

  const handleToGenerate = React.useCallback(() => router.push("./generate"), []);
  const handleToAnalyze = React.useCallback(() => router.push("./analyze"), []);

  return (
    <Layout>
      <h2>はじめに</h2>
      <p>
        このサイトは
        <a href="https://sisetun.kcf.or.jp/web/" target="_blank" rel="noreferrer noopener">
          江東区の施設の抽選システム
        </a>
        を利用しやすくするためのものです。
      </p>
      <h2>機能の説明</h2>
      <p>以下の機能があります。</p>
      <ul>
        <li>抽選申し込み状況取得スクリプト生成機能</li>
        <li>抽選申し込み状況分析機能</li>
      </ul>
      <h3>抽選申し込み状況取得スクリプト生成機能</h3>
      <p>
        抽選システムに表示されている抽選申し込み状況を取得するスクリプトを生成します。
        <a href="https://playwright.dev/" target="_blank" rel="noreferrer noopener">
          Playwright
        </a>
        というライブラリを利用し、画面をスクレイピングします。
      </p>
      <button className="mt-1" onClick={handleToGenerate}>
        スクリプトを生成する
      </button>
      <h3>抽選申し込み状況分析機能</h3>
      <p>上記スクリプトによって取得した抽選申し込み状況を分析します。</p>
      <button className="mt-1" onClick={handleToAnalyze}>
        データを分析する
      </button>
      <h2>備考</h2>
      <p>以下の注意事項を守ってご利用ください。</p>
      <ul>
        <li>スクレイピングは用法・容量を正しく守って使いましょう。</li>
        <li>モバイル端末からは利用できません。</li>
      </ul>
    </Layout>
  );
};

export default LotteryPage;
