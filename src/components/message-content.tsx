import { useAppContext } from "@/context/AppContext";
import { MessageProps } from "@/models/models";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type MessageContentProps = {
  message: MessageProps;
  currentUser: string;
};

export function MessageContent({ currentUser, message }: MessageContentProps) {
  const { avaliableChats } = useAppContext();

  const senderIsCurrentUser = currentUser === message.sender;

  const sender = avaliableChats.find((it) => it.user.id === message.sender);

  return (
    <div
      className={`w-max-full p-4 rounded-sm mb-2 ${
        senderIsCurrentUser ? "bg-primary self-end" : "bg-gray-400 self-start"
      }`}
      style={{
        maxWidth: "70%", // Define um limite para o tamanho da mensagem
        alignSelf: senderIsCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      {!senderIsCurrentUser && (
        <p className="font-semibold text-onBackground text-md">
          {sender?.user.username}
        </p>
      )}
      <p
        className={`text-md font-normal break-words whitespace-normal text-wrap ${
          senderIsCurrentUser
            ? "text-background text-right"
            : "text-onBackground text-left"
        }`}
      >
        {message.content}
      </p>
      <p className="text-sm text-gray-500 font-light">
        {format(message.createdAt, "eeee, dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        })}
      </p>
    </div>
  );
}
