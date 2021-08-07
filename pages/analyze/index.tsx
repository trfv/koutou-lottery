import Detail from "components/Detail";
import Layout from "components/Layout";
import List from "components/List";
import { saveAs } from "file-saver";
import * as React from "react";
import { useRecoilState } from "recoil";
import { convertObject, lotteryState } from "states/lottery";

const AnalyzePage = () => {
  const reader = React.useRef<FileReader>();
  const [{ version }, setLottery] = useRecoilState(lotteryState);

  React.useEffect(() => {
    const fileReader = new window.FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const result = String(event.target?.result);
      const lottery = convertObject(JSON.parse(result));
      setLottery(lottery);
    };
    reader.current = fileReader;
    return () => {
      setLottery({ version: undefined, list: [] });
    };
  }, []);

  const handleSampleDownload = React.useCallback(() => saveAs("./sample.json", "sample.json"), []);

  const handleFileUpload = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      file && reader.current?.readAsText(file);
    },
    [reader.current]
  );

  return (
    <Layout>
      {!version && (
        <>
          <details>
            <summary>抽選申し込み状況を、こちらの画面にアップロードしてください。</summary>
            <ul>
              <li>
                サンプルをダウンロードしたい場合は、
                <button type="button" onClick={handleSampleDownload}>
                  ダウンロード
                </button>
                を押してください
              </li>
            </ul>
          </details>
          <div className="mt-4">
            <input
              name="lottery"
              aria-label="抽選申し込み状況"
              type="file"
              accept="application/json"
              multiple={false}
              onChange={handleFileUpload}
            />
          </div>
        </>
      )}
      {version && (
        <div className="flex gap-10 mr-14">
          <List />
          <Detail />
        </div>
      )}
    </Layout>
  );
};

export default AnalyzePage;
