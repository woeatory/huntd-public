import React, { FC } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Colors } from '@/ui/theme/colors';

export const ProfileDetailsPlaceholder: FC = () => (
  <View style={{ padding: 24 }}>
    <ContentLoader
      width={156}
      height={104}
      viewBox="0 0 156 104"
      backgroundColor={Colors.LightGray}
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="7" rx="3" ry="3" width="112" height="10" />
      <Rect x="0" y="26" rx="3" ry="3" width="88" height="12" />

      <Rect x="0" y="62" rx="3" ry="3" width="112" height="10" />
      <Rect x="0" y="82" rx="3" ry="3" width="88" height="12" />
    </ContentLoader>
  </View>
);
