import * as React from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Layout from 'components/Layout'
import List from "components/List";
import Detail from "components/Detail";
import { convertObjectToState, lotteryState } from "recoil/lottery";

const AnalyzePage = () => {
  const router = useRouter();
  const reader = React.useRef<FileReader>();
  const [{ version }, setLottery] = useRecoilState(lotteryState);

  React.useEffect(() => {
    const fileReader = new window.FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const result =  event.target?.result;
      const state = convertObjectToState(JSON.parse(result as string));
      setLottery(state);
    };
    reader.current = fileReader;
  }, []);

  const handleFileUpload = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && reader.current?.readAsText(file);
  }, [reader.current]);
  
  const handleBackToTop = React.useCallback(() => router.push("./"), []);

  return (
    <Layout>
      {!version && (
        <>
          <details>
            <summary>スクリプトを実行して取得した抽選申し込み状況を、こちらの画面にアップロードしてください。</summary>
            <ul>
              <li><a href="https://nodejs.org/ja/" target="_blank" rel="noreferrer noopener">Node.jsのセットアップが必要です。</a></li>
              <li>ターミナルなどで <code>node script.js</code> を実行すると、抽選申し込み状況のJSONファイルが出力されます。</li>
              <li>スクリプトは、抽選期間内でのみ実行可能です。</li>
              <li>スクリプトが失敗する場合は、入力からやり直してください。</li>
            </ul>
          </details>
          <br />
          <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
            <input name="lottery" type="file" accept="application/json" multiple={false} onChange={handleFileUpload} />
            <br />
            <button type="button" onClick={handleBackToTop} >トップ画面へ戻る</button>
          </div>
        </>
      )}
      {version && (
        <>
          <h3>{`更新日時：${version.toLocaleString("ja-JP")}`}</h3>
          <div style={{ display: "flex", gap: "80px" }}>
            <List />
            <Detail />
          </div>
        </>
      )}
    </Layout>
  )
}

export default AnalyzePage;

