import React from 'react'

const TimeZone= ({ timeZone,darkMode, currentTime, onDelete }) => {
    return (
      <div className={` ${darkMode ? 'card-dark' : 'card-dark'}`}>
        <p>{timeZone}</p>
        <p>{currentTime.tz(timeZone).format('LLL')}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  };
export default TimeZone
