import React, {
  Dispatch, SetStateAction,
  DetailedHTMLProps, HTMLAttributes,
} from 'react';
import cn from 'classnames';
import { SelectOption } from '@/components/FormElements/Select/Select.typedefs';
import { SelectUi } from '@/components/FormElements/Select';
import { UserTemplateMessage } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { analytics } from '@/controllers/analytics/analytics.client';
import TemplatesSelectStyles from './TemplatesSelect.module.scss';

interface GetTemplateOptions {
  (templates: UserTemplateMessage[]): SelectOption[]
}

const getTemplatesOptions: GetTemplateOptions = (
  templates,
) => templates.map((template) => ({
  label: template.messageTitle,
  value: `${template.messageBody}`,
}));

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  userMessageTemplates: UserTemplateMessage[];
  setTemplate: Dispatch<SetStateAction<SelectOption>>;
}

export const TemplatesSelect = (props: Props) => {
  const { userMessageTemplates, setTemplate, className } = props;

  const { t } = useTranslation([Namespaces.Common]);

  return (
    <SelectUi
      className={cn(TemplatesSelectStyles.messageSelect, className)}
      placeholder={t(`${Namespaces.Common}:templates_select_placeholder`)}
      isSearchable={false}
      options={getTemplatesOptions(userMessageTemplates)}
      onChange={(value) => {
        setTemplate(value as SelectOption);

        analytics.sendEvent(
          analytics.events.templates.TemplateUsed,
          {},
        );
      }}
    />
  );
};
