import * as React from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { saveAs } from "file-saver";
import Layout from 'components/Layout'
import List from "components/List";
import Detail from "components/Detail";
import { convertObject, lotteryState } from "recoil/lottery";

const AnalyzePage = () => {
  const router = useRouter();
  const reader = React.useRef<FileReader>();
  const [{ version }, setLottery] = useRecoilState(lotteryState);

  React.useEffect(() => {
    const fileReader = new window.FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const result =  event.target?.result;
      const lottery = convertObject(JSON.parse(result as string));
      setLottery(lottery);
    };
    reader.current = fileReader;
  }, []);

  const handleSampleDownload = React.useCallback(() => saveAs("./sample.json", "sample.json"), []);

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
            <summary>抽選申し込み状況を、こちらの画面にアップロードしてください。</summary>
            <ul>
              <li>サンプルをダウンロードしたい場合は、<button type="button" onClick={handleSampleDownload}>ダウンロード</button> を押してください</li>
            </ul>
          </details>
          <br />
          <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
            <input name="lottery" aria-label="抽選申し込み状況" type="file" accept="application/json" multiple={false} onChange={handleFileUpload} />
            <br />
            <button type="button" onClick={handleBackToTop} >トップ画面へ戻る</button>
          </div>
        </>
      )}
      {version && (
        <>
          <div style={{ display: "flex", gap: "40px" }}>
            <List />
            <Detail />
          </div>
        </>
      )}
    </Layout>
  )
}

export default AnalyzePage;

