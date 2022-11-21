import React, { FC } from 'react';
import { Colors } from '@/ui/theme/colors';
import { SocialButton } from '@/components/Authentication/SocialButtons/components/SocialButton';
import { AppleIcon } from '@/ui/icons/general/AppleIcon';
import { useAppleSignIn } from '@/controllers/oauth/oauth.hooks/useAppleSignIn';

export const AppleSocialButton: FC = () => {
  const [signIn, busy] = useAppleSignIn();

  return (
    <SocialButton onClick={signIn} disabled={busy}>
      <AppleIcon color={Colors.Citrus} />
    </SocialButton>
  );
};
