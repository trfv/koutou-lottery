import Layout from "components/Layout";
import { saveAs } from "file-saver";
import type { PageStatus } from "interfaces";
import { useRouter } from "next/router";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import { convertObject, lotteryState } from "states/lottery";
import { generateScript } from "utils/lottery";

const GeneratePage = () => {
  const router = useRouter();
  const reader = React.useRef<FileReader>();
  const scriptFile = React.useRef<File>();

  const setLottery = useSetRecoilState(lotteryState);
  const [status, setStatus] = React.useState<PageStatus>("prepare");
  const idRef = React.useRef<HTMLInputElement>(null);
  const passRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const fileReader = new window.FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      const state = convertObject(JSON.parse(result as string));
      setLottery(state);
      router.push("/analyze");
    };
    reader.current = fileReader;
  }, []);

  const handleBack = React.useCallback(() => setStatus("prepare"), []);

  const handleBackToTop = React.useCallback(() => router.push("./"), []);

  const handleScriptGenerate = React.useCallback(() => {
    setStatus("generating");
    try {
      const script = generateScript(idRef.current?.value, passRef.current?.value);
      const file = new File([script], "script.js", { type: "text/plain" });
      scriptFile.current = file;
      saveAs(file);
      setStatus("generated");
    } catch {
      setStatus("error");
    }
  }, []);

  const handleScriptDownload = React.useCallback(() => {
    const file = scriptFile.current;
    file && saveAs(file);
  }, [scriptFile.current]);

  const handleFileUpload = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      file && reader.current?.readAsText(file);
    },
    [reader.current]
  );

  return (
    <Layout>
      {status === "prepare" && (
        <>
          <details>
            <summary>
              抽選申し込み状況取得スクリプトを生成します。必要事項を入力してください。
            </summary>
            <ul>
              <li>抽選申し込み状況を閲覧するためには利用者番号とパスワードが必須です。</li>
              <li>入力した情報は、スクリプト生成以外には利用されません。</li>
              <li>
                どうしても利用者番号やパスワードを入力したくない場合は、空欄のまま生成し、該当箇所を手動で書き換えてご利用ください。
              </li>
            </ul>
          </details>
          <div className="mt-4 flex flex-col">
            <label>
              利用者番号(半角): <input ref={idRef} name="userId" type="text" />
            </label>
            <label>
              パスワード(半角): <input ref={passRef} name="password" type="password" />
            </label>
            <label>
              利用目的分類:
              <select>
                <option value="音楽講習" label="音楽講習" />
              </select>
            </label>
            <label>
              利用目的:
              <select>
                <option value="楽団（打楽器無し）" label="楽団（打楽器無し）" />
              </select>
            </label>
          </div>
          <div className="mt-4">
            <button type="button" onClick={handleScriptGenerate}>
              スプリプトを生成する
            </button>
            <button type="button" onClick={handleBackToTop}>
              トップ画面へ戻る
            </button>
          </div>
        </>
      )}
      {status === "generating" && (
        <>
          <details>
            <summary>取得スクリプトを生成中です。しばらくお待ちください。</summary>
            <ul>
              <li>しばらくこの画面から遷移しない場合は、入力からやり直してください。</li>
            </ul>
          </details>
          <div className="mt-4">
            <button type="button" onClick={handleBack}>
              入力画面へ戻る
            </button>
            <button type="button" onClick={handleBackToTop}>
              トップ画面へ戻る
            </button>
          </div>
        </>
      )}
      {status === "generated" && (
        <>
          <details>
            <summary>スクリプトを生成し、ダウンロードしました。</summary>
            <ul>
              <li>
                ダウンロードされない場合は、
                <button type="button" onClick={handleScriptDownload}>
                  ダウンロード
                </button>
                を押してください。
              </li>
              <li>それでもダウンロードできない場合は、入力からやり直してください。</li>
            </ul>
          </details>
          <details>
            <summary>
              スクリプトを実行して取得した抽選申し込み状況を、こちらの画面にアップロードしてください。
            </summary>
            <ul>
              <li>
                <a href="https://nodejs.org/ja/" target="_blank" rel="noreferrer noopener">
                  Node.js
                </a>
                のセットアップが必要です。
              </li>
              <li>
                ターミナルなどで<code>node script.js</code>
                を実行すると、抽選申し込み状況のJSONファイルが出力されます。
              </li>
              <li>抽選申し込み状況の取得には約10分かかります。</li>
              <li>スクリプトは、抽選期間内でのみ実行可能です。</li>
              <li>スクリプトが失敗する場合は、入力からやり直してください。</li>
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
          <div className="mt-4">
            <button type="button" onClick={handleBack}>
              入力画面へ戻る
            </button>
            <button type="button" onClick={handleBackToTop}>
              トップ画面へ戻る
            </button>
          </div>
        </>
      )}
      {status === "error" && (
        <>
          <details>
            <summary>エラーが発生しました。</summary>
          </details>
          <div className="mt-4">
            <button type="button" onClick={handleBack}>
              入力画面へ戻る
            </button>
            <button type="button" onClick={handleBackToTop}>
              トップ画面へ戻る
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default GeneratePage;
