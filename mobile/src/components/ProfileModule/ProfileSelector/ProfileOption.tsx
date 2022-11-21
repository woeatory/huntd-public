import React, { FC } from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useProfileContext } from '@/controllers/profile/profile.context';
import { typography } from '@/ui/typography/typography.module';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { RadioButton } from '@/ui/icons/general/RadioButton';
import { Colors } from '@/ui/theme/colors';
import { PrimaryProfile } from '@/controllers/graphql/generated';

interface Props {
  type: PrimaryProfile;
  onPress: (value: PrimaryProfile) => void;
  available: boolean;
}

export const ProfileOption: FC<Props> = (props) => {
  const { type, onPress, available } = props;

  const { t } = useTranslation([Namespaces.Profile]);
  const { profileType } = useProfileContext();

  const isSelected = profileType === type;
  const textClass = available ? styles.text : styles.inactive;

  return (
    <TouchableOpacity
      onPress={() => onPress(type)}
      style={styles.container}
      disabled={!available}
    >
      <Text style={[textClass, typography.caption]}>
        {t(`${Namespaces.Profile}:${type.toLowerCase()}_profile_link`)}
      </Text>
      <RadioButton
        width={16}
        height={16}
        color={isSelected ? Colors.Citrus : Colors.LightGray}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  text: {
    color: Colors.Semidark,
  },
  inactive: {
    color: Colors.LightGray,
  },
});
