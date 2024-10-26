"use client";

import { ChatContainer } from "@/components/chat-container";
import { useAppContext } from "@/context/AppContext";
import { AvaliableChats } from "@/models/models";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ChatDetailsProps {
  params: { slug: string };
}

export default function ChatDetails({ params }: ChatDetailsProps) {
  const { isConnected, avaliableChats } = useAppContext();

  const { push } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
  }, [isConnected, push]);

  const [currentChat, setCurrentChat] = useState<AvaliableChats>();

  useEffect(() => {
    const currentChat = avaliableChats.find(
      (it) => it.user.id === params.slug.replace("%20", " ")
    );

    if (currentChat) {
      setCurrentChat(currentChat);
    } else {
      return push("/");
    }
  }, [avaliableChats, params.slug]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start py-8 px-2 md:px-16 lg:px-80 text-onBackground bg-background">
      <header className="w-full gap-4 flex items-center py-3 justify-start border-b border-b-gray-200 text-onBackground font-medium">
        <Link href={"/"} className="p-4 hover:bg-gray-100 rounded-full">
          <FaArrowLeft className="size-4" />
        </Link>
        {currentChat?.user.id === "1"
          ? "Chat geral"
          : currentChat?.user.username}
      </header>
      <ChatContainer
        messages={currentChat?.messages ? currentChat.messages : []}
        currentChat={
          currentChat?.user ? currentChat.user : { id: "", username: "" }
        }
      />
    </div>
  );
}
