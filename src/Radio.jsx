import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import defaultImage from "./images/generic_radio.png";
import styles from './Radio.module.css';
import { all, classical, country, dance, disco, house, jazz, pop, rap, retro, rock } from './dataRadio/dataRadio';

export const Radio = () => {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const maxStationNameLength = 30;
  const excludedUrl = "http://icecast.nowster.org.uk:8000/chbn.aac";

  useEffect(() => {
    setLoading(true);
    // Simulando la respuesta de la API con la información del archivo dataRadio
    const data = getFilteredStations(stationFilter);
    setStations(data);
    setLoading(false);
  }, [stationFilter]);

  const getFilteredStations = (filter) => {
    // Obtener la lista de estaciones según el filtro
    const stationsList = getStationsByFilter(filter);

    // Filtrar estaciones con la URL excluida
    const filteredStations = stationsList.filter(station => station.urlResolved !== excludedUrl);

    // Modificar el nombre de la estación si es demasiado largo
    return filteredStations.map(station => ({ ...station, name: truncateStationName(station.name) }));
  };

  const getStationsByFilter = (filter) => {
    switch (filter) {
      case "all":
        return all;
      case "classical":
        return classical;
      case "country":
        return country;
      case "dance":
        return dance;
      case "disco":
        return disco;
      case "house":
        return house;
      case "jazz":
        return jazz;
      case "pop":
        return pop;
      case "rap":
        return rap;
      case "retro":
        return retro;
      case "rock":
        return rock;
      default:
        return all;
    }
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
    "house",
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
              onClick={() => setStationFilter(filter)}
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
