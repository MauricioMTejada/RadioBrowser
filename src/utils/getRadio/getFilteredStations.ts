import { Station, dataRadio } from "../dataRadio/dataRadio";
import { filteredStations } from "./filteredStations";

interface Props {
	filter: | "all" | "classical" | "country" | "dance" | "disco" | "house" | "jazz" | "pop" | "rap" | "retro" | "rock";
}

export const getFilteredStations = ({ filter }: Props) => {
	const stationsList: Station[] = dataRadio[filter];

	return filteredStations(stationsList);
};
