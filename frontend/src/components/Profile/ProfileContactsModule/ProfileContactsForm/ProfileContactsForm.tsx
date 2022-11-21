import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { analytics } from '@/controllers/analytics/analytics.client';
import {
  FlashMessageType,
  Nft,
  PrimaryProfile,
  UpdateProfileContactsMutationVariables,
  useClaimNftMutation,
  useSetNftAvatarMutation,
  useUpdateProfileContactsMutation,
} from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { processValidationErrors } from '@/controllers/form/form.utils/form.processValidationErrors';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { FormField } from '@/components/FormElements/FormField';
import { InputText } from '@/components/FormElements/FormInputs/InputText';
import { ProfileRoutes, Routes } from '@/controllers/router/router.constants';
import { Router } from '@/controllers/i18n/i18n.client';
import { WithLoader } from '@/ui/Loader/WithLoader';
import { useFeature } from '@/controllers/features/features.hooks/useFeature';
import { CVInputBlock } from '@/components/Profile/ProfileContactsModule/CVInputBlock';
import { UserAvatar } from '@/components/Profile/ProfileContactsModule/UserAvatar/UserAvatar';
import { useSendCandidateProfileToReview } from '@/controllers/candidateProfile/candidateProfile.hooks/useSendCandidateProfileToReview';
import { useSendRecruiterProfileToReview } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useSendRecruiterProfileToReview';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { Features } from '@/controllers/features/features.constants';
import typography from '@/ui/typography/typography.module.scss';
import { CandidateProfilePreviewModule } from '@/components/Profile/ProfilePreview/CandidateProfilePreviewModule';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { CandidateContactsActions } from '@/components/Profile/ProfileContactsModule/CandidateContactsActions';
import { SocialLinkPlaceholders, SocialProviders, SOCIAL_LINKS_PATTERNS } from '@/components/Profile/profile.constants';
import { UserErrors, WITHOUT_WALLET_ADDRESS } from '@/controllers/form/form.constants';
import { Tooltip } from '@/components/Base/Tooltip';
import { TooltipPositions } from '@/controllers/tooltip/tooltip.constants';
import { ProfileFormActions } from '../../ProfileFormActions';
import styles from './ProfileContactsForm.module.scss';

type FormData = UpdateProfileContactsMutationVariables;

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

