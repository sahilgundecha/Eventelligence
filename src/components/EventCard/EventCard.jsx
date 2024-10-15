import React from 'react';
import './EventCard.css'; // Assuming you're using SCSS for styling

const EventCard = ({ upcomingEventsCount, title, color }) => {
  return (
    <div className='event-card'>
      <div className='event-header'>
        <span className={`status-dot`} style={{ backgroundColor: color }} />
        <span className='event-title'>{title}</span>
      </div>
      <div className='event-count'>{upcomingEventsCount}</div>
    </div>
  );
};

export default EventCard;
