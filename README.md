[![Scraping](https://github.com/trfv/koutou-lottery/actions/workflows/scraping.yml/badge.svg)](https://github.com/trfv/koutou-lottery/actions/workflows/scraping.yml)

# Koutou Lottery
https://koutou-lottery.vercel.app/
## はじめに
このサイトは [江東区の施設の抽選システム](https://sisetun.kcf.or.jp/web/) を利用しやすくするためのものです。
## 機能の説明
以下の機能があります。
- 抽選申し込み状況取得スクリプト生成機能
- 抽選申し込み状況分析機能
### 抽選申し込み状況取得スクリプト生成機能
抽選システムに表示されている抽選申し込み状況を取得するスクリプトを生成します。[Playwright](https://playwright.dev/) というライブラリを利用し、画面をスクレイピングします。
### 抽選申し込み状況分析機能
上記スクリプトによって取得した抽選申し込み状況を分析します。
## 備考
以下の注意事項を守ってご利用ください。
- スクレイピングは用法・容量を正しく守って使いましょう。
- モバイル端末からは利用できません。
## おまけ
- このレポジトリは、自分の勉強のために、意図的に新しいライブラリを利用しています。
- 具体的には [Next.js](https://nextjs.org/), [Recoil](https://recoiljs.org/), [tailwindcss](https://tailwindcss.com/) です。
