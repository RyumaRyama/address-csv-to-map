"use client";

import { useState } from "react";
import PREF_OPTIONS from "@/components/prefectures";
import { MapComponent } from "../components/MapComponent/index";

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
          <input type="file" accept="text/csv" className="w-30 p-2 m-2"></input>
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
