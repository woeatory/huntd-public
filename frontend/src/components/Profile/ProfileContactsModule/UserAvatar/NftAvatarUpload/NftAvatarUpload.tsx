import React, {
  Dispatch, FC, SetStateAction, useCallback,
} from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { IconHexagonButton } from '@/ui/icons/general/IconHexagonButton';
import typography from '@/ui/typography/typography.module.scss';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { NftAvatarPicker } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatarPicker';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import {
  FlashMessageType, Nft,
} from '@/controllers/graphql/generated';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import styles from './NftAvatarUpload.module.scss';

interface Props {
  setSelectedNft: Dispatch<SetStateAction<Nft | null>>;
  setEdited: Dispatch<SetStateAction<boolean>>;
  selectedNft: Nft | null;
  isNftClaimed: boolean;
}

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

export const NftAvatarUpload: FC<Props> = (props) => {
  const {
    selectedNft,
    setSelectedNft,
    isNftClaimed,
    setEdited,
  } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  const flashMessage = useFlashMessage();

  const [user] = useAuthUser();

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  const nftAvatar = user && user.nfts ? user.nfts[0] : null;

  const selectNft = useCallback((nft) => {
    setSelectedNft(nft);

    setEdited(true);

    closeModal();
  }, [setSelectedNft, closeModal, setEdited]);

  const openAvatarPicker = useCallback(async () => {
    if (nftAvatar || isNftClaimed) {
      await flashMessage.postMessage({
        variables: {
          type: FlashMessageType.Error,
          heading: t(`${Namespaces.Profile}:already_selected_nft_message_title`),
          text: t(`${Namespaces.Profile}:already_selected_nft_message_description`),
        },
      });

      return;
    }

    openModal();
  }, [nftAvatar, isNftClaimed, openModal, flashMessage, t]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={cn(styles.avatarBlock, 'mb-32')}
        onClick={openAvatarPicker}
        onKeyPress={openAvatarPicker}
      >
        <NftAvatar
          resolution={240}
          url={selectedNft
            ? selectedNft.entity.url
            : nftAvatar?.entity.url}
        />
        <div className={styles.uploadButtonWrapper}>
          <div className={cn(styles.uploadButton, 'mb-8')}>
            <IconHexagonButton />
            <p className={styles.label}>
              {t(`${Namespaces.Profile}:choose_nft_avatar`)}
            </p>
          </div>
          <p className={cn(typography.smallText, 'c-gray')}>
            {t(`${Namespaces.Profile}:free_nft_avatar`)}
          </p>
        </div>
      </div>

      <Modal
        className={styles.nftPickerModal}
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <NftAvatarPicker
          selectedNft={selectedNft}
          selectNft={selectNft}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};
