import { useState, useEffect } from "react";
import styles from "./Radio.module.css";
import { getFilteredStations } from "./utils/getRadio/getFilteredStations";
import { Filters } from "./components/filters";
import RadioCard from "./components/radioCard";
import { Station } from "./dataRadio/dataRadio";

export const Radio = () => {
	const [stations, setStations] = useState<Station[] | undefined>();
	const [stationFilter, setStationFilter] = useState<
		| "all"
		| "classical"
		| "country"
		| "dance"
		| "disco"
		| "house"
		| "jazz"
		| "pop"
		| "rap"
		| "retro"
		| "rock"
	>("all");
	const [loading, setLoading] = useState<boolean>(false);
	const [playingIndexes, setPlayingIndexes] = useState<number[]>([]);

	useEffect(() => {
		setLoading(true);
		const data = getFilteredStations({ filter: stationFilter });
		setStations(data);
		setLoading(false);
		setPlayingIndexes([]);
	}, [stationFilter]);

	return (
		<div className={styles.styleContainer}>
			<div className={styles.titles}>
				<h1>React - Radio Browser</h1>
				<h2>Select your radio style</h2>
				<Filters
					stationFilter={stationFilter}
					setStationFilter={setStationFilter}
				/>
			</div>

			<div className={styles.radio}>
				{loading && <div className={styles.loading}>Loading...</div>}

				<RadioCard
					stations={stations}
					playingIndexes={playingIndexes}
					setPlayingIndexes={setPlayingIndexes}
				/>
			</div>
		</div>
	);
};
