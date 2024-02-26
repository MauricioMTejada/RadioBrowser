// RadioCardPlayer.tsx

import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./radioCard.module.css";
import { Play } from "../utils/playerIconsControls/play";

interface Props {
  index: number;
  src: string;
  playing: boolean;
  handlePlay: (index: number) => void;
  handlePause: (index: number) => void;
  setLoadingIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

const RadioCardPlayer: React.FC<Props> = ({
  index,
  src,
  playing,
  handlePlay,
  handlePause,
  setLoadingIndexes,
}) => {
  return (
    <AudioPlayer
      className={`${styles.player} ${playing ? styles.playing : ""}`}
      src={src}
      showJumpControls={false}
      layout="stacked"
      customProgressBarSection={[]}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
      autoPlayAfterSrcChange={false}
      onPlay={() => handlePlay(index)}
      onPause={() => handlePause(index)}
      onLoadedData={() =>
        setLoadingIndexes((prevIndexes) =>
          prevIndexes.filter((item) => item !== index)
        )
      }
    />
  );
};

export default RadioCardPlayer;
