"use client";

import { useState } from "react";
import PREF_OPTIONS from "@/components/prefectures";
import { MapComponent } from "../components/MapComponent/index";
import { parse } from 'papaparse';

type MapData = {
  name: string;
  point: {
    longitude: number;
    latitude: number;
  };
};

export default function Home() {
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const updateMapData = () => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target) return;
      const csv = e.target.result as string;
      const csv_data = parse<string[]>(csv, { header: false });

      const fetchMapData: MapData[] = [];

      Promise.all(csv_data.data.slice(0, 50).map(async (result) => {
        const name = result[0];
        const address = result[1];

        const url = "https://geocode.csis.u-tokyo.ac.jp/cgi-bin/simple_geocode.cgi?charset=UTF8&addr=";
        await fetch(url + address)
          .then((res) => res.text())
          .then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/xml");
            const longitude = doc.getElementsByTagName("longitude")[0].textContent;
            const latitude = doc.getElementsByTagName("latitude")[0].textContent;
            fetchMapData.push({
              name: name,
              point: {
                longitude: parseFloat(longitude || "0"),
                latitude: parseFloat(latitude || "0"),
              },
            });
        });
      })).then(() => {
        setMapData(fetchMapData);
      });
    };
    if (!file) return;
    reader.readAsText(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div>
        <div className="flex justify-center">
          <h1 className="text-2xl mt-5 mb-3">CSV to MAP</h1>
        </div>
        <div className="flex justify-center">
          <select className="w-30 p-2 m-2 border">
            {PREF_OPTIONS().map((pref, index) => (
              <option key={index} value={pref}>
                {pref}
              </option>
            ))}
          </select>
          <input className="w-30 p-2 m-2 text border"></input>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 m-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={updateMapData}
          >
            検索
          </button>
        </div>
        <div className="flex justify-center">
          <input
            type="file"
            accept="text/csv"
            className="w-30 p-2 m-2"
            onChange={handleFile}
          >
          </input>
        </div>
      </div>
      <div className="flex justify-center">
        <MapComponent mapData={mapData} />
      </div>
      <div className="m-5">
        <h2>ジオコーディングについて</h2>
        <a
          className="text-blue-500"
          href="https://geocode.csis.u-tokyo.ac.jp"
        >
          CSISシンプルジオコーディング実験を利用
        </a>
      </div>
    </>
  );
}
