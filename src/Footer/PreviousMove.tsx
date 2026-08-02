import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { FooterButtonProps } from '../types';

/**
 * Previous move button - goes back one move.
 */
const PreviousMove: React.FC<FooterButtonProps> = ({ onClick, ariaLabel = 'Previous move' }) => (
  <FooterButton onClick={onClick} ariaLabel={ariaLabel}>
    <Icon name="previous" />
  </FooterButton>
);

export default React.memo(PreviousMove);
