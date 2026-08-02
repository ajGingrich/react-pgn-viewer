import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { FooterButtonProps } from '../types';

/**
 * Flip button - toggles board orientation between white and black.
 */
const Flip: React.FC<FooterButtonProps> = ({ onClick, ariaLabel = 'Flip board' }) => (
  <FooterButton onClick={onClick} ariaLabel={ariaLabel}>
    <Icon name="flip" />
  </FooterButton>
);

export default React.memo(Flip);
