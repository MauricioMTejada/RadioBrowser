import { RadioBrowserApi } from "radio-browser-api";
import "react-h5-audio-player/lib/styles.css";
import { filteredStations } from "./filteredStations";

export const getFilteredStationsApi = async ({ stationFilter }) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    const stations = await api.searchStations({
      language: "english",
      tag: stationFilter,
      limit: 31,
  });

  return filteredStations(stations);

}
