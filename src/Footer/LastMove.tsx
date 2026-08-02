import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { FooterButtonProps } from '../types';

/**
 * Last move button - jumps to the end of the game.
 */
const LastMove: React.FC<FooterButtonProps> = ({ onClick, ariaLabel = 'Go to last move' }) => (
  <FooterButton onClick={onClick} ariaLabel={ariaLabel}>
    <Icon name="last" />
  </FooterButton>
);

export default React.memo(LastMove);
