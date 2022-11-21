import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Nft, useAllNftsQuery } from '@/controllers/graphql/generated';
import { NftAvatar } from '@/components/Profile/ProfileContactsModule/NftAvatarPicker/NftAvatar';
import typography from '@/ui/typography/typography.module.scss';
import { IconClose } from '@/ui/icons/general/IconClose';
import { WithLoader } from '@/ui/Loader/WithLoader';
import styles from './NftAvatarPicker.module.scss';

interface Props {
  closeModal: () => void;
  selectNft: (arg0: Nft) => void;
  selectedNft: Nft | null;
}

export const NftAvatarPicker: FC<Props> = (props) => {
  const { closeModal, selectNft, selectedNft } = props;
  const { t } = useTranslation([Namespaces.Profile]);

  const { data, loading } = useAllNftsQuery();

  const handleSelect = useCallback(async (nft) => {
    if (nft.userId) {
      return;
    }

    selectNft(nft);
  }, [selectNft]);

  return (
    <div className={styles.nftModal}>
      <div className={styles.nftCart}>
        <p className={typography.accentTitle}>
          {t(`${Namespaces.Profile}:choose_nft_from_list`)}
        </p>
        <button
          type="button"
          className={styles.closeModalButton}
          onClick={closeModal}
        >
          <IconClose />
        </button>
        {selectedNft && (
        <div className="mt-24">
          <NftAvatar
            url={selectedNft.entity.url}
            resolution={240}
          />
        </div>
        )}
      </div>

      <WithLoader loading={loading}>
        <section className={styles.nftGallery}>
          {data?.allNfts?.map((nft, index) => (
            <div
              role="button"
              key={nft.id}
              tabIndex={index + 1}
              onClick={() => handleSelect(nft)}
              onKeyPress={() => handleSelect(nft)}
              className={cn(styles.nftItem, {
                [styles.takenNft]: !!nft.userId,
              })}
            >
              <NftAvatar
                resolution={240}
                url={nft.entity.url}
              />
            </div>
          ))}
        </section>
      </WithLoader>
    </div>
  );
};
