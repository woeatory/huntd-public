import React, { useMemo, useState } from 'react';
import { UseRecruiterMessageTemplates } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useRecruiterMessageTemplates';
import { TemplateList } from '@/components/Profile/HiringManagementModule/MessageTemplates/TemplateList/TemplateList';
import { EmptyTemplates } from '@/components/Profile/HiringManagementModule/MessageTemplates/EmptyTemplates/EmptyTemplates';

export const MessageTemplates = () => {
  const [isNewTemplate, setIsNewTemplate] = useState(false);
  const [
    selectedTemplateId,
    setSelectedTemplateId,
  ] = useState<number | null>(null);

  const data = UseRecruiterMessageTemplates();
  const userMessageTemplates = useMemo(() => data ?? [], [data]);

  return (
    <div className="grid-container mt-40">
      <div className="grid-x grid-margin-x">
        {userMessageTemplates.length > 0 ? (
          <TemplateList
            templates={userMessageTemplates}
            isNewTemplate={isNewTemplate}
            setIsNewTemplate={setIsNewTemplate}
            selectedTemplateId={selectedTemplateId}
            setSelectedTemplateId={setSelectedTemplateId}
          />
        ) : (
          <EmptyTemplates
            isNewTemplate={isNewTemplate}
            setIsNewTemplate={setIsNewTemplate}
          />
        )}
      </div>
    </div>
  );
};
