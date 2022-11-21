import React, {
  createContext, FC, useContext, useState,
} from 'react';
import { ChatTypes } from '@/controllers/chat/chat.interfaces';

interface ChatState {
  selectedChatType: ChatTypes;
  setSelectedChatType: (value: ChatTypes) => void;
  selectedChat: number;
  setSelectedChat: (id: number) => void;
}

const initialState: ChatState = {
  selectedChatType: ChatTypes.All,
  setSelectedChatType: () => { /* empty */ },
  selectedChat: 0,
  setSelectedChat: () => { /* empty */ },
};

const ChatsContext = createContext<ChatState>(initialState);

export const ChatsContextProvider: FC = (props) => {
  const { children } = props;

  const [selectedChatType, setSelectedChatType] = useState(ChatTypes.All);
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <ChatsContext.Provider
      value={{
        selectedChatType,
        setSelectedChatType,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChatsContext = () => useContext(ChatsContext);
