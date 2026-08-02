import React, { useCallback, useState } from 'react';

interface FooterButtonProps {
  readonly onClick: () => void;
  readonly ariaLabel: string;
  readonly isActive?: boolean;
  readonly children: React.ReactNode;
}

/**
 * Shared footer button with hover/focus/active feedback and keyboard support.
 */
const FooterButton: React.FC<FooterButtonProps> = ({ onClick, ariaLabel, isActive, children }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const active = isActive === true;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: '8px',
    color: active ? '#1a73e8' : '#4b5563',
    backgroundColor: active
      ? 'rgba(26, 115, 232, 0.12)'
      : hovered || pressed
        ? '#e5e7eb'
        : 'transparent',
    cursor: 'pointer',
    transform: pressed ? 'scale(0.9)' : 'scale(1)',
    transition: 'background-color 0.15s ease, color 0.15s ease, transform 0.05s ease',
    outline: focused ? '2px solid #1a73e8' : 'none',
    outlineOffset: '2px',
    userSelect: 'none',
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-pressed={isActive === undefined ? undefined : active}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={buttonStyles}
    >
      {children}
    </div>
  );
};

export default React.memo(FooterButton);
