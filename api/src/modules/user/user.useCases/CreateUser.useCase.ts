import { ValidationRules } from '@mate-academy/core';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { AuthUseCase } from '@/core';
import { User } from '@/models/User';

export type CreateUserUseCaseOptions = Pick<User, 'firstName' | 'lastName'>;
export type CreateUserUseCaseResult = User | null;

type Options = CreateUserUseCaseOptions;
type Result = CreateUserUseCaseResult;

export class CreateUserUseCase extends AuthUseCase<Options, Result> {
  protected get validation(): ValidationRules<Options> | null {
    return {
      firstName: ['required', 'string'],
      lastName: ['required', 'string'],
    };
  }

  protected async run({ firstName, lastName }: Options): Promise<Result> {
    const username = uuidv4().slice(0, 7);

    const user = await User.create({
      firstName,
      lastName,
      username,
      inactive: true,
      email: faker.internet.email(),
    });

    return user;
  }
}
