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
  const updateMapData = () => {
    const mapData: MapData[] = [
      {
        name: "Tokyo",
        point: {
          longitude: 139.6917,
          latitude: 35.6895,
        },
      },
      {
        name: "Osaka",
        point: {
          longitude: 135.5022,
          latitude: 34.6937,
        },
      },
    ];
    setMapData(mapData);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
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
    reader.readAsText(file);
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
        </div>
        <div className="flex justify-center">
          <input
            type="file"
            accept="text/csv"
            className="w-30 p-2 m-2"
            onChange={handleFile}
          >
          </input>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 m-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={updateMapData}
          >
            決定
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <MapComponent mapData={mapData} />
      </div>
    </>
  );
}
