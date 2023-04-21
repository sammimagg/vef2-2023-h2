/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';

interface PhotoBoxProps {
  imageUrl: string;
  width?: number;
  height?: number;
}

const PhotoBox: FC<PhotoBoxProps> = ({ imageUrl, width = 200, height = 200 }) => {
  return (
    <div
      style={{
        width,
        height,
        border: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={imageUrl} alt="photo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
};

export default PhotoBox;
