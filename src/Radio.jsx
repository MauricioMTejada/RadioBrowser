import React, { useState, useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./images/generic_radio.png";
import styles from './Radio.module.css';  // Cambiado a estilos importados desde el archivo SCSS

export const Radio = () => {
  const [stations, setStations] = useState();
  const [stationFilter, setSationFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const maxStationNameLength = 30;
  const excludedUrl = "http://icecast.nowster.org.uk:8000/chbn.aac"; // URL que se debe excluir

  useEffect(() => {
    setLoading(true);
    setupApi(stationFilter).then((data) => {
      // Filtrar estaciones con la URL excluida
      const filteredStations = data.filter(station => station.urlResolved !== excludedUrl);
      setStations(filteredStations.map(station => ({ ...station, name: truncateStationName(station.name) })));
      setLoading(false);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    const stations = await api.searchStations({
      language: "english",
      tag: stationFilter,
      limit: 30,
    });

    console.log(stations);

    return stations;
  };

  const truncateStationName = (name) => {
    return name.length > maxStationNameLength ? name.substring(0, maxStationNameLength) + '...' : name;
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house", // <- Debería ser "house" en lugar de "hose"
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className={styles.radio}>
      <div className={styles.filters}>
        {filters.map((filter) => {
          return (
            <span
              className={stationFilter === filter ? styles.selected : ""}
              onClick={() => setSationFilter(filter)}
              key={filter}
            >
              {filter}
            </span>
          );
        })}
      </div>

      {loading && <div className={styles.loading}>Loading...</div>}

      <div className={styles.stations}>
        {stations &&
          stations.map((station, index) => {
            return (
							<div className={styles.station} key={index}>
								<div className={styles.stationName}>
									<img
										className={styles.logo}
										src={station.favicon}
										alt="station logo"
										onError={setDefaultSrc}
									/>
                  <div className={styles.name}>{station.name.toLowerCase()}</div>
								</div>

								<AudioPlayer
									className={styles.player}
									src={station.urlResolved}
									showJumpControls={false}
									layout="stacked"
									customProgressBarSection={[]}
									customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
									autoPlayAfterSrcChange={false}
								/>
							</div>
						);
          })}
      </div>
    </div>
  );
};
