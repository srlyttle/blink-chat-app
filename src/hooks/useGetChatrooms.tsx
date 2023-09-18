import axios from "axios";
import { useEffect, useState } from "react";
import { IChatRoom } from "../types";

export const useGetChatrooms = (currentUser: string) => {
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const getChatroomsByUser = async () => {
    try {
      const chatRoomData = await axios.get<IChatRoom[]>("/data.json");

      const sortedChatRooms = chatRoomData
        ? chatRoomData?.data?.sort((a: IChatRoom, b: IChatRoom) => {
            if (!b.last_updated || !a.last_updated) {
              return 0;
            }
            return (
              new Date(b.last_updated).getTime() -
              new Date(a.last_updated).getTime()
            );
          })
        : [];

      setChatRooms(sortedChatRooms);
    } catch (error) {
      setError(`An error occured fetching the chatrooms for ${currentUser}`);
    }
  };
  useEffect(() => {
    getChatroomsByUser();
  }, [currentUser]);

  return { chatRooms, error };
};
