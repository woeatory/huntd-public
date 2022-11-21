import React, {
  FC, memo, ReactElement, useMemo,
} from 'react';
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Link } from '@/controllers/i18n/i18n.client';
import { Selectors } from '@/lib/selectors';

type Props = LinkProps;

export const ActiveNavLink: FC<Props> = memo<Props>((props) => {
  const { href, as } = props;
  const router = useRouter();

  const path = router.asPath.split('?')[0];

  const active = useMemo(
    () => path === href || path === as,
    [href, as, path],
  );

  const ChildElement = useMemo(
    () => {
      const elements = React.Children.toArray(props.children);

      if (elements.length > 1) {
        throw new Error('ActiveNavLink requires single child only');
      }

      const child = elements[0];

      if (['string', 'number', 'undefined'].includes(typeof child)) {
        throw new Error('AcitveNavLink expects child to be a React Element');
      }

      return child as ReactElement;
    },
    [props.children],
  );

  return (
    <Link {...props}>
      {React.cloneElement(ChildElement, {
        className: cn(ChildElement.props?.className, {
          [Selectors.Active]: active,
        }),
      })}
    </Link>
  );
});
