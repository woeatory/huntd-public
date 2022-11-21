import React from 'react';
import { useRouter } from 'next/router';
import { Routes } from '@/controllers/router/router.constants';
import { FooterLinks } from './LinkBlocks';
import { Web3FooterBlock } from './Web3Block';

export const SEOSection = () => {
  const { route } = useRouter();
  const shouldWeb3BlockBeVisible = !route.includes(Routes.Web3Companies);

  return (
    <section className="mt-60 mb-80">
      {shouldWeb3BlockBeVisible && (
        <Web3FooterBlock />
      )}
      <FooterLinks />
    </section>
  );
};
