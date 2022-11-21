import { Transaction } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { User } from '@/models/User';
import { ProfileConnectionInitiatorEnum, ProfileConnectionStatusEnum } from '@/modules/profileConnection/profileConnection.typedefs';
import { ProfileConnectionUserMeta } from '@/models/ProfileConnectionUserMeta';
import { getHostUrl } from '@/helpers/getHostUrl';

export class ProfileConnectionEntity {
  constructor(
    private profileConnection: ProfileConnection,
    private user: User,
  ) {}

  get isUserCandidate() {
    return this.user.id === this.profileConnection.candidateUserId;
  }

  get isUserRecruiter() {
    return this.user.id === this.profileConnection.recruiterUserId;
  }

  get hasAccessToCandidateUser() {
    if (this.isUserCandidate) {
      return true;
    }

    switch (this.profileConnection.initiator) {
      case ProfileConnectionInitiatorEnum.Candidate: {
        return true;
      }

      case ProfileConnectionInitiatorEnum.Recruiter:
      default: {
        const { status } = this.profileConnection;

        return status === ProfileConnectionStatusEnum.Approved;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get hasAccessToRecruiterUser() {
    //  placeholder for possible recruiter user validation
    return true;
  }

  get shouldHideCandidateName() {
    if (this.isUserRecruiter) {
      return false;
    }

    switch (this.profileConnection.initiator) {
      case ProfileConnectionInitiatorEnum.Candidate: {
        return true;
      }

      case ProfileConnectionInitiatorEnum.Recruiter:
      default: {
        const { status } = this.profileConnection;

        return !(status === ProfileConnectionStatusEnum.Approved);
      }
    }
  }

  async updateLastActionTime(date?: Date) {
    const [profileConnectionUserMeta] = await ProfileConnectionUserMeta
      .findOrCreate({
        where: {
          userId: this.user.id,
          profileConnectionId: this.profileConnection.id,
        },
      });

    return profileConnectionUserMeta.update({
      lastActionTime: date ? date.getTime() : Date.now(),
    });
  }

  resolveChatLink(slug: string) {
    return `${getHostUrl()}/chats/${this.profileConnection.id}-${slug}`;
  }

  async initMeta(transaction: Transaction) {
    await Promise.all([
      this.profileConnection.recruiterUserId,
      this.profileConnection.candidateUserId,
    ].map((userId) => ProfileConnectionUserMeta.findOrCreate({
      where: {
        userId,
        profileConnectionId: this.profileConnection.id,
      },
      transaction,
    })));
  }
}
