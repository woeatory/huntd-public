import { useMemo } from 'react';
import {
  PrimaryProfile,
  UserTemplateMessage,
  useUserMessageTemplatesQuery,
} from '@/controllers/graphql/generated';

interface UseRecruiterMessageTemplates {
  (): UserTemplateMessage[]
}
export const UseRecruiterMessageTemplates:
  UseRecruiterMessageTemplates = () => {
    const userMessageTemplatesQueryResult = useUserMessageTemplatesQuery({
      variables: {
        messageType: PrimaryProfile.Recruiter,
      },
    });

    const userMessageTemplates = useMemo(
      () => userMessageTemplatesQueryResult
        .data?.authUser?.messageTemplates ?? [],
      [userMessageTemplatesQueryResult],
    );

    return userMessageTemplates;
  };
