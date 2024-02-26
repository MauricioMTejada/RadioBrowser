import React from "react";
import styles from "./filters.module.css";

type FiltersProps = {
	stationFilter: "all" | "classical" | "country" | "dance" | "disco" | "house" | "jazz" | "pop" | "rap" | "retro" | "rock";
	setStationFilter: (filter: "all" | "classical" | "country" | "dance" | "disco" | "house" | "jazz" | "pop" | "rap" | "retro" | "rock") => void;
  };

export const Filters: React.FC<FiltersProps> = ({ stationFilter, setStationFilter }) => {
	const filters: FiltersProps["stationFilter"][] = [
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

	return (
		<div className={styles.filters}>
			{filters.map((filter) => {
				return (
					<span
						className={stationFilter === filter ? styles.selected : ""}
						onClick={() => setStationFilter(filter)}
						key={filter}>
						{filter}
					</span>
				);
			})}
		</div>
	);
};
