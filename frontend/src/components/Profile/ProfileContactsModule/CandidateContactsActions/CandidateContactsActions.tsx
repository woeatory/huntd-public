import React, { FC } from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';

interface Props {
  loading: boolean;
  openModal: () => void;
  buttonAction: string;
}

export const CandidateContactsActions: FC<Props> = (props) => {
  const { loading, openModal, buttonAction } = props;
  const { t } = useTranslation([Namespaces.Form]);

  return (
    <>
      <div className="cell large-3 large-offset-3">
        <Button
          disabled={loading}
          mode={Button.mode.Primary}
          type="submit"
          className="wide mb-16"
          text={t(`${Namespaces.Profile}:${buttonAction}`)}
        />
      </div>
      <div className="cell large-3">
        <Button
          disabled={loading}
          mode={Button.mode.Secondary}
          text={t(`${Namespaces.Profile}:profile_preview`)}
          className="wide"
          onClick={openModal}
        />
      </div>
    </>
  );
};
