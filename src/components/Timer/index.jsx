import React from 'react'
import './Timer.css';

const Timer = ({ time }) => {
    return (
      <p className='time'>{('0' + Math.floor(time % 60)).slice(-2)}</p>
    )
}

export default Timer;
