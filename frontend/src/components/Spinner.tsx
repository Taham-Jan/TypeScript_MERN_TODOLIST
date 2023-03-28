import React from 'react'
import styles from '../styles/Spinner.module.css';

export default function Spinner() {

    return (
        <div className={styles.spinnerCenter}>
            <div id={styles.container}>
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                                flood-color="var(--primary-color)" />
                        </filter>
                    </defs>
                    <circle id={styles.spinner} style={{ fill: "transparent", stroke: "var(--secondary-color)", strokeWidth: "7px", strokeLinecap: "round", filter: "url(#shadow)" }} cx="50" cy="50" r="45" />
                </svg>
            </div>
        </div>
    )
}
