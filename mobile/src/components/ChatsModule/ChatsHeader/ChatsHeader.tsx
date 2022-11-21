import React, { FC, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { normalize } from '@/ui/theme/normalize';
import { ChatsSearch } from '@/components/ChatsModule/ChatsHeader/components/ChatsSearch';
import { ChatsSelectors } from '@/components/ChatsModule/ChatsHeader/components/ChatsSelectors';

interface Props {
  callback: (value: string) => void;
}

export const ChatsHeader: FC<Props> = (props) => {
  const { callback } = props;
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = useCallback(
    () => setShowSearchBar((value) => !value),
    [],
  );

  return (
    <View style={styles.headerContainer}>
      {showSearchBar
        ? (
          <ChatsSearch
            callback={callback}
            toggleSearchBar={toggleSearchBar}
          />
        ) : (
          <ChatsSelectors
            toggleSearchBar={toggleSearchBar}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: normalize(20),
  },
});
