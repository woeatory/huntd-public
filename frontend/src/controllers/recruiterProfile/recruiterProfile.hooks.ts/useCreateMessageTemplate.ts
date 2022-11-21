import {
  PrimaryProfile,
  useCreateMessageTemplateMutation,
  UserMessageTemplatesDocument,
} from '@/controllers/graphql/generated';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

interface UseCreateMessageTemplate {
  (): [(
    messageBody: string,
    messageTitle: string,
  ) => void];
}
export const UseCreateMessageTemplate: UseCreateMessageTemplate = () => {
  const [user] = useAuthUser();

  const [createMessageTemplate] = useCreateMessageTemplateMutation({
    refetchQueries: [
      {
        query: UserMessageTemplatesDocument,
        variables: {
          messageType: PrimaryProfile.Recruiter,
        },
      },
    ],
  });

  const createTemplate = async (
    messageTitle: string,
    messageBody: string,
  ) => {
    if (user && messageBody && messageTitle) {
      await createMessageTemplate(
        {
          variables: {
            userId: user.id,
            messageType: PrimaryProfile.Recruiter,
            messageTitle,
            messageBody,
          },
        },
      );
    }
  };

  return [createTemplate];
};
