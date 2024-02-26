// StationList.tsx

import React, { useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import defaultImage from "../images/generic_radio.png";
import "react-h5-audio-player/lib/styles.css";
import styles from "./radioCard.module.css";
import { Play } from "../utils/playerIconsControls/play";

interface Station {
	favicon: string;
	name: string;
	urlResolved: string;
}

interface Props {
    stations: Station[] | undefined;
    playingIndexes: number[];
	setPlayingIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

const RadioCard: React.FC<Props> = ({ stations, playingIndexes, setPlayingIndexes }) => {
	// const [playingIndexes, setPlayingIndexes] = useState<number[]>([]);

	if (!stations) {
		return null;
	  }

	const setDefaultSrc = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = defaultImage;
	};

    const handlePlay = (index: number) => {
        setPlayingIndexes(prevIndexes => [...prevIndexes, index]);
    };

    const handlePause = (index: number) => {
        setPlayingIndexes(prevIndexes => prevIndexes.filter(item => item !== index));
    };

	return (
		<div className={styles.stations}>
			{stations &&
				stations.map((station, index) => (
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
							// className={`${styles.player} ${playingIndexes.includes(index) ? styles.playing : ''}`}
							className={`${styles.player} ${playingIndexes.includes(index) ? styles.playing : ''}`}
							src={station.urlResolved}
							showJumpControls={false}
							layout="stacked"
							customProgressBarSection={[]}
							customControlsSection={[
								RHAP_UI.MAIN_CONTROLS,
								RHAP_UI.VOLUME_CONTROLS,
							]}
							autoPlayAfterSrcChange={false}
							// customIcons={{ play: <Play />, }}
							//   style={{ backgroundColor: 'pink' }}

							onPlay={() => handlePlay(index)}
							onPause={() => handlePause(index)}
						/>
					</div>
				))}
		</div>
	);
};

export default RadioCard;
