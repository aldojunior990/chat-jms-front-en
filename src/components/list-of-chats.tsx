import { AvaliableChats } from "@/models/models";
import { ChatLink } from "./chat-link";
import { useAppContext } from "@/context/AppContext";

type ListOfChatsProps = {
  avaliableChats: AvaliableChats[];
};

export function ListOfChats({ avaliableChats }: ListOfChatsProps) {
  const { currentUser } = useAppContext();
  return (
    <div className="w-full mt-4 overflow-y-scroll h-full flex flex-col justify-start items-center">
      <ChatLink isUser={false} title="Chat geral" src="1" />
      {avaliableChats.map((it) => {
        return it.user.id !== "1" && it.user.id !== currentUser?.id ? (
          <ChatLink
            key={it.user.username}
            isUser={true}
            title={it.user.username}
            src={it.user.id}
          />
        ) : (
          <></>
        );
      })}
    </div>
  );
}
