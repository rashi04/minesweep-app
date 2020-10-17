import React from 'react';
import ReactCountdownClock from 'react-countdown-clock';

export default function Timer(props) {
    var paused = props.gameStopped;
    
    const handleStop = () => {
        if (props.scoreCount === 0) {
            props.setSmiley("sad");
        } else {
            props.setSmiley("happy");
        }
        props.setGameStopped(true);
    };
    return (<ReactCountdownClock seconds={60}
        color="#3137fd"
        alpha={0.9}
        size={85}
        weight="16"
        onComplete={handleStop} paused={paused}/>);
}