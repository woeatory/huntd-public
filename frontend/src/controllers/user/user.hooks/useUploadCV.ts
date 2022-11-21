import {
  UserCvFragmentDoc,
  UserCvFragment,
  useUploadCvFileMutation,
  User,
} from '@/controllers/graphql/generated';

export const useUploadCV = (user: User | null) => useUploadCvFileMutation({
  update(cache, { data }) {
    if (!data?.uploadCvFile) {
      return;
    }

    if (!user) {
      return;
    }

    cache.modify({
      id: cache.identify(user),
      fields: {
        cv(existingCV: UserCvFragment) {
          const newCV = cache.writeFragment({
            data: data.uploadCvFile,
            fragment: UserCvFragmentDoc,
          });

          if (!newCV) {
            return existingCV;
          }

          return newCV;
        },
      },
    });
  },
});
