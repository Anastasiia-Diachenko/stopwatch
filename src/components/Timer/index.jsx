import React from 'react'
import './Timer.css';

const Timer = ({ time }) => {
    return (
      <span className='time'>{('0' + Math.floor(time % 60)).slice(-2)}</span>
    )
}

export default Timer;
