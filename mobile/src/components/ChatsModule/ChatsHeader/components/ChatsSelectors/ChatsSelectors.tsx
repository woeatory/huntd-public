import React, { FC } from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { ChatsSelectorTabs } from '@/components/ChatsModule/ChatList/ChatsSelectorTabs';
import { Spacer } from '@/components/Base/Spacer';
import { normalize } from '@/ui/theme/normalize';
import { SearchIcon } from '@/ui/icons/general/SearchIcon';
import { Colors } from '@/ui/theme/colors';

interface Props {
  toggleSearchBar: () => void;
}

export const ChatsSelectors: FC<Props> = (props) => {
  const { toggleSearchBar } = props;
  const { t } = useTranslation([Namespaces.Chat]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={typography.heading}>
          {t(`${Namespaces.Chat}:my_chats`)}
        </Text>
        <TouchableWithoutFeedback onPress={() => toggleSearchBar()}>
          <View style={styles.icon}>
            <SearchIcon color={Colors.Gray} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Spacer height={normalize(14, 'height')} />
      <ChatsSelectorTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    height: '100%',
  },
});
