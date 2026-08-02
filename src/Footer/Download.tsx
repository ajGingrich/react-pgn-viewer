import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { FooterButtonProps } from '../types';

/**
 * Download button - exports PGN or FEN file.
 */
const Download: React.FC<FooterButtonProps> = ({ onClick, ariaLabel = 'Download game' }) => (
  <FooterButton onClick={onClick} ariaLabel={ariaLabel}>
    <Icon name="download" />
  </FooterButton>
);

export default React.memo(Download);
