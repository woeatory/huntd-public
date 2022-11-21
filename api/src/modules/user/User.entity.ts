import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isAddress } from 'web3-utils';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/models/User';
import { getHostUrl } from '@/helpers/getHostUrl';
import { CONFIRM_EMAIL_PATH, RESET_PASSWORD_PATH } from '@/auth/auth.constants';
import { UserRoleEnum } from '@/modules/user/user.typedefs';

export class UserEntity {
  constructor(private user: User) {}

  generateAccessToken(): string {
    const { id, email } = this.user;

    return jwt.sign({ id, email }, process.env.AUTH_SECRET, {
      expiresIn: '30d',
    });
  }

  async generatePasswordHash(pwd?: string): Promise<string> {
    return bcrypt.hash(
      pwd || this.user.password,
      Number(process.env.SALT_ROUNDS),
    );
  }

  validateEthWalletAddress(address: string): boolean {
    return isAddress(address);
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.user.password) {
      return false;
    }

    return bcrypt.compare(password, this.user.password);
  }

  async getResetPasswordLink(): Promise<string> {
    const token = uuidv4();

    await this.user.update({
      resetPasswordToken: token,
    });

    return `${getHostUrl()}/${RESET_PASSWORD_PATH}/${token}`;
  }

  async getConfirmEmailLink(): Promise<string> {
    const token = uuidv4();

    await this.user.update({
      confirmEmailToken: token,
    });

    return `${getHostUrl()}/${CONFIRM_EMAIL_PATH}/${token}`;
  }

  static formatPhone(val: string | null = ''): string {
    return val
      ? val.replace(/[- )(]/g, '')
      : '';
  }

  static formatEmail(val: string): string {
    return val.toLowerCase();
  }

  isAdmin() {
    return this.user.userRole === UserRoleEnum.Admin;
  }
}
