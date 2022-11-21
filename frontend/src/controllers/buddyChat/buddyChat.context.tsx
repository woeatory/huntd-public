import React, {
  createContext,
  FC,
  useContext,
} from 'react';
import { ChatTypes } from '@/controllers/buddyChat/buddyChat.typedefs';
import { User } from '@/controllers/graphql/generated';

interface ChatState {
  activeConnectionId: number;
  setActiveConnectionId: (value: number) => void;
  selectedChats: ChatTypes;
  setSelectedChats: (value: ChatTypes) => void;
  isMessageEditing: boolean;
  setIsMessageEditing: (value: boolean) => void;
  message: string | undefined;
  setMessage: (value: string) => void;
  editedMessageId: number;
  setEditedMessageId: (value: number) => void;
  shouldReviewHandlerRender: boolean;
  setShouldReviewHandlerRender: (value: boolean) => void;
  candidateUser: User | null;
  setCandidateUser: (value: User | null) => void;
  isUserCandidate: boolean;
  setIsUserCandidate: (value: boolean) => void;
}

const initialState: ChatState = {
  activeConnectionId: 0,
  setActiveConnectionId: () => { /* empty */ },
  selectedChats: ChatTypes.All,
  setSelectedChats: () => { /* empty */ },
  isMessageEditing: false,
  setIsMessageEditing: () => { /* empty */ },
  message: '',
  setMessage: () => { /* empty */ },
  editedMessageId: 0,
  setEditedMessageId: () => { /* empty */ },
  shouldReviewHandlerRender: false,
  setShouldReviewHandlerRender: () => { /* empty */ },
  candidateUser: null,
  setCandidateUser: () => { /* empty */ },
  isUserCandidate: false,
  setIsUserCandidate: () => { /* empty */ },
};

const BuddyChatContext = createContext<ChatState>(initialState);

interface Props {
  data: ChatState
}
export const BuddyChatProvider: FC<Props> = (props) => {
  const { data, children } = props;

  return (
    <BuddyChatContext.Provider value={data}>
      {children}
    </BuddyChatContext.Provider>
  );
};

export const useBuddyChatContext = () => useContext(BuddyChatContext);
