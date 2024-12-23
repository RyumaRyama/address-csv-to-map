# CSV to MAP

住所と名称一覧のCSVファイルから、地図上にピンを打つNext.jsアプリケーションです。

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## CSVフォーマット
ヘッダーは無し、`名称, 住所`の順。

サンプル用愛知県コメダ珈琲一部店舗の住所一覧
```csv‘
本店,愛知県名古屋市瑞穂区上山町３ー１４ー８
高岳店,愛知県名古屋市東区泉２ー２１ー３
松風店,愛知県名古屋市昭和区松風町１−７
上前津店,愛知県名古屋市中区大須３−３１−４２
東郊通店,愛知県名古屋市昭和区御器所１−３−１
五女子店,愛知県名古屋市中川区露橋２−２５−１５
刈谷店,愛知県刈谷市井ヶ谷町天白１９−４
本町店,愛知県名古屋市中区大須２−５−１３
新栄店,愛知県名古屋市中区新栄１ー１７ー１
平和店,愛知県名古屋市中区平和１−１０−１０コスモパレス
庄内通店,愛知県名古屋市西区庄内通４−１庄内ハイツ
浦里店,愛知県名古屋市緑区浦里１−１６０グランドハイツ浦里
児玉店,愛知県名古屋市西区児玉町３ー５ー１０
法華店,愛知県名古屋市中川区法華西町１−１３
野並店,愛知県名古屋市天白区井の森２３２−１アイコービル１Ｆ
中割店,愛知県名古屋市南区中割町３−１２０−１
山手店,愛知県名古屋市昭和区山手通４ー１５ペポ山手ビル２Ｆ
港店,愛知県名古屋市港区名港２−９−２７ポートプラザビル１Ｆ
城北店,愛知県名古屋市北区八代町２−１０−２
豊田梅坪店,愛知県豊田市梅坪町１−１８−１
```

## マップについて
[Leafret](https://leafletjs.com/)を使用。
マップ画像は[OpenStreetMap](https://www.openstreetmap.org/copyright)を使用。

## ジオコーディングについて
[CSISシンプルジオコーディング実験を利用](https://geocode.csis.u-tokyo.ac.jp/)
アクセス数増大防止のため、アプリケーション内では一度で処理する件数を制限しています。
