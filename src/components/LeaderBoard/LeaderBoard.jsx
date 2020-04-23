import React from 'react';
import styles from './LeaderBoard.module.css';

const LeaderBoard = (props) => {

    return (
        <section className={styles.leaderBoardSection}>
            <h2>Leader Board</h2>
            {props.winners.map(w => <div className={styles.winnerInfo}>
                <div>{w.winner}</div>
                <div>{w.date}</div>
            </div>)} 
        </section>
    )
}

export default LeaderBoard;