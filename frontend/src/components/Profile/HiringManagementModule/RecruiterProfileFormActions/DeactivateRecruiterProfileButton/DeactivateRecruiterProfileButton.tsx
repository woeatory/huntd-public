import React from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useDeactivateRecruiterProfile } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useDeactivateRecruiterProfile';

export const DeactivateRecruiterProfileButton = () => {
  const { t } = useTranslation([Namespaces.Profile]);
  const [mutate, { loading }] = useDeactivateRecruiterProfile();

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={() => mutate()}
      mode={Button.mode.Secondary}
      size={Button.size.Small}
      text={t(`${Namespaces.Profile}:deactivate_profile`)}
    />
  );
};
