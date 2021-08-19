import React, { useState, useEffect } from 'react';
import Timer from '../Timer';
import Button from '../Button';

import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import './Stopwatch.css';

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isDoubleClick, setDoubleClick] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();

    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (isActive) {
          setTime(prevTime => prevTime + 10);
        }
      });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    }

  }, [isActive])

  const handleStart = () => {
    setIsActive(true);
    setDoubleClick(false);
  }

  const handleStop = () => {
    setIsActive(!isActive);
    setTime(0);
  }

  let delay;

  const onDoubleClickHandler = () => {
    setDoubleClick(true);
    let secondClick;

    setTimeout(() => {
      secondClick = time / 10000;
      if(isDoubleClick && secondClick < 0.3) {
        setIsActive(false);
      }
    }, delay);

    setTimeout(() => {
      secondClick = 0;
      setDoubleClick(false);
    }, 3000)
  };

  const handleReset = () => {
    if (time === 0) {
      return;
    } else {
      setTime(0);
      setIsActive(true);
    }
  }

  return (
    <>
      <div className='timer'>
        <Timer time={time / 3.6e+6} />
        <Timer time={time / 60000} />
        <Timer time={time / 1000} />
      </div>
      <div>
        <Button
          className='is-primary'
          buttonName='Start'
          onClick={handleStart}
        />
        <Button
          buttonName='Stop'
          onClick={handleStop}
        />
        <Button
          buttonName='Wait'
          onClick={onDoubleClickHandler}
        />
        <Button
          buttonName='Reset'
          onClick={handleReset}
        />
      </div>
    </>
  )
}
