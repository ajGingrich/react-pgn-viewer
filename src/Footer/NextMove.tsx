import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { FooterButtonProps } from '../types';

/**
 * Next move button - advances one move forward.
 */
const NextMove: React.FC<FooterButtonProps> = ({ onClick, ariaLabel = 'Next move' }) => (
  <FooterButton onClick={onClick} ariaLabel={ariaLabel}>
    <Icon name="next" />
  </FooterButton>
);

export default React.memo(NextMove);
