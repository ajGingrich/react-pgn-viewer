import React from 'react';
import FooterButton from './FooterButton';
import Icon from './Icon';
import type { PlayProps } from '../types';

/**
 * Play/Pause button - toggles automatic move playback.
 */
const Play: React.FC<PlayProps> = ({ onClick, isPlaying, ariaLabel }) => (
  <FooterButton
    onClick={onClick}
    isActive={isPlaying}
    ariaLabel={ariaLabel ?? (isPlaying ? 'Pause playback' : 'Start playback')}
  >
    <Icon name={isPlaying ? 'pause' : 'play'} />
  </FooterButton>
);

export default React.memo(Play);
