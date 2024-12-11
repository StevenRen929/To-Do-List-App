import React, { useEffect, useState } from 'react';

export default function GetTimeDiff(props) {
  const { dueDate,setTimeRemain} = props;
  const [timeDiff, setTimeDiff] = useState(null);

  useEffect(() => {
    const interval = setInterval(
    () => {
      const now = new Date();
      const timeRemaining = dueDate - now;
      if (timeRemaining <= 0) {
        clearInterval(interval);
        setTimeRemain(0);
        setTimeDiff('OverDue');
      } else {
        setTimeRemain(timeRemaining);
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimeDiff(`${hours} hours ${minutes} minutes ${seconds} seconds`);
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, [dueDate, setTimeRemain]);

  return (
    <span>{timeDiff ? timeDiff : 'Loading time remaining...'}</span>
  );
}