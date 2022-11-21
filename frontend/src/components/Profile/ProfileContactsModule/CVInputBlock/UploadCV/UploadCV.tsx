import React, { FC, ChangeEvent } from 'react';
import cn from 'classnames';
import FormInputs from '@/components/FormElements/FormInputs/FormInputs.module.scss';
import { IconLink } from '@/ui/icons/general/IconLink';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import styles from './UploadCV.module.scss';

interface Props {
  uploadCV: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const UploadCV: FC<Props> = ({ uploadCV }) => {
  const { t } = useTranslation([Namespaces.Form]);

  return (
    <div>
      <input
        id="cv"
        name="cv"
        type="file"
        onChange={uploadCV}
        hidden
      />
      <label
        className={cn(
          FormInputs.input,
          styles.uploadCv,
        )}
        htmlFor="cv"
      >
        <IconLink />
        {t(`${Namespaces.Form}:attach_cv_file`)}
      </label>
    </div>
  );
};
