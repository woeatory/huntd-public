import {
  AuthUserConnectionsDocument,
  useSendProfileConnectionRequestMutation,
} from '@/controllers/graphql/generated';
import { useSendMessage } from '@/controllers/buddyChat/buddyChat.hooks/useSendMessage';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';

interface Props {
  connectMessage: string,
  recruiterProfileId: number,
  candidateProfileId: number,
}

export enum ConnectionRequestStatus {
  Success = 'success',
  Error = 'error',
}

export const useSendConnectionRequestWithMessage = () => {
  const [
    sendConnectionRequest, { loading },
  ] = useSendProfileConnectionRequestMutation({
    refetchQueries: [
      {
        query: AuthUserConnectionsDocument,
        variables: {
          archived: false,
        },
      },
      {
        query: AuthUserConnectionsDocument,
        variables: {
          archived: true,
        },
      },
      { query: AuthUserConnectionsDocument },
    ],
    awaitRefetchQueries: true,
  });
  const [mutate] = useSendMessage();
  const flashMessage = useFlashMessage();
  const { t } = useTranslation([Namespaces.Profile]);

  const sendConnectionRequestWithMessage = async (
    props: Props,
  ) => {
    const { candidateProfileId, recruiterProfileId, connectMessage } = props;

    try {
      const connectionRequestResult = await sendConnectionRequest({
        variables: {
          candidateProfileId,
          recruiterProfileId,
        },
      });

      const profileConnectionId = (
        connectionRequestResult.data?.sendProfileConnectionRequest.id
      );

      if (connectMessage && profileConnectionId) {
        await mutate({
          variables: {
            profileConnectionId,
            message: connectMessage,
          },
        });
      }

      await flashMessage.postMessage({
        variables: {
          type: flashMessage.messageTypes.Success,
          heading: t(`${Namespaces.Profile}:profile_connection_success`),
          text: t(`${Namespaces.Profile}:connection_request_sent_text`),
        },
      });

      return ConnectionRequestStatus.Success;
    } catch (error) {
      await flashMessage.postMessage({
        variables: {
          type: flashMessage.messageTypes.Error,
          heading: t(`${Namespaces.Profile}:profile_connection_error`),
          text: t(`${Namespaces.Profile}:${error.message}`),
        },
      });

      return ConnectionRequestStatus.Error;
    }
  };

  return { sendConnectionRequestWithMessage, loading };
};
