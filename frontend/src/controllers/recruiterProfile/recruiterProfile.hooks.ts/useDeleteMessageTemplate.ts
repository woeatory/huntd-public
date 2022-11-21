import {
  PrimaryProfile,
  useDeleteMessageTemplateMutation,
  UserMessageTemplatesDocument,
} from '@/controllers/graphql/generated';

interface UseDeleteMessageTemplate {
  (): [(
    id: number,
    userId: number,
  ) => void];
}
export const UseDeleteMessageTemplate: UseDeleteMessageTemplate = () => {
  const [deleteMessageTemplate] = useDeleteMessageTemplateMutation({
    refetchQueries: [
      {
        query: UserMessageTemplatesDocument,
        variables: {
          messageType: PrimaryProfile.Recruiter,
        },
      },
    ],
  });

  const deleteTemplate = async (id: number, userId: number) => {
    await deleteMessageTemplate(
      {
        variables: {
          id,
          userId,
        },
      },
    );
  };

  return [deleteTemplate];
};
