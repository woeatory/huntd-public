import React, { FC } from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './ConnectionsHintModule.module.scss';

interface Props {
  count: number,
}

export const ConnectionsHintModule: FC<Props> = ({ count }) => {
  const { t } = useTranslation([Namespaces.Candidates]);

  const text = count < 10
    ? t(`${Namespaces.Candidates}:ten_connections_hint`, { count })
    : t(`${Namespaces.Candidates}:twenty_connections_hint`);

  return (
    <div className='ml-8'>
      <ReactMarkdown
        className={cn(typography.smallText, styles.text)}
        rehypePlugins={[rehypeRaw]}
      >
        {text}
      </ReactMarkdown>
    </div>

  );
};
