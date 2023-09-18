import { format } from "date-fns";
import { IChatMessage } from "../../types";

interface Props {
  message: IChatMessage;
  selectedMessage?: IChatMessage | null;
  onSelectMessage: (message: IChatMessage) => void;
}
const Message = ({ message, selectedMessage, onSelectMessage }: Props) => {
  const isCurrentUser = false;
  const isSelectedMessage = selectedMessage?.id === message.id;

  const handleSelectMessage = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onSelectMessage(message);
  };

  return (
    <li
      tabIndex={0}
      role="button"
      onClick={handleSelectMessage}
      className={`${!isCurrentUser ? "justify-start" : "justify-end"}
          flex 
        `}
    >
      <div>
        <span className="block text-sm text-gray-700 ">
          {message?.last_updated &&
            format(new Date(message.last_updated), "MMMM d, yyyy h:mm a")}
        </span>
        <div
          className={`${
            !isCurrentUser
              ? "text-gray-700  bg-white border border-gray-200 shadow-md "
              : "bg-blue-600  text-white"
          }
            ${isSelectedMessage ? "border-1 border-green-400" : ""}
              relative max-w-xl px-4 py-2 rounded-lg shadow`}
        >
          <span className="block font-normal ">{message.text}</span>
        </div>
      </div>
    </li>
  );
};

export default Message;
