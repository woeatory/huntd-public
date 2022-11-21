import React, { useEffect, useState } from 'react';
import { ChatBox } from '@/components/ChatsModule/ChatBox';
import { ChatSelector } from '@/components/ChatsModule/ChatSelector';
import { BuddyChatProvider } from '@/controllers/buddyChat/buddyChat.context';
import { useLocalStorage } from '@/controllers/localStorage/localStorage.hooks/useLocalStorage';
import LayoutStyles from '@/components/Base/Layout/Layout.module.scss';
import { ChatTypes } from '@/controllers/buddyChat/buddyChat.typedefs';
import { PrimaryProfile, User } from '@/controllers/graphql/generated';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { analytics } from '@/controllers/analytics/analytics.client';

export const ChatsModule = () => {
  const [activeConnectionId, setActiveConnectionId] = useLocalStorage('_huntd_selected_chat', 0);
  const [selectedChats, setSelectedChats] = useState<ChatTypes>(ChatTypes.All);
  const [isMessageEditing, setIsMessageEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [editedMessageId, setEditedMessageId] = useState(0);
  const [
    shouldReviewHandlerRender,
    setShouldReviewHandlerRender,
  ] = useState(false);
  const [candidateUser, setCandidateUser] = useState<User | null>(null);
  const [isUserCandidate, setIsUserCandidate] = useState(false);

  const [authUser] = useAuthUser();
  const isRecruiter = authUser?.primaryProfile === PrimaryProfile.Recruiter;

  useEffect(() => {
    analytics.sendEvent(
      analytics.events.pageInteraction.VisitChatsPage,
      {},
    );
  }, []);

  return (
    <BuddyChatProvider
      data={{
        activeConnectionId,
        setActiveConnectionId,
        selectedChats,
        setSelectedChats,
        isMessageEditing,
        setIsMessageEditing,
        message,
        setMessage,
        editedMessageId,
        setEditedMessageId,
        shouldReviewHandlerRender,
        setShouldReviewHandlerRender,
        candidateUser,
        setCandidateUser,
        isUserCandidate,
        setIsUserCandidate,
      }}
    >

      <div className={LayoutStyles.fullWidthPageWrapper}>
        <div className="grid-container full">
          <div className="grid-x">
            <div className="cell large-3">
              <ChatSelector
                isRecruiter={isRecruiter}
              />
            </div>

            <div className="cell large-9">
              <ChatBox
                chatTypes={selectedChats}
                isRecruiter={isRecruiter}
              />
            </div>
          </div>
        </div>
      </div>
    </BuddyChatProvider>
  );
};
