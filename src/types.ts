export interface IChatMessage {
  id: string;
  //   name: string;
  text: string;
  last_updated?: string;
}

export interface IChatRoom {
  id: string;
  last_updated?: string;
  messages: IChatMessage[];
}
