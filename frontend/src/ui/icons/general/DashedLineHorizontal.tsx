import React, { FC } from 'react';

interface Props {
  imageWidth: string;
}

export const DashedLineHorizontal: FC<Props> = ({ imageWidth }) => {
  // If linearGradient used as color, svg can find id of gradient only once.
  // Since this component used twice on "Candidates" page, there was a bug
  // when second svg wasn't displayed on page. This random id was added
  // to prevent this bug
  const gradientName = `${Math.trunc(Math.random() * 10000)}`;

  return (
    <svg width="100%" height="1" viewBox={`0 0 ${imageWidth} 1`} fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-line">
      <line y1="0.5" x2={imageWidth} y2="0.5" stroke={`url(#${gradientName})`} strokeDasharray="3 5" />
      <defs>
        <linearGradient id={gradientName} x1={imageWidth} y1="0.999996" x2="3.01411e-10" y2="1.00056" gradientUnits="userSpaceOnUse">
          <stop stopColor="#373A44" stopOpacity="0" />
          <stop offset="0.494792" stopColor="#373A44" />
          <stop offset="1" stopColor="#373A44" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
