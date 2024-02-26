import React from 'react'
import iconPlay from '../../assets/icons/play-icon.svg'
import styles from './play.module.css'

export const Play = () => {
  return (
    <div className={styles.iconContainer}>
        <img src={iconPlay} alt="play icon" className={styles.iconPlay} />
    </div>
  )
}
