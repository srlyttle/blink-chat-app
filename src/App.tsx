import { useState, useEffect } from "react";
import AllChats from "./components/AllChats";
import ChatRoom from "./components/ChatRoom";
import { useGetChatrooms } from "./hooks/useGetChatrooms";
import { IChatMessage, IChatRoom } from "./types";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { chatRooms: initialChatRooms } = useGetChatrooms("user");

  const [allChatRooms, setAllChatRooms] =
    useState<IChatRoom[]>(initialChatRooms);
  const [selectedChatId, setSelectedChatId] = useState<string | null>();
  const [currentChat, setCurrentChat] = useState<IChatRoom | null>();
  const [selectedMessage, setSelectedMessage] = useState<IChatMessage | null>();

  useEffect(() => {
    setAllChatRooms(initialChatRooms);
  }, [initialChatRooms]);

  const handleChangeSelectedChat = (id: string) => {
    setSelectedChatId(id);
    const currentChatRoom = allChatRooms.find((chat) => chat.id === id);
    setCurrentChat(currentChatRoom);
  };

  const handleSelectMessage = (message: IChatMessage) => {
    setSelectedMessage(message);
  };

  const handleUpdateChatMessages = (message: string) => {
    if (selectedMessage) {
      const currentMessages = [...(currentChat?.messages || [])];
      const messageIndex = currentMessages.findIndex(
        (message) => message.id === selectedMessage.id
      );
      currentMessages[messageIndex] = {
        ...currentMessages[messageIndex],
        text: message,
      };
      const updatedChatRoom = {
        ...currentChat,
        id: currentChat?.id || uuidv4(),
        messages: currentMessages,
      };

      const updatedAllChatRooms = allChatRooms.map((chatRoom) =>
        chatRoom.id === updatedChatRoom.id ? updatedChatRoom : chatRoom
      );

      setAllChatRooms(updatedAllChatRooms);
      setCurrentChat(updatedChatRoom);
      setSelectedMessage(null);
    } else {
      const id = uuidv4();
      const newMessage = {
        id,
        last_updated: new Date().toISOString(),
        text: message,
      };
      const updatedChatRoom = {
        ...currentChat,
        id: currentChat?.id || uuidv4(),
        messages: [...(currentChat?.messages || []), newMessage],
      };

      const updatedAllChatRooms = allChatRooms.map((chatRoom) =>
        chatRoom.id === updatedChatRoom.id ? updatedChatRoom : chatRoom
      );

      setAllChatRooms(updatedAllChatRooms);
      setCurrentChat(updatedChatRoom);
      setSelectedMessage(null);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
        <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
          <AllChats
            chatRooms={allChatRooms}
            onChangeSelectedChat={handleChangeSelectedChat}
            selectedChatId={selectedChatId}
          />
        </div>
        <ChatRoom
          currentChat={currentChat || (allChatRooms && allChatRooms[0])}
          onFormSubmit={handleUpdateChatMessages}
          onSelectMessage={handleSelectMessage}
          selectedMessage={selectedMessage}
        />
      </div>
    </div>
  );
}

export default App;
