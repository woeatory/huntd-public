import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Button } from '@/ui/buttons/Button';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import {
  useCreateUserMutation,
  useCreateRecruiterProfileMutation,
  CreateUserMutationVariables,
  CreateRecruiterProfileMutationVariables,
} from '@/controllers/graphql/generated';
import styles
  from '@/components/Profile/ProfilesListModule/CandidateProfilesList/CandidateProfileCard/ConnectCandidateProfile/ConnectCandidateProfile.module.scss';
import typography from '@/ui/typography/typography.module.scss';
import { ProfileRoutes } from '@/controllers/router/router.constants';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';

type FormData = CreateUserMutationVariables
  & CreateRecruiterProfileMutationVariables;

interface Options {
  closeModal: () => void;
}

export const UserGeneratorForm: FC<Options> = ({ closeModal }) => {
  const router = useRouter();
  const flashMessage = useFlashMessage();
  const { t } = useTranslation([
    Namespaces.Form,
    Namespaces.Profile,
  ]);

  const [createUser] = useCreateUserMutation();
  const [createRecruiterProfile] = useCreateRecruiterProfileMutation();

  const formMethods = useForm<FormData>({
    mode: 'onBlur',
  });

  const {
    handleSubmit, control,
  } = formMethods;

  const submitForm = handleSubmit(async (data) => {
    const {
      firstName, lastName, position, companyName,
    } = data;

    try {
      const createdUser = await createUser({
        variables: {
          firstName,
          lastName,
        },
      });

      const user = createdUser.data?.createUser;

      if (user) {
        await createRecruiterProfile({
          variables: {
            userId: user.id,
            position,
            companyName,
          },
        });

        await router.push(`${ProfileRoutes.PerfectCandidate}?username=${user.username}`);

        closeModal();
      }
    } catch (error) {
      await flashMessage.postMessage({
        variables: {
          type: flashMessage.messageTypes.Error,
          heading: error.message,
          text: error.message,
        },
      });
    }
  });

  return (
    <form onSubmit={submitForm}>

      <div className={styles.titleWrapper}>
        <h3 className={cn(typography.accentTitle, 'mb-24')}>
          {t(`${Namespaces.Profile}:pre_create_user_recruiter`)}
        </h3>
      </div>
      <div className="grid-x grid-margin-x">

        <div className="cell large-6">
          <FormField
            label={{
              for: 'firstName',
              text: t(`${Namespaces.Form}:first_name_label`),
            }}
            disabled={false}
            className="mb-24"
            renderInput={(inputProps) => (
              <InputText
                {...inputProps}
                name="firstName"
                control={control}
                placeholder={t(`${Namespaces.Form}:first_name_label`)}
                validation={{
                  required: {
                    value: true,
                    message: 'first_name_is_required',
                  },
                }}
              />
            )}
          />
        </div>

        <div className="cell large-6">
          <FormField
            label={{
              for: 'lastName',
              text: t(`${Namespaces.Form}:last_name_label`),
            }}
            disabled={false}
            className="mb-24"
            renderInput={(inputProps) => (
              <InputText
                {...inputProps}
                name="lastName"
                control={control}
                placeholder={t(`${Namespaces.Form}:last_name_label`)}
                validation={{
                  required: {
                    value: true,
                    message: 'last_name_is_required',
                  },
                }}
              />
            )}
          />
        </div>

        <div className="cell large-6">

          <FormField
            label={{
              for: 'position',
              text: t(`${Namespaces.Form}:company_position_label`),
            }}
            disabled={false}
            className="mb-24"
            renderInput={(inputProps) => (
              <InputText
                {...inputProps}
                placeholder={t(`${Namespaces.Form}:company_position_label`)}
                name="position"
                control={control}
                validation={{
                  required: {
                    value: true,
                    message: 'role_is_required',
                  },
                }}
              />
            )}
          />
        </div>

        <div className="cell large-6">
          <FormField
            label={{
              for: 'companyName',
              text: t(`${Namespaces.Form}:company_name_label`),
            }}
            disabled={false}
            className="mb-40"
            renderInput={(inputProps) => (
              <InputText
                {...inputProps}
                defaultValue=""
                name="companyName"
                control={control}
                placeholder={t(`${Namespaces.Form}:company_name_label`)}
                validation={{
                  required: {
                    value: true,
                    message: 'company_is_required',
                  },
                }}
              />
            )}
          />
        </div>

        <Button
          className="cell large-6 large-offset-3"
          type='submit'
          mode={Button.mode.Primary}
          size={Button.size.LargeWide}
          text={t(`${Namespaces.Profile}:create`)}
        />
      </div>
    </form>
  );
};
