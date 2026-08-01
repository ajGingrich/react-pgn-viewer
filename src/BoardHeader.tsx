import React, { useMemo } from 'react';
import { MONTHS } from './constants';
import type { BoardHeaderProps } from './types';
import { sanitizeHeaderValue } from './helpers';

/**
 * Displays game information header (players, event, date, result).
 */
const BoardHeader: React.FC<BoardHeaderProps> = ({ headerInfo, width }) => {
  const gameInfo = useMemo(() => {
    if (!headerInfo) return null;

    const whiteName = sanitizeHeaderValue(headerInfo.White ?? 'Unknown');
    const blackName = sanitizeHeaderValue(headerInfo.Black ?? 'Unknown');
    const whiteElo = sanitizeHeaderValue(headerInfo.WhiteElo ?? '?');
    const blackElo = sanitizeHeaderValue(headerInfo.BlackElo ?? '?');
    const result = sanitizeHeaderValue(headerInfo.Result ?? '*');

    // Parse date
    const rawDate = headerInfo.Date ?? '';
    const dateParts = rawDate.split('.');
    const textDate =
      dateParts.length === 3 && dateParts[1]
        ? `${dateParts[2] ?? ''} ${MONTHS[parseInt(dateParts[1], 10) - 1] ?? ''} ${dateParts[0] ?? ''}`
        : '';

    const event = sanitizeHeaderValue(headerInfo.Event ?? '');
    const site = sanitizeHeaderValue(headerInfo.Site ?? '');
    const round = sanitizeHeaderValue(headerInfo.Round ?? '');

    const eventInfo =
      event || site
        ? [event, site, round ? `Round ${round}` : ''].filter(Boolean).join(' | ')
        : null;

    return {
      whiteName,
      blackName,
      whiteElo,
      blackElo,
      result,
      textDate,
      eventInfo,
    };
  }, [headerInfo]);

  if (!gameInfo) return null;

  const containerStyles: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
  };

  const nameStyles: React.CSSProperties = {
    fontWeight: 700,
    marginBottom: '4px',
    fontSize: '15px',
  };

  const detailStyles: React.CSSProperties = {
    fontSize: '13px',
    color: '#666',
  };

  const resultStyles: React.CSSProperties = {
    fontWeight: 600,
    color: '#333',
  };

  return (
    <div className="pgnHeader" style={{ ...containerStyles, width }} role="banner">
      <div style={nameStyles}>
        {gameInfo.whiteName} ({gameInfo.whiteElo}) vs. {gameInfo.blackName} ({gameInfo.blackElo})
      </div>
      <div style={detailStyles}>
        {gameInfo.eventInfo && <span>{gameInfo.eventInfo} | </span>}
        {gameInfo.textDate && <span>{gameInfo.textDate} | </span>}
        <span style={resultStyles}>{gameInfo.result}</span>
      </div>
    </div>
  );
};

export default React.memo(BoardHeader);
