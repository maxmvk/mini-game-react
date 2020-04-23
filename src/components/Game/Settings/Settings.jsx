import React from 'react';
import styles from './Settings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Settings = (props) => {

    return (
        <div className={styles.settings}>
            <button onClick={() => { props.setDropdownGameMode(!props.isDropdownGameMode) }} className={styles.btnPick} disabled={props.isGameStarted}>
                { props.currentDifficulty!==null? props.currentDifficulty.substr(0, props.currentDifficulty.length - 4): "Pick game mode" } 
                <div><FontAwesomeIcon icon={faChevronDown}/></div>
            </button>
            {props.isDropdownGameMode
            ?<div className={styles.gameModes} onMouseLeave={() => { props.setDropdownGameMode(false) }}>
                {
                    Object.keys(props.difficultyPreset).map(difficulty =>
                        <div onClick={() => { props.onSetCurrentDifficulty(difficulty)}}>{difficulty.substr(0, difficulty.length - 4)}</div>
                    )
                }
            </div>
            :null}
            <input type="text" onChange={ props.handleUserInput } value={props.playerName} disabled={props.isGameStarted} placeholder="Enter your name" required />
            <button onClick={() => { props.onPlay() }} className={styles.btnPlay} disabled={!props.isNameValid||!props.currentDifficulty||props.isGameStarted}>
                {props.isPlayedOnce? "Play Again": "Play"}
            </button>
        </div>
    )
}

export default Settings;