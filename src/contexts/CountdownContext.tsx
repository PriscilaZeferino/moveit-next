import {createContext, useState, useEffect, useContext, ReactNode} from 'react'
import {ChallengesContext} from './ChallengesContext'

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    active: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;  
}

interface CountdownContextProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeOut: NodeJS.Timeout;

export function CountdownProvider ({children}: CountdownContextProps) {
    
    const {newChallenge} = useContext(ChallengesContext)

    const [active, setActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const [time, setTime] = useState(25*60);

    const minutes = Math.floor(time/ 60);
    const seconds = time % 60;

    function startCountDown() {
        setActive(true)
    }

    function resetCountDown() {
        clearTimeout(countdownTimeOut)
        setActive(false)
        setTime(25*60)
        setHasFinished(false)

    }

    useEffect ( () => {
        if(active && time > 0) {
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
        else if(active && time === 0)
        {
            setHasFinished(true)
            setActive(false)
            newChallenge()
        }
    }, [active, time])


    return (
        <CountdownContext.Provider 
            value={
            {                
                minutes, 
                seconds,
                hasFinished,
                active,
                startCountDown,
                resetCountDown,
            }
            }>
            {children}
        </CountdownContext.Provider>
    )
}