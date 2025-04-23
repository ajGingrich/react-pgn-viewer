import React from 'react';
import { Downloading as DownloadIcon } from '@mui/icons-material';

interface DownloadProps {
  onDownload: () => void;
  iconStyles: React.CSSProperties;
}

const Download: React.FC<DownloadProps> = ({ onDownload, iconStyles }) => {
  const handleDownload = () => {
    if (typeof onDownload !== 'function') return;
    onDownload();
  };

  return (
    <DownloadIcon
      onClick={handleDownload}
      style={iconStyles}
      fontSize="large"
    />
  );
};

export default Download;
