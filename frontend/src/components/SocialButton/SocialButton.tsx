import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps, Dispatch, FC, SetStateAction, useCallback,
} from 'react';
import cn from 'classnames';
import { OAuthProviders } from '@/controllers/graphql/generated';
import { useOpenOAuthPopup } from '@/controllers/oauth/oauth.hooks/useOpenOAuthPopup';
import { AuthPopupMessage } from '@/controllers/oauth/oauth.typedefs';
import styles from './SocialButton.module.scss';

interface Props extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
> {
  provider: OAuthProviders;
  clickHandler: (profile: AuthPopupMessage) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const SocialButton: FC<Props> = React.memo<Props>((props) => {
  const {
    provider, clickHandler, children, className, loading, setLoading, ...rest
  } = props;
  const openOAuthPopup = useOpenOAuthPopup(provider);

  const socialButtonHandler = useCallback(async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      const profile = await openOAuthPopup();

      clickHandler(profile);
    } finally {
      setLoading(false);
    }
  }, [clickHandler, openOAuthPopup, setLoading]);

  return (
    <button
      type="button"
      onClick={socialButtonHandler}
      className={cn(className, styles.buttonSocial)}
      disabled={loading}
      aria-disabled={loading}
      {...rest}
    >
      {children}
    </button>
  );
});