export const ProfileContactsForm = () => {
  const [user, { loading: userLoading }] = useAuthUser();
  const [isNftAvatar, setIsNftAvatar] = useState(!user?.avatar);
  const [candidateProfile] = useLatestCandidateProfile();
  const perfectCandidateFeature = useFeature(Features.PerfectCandidate);
  const nftAvatarFeature = useFeature(Features.NftAvatars);

  const [selectedNft, setSelectedNft] = useState<Nft | null>(null);
  const [isNftClaimed, setIsNftClaimed] = useState<boolean>(false);

  const [claimNft] = useClaimNftMutation();
  const [setNftAvatar] = useSetNftAvatarMutation();

  useEffect(() => {
    if (!isNftAvatar) {
      setSelectedNft(null);
    }
  }, [isNftAvatar]);

  const {
    errors, handleSubmit, setError, control, formState, reset,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [edited, setEdited] = useState(false);

  const router = useRouter();

  const { isModalOpened, openModal, closeModal } = useModalState(false);

  const { preview } = router.query;

  const isFirstTimeFillingProfile = (
    user?.isFirstTimeFillingCandidateProfile ?? false
  );

  const isCandidate = user?.primaryProfile === PrimaryProfile.Candidate;

  const sendProfileToReview = isCandidate
    ? useSendCandidateProfileToReview
    : useSendRecruiterProfileToReview;

  const [sendToReview] = sendProfileToReview();

  const { t } = useTranslation([
    Namespaces.Validations,
    Namespaces.Form,
    Namespaces.Profile,
  ]);

  const [updateContacts, { loading }] = useUpdateProfileContactsMutation();

  const flashMessage = useFlashMessage();

  const getFormattedLink = (link: string | undefined | null) => {
    if (!link) {
      return link;
    }

    const splittedLink = link.split('/');

    if (!splittedLink[0].includes('http')) {
      splittedLink?.unshift('https:', '');
    }

    if (!splittedLink[2].includes('www.')) {
      const splittedProviderLink = splittedLink[2].split('.');

      splittedProviderLink.unshift('www');

      splittedLink[2] = splittedProviderLink.join('.');
    }

    return splittedLink.join('/');
  };

  const onSubmit = handleSubmit(async (data) => {
    const {
      firstName,
      lastName,
      linkedinUrl,
      githubUrl,
      behanceUrl,
      ethWalletAddress,
    } = data;

    const formattedLinkedinUrl = getFormattedLink(linkedinUrl);
    const formattedGithubUrl = getFormattedLink(githubUrl);
    const formattedBehanceUrl = getFormattedLink(behanceUrl);

    try {
      await updateContacts({
        variables: {
          firstName,
          lastName,
          githubUrl: formattedGithubUrl,
          behanceUrl: formattedBehanceUrl,
          linkedinUrl: formattedLinkedinUrl,
          ethWalletAddress: ethWalletAddress || WITHOUT_WALLET_ADDRESS,
        },
        async update(cache, { data: updatedProfileData }) {
          if (!updatedProfileData?.updateProfileContacts) {
            return;
          }

          try {
            if (selectedNft && ethWalletAddress) {
              await claimNft({
                variables: {
                  nftId: selectedNft.id,
                },
              });

              if (ethWalletAddress) {
                await flashMessage.postMessage({
                  variables: {
                    type: FlashMessageType.Success,
                    heading: t(`${Namespaces.Profile}:nft_success_message_title`),
                    text: t(`${Namespaces.Profile}:nft_success_message_description`),
                  },
                });

                setIsNftClaimed(true);
              }
            } else if (selectedNft) {
              await setNftAvatar({
                variables: {
                  nftId: selectedNft.id,
                },
              });

              setIsNftAvatar(false);
              reset();
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

          const { primaryProfile } = updatedProfileData.updateProfileContacts;

          const isUserCandidate = primaryProfile === PrimaryProfile.Candidate;
          const isUserRecruiter = primaryProfile === PrimaryProfile.Recruiter;

          if (preview) {
            if (isFirstTimeFillingProfile && isUserCandidate) {
              analytics.sendEvent(
                analytics.events.candidateSignUpFlow.ContactsStep,
                {},
              );
            }

            await sendToReview();

            analytics.sendEvent(
              analytics.events.userProfile.ActivateProfileClick,
              {
                context: 'automated',
              },
            );

            if (isUserRecruiter) {
              const redirectLink = perfectCandidateFeature.isEnabled()
                ? ProfileRoutes.PerfectCandidate
                : Routes.Candidates;

              await Router.push(redirectLink);
            }

            if (!isUserRecruiter && isFirstTimeFillingProfile) {
              Router.push(`${ProfileRoutes.Feedback}/?preview=candidate`);
            }

            if (isUserRecruiter) {
              await flashMessage.postMessage({
                variables: {
                  type: flashMessage.messageTypes.Success,
                  heading: t(`${Namespaces.Profile}:recruiter_profile_activated_message_title`),
                  text: t(`${Namespaces.Profile}:recruiter_profile_activated_message_text`),
                },
              });
            }
          }
        },
      });
      reset({
        firstName,
        lastName,
        linkedinUrl,
        githubUrl,
        behanceUrl,
        ethWalletAddress,
      });
    } catch (error) {
      const validationErrors = processValidationErrors<
        UpdateProfileContactsMutationVariables
        >(error, setError);

      const [, translateCode] = error.message.split(': ');

      if (!validationErrors) {
        if (translateCode && translateCode
          .includes(UserErrors.EthWalletAlreadyTaken)
        ) {
          setError('ethWalletAddress', {
            message: t(`${Namespaces.Validations}:${translateCode}`),
            type: 'validation',
          });

          return;
        }

        await flashMessage.postMessage({
          variables: {
            type: flashMessage.messageTypes.Error,
            text: t(`${Namespaces.Validations}:${error.message.toLowerCase()}`),
            heading: t(`${Namespaces.Validations}:validation_message_title`),
          },
        });
      }
    }
  });

  useEffect(() => {
    setEdited(formState.isDirty);
  }, [formState.isDirty]);

  return (
    <>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <WithLoader loading={userLoading}>
          <div className="grid-container mt-40">
            <div className="grid-x grid-margin-x">

              <div className="cell large-6 large-offset-3">
                <UserAvatar
                  isCandidate={isCandidate}
                  isNftAvatar={isNftAvatar}
                  setIsNftAvatar={setIsNftAvatar}
                  setSelectedNft={setSelectedNft}
                  selectedNft={selectedNft}
                  isNftClaimed={isNftClaimed}
                  setEdited={setEdited}
                />
              </div>

              {(isNftAvatar && nftAvatarFeature.isEnabled()) && (
                <div className="cell large-6 large-offset-3">
                  <FormField
                    label={{
                      for: 'ethWalletAddress',
                      text: t(`${Namespaces.Form}:wallet_address_label`),
                    }}
                    error={errors.ethWalletAddress}
                    disabled={loading}
                    className="mb-40"
                    renderInput={(props) => (
                      <InputText
                        {...props}
                        defaultValue={user?.ethWalletAddress || ''}
                        name="ethWalletAddress"
                        control={control}
                        placeholder={t(`${Namespaces.Form}:wallet_address_placeholder`)}
                      />
                    )}
                    renderLabelIcon={() => (
                      <div className={styles.iconContainer}>
                        <Tooltip
                          text={t(`${Namespaces.Form}:tooltip_wallet_address`)}
                          position={TooltipPositions.Top}
                        />
                      </div>
                    )}
                  />
                </div>
              )}

              <div className="cell large-3 large-offset-3">
                <FormField
                  label={{
                    for: 'firstName',
                    text: t(`${Namespaces.Form}:first_name_label`),
                  }}
                  error={errors.firstName}
                  disabled={loading}
                  className="mb-24"
                  renderInput={(props) => (
                    <InputText
                      {...props}
                      defaultValue={user?.firstName || ''}
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

              <div className="cell large-3">
                <FormField
                  label={{
                    for: 'lastName',
                    text: t(`${Namespaces.Form}:last_name_label`),
                  }}
                  error={errors.lastName}
                  disabled={loading}
                  className="mb-24"
                  renderInput={(props) => (
                    <InputText
                      {...props}
                      defaultValue={user?.lastName || ''}
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

              {candidateProfile && (
                <div className="cell large-6 large-offset-3">
                  <CVInputBlock />
                </div>
              )}

              <div className="cell large-6 large-offset-3">
                <FormField
                  label={{
                    for: 'linkedinUrl',
                    text: t(`${Namespaces.Form}:linkedin_url_label`),
                  }}
                  error={errors.linkedinUrl}
                  disabled={loading}
                  className="mb-24"
                  renderInput={(props) => (
                    <InputText
                      {...props}
                      defaultValue={user?.linkedinUrl || ''}
                      name="linkedinUrl"
                      control={control}
                      placeholder={SocialLinkPlaceholders.Linkedin}
                      validation={{
                        pattern: {
                          value:
                            SOCIAL_LINKS_PATTERNS[SocialProviders.Linkedin],
                          message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                            social: SocialProviders.Linkedin,
                          }),
                        },
                      }}
                    />
                  )}
                />
              </div>

              {isCandidate && (
                <>
                  <div className="cell large-6 large-offset-3">
                    <FormField
                      label={{
                        for: 'behanceUrl',
                        text: t(`${Namespaces.Form}:behance_url_label`),
                      }}
                      error={errors.behanceUrl}
                      disabled={loading}
                      className="mb-24"
                      renderInput={(props) => (
                        <InputText
                          {...props}
                          defaultValue={user?.behanceUrl || ''}
                          name="behanceUrl"
                          control={control}
                          placeholder={SocialLinkPlaceholders.Behance}
                          validation={{
                            pattern: {
                              value:
                                SOCIAL_LINKS_PATTERNS[SocialProviders.Behance],
                              message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                                social: SocialProviders.Behance,
                              }),
                            },
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="cell large-6 large-offset-3">
                    <FormField
                      label={{
                        for: 'githubUrl',
                        text: t(`${Namespaces.Form}:github_url_label`),
                      }}
                      error={errors.githubUrl}
                      disabled={loading}
                      className="mb-40"
                      renderInput={(props) => (
                        <InputText
                          {...props}
                          defaultValue={user?.githubUrl || ''}
                          name="githubUrl"
                          control={control}
                          placeholder={SocialLinkPlaceholders.Github}
                          validation={{
                            pattern: {
                              value:
                                SOCIAL_LINKS_PATTERNS[SocialProviders.Github],
                              message: t(`${Namespaces.Validations}:invalid_social_profile_url`, {
                                social: SocialProviders.Github,
                              }),
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                </>
              )}
              {isCandidate && isFirstTimeFillingProfile ? (
                <CandidateContactsActions
                  loading={loading}
                  openModal={openModal}
                  buttonAction="send_and_post"
                />
              ) : (
                <ProfileFormActions
                  handleSubmit={onSubmit}
                  discardChanges={reset}
                  loading={loading}
                  edited={edited}
                  setEdited={setEdited}
                />
              )}
            </div>
          </div>
        </WithLoader>
      </form>
      <Modal
        className={styles.previewModal}
        overlayClassName={styles.modalOverlay}
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <p className={cn(
          typography.accentTitle,
          styles.modalTitle,
          'c-semidark-chocolate mb-16',
        )}
        >
          {t(`${Namespaces.Profile}:profile_preview`)}
        </p>
        <CandidateProfilePreviewModule isModalPreview />
      </Modal>
    </>

  );
};
