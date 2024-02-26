import { Station, dataRadio } from "../../dataRadio/dataRadio";

interface Props {
	filter: "all" | "classical" | "country" | "dance" | "disco" | "house" | "jazz" | "pop" | "rap" | "retro" | "rock";
}

const maxStationNameLength = 30;
const EXCLUDE_URLS = [
    "http://icecast.nowster.org.uk:8000/chbn.aac",
    "https://pub0202.101.ru:8443/stream/personal/aacp/64/765199?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiI2MzhjZWUzMjdmMjg4NWZmN2M0ZjE3ZTk0YWQyZjNiNSIsIklQIjoiMjEzLjE3Mi45MC4yMzMiLCJVQSI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMDkuMC4wLjAgU2FmYXJpLzUzNy4zNiIsIlJlZiI6Imh0dHBzOi8vMTAxLnJ1LyIsInVpZF9jaGFubmVsIjoiNzY1MTk5IiwidHlwZV9jaGFubmVsIjoicGVyc29uYWwiLCJ0eXBlRGV2aWNlIjoiUEMiLCJCcm93c2VyIjoiQ2hyb21lIiwiQnJvd3NlclZlcnNpb24iOiIxMDkuMC4wLjAiLCJTeXN0ZW0iOiJXaW5kb3dzIDEwIiwiZXhwIjoxNzAzMTgwMzg4fQ.caTBMOvryxKKcdoqU_pViucgYm44yIuLZ7vTc2gKepc",
];

export const getFilteredStations = ({ filter }: Props) => {
    const stationsList: Station[] = dataRadio[filter];

    // Filtrar estaciones con la URL excluida
    const filteredStations = stationsList && stationsList.filter(
        (station: Station) => !EXCLUDE_URLS.includes(station.urlResolved)
    );

    // Modificar el nombre de la estación si es demasiado largo
    return filteredStations  &&filteredStations.map((station: any) => ({
        ...station,
        name: truncateStationName(station.name),
    }));
};

const truncateStationName = (name: string) => {
    return name.length > maxStationNameLength
        ? name.substring(0, maxStationNameLength) + "..."
        : name;
};
