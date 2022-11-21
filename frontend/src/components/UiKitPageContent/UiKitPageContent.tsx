import React from 'react';
import typography from '@/ui/typography/typography.module.scss';
import { UiKitButtons } from '@/components/UiKitPageContent/UiKitButtons';
import { UiKitIcons } from '@/components/UiKitPageContent/UiKitIcons';
import { UiKitSelect } from '@/components/UiKitPageContent/UiKitSelect';
import { UiKitCheckbox } from '@/components/UiKitPageContent/UiKitCheckbox';
import { useUploadCvFileMutation } from '@/controllers/graphql/generated';

export const UiKitPageContent = () => {
  const [uploadCvFileMutation] = useUploadCvFileMutation();

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell large-full mt-64 mb-24">
          <h1 className={typography.h1}>UI Kit</h1>
        </div>

        <UiKitButtons />

        <UiKitIcons />

        <UiKitSelect />

        <UiKitCheckbox />

        <input
          type="file"
          onChange={async (e) => {
            if (e.target.validity.valid) {
              await uploadCvFileMutation({
                variables: {
                  file: e.target.files?.[0],
                  size: e.target.size,
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
};
