import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { FooterButtonProps } from '../types';

/**
 * Reset button - returns to the starting position.
 */
const Reset: React.FC<FooterButtonProps> = ({ onClick, ariaLabel = 'Reset to start' }) => (
  <FooterButton onClick={onClick} ariaLabel={ariaLabel}>
    <Icon name="reset" />
  </FooterButton>
);

export default React.memo(Reset);
