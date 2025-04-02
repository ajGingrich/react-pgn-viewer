import React from 'react';
import PropTypes from 'prop-types';
import { months } from './constants';

function BoardHeader({ headerInfo }) {
  if (!headerInfo || Object.keys(headerInfo).length === 0) return null; // Check if headerInfo is empty

  const whiteName = headerInfo.White || 'N/A';
  const blackName = headerInfo.Black || 'N/A';
  const blackElo = headerInfo.BlackElo || '?';
  const whiteElo = headerInfo.WhiteElo || '?';
  const round = headerInfo.Round || '?';
  const result = headerInfo.Result || '*';
  const event = headerInfo.Event || 'Unknown Event';
  const site = headerInfo.Site || 'Unknown Site';
  const dateString = headerInfo.Date || '????.??.??';
  let textDate = 'Unknown Date';

  // Safely parse the date
  try {
    const dateParts = dateString.split('.');
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const monthIndex = parseInt(dateParts[1], 10) - 1;
      const day = dateParts[2];
      if (monthIndex >= 0 && monthIndex < 12) {
        textDate = `${day} ${months[monthIndex]} ${year}`;
      }
    }
  } catch (e) {
    console.error("Error parsing date:", e);
    // Keep textDate as 'Unknown Date'
  }


  const eventInfo = `${event} | ${site} | Round ${round} |`;

  const pgnHeaderStyles = {
    padding: '5px',
    borderBottom: '1px solid #eee', // Add a subtle separator
    marginBottom: '5px',
  };

  const nameStyles = {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    fontSize: '16px', // Slightly larger font for names
  };

  const detailStyles = {
    fontSize: '13px', // Slightly smaller font for details
    color: '#555', // Dimmer color for details
  };

  return (
    <div className="pgnHeader" style={pgnHeaderStyles}>
      <div style={nameStyles}>
        {whiteName} ({whiteElo}) vs. {blackName} ({blackElo})
      </div>
      <div style={detailStyles}>
        {eventInfo} {textDate} | {result}
      </div>
    </div>
  );
}

BoardHeader.propTypes = {
  headerInfo: PropTypes.object.isRequired,
}


export default BoardHeader
