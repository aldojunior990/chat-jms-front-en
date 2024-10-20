import { MessageProps } from "@/models/message";
import { MessageContent } from "./message-content";

type ChatContainerProps = {
  messages: MessageProps[];
};

export function ChatContainer({ messages }: ChatContainerProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-2">
      <div className="w-full max-h-96 border py-2 px-4 gap-2 flex flex-col border-gray-200 overflow-y-scroll rounded-md">
        {messages.map((it) => {
          return <MessageContent currentUser="Bob" message={it} />;
        })}
      </div>
      <form className="flex w-full  items-center justify-center" action="">
        <input
          type="text"
          placeholder="Digite sua mensagem"
          name=""
          id=""
          className="px-4 h-12 border w-full"
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
