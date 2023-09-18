import { useEffect, useRef } from "react";
import { IChatMessage, IChatRoom } from "../../types";
import Message from "../Message";
import ChatForm from "../ChatForm";

interface Props {
  currentChat?: IChatRoom | null;
  selectedMessage?: IChatMessage | null;
  onFormSubmit: (message: string) => void;
  onSelectMessage: (message: IChatMessage) => void;
}

const Chats = ({
  currentChat,
  selectedMessage,
  onFormSubmit,
  onSelectMessage,
}: Props) => {
  const scrollRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentChat?.messages]);

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-3 bg-white border-b border-gray-200 ">
          {currentChat?.id}
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 ">
          <ul className="space-y-2">
            {currentChat?.messages?.length ? (
              currentChat?.messages.map((message, index) => (
                <li
                  key={message.id}
                  ref={
                    index === currentChat?.messages.length - 1
                      ? scrollRef
                      : null
                  }
                >
                  <Message
                    message={message}
                    onSelectMessage={onSelectMessage}
                    selectedMessage={selectedMessage}
                  />
                </li>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-600 ">
                No messages available.
              </div>
            )}
          </ul>
        </div>

        <ChatForm
          onFormSubmit={onFormSubmit}
          selectedMessage={selectedMessage}
        />
      </div>
    </div>
  );
};

export default Chats;
