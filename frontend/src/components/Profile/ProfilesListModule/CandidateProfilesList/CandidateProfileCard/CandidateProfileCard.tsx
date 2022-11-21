import React, {
  useCallback, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { CandidateProfile } from '@/controllers/graphql/generated';
import { useCandidateProfileMetaItems } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileMetaItems';
import { ProfileMeta } from '@/components/Profile/ProfilePreview/ProfileMeta';
import { ProfileInfo } from '@/components/Profile/ProfilePreview/ProfileInfo';
import { Routes } from '@/controllers/router/router.constants';
import { Tooltip } from '@/components/Base/Tooltip';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { useCandidateProfileWorkPlacesInfo } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileWorkPlacesInfo';
import { Selectors } from '@/lib/selectors';
import { IconChevronUp } from '@/ui/icons/general/IconChevronUp';
import { IconChevronDown } from '@/ui/icons/general/IconChevronDown';
import { useCandidateProfileInfoItems } from '@/controllers/candidateProfile/candidateProfile.hooks/useCandidateProfileInfoItems';
import styles from './CandidateProfileCard.module.scss';

interface Props {
  candidate: CandidateProfile;
  setCandidate: (profile: CandidateProfile) => void;
  openModal: () => void;
  isConnected: boolean;
  slug?: string;
  tabIndex: number;
}

export const CandidateProfileCard = React.memo<Props>((props) => {
  const {
    candidate,
    setCandidate,
    openModal,
    isConnected,
    slug,
    tabIndex,
  } = props;

  const candidateHasNft = !!(candidate?.user?.nfts);
  const nft = candidate?.user?.nfts?.length ? candidate.user?.nfts[0] : null;
  const profileMetaItems = useCandidateProfileMetaItems(candidate);
  const profileInfoItems = useCandidateProfileInfoItems(candidate);
  const profileWorkPlaces = useCandidateProfileWorkPlacesInfo(candidate);
  const { t } = useTranslation([Namespaces.Profile, Namespaces.Chat]);
  const [
    IsSendMessageButtonClicked,
    setIsSendMessageButtonClicked,
  ] = useState(false);

  const [isOpened, setIsOpened] = useState(false);

  const experienceButtonTitle = isOpened
    ? t(`${Namespaces.Profile}:hide_experience`)
    : t(`${Namespaces.Profile}:show_experience`);

  const filledProfileInfoItems = useMemo(
    () => {
      const items = profileInfoItems.filter(
        (item) => !item.isHidden
          && item.title !== t(`${Namespaces.Form}:work_expectations_label`),
      );

      [items[0], items[1]] = [items[1], items[0]];

      return items;
    },
    [profileInfoItems, t],
  );

  const handleClick = useCallback(async (event) => {
    event.stopPropagation();

    if (isConnected) {
      window.open(`${Routes.Chats}/${slug}`);
    } else {
      openModal();
    }

    setCandidate(candidate);
    setIsSendMessageButtonClicked(!IsSendMessageButtonClicked);
  }, [
    isConnected,
    setCandidate,
    candidate,
    IsSendMessageButtonClicked,
    slug,
    openModal,
  ]);

  const handleOpen = useCallback((event) => {
    event.stopPropagation();
    setIsOpened((prev) => !prev);
  }, []);

  const handleRedirect = useCallback(() => {
    window.open(`${Routes.Candidate}/${candidate.slug}`);
  }, [candidate.slug]);

  const connectionsCount = useMemo(() => {
    const { connectionsCount: count } = candidate;

    if (count) {
      if (count >= 5) {
        const roundedCount = count >= 50
          ? 50
          : Math.floor(count / 5) * 5;

        return `${roundedCount}+`;
      }
    }

    return null;
  }, [candidate]);

  const buttonText = isConnected
    ? t(`${Namespaces.Chat}:go_to_chat`)
    : t(`${Namespaces.Chat}:start_chat`);

  return (
    <div
      role="button"
      tabIndex={tabIndex + 1}
      className={styles.profileCard}
      onClick={handleRedirect}
      onKeyPress={handleRedirect}
    >
      <div
        className={cn(styles.profileHead, {
          [styles['profileHead--withNft']]: candidateHasNft,
        })}
      >
        {candidateHasNft && (
          <NftAvatar
            resolution={240}
            className={styles.nftBorder}
            hexagonClass={styles.nft}
            url={nft?.entity.url}
          />
        )}
        <div className={styles.profileTitleWrapper}>
          <div className={styles.positionWrapper}>
            <h2 className={styles.profileTitle}>
              {candidate.position}
            </h2>
            {connectionsCount && (
            <div className={cn(styles.popularityBlockWrapper, 'ml-8')}>
              <Tooltip
                className={styles.toolTip}
                text={t(`${Namespaces.Common}:popular_candidates_tooltip`, { connectionsCount })}
                position={TooltipPositions.Top}
                renderIcon={() => (
                  <div className={styles.popularityBlock}>
                    {connectionsCount}
                  </div>
                )}
              />
            </div>
            )}
          </div>
        </div>
        <div className={styles.profileMetaWrapper}>
          <ProfileMeta items={profileMetaItems} />
        </div>
      </div>
      <div className={styles.profileInfoWrapper}>
        <ProfileInfo
          items={filledProfileInfoItems}
          workPlaces={profileWorkPlaces}
          isOpened={isOpened}
          areContactsHidden
        />
      </div>
      <Button
        className={styles.sendMessageButton}
        onClick={handleClick}
        mode={isConnected ? Button.mode.Secondary : Button.mode.Primary}
        size={Button.size.SmallWide}
        text={buttonText}
      />
      <button
        className={cn(styles.moreButton, {
          [Selectors.Active]: isOpened,
        })}
        type="button"
        aria-roledescription="open additional info button"
        onClick={handleOpen}
      >
        {experienceButtonTitle}
        {isOpened ? <IconChevronUp /> : <IconChevronDown />}
      </button>
    </div>
  );
});
