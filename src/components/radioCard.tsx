import React, { useEffect, useState } from "react";
import defaultImage from "../assets/generic_radio.png";
import "react-h5-audio-player/lib/styles.css";
import styles from "./radioCard.module.css";
import RadioCardLoading from "./radioCardLoading";
import RadioCardHeader from "./RadioCardHeader";
import RadioCardPlayer from "./RadioCardPlayer";

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

const RadioCard: React.FC<Props> = ({ stations, playingIndexes, setPlayingIndexes, }) => {
	const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (loadingIndexes.length > 0) {
			const timeout = setTimeout(() => {
				setLoadingIndexes([]);
				// Aquí podrías agregar lógica adicional para detener la reproducción
			}, 10000); // 10 segundos
			setTimeoutId(timeout);
		} else {
			clearTimeout(timeoutId as NodeJS.Timeout);
		}
	}, [loadingIndexes]);

	if (!stations) {
		return null;
	}

	const setDefaultSrc = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = defaultImage;
	};

	const handlePlay = (index: number) => {
		setPlayingIndexes((prevIndexes) => [...prevIndexes, index]);
		setLoadingIndexes((prevIndexes) => [...prevIndexes, index]);
	};

	const handlePause = (index: number) => {
		setPlayingIndexes((prevIndexes) =>
			prevIndexes.filter((item) => item !== index)
		);
		setLoadingIndexes((prevIndexes) =>
			prevIndexes.filter((item) => item !== index)
		);
	};

	return (
		<div className={styles.stations}>
			{stations &&
				stations.map((station, index) => (
					<div className={styles.stile01} key={index}>
						{loadingIndexes.includes(index) && (
							<RadioCardLoading index={index} />
						)}

						<div className={styles.stile02}>
							<RadioCardHeader
								station={station}
								setDefaultSrc={setDefaultSrc}
							/>

							<RadioCardPlayer
								index={index}
								src={station.urlResolved}
								playing={playingIndexes.includes(index)}
								handlePlay={handlePlay}
								handlePause={handlePause}
								setLoadingIndexes={setLoadingIndexes}
							/>
						</div>
					</div>
				))}
		</div>
	);
};

export default RadioCard;
