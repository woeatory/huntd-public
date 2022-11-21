import React, { FC, useMemo } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

interface Props {
  showDetails?: boolean;
}

export const ProfileInfoPlaceholder: FC<Props> = (props) => {
  const { showDetails } = props;

  const { width, height } = useMemo(() => {
    if (showDetails) {
      return { width: 260, height: 128 };
    }

    return { width: 260, height: 72 };

  }, [showDetails]);

  return (
    <ContentLoader
      height={height}
      width={width}
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
      viewBox={`0 0 ${width} ${height}`}
    >
      <Rect x="90" y="28" rx="10" ry="3" width="123" height="10" />
      <Rect x="90" y="42" rx="3" ry="3" width="40" height="6" />
      <Circle cx="40" cy="40" r="32" />

      {showDetails && (
        <>
          <Rect x="4" y="96" rx="4" ry="4" width="123" height="10" />
          <Rect x="4" y="116" rx="4" ry="4" width="123" height="10" />
        </>
      )}
    </ContentLoader>
  );
};
