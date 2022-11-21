import React, {
  FC, SyntheticEvent, useCallback,
  useMemo, useRef, useState, useEffect,
} from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import typography from '@/ui/typography/typography.module.scss';
import { IconSend } from '@/ui/icons/general/IconSend';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { FastAnswersButtons } from '@/components/ChatsModule/ChatInput/FastAnswersButtons/FastAnswersButtons';
import { useSendMessage } from '@/controllers/buddyChat/buddyChat.hooks/useSendMessage';
import { useUpdateMessage } from '@/controllers/buddyChat/buddyChat.hooks/useUpdateMessage';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { InputTextAreaMultilineUi } from '@/components/FormElements/FormInputs/InputTextAreaMultiline';
import { analytics } from '@/controllers/analytics/analytics.client';
import { useModalState } from '@/controllers/modal/modal.hooks/useModalState';
import { useBuddyChatContext } from '@/controllers/buddyChat/buddyChat.context';
import { useProfileConnectionMetaQuery } from '@/controllers/graphql/generated';
import { ProfileConnectionRequestHandler } from '@/components/ChatsModule/ChatActions/ProfileConnectionRequestHandler';
import styles from './ChatInput.module.scss';

const Modal = dynamic(
  async () => {
    const mod = await import('@/components/Base/Modal/Modal');

    return mod.Modal;
  },
  {
    ssr: false,
  },
);

interface Props {
  profileConnectionId: number
  shouldFABeVisible: boolean
}
export const ChatInput: FC<Props> = ({
  profileConnectionId, shouldFABeVisible,
}) => {
  const [carettePosition, setCarettePosition] = useState(0);
  const [openContactsModalReady, setOpenContactsModalReady] = useState(false);
  const { isModalOpened, openModal, closeModal } = useModalState(false);
  const [sendMessage] = useSendMessage();
  const [updateMessage] = useUpdateMessage();
  const [message, setMessage] = useState('');
  const flashMessage = useFlashMessage();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation([Namespaces.Chat]);
  const {
    message: editMessage,
    isMessageEditing,
    setIsMessageEditing,
    editedMessageId,
    activeConnectionId,
    shouldReviewHandlerRender,
  } = useBuddyChatContext();

  const isDisabled = useMemo(
    () => profileConnectionId === 0,
    [profileConnectionId],
  );

  const onSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!message || message === editMessage) {
      return;
    }

    const messageCopy = message;

    setMessage('');

    if (isMessageEditing) {
      try {
        await updateMessage({
          variables: {
            id: editedMessageId,
            values: {
              message: messageCopy,
            },
          },
          optimisticResponse: (data) => ({
            updateMessage: {
              __typename: 'ChatMessage',
              id: editedMessageId,
              message: data.values.message,
              profileConnectionId,
              isSystemMessage: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              senderUser: {
                isAuthUser: true,
                __typename: 'User',
              },
              recipientUser: {
                isAuthUser: false,
                __typename: 'User',
              },
            },
          }),
        });

        setIsMessageEditing(false);

        analytics.sendEvent(
          analytics.events.chatInteraction.MessageUpdated,
          {},
        );
      } catch {
        flashMessage.postMessage({
          variables: {
            type: flashMessage.messageTypes.Error,
            heading: t(`${Namespaces.Chat}:chat_error`),
            text: t(`${Namespaces.Chat}:edit_message_error`),
          },
        });
      }

      return;
    }

    try {
      await sendMessage({
        variables: {
          profileConnectionId,
          message: messageCopy,
        },
        optimisticResponse: (data) => ({
          sendMessage: {
            __typename: 'ChatMessage',
            id: Math.trunc(Math.random() * -1000),
            message: data.message,
            profileConnectionId: data.profileConnectionId,
            isSystemMessage: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            senderUser: {
              isAuthUser: true,
              __typename: 'User',
            },
            recipientUser: {
              isAuthUser: false,
              __typename: 'User',
            },
          },
        }),
      });

      if (shouldFABeVisible && openContactsModalReady) {
        openModal();
        setOpenContactsModalReady(false);
      }

      analytics.sendEvent(
        analytics.events.chatInteraction.MessageSent,
        {},
      );
    } catch {
      flashMessage.postMessage({
        variables: {
          type: flashMessage.messageTypes.Error,
          heading: t(`${Namespaces.Chat}:chat_error`),
          text: t(`${Namespaces.Chat}:message_delivery_error`),
        },
      });
    }
  }, [
    flashMessage, message, sendMessage,
    updateMessage, t, profileConnectionId,
    editedMessageId, isMessageEditing,
    setIsMessageEditing, editMessage,
    openModal, setOpenContactsModalReady,
    openContactsModalReady, shouldFABeVisible,
  ]);

  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, message]);

  const handleMetaKeys = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart;

      const messageStart = message.slice(0, position);
      const messageEnd = message.slice(position);

      setMessage(`${messageStart}\n${messageEnd}`);
      setCarettePosition(position + 1);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(carettePosition, carettePosition);
    }

    if (editMessage) {
      setMessage(editMessage);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setMessage('');
    }
  }, [carettePosition, editMessage]);

  const { data } = useProfileConnectionMetaQuery({
    variables: {
      profileConnectionId: activeConnectionId,
    },
    ssr: false,
  });

  useEffect(() => {
    setOpenContactsModalReady(false);
    setMessage('');
  }, [profileConnectionId]);

  return (
    <div className={styles.chatInputWrapper}>
      <div className={cn(styles.buttonsOutterContainer, {
        [styles.buttonsOutterContainerScroll]: shouldFABeVisible,
      })}
      >
        <div className={styles.buttonsInnerContainer}>
          {shouldFABeVisible && (

            <FastAnswersButtons
              setOpenContactsModalReady={setOpenContactsModalReady}
              setMessage={setMessage}
            />
          )}

          {shouldReviewHandlerRender && (
            <ProfileConnectionRequestHandler
              className={styles.openContactsButton}
              profile={data?.profileConnection?.candidateProfile ?? null}
              profileConnectionId={activeConnectionId}
              renderAsButton
            />
          )}
        </div>
      </div>

      <form
        className={styles.chatInputForm}
        onSubmit={onSubmit}
      >
        <InputTextAreaMultilineUi
          autoFocus
          ref={inputRef}
          disabled={isDisabled}
          className={styles.chatInput}
          placeholder={t(`${Namespaces.Chat}:type_a_message`)}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey)) {
              handleMetaKeys();

              return;
            }

            if (e.key === 'Enter' && !e.shiftKey) {
              onSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          title="Send"
          aria-label="Send"
          disabled={isDisabled}
          className={cn(styles.chatInputButton, {
            [styles.editChatIcon]: isMessageEditing,
            [styles.chatIconActive]: message.length > 0 && !isMessageEditing,
          })}
        >
          {isMessageEditing
            ? <IconCheck />
            : <IconSend />}
        </button>
      </form>
      <Modal
        isOpen={isModalOpened}
        closeModal={closeModal}
      >
        <p className={cn(
          typography.accentTitle,
          styles.modalTitle,
          'c-semidark-chocolate mb-16',
        )}
        >
          {t(`${Namespaces.Chat}:interested_open_contacts_title`)}
        </p>

        <ProfileConnectionRequestHandler
          closeOuterModal={closeModal}
          className={styles.openContactsButton}
          profile={data?.profileConnection?.candidateProfile ?? null}
          profileConnectionId={activeConnectionId}
          renderAsButton
        />
      </Modal>

    </div>
  );
};
