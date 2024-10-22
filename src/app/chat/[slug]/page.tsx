"use client";

import { ChatContainer } from "@/components/chat-container";
import { useWebSocket } from "@/hooks/websocket";
import { MessageProps } from "@/models/message";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ChatDetailsProps {
  params: { slug: string };
}

export default function ChatDetails({ params }: ChatDetailsProps) {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const { avaliableChats } = useWebSocket();

  useEffect(() => {
    const msgs = avaliableChats.get(params.slug);
    console.log(msgs);
    if (msgs) {
      // Verifica se msgs é "truthy"

      setMessages(msgs);
    }
  }, [avaliableChats]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start py-8 px-2 md:px-16 lg:px-80 text-onBackground bg-background">
      <header className="w-full gap-4 flex items-center py-3 justify-start border-b border-b-gray-200 text-onBackground font-medium">
        <Link href={"/"} className="p-4 hover:bg-gray-100 rounded-full">
          <FaArrowLeft className="size-4" />
        </Link>
        {params.slug.replace("%20", " ")}
      </header>

      <ChatContainer messages={messages} />
    </div>
  );
}
