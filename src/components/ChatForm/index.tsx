import { useEffect, useState } from "react";
import { IChatMessage } from "../../types";

interface Props {
  onFormSubmit: (message: string) => void;
  selectedMessage?: IChatMessage | null;
}
const ChatForm = ({ onFormSubmit, selectedMessage }: Props) => {
  const [message, setMessage] = useState(selectedMessage?.text || "");

  useEffect(() => {
    if (selectedMessage) {
      setMessage(selectedMessage.text);
    }
  }, [selectedMessage]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(message);
    setMessage("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200">
          <input
            type="text"
            aria-label="Write a message"
            placeholder="Write a message"
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="btn btn-neutral"
            type="submit"
            disabled={!message.trim()}
          >
            {selectedMessage ? "Update" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
