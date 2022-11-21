import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Image } from '@/components/Base/Image/Image';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { NFTS, Groups } from './constants';
import styles from './ChooseNFT.module.scss';

const NFT_ALT = 'Non-fungible token example';

export const ChooseNFT: FC = () => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <div className={cn('grid-x grid-margin-x c-extradark-chocolate', styles.wrapper)}>
      <h2 className={cn(typography.h2, styles.title, 'cell large-8 large-offset-2')}>
        {t(`${Namespaces.Home}:choose_nft_title`)}
      </h2>
      <div className={cn(styles.nftsWrapper, 'cell')}>
        <div className={styles.nftsRow}>
          <div className={cn(styles.nftsGroup, styles['nftsGroup--top-left'])}>
            {NFTS[Groups.topLeft].map((nft) => (
              <span className={styles.nft} key={nft.id}>
                <Image
                  src={process.env.NODE_ENV === 'production'
                    ? nft.url
                    : nft.devUrl}
                  alt={NFT_ALT}
                  layout='fill'
                  className={styles.nft__image}
                />
              </span>
            ))}
          </div>
          <div className={styles.nftsGroup}>
            {NFTS[Groups.topRight].map((nft) => (
              <span className={styles.nft} key={nft.id}>
                <Image
                  src={process.env.NODE_ENV === 'production'
                    ? nft.url
                    : nft.devUrl}
                  alt={NFT_ALT}
                  layout='fill'
                  className={styles.nft__image}
                />
              </span>
            ))}
          </div>
        </div>
        <div className={cn(styles.nftsRow)}>
          <div className={styles.nftsGroup}>
            {NFTS[Groups.middleLeft].map((nft) => (
              <span className={styles.nft} key={nft.id}>
                <Image
                  src={process.env.NODE_ENV === 'production'
                    ? nft.url
                    : nft.devUrl}
                  alt={NFT_ALT}
                  layout='fill'
                  className={styles.nft__image}
                />
              </span>
            ))}
          </div>
          <div className={cn(styles.nftsGroup, styles['nftsGroup--middle-right'])}>
            {NFTS[Groups.middleRight].map((nft) => (
              <span className={styles.nft} key={nft.id}>
                <Image
                  src={process.env.NODE_ENV === 'production'
                    ? nft.url
                    : nft.devUrl}
                  alt={NFT_ALT}
                  layout='fill'
                  className={styles.nft__image}
                />
              </span>
            ))}
          </div>
        </div>
        <div className={styles.nftsRow}>
          <div className={styles.nftsGroup}>
            {NFTS[Groups.bottomLeft].map((nft) => (
              <span className={styles.nft} key={nft.id}>
                <Image
                  src={process.env.NODE_ENV === 'production'
                    ? nft.url
                    : nft.devUrl}
                  alt={NFT_ALT}
                  layout='fill'
                  className={styles.nft__image}
                />
              </span>
            ))}
          </div>
          <div className={styles.nftsGroup}>
            {NFTS[Groups.bottomRight].map((nft) => (
              <span className={styles.nft} key={nft.id}>
                <Image
                  src={process.env.NODE_ENV === 'production'
                    ? nft.url
                    : nft.devUrl}
                  alt={NFT_ALT}
                  layout='fill'
                  className={styles.nft__image}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};
