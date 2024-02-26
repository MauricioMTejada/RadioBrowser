import React from "react";
import styles from "./radioCard.module.css";

interface Station {
  favicon: string;
  name: string;
}

interface Props {
  station: Station;
  setDefaultSrc: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

const RadioCardHeader: React.FC<Props> = ({ station, setDefaultSrc }) => {
  return (
    <div className={styles.stationName}>
      <img
        className={styles.logo}
        src={station.favicon}
        alt="station logo"
        onError={setDefaultSrc}
      />

      <div className={styles.textDouble}>
        <div className={styles.name}>{station.name.toLowerCase()}</div>
      </div>
    </div>
  );
};

export default RadioCardHeader;
