import React from 'react';
import { months } from './constants.ts';
import { PgnHeaders } from './types';

interface BoardHeaderProps {
  headerInfo?: PgnHeaders;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ headerInfo }) => {
  if (!headerInfo) return null;

  const whiteName = headerInfo.White || 'N/A';
  const blackName = headerInfo.Black || 'N/A';
  const blackElo = headerInfo.BlackElo || '?';
  const whiteElo = headerInfo.WhiteElo || '?';
  const round = headerInfo.Round || '?';
  const result = headerInfo.Result || '*';
  const event = headerInfo.Event;
  const site = headerInfo.Site;
  const dateString = headerInfo.Date || '????.??.??';
  const dateParts = dateString.split('.');
  const textDate =
    dateParts.length === 3
      ? `${dateParts[2]} ${months[Number(dateParts[1]) - 1] || '??'} ${dateParts[0]}`
      : dateString;

  const eventInfo =
    event && site
      ? `${event} | ${site} | Round ${round} |`
      : event || site || `Round ${round}`
        ? `${event || ''}${event && site ? ' | ' : ''}${site || ''}${(event || site) && round ? ' | ' : ''}Round ${round} |`
        : '';

  const pgnHeaderStyles: React.CSSProperties = {
    padding: '5px',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#333',
  };

  const nameStyles: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    fontSize: '16px',
  };

  const detailStyles: React.CSSProperties = {
    fontSize: '13px',
    color: '#666',
  };

  return (
    <div className="pgnHeader" style={pgnHeaderStyles}>
      <div style={nameStyles}>
        {whiteName} ({whiteElo}) vs. {blackName} ({blackElo})
      </div>
      <div style={detailStyles}>
        {' '}
        {eventInfo} {textDate} | {result}{' '}
      </div>
    </div>
  );
};

export default BoardHeader;
