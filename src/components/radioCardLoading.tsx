import React from "react";
import styles from "./radioCard.module.css";

interface Props {
  index: number;
}

const RadioCardLoading: React.FC<Props> = ({ index }) => {
  return (
    <div className={styles.loading}>Cargando...</div>
  );
};

export default RadioCardLoading;
