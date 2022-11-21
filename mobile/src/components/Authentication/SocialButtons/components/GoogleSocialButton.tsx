import React, { FC } from 'react';
import { SocialButton } from '@/components/Authentication/SocialButtons/components/SocialButton';
import { GoogleIcon } from '@/ui/icons/general/GoogleIcon';
import { Colors } from '@/ui/theme/colors';
import { useGoogleSignIn } from '@/controllers/oauth/oauth.hooks/useGoogleSignIn';

export const GoogleSocialButton: FC = () => {
  const [signIn, busy] = useGoogleSignIn();

  return (
    <SocialButton onClick={signIn} disabled={busy}>
      <GoogleIcon color={Colors.Citrus} />
    </SocialButton>
  );
};
