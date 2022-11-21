import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { typography } from '@/ui/typography/typography.module';
import { normalize } from '@/ui/theme/normalize';
import { Colors } from '@/ui/theme/colors';
import { BackButton } from '@/components/Header/BackButton';
import { Spacer } from '@/components/Base/Spacer';

interface Props {
  callback: (value: string) => void;
  toggleSearchBar: () => void;
}

export const ChatsSearch: FC<Props> = (props) => {
  const { callback, toggleSearchBar } = props;
  const { t } = useTranslation([Namespaces.Chat]);

  const [value, setValue] = useState('');

  const onChangeText = useCallback((inputValue) => {
    setValue(inputValue);
    callback(inputValue);
  }, [callback]);

  const onBackPressed = useCallback(() => {
    callback('');
    toggleSearchBar();
  }, [callback, toggleSearchBar]);

  return (
    <>
      <BackButton callback={onBackPressed} />
      <Spacer height={normalize(8, 'height')} />
      <TextInput
        placeholder={t(`${Namespaces.Chat}:search_chats`)}
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={value}
      />
      <Spacer height={normalize(12, 'height')} />
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    ...typography.text,
    fontSize: 16,
    width: '100%',
    padding: normalize(4),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.LightGray,
  },
});
