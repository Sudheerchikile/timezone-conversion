import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimeZone from '../SingleZoneComponent';
import copy from 'copy-to-clipboard';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './index.css';

const TimeZoneConverter = () => {
  const [timeZones, setTimeZones] = useState(['UTC', 'Asia/Kolkata']);
  const [currentTime, setCurrentTime] = useState(moment());
  const [darkMode, setDarkMode] = useState(true);
  const [newTimeZone, setNewTimeZone] = useState();
  const [selectedDate,setSelectedDate]=useState();
  const [selectedZone, setSelectedZone] = useState('UTC');
  const [shareableLink, setShareableLink] = useState('');


  const handleChangeDate=(date)=>{
    setSelectedDate(date);
  }


  const handleTimeZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const handleReverseOrder = () => {
    setTimeZones((prevTimeZones) => [...prevTimeZones].reverse());
  };



  const generateShareableLink = () => {
    const url = `${window.location.origin}?timeZones=${encodeURIComponent(JSON.stringify(timeZones))}`;
    setShareableLink(url);
    console.log(url)
    copy(url);
    alert("link copied successfully")
  };

  const handleTimeZoneAddition = () => {
    if (newTimeZone.trim() === '') return; // Prevent adding empty time zone
    setTimeZones((prevTimeZones) => [...prevTimeZones, newTimeZone]);
    setNewTimeZone(''); // Clear the input field after adding
  };

  const handleTimeZoneDeletion = (index) => {
    setTimeZones((prevTimeZones) => prevTimeZones.filter((_, i) => i !== index));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTimeZones(items);
  };
  


 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`time-zone-container ${darkMode ? 'dark-mode' : ''}`}>
         <h1 className='heading'>Timezone-Converter</h1>
      <button className={`mode-button ${darkMode ? 'dark-button' : 'light-button'}`} onClick={toggleDarkMode}>{darkMode ? '☀️' : '🌙'}</button>

     
      <div className="input-box">
        <input
          type="text"
          className='input'
          value={newTimeZone}
          onChange={(e) => setNewTimeZone(e.target.value)}
          placeholder="Enter new time zone"
        />
        <button className='add-timezone' onClick={handleTimeZoneAddition}>Add Time Zone</button>
      </div>

      


<div className='drop-down-date-container'>
   <div className='drop-down'>   
   <select className='select' value={selectedZone} onChange={handleTimeZoneChange}>
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
     
      <div className='time'>Time : {currentTime.tz(selectedZone).format('LLL')}</div>
      </div>
 





      <ReactDatePicker 
      selected={selectedDate}
      onChange={handleChangeDate}
      dateFormat="P"
      className='date-picker'
      placeholderText=' select a date'/>
    


</div>
     
     

      <button className='reverse-button'  onClick={handleReverseOrder}>Reverse Order 🔄</button>
     
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div  className='all-timezones' {...provided.droppableProps} ref={provided.innerRef}>
              {timeZones.map((zone, index) => (
                <Draggable key={zone} draggableId={zone} index={index}>
                  {(provided, snapshot) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                         
                      <TimeZone
                        timeZone={zone}
                        currentTime={currentTime}
                        onDelete={() => handleTimeZoneDeletion(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

<div className='buttons-con'>
      <button   className='meet-button' >Schedule Meet</button>
      <button onClick={generateShareableLink}>generate Link</button>
    </div>

    </div>
  );
};



export default TimeZoneConverter;
