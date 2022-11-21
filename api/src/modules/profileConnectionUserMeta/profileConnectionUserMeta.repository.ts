import { Repository } from '@/core/Repository';

interface UpdateArchivedStatusOptions {
  userId: number,
  profileConnectionId: number,
  archivedAt: number | null,
}

export class ProfileConnectionUsersMetaRepository extends Repository {
  async updateProfileConnectionArchivedStatus(
    { userId, profileConnectionId, archivedAt }: UpdateArchivedStatusOptions,
  ) {
    await this.models.ProfileConnectionUserMeta.update(
      {
        archivedAt,
      },
      {
        where: {
          userId,
          profileConnectionId,
        },
      },
    );
  }
}
