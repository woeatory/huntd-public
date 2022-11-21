import React, { FC } from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

export const ChatTitlePlaceholder: FC = (props) => (
  <ContentLoader
    speed={2}
    width={156}
    height={80}
    viewBox="0 0 156 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Circle cx="16" cy="16" r="16" />
    <Rect x="42" y="4" rx="3" ry="3" width="32" height="8" />
    <Rect x="42" y="18" rx="3" ry="3" width="76" height="8" />
  </ContentLoader>
);
