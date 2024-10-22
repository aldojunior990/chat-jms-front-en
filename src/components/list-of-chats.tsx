import { MessageProps } from "@/models/message";
import { ChatLink } from "./chat-link";

type ListOfChatsProps = {
  avaliableChats: Map<string, MessageProps[]>;
};

export function ListOfChats({ avaliableChats }: ListOfChatsProps) {
  return (
    <div className="w-full mt-4 overflow-y-scroll h-full flex flex-col justify-start items-center">
      <ChatLink isUser={false} title="general" />
      {Array.from(avaliableChats.entries()).map(([key, value]) =>
        key !== "general" ? (
          <ChatLink key={key} isUser={true} title={key} />
        ) : (
          <></>
        )
      )}
    </div>
  );
}
