import React, { Dispatch, FC, SetStateAction } from 'react';
import { Features } from '@/controllers/features/features.constants';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Switcher, Switches } from '@/components/Switcher';
import {
  UsualAvatarUpload,
} from '@/components/Profile/ProfileContactsModule/UserAvatar/UsualAvatarUpload/UsualAvatarUpload';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { NftAvatarUpload } from '@/components/Profile/ProfileContactsModule/UserAvatar/NftAvatarUpload/NftAvatarUpload';
import { Nft } from '@/controllers/graphql/generated';

interface Props {
  isCandidate: boolean;
  isNftAvatar: boolean;
  setIsNftAvatar: Dispatch<SetStateAction<boolean>>;
  setEdited: Dispatch<SetStateAction<boolean>>;
  setSelectedNft: Dispatch<SetStateAction<Nft | null>>;
  selectedNft: Nft | null;
  isNftClaimed: boolean;
}

export const UserAvatar: FC<Props> = (props) => {
  const {
    isCandidate,
    isNftAvatar,
    setIsNftAvatar,
    setSelectedNft,
    selectedNft,
    isNftClaimed,
    setEdited,
  } = props;

  const { t } = useTranslation([Namespaces.Profile]);

  const nftAvatarFeature = useFeature(Features.NftAvatars);

  return (nftAvatarFeature.isEnabled() && isCandidate)
    ? (
      <div>
        <Switcher
          className="mb-36"
          primaryClickHandler={() => setIsNftAvatar(true)}
          secondaryClickHandler={() => setIsNftAvatar(false)}
          buttonsTexts={[
            t(`${Namespaces.Profile}:nft_avatar`),
            t(`${Namespaces.Profile}:usual_avatar`),
          ]}
          initiallyActive={isNftAvatar
            ? Switches.Primary
            : Switches.Secondary}
        />
        {isNftAvatar
          ? (
            <NftAvatarUpload
              setSelectedNft={setSelectedNft}
              selectedNft={selectedNft}
              isNftClaimed={isNftClaimed}
              setEdited={setEdited}
            />
          )
          : <UsualAvatarUpload />}
      </div>
    )
    : (
      <UsualAvatarUpload />
    );
};
