import {
  MessageProps,
  PrivateMessage,
  TopicMessage,
  User,
} from "@/models/models";
import { MessageContent } from "./message-content";
import { useAppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";

type ChatContainerProps = {
  messages: MessageProps[];
  currentChat: User;
};

type FormValuesProps = {
  content: string;
};

export function ChatContainer({ messages, currentChat }: ChatContainerProps) {
  const { sendMessage, currentUser } = useAppContext();

  const { handleSubmit, register } = useForm<FormValuesProps>();

  const onSubmit = (data: FormValuesProps) => {
    if (currentUser) {
      if (currentChat.id === "1") {
        const topicMessage: TopicMessage = {
          content: data.content,
          sender: currentUser.id,
          type: "topic",
        };
        sendMessage(topicMessage);
      } else {
        const privateMessage: PrivateMessage = {
          content: data.content,
          sender: currentUser.id,
          type: "queue",
          receiver: currentChat.id,
        };
        sendMessage(privateMessage);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2">
      <div className="w-full max-h-96 border py-2 px-4 gap-2 flex flex-col border-gray-200 overflow-y-scroll rounded-md">
        {messages.map((it) => {
          return (
            <MessageContent
              currentUser={currentUser?.id ? currentUser.id : ""}
              message={it}
            />
          );
        })}
      </div>
      <form
        className="flex w-full  items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Digite sua mensagem"
          className="px-4 h-12 border w-full"
          {...register("content")}
        />
        <button
          type="submit"
          className={`h-12 rounded-sm text-white cursor-pointer w-24 text-sm bg-green-500`}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
