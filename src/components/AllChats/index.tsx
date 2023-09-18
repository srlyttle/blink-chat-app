import { IChatRoom } from "../../types";

interface Props {
  onChangeSelectedChat: (chatroomId: string) => void;
  chatRooms?: IChatRoom[];
  selectedChatId?: string | null;
}
const AllChats = ({
  onChangeSelectedChat,
  chatRooms,
  selectedChatId,
}: Props) => {
  return (
    <>
      <h2 className="my-2 mb-2 ml-2 text-gray-900">Chats</h2>
      <ul className="overflow-auto h-[30rem]">
        <li>
          {chatRooms?.length ? (
            chatRooms?.map((chatRoom) => (
              <div
                key={chatRoom.id}
                className={`${
                  chatRoom.id === selectedChatId
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 "
                } flex items-center px-3 py-2 text-sm `}
                onClick={() => onChangeSelectedChat(chatRoom.id)}
              >
                {chatRoom.id}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-600 ">
              No chats available.
            </div>
          )}
        </li>
      </ul>
    </>
  );
};

export default AllChats;
