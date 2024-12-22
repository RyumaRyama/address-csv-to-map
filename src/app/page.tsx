import PREF_OPTIONS from "@/components/prefectures";
import { MapComponent } from "../components/MapComponent/index";

export default function Home() {
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
          <input type="file" className="w-30 p-2 m-2"></input>
        </div>
      </div>
      <div className="flex justify-center">
        <MapComponent />
      </div>
    </>
  );
}
