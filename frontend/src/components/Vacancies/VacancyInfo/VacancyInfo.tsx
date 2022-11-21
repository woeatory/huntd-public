import React from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import typography from '@/ui/typography/typography.module.scss';
import { AppliedVacanciesStorage } from '@/controllers/vacancy/vacancy.typedefs';
import { ApplyButton } from '@/components/Vacancies/VacancyCard/ApplyButton/ApplyButton';
import styles from './VacancyInfo.module.scss';

interface VacancyInfoItem {
  title: string;
  content: string;
}

interface Props {
  items: VacancyInfoItem[]
  callback: () => Promise<any>;
  appliedVacancies: AppliedVacanciesStorage;
  vacancyId: number;
  sourceId?: number | null;
}
export const VacancyInfo = React.memo<Props>((props) => {
  const {
    items,
    callback,
    appliedVacancies,
    vacancyId,
    sourceId,
  } = props;

  return (
    <dl>
      {items.map((item) => (
        <div
          className={styles.item}
          key={item.title}
        >
          <dt className={cn(styles.itemTitle, 'mb-8')}>
            {item.title}
          </dt>

          <dd className={cn(
            typography.smallText,
            'c-gray mb-24',
            typography.paragraph,
            styles.markdown,
            { [styles.sourcedVacancy]: !!sourceId },
          )}
          >
            <ReactMarkdown
              components={{
                h1: 'h2',
              }}
              rehypePlugins={[rehypeRaw]}
            >
              {item.content}
            </ReactMarkdown>
          </dd>
        </div>
      ))}

      <ApplyButton
        className={styles.applyButton}
        appliedVacancies={appliedVacancies}
        vacancyId={vacancyId}
        handleVacancyApply={callback}
      />
    </dl>
  );
});
