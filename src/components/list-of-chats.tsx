import { ChatLink } from "./chat-link";

type ListOfChatsProps = {
  connectedUsers: string[];
};

export function ListOfChats({ connectedUsers }: ListOfChatsProps) {
  return (
    <div className="w-full mt-4 overflow-y-scroll h-full flex flex-col justify-start items-center">
      <ChatLink isUser={false} title="Chat geral" />
      {connectedUsers.map((it) => {
        return <ChatLink isUser={true} title={it} />;
      })}
    </div>
  );
}
