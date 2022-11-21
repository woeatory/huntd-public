import React from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, EffectFade } from 'swiper/core';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { reviews, swiperOptions } from '@/components/Homepage/Reviews/constants';
import { IconChevronRight } from '@/ui/icons/general/IconChevronRight';
import { IconChevronLeft } from '@/ui/icons/general/IconChevronLeft';
import 'swiper/swiper-bundle.css';
import { IconQuote } from '@/ui/icons/general/IconQuote';
import { Image } from '@/components/Base/Image/Image';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import styles from './Reviews.module.scss';

export interface Review {
  reviewer: string;
  title: string;
  description: string;
}

SwiperCore.use([Navigation, EffectFade]);

export const Reviews = () => {
  const { t } = useTranslation(Namespaces.Home);

  return (
    <div className="c-semidark-chocolate">
      <div className="grid-x grid-margin-x">
        <h2 className={cn(
          'cell large-6 large-offset-3 mb-48',
          styles.title,
        )}
        >
          <ReactMarkdown
            disallowedElements={['p']}
            unwrapDisallowed
            rehypePlugins={[rehypeRaw]}
          >
            {t(`${Namespaces.Home}:web3_reviews_title`)}
          </ReactMarkdown>
        </h2>
        <div className={cn('cell grid-x grid-margin-x', styles.wrapper)}>
          <Swiper
            {...swiperOptions}
            className={styles.sliderWrapper}
          >
            {reviews.map((review) => (
              <SwiperSlide
                key={review.id}
                className={styles.slide}
              >
                <div
                  className={styles.reviewCard}
                  key={review.id}
                >
                  <div className={styles.icon}>
                    <IconQuote />
                  </div>

                  <div className={cn(styles.reviewWrapper)}>
                    <p className={cn(styles.reviewBody, typography.alertText)}>
                      {t(review.body)}
                    </p>

                    <div className={styles.reviewerWrapper}>
                      <div className={cn(styles.photo)}>
                        <Image
                          src={process.env.NODE_ENV === 'production' ? review.url : review.devUrl}
                          layout="fill"
                          objectFit="cover"
                          alt={t(review.name) + t(review.position)}
                        />
                      </div>

                      <div className={styles.reviewerInfo}>

                        <div className={typography.underhead}>
                          {t(review.name)}
                        </div>

                        <div className={styles.reviewerPosition}>
                          {t(review.position)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className={styles.buttonsWrapper}>
              <Button
                type='button'
                mode={Button.mode.IconOnly}
                LeftIcon={IconChevronLeft}
                className={cn(styles.button, 'prev')}
              />

              <Button
                type='button'
                mode={Button.mode.IconOnly}
                LeftIcon={IconChevronRight}
                className={cn(styles.button, 'next')}
              />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
