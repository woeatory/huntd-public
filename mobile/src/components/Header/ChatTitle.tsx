import React, { FC, useCallback, useMemo } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { getUserActionTime } from '@/controllers/user/user.utils/getUserActionTime';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { ProfileIconLocked } from '@/ui/icons/general/ProfileIconLocked';
import { StackRoutes } from '@/controllers/router/router.constants';
import { ProfileConnectionInitiator } from '@/controllers/graphql/generated';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { ScaleTouchableView } from '@/components/Base/Animation/ScaleTouchableView';
import { Image } from '@/components/Base/Image';
import { NoAvatar } from '@/components/Base/NoAvatar';
import { DotsHorizontalIcon } from '@/ui/icons/general/DotsHorizontalIcon';
import { normalize } from '@/ui/theme/normalize';
import { BackButton } from '@/components/Header/BackButton';

interface Props {
  hidden: boolean;
  name: string;
  position: string;
  lastActionTime: string;
  type: ProfileConnectionInitiator;
  slug: string;
  avatar?: string;
  openActionsModal: () => void;
  renderActions?: boolean;
}

export const ChatTitle: FC<Props> = (props) => {
  const {
    name, position, lastActionTime, hidden,
    type, slug, avatar, openActionsModal, renderActions = true,
  } = props;

  const { t } = useTranslation([Namespaces.Profile]);
  const navigation = useNavigation();

  const actionTime = useMemo(
    () => getUserActionTime(lastActionTime, t),
    [lastActionTime, t],
  );

  const onPressActions = useCallback(() => {
    openActionsModal();
  }, [openActionsModal]);

  const onPressUser = useCallback(() => {
    navigation.navigate(
      type === ProfileConnectionInitiator.Candidate
        ? StackRoutes.Candidate
        : StackRoutes.Recruiter,
      { slug },
    );
  }, [navigation, slug, type]);

  const renderAvatar = useCallback(() => {
    if (hidden) {
      return <ProfileIconLocked color={Colors.Citrus} />;
    }

    if (avatar) {
      return <Image src={avatar} borderRadius={12} size={32} />;
    }

    return <NoAvatar size={32} />;

  }, [avatar, hidden]);

  return (
    <View style={styles.container}>
      <ScaleTouchableView
        onPress={onPressUser}
        styles={[styles.userContainer]}
      >
        <BackButton />

        <View style={styles.avatar}>
          {renderAvatar()}
        </View>

        <View>
          <Text style={[typography.caption]}>
            {position}
          </Text>

          <Text style={[typography.smallText, styles.title]}>
            {`${name} / ${actionTime}`}
          </Text>
        </View>
      </ScaleTouchableView>

      {renderActions && (
        <ScaleTouchableView
          onPress={onPressActions}
          styles={[styles.actionsContainer]}
        >
          <DotsHorizontalIcon color={Colors.Gray} />
        </ScaleTouchableView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    height: normalize(44, 'height'),
    paddingHorizontal: normalize(12),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 16,
    marginRight: 8,
  },
  title: {
    color: Colors.Gray,
    opacity: 0.8,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
  },
});
