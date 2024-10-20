import { MessageProps } from "@/models/message";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type MessageContentProps = {
  message: MessageProps;
  currentUser: string;
};

export function MessageContent({ currentUser, message }: MessageContentProps) {
  const senderIsCurrentUser = currentUser === message.sender;

  return (
    <div
      className={`w-full p-4 rounded-sm ${
        senderIsCurrentUser ? "bg-primary" : "bg-gray-400"
      }`}
    >
      {!senderIsCurrentUser && (
        <p className="font-semibold text-onBackground text-md">
          {message.sender}
        </p>
      )}
      <p
        className={`text-md font-normal break-words whitespace-normal text-wrap text-left ${
          senderIsCurrentUser ? "text-background" : "text-onBackground"
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
