import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'
import { Countdown } from './Countdown';

export function ChallengeBox() {

    const {activeChallenge, resetChallenge, completedChallenge} = useContext(ChallengesContext);
    const {resetCountDown} = useContext(CountdownContext)

    function handleChallengeSucceedd() {
        completedChallenge()
        resetCountDown()

    }

    function handleFailedChallenge() {
        resetChallenge()
        resetCountDown()
    }

    return (

        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? 
            (<>
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}</header>
                <main>
                    <img src={`icons/${activeChallenge.type}.svg`}/>
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>
                <footer>
                    <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleFailedChallenge}
                    >
                        Falhei
                    </button>
                    <button 
                        type="button"
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceedd}
                    >
                        Completei
                    </button>
                </footer>
                </div>
            </>) 
            : 
            (<>
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level ao completar desafios
                </p>
                </div>
            </>
            )} 
        </div>
    )
}