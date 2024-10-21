"use client";

import { ChatContainer } from "@/components/chat-container";
import { MessageProps } from "@/models/message";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ChatDetailsProps {
  params: { slug: string };
}

const defaultMessages: MessageProps[] = [
  {
    sender: "Alice",
    content: "Olá, como vai?",
    createdAt: new Date("2024-10-20T10:00:00"),
    receiver: "geral",
  },
  {
    sender: "Bob",
    content: "Estou bem, e você?",
    createdAt: new Date("2024-10-20T10:01:30"),
    receiver: "geral",
  },
  {
    sender: "Alice",
    content: "Tudo ótimo, obrigado!",
    createdAt: new Date("2024-10-20T10:02:00"),
    receiver: "geral",
  },
  {
    sender: "Charlie",
    content:
      "Oi pessoal, posso entrar na conversa?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:03:15"),
    receiver: "geral",
  },
  {
    sender: "Bob",
    content:
      "Claro, seja bem-vindo!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:04:00"),
    receiver: "geral",
  },
  {
    sender: "Charlie",
    content:
      "Oi pessoal, posso entrar na conversa?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:03:15"),
    receiver: "geral",
  },
  {
    sender: "Bob",
    content:
      "Claro, seja bem-vindo!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:04:00"),
    receiver: "geral",
  },
  {
    sender: "Charlie",
    content:
      "Oi pessoal, posso entrar na conversa?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:03:15"),
    receiver: "geral",
  },
  {
    sender: "Bob",
    content:
      "Claro, seja bem-vindo!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:04:00"),
    receiver: "geral",
  },
  {
    sender: "Charlie",
    content:
      "Oi pessoal, posso entrar na conversa?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:03:15"),
    receiver: "geral",
  },
  {
    sender: "Bob",
    content:
      "Claro, seja bem-vindo!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:04:00"),
    receiver: "geral",
  },
  {
    sender: "Charlie",
    content:
      "Oi pessoal, posso entrar na conversa?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:03:15"),
    receiver: "geral",
  },
  {
    sender: "Bob",
    content:
      "Claro, seja bem-vindo!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: new Date("2024-10-20T10:04:00"),
    receiver: "geral",
  },
];

export default function ChatDetails({ params }: ChatDetailsProps) {
  const [messages, setMessages] = useState<MessageProps[]>(defaultMessages);

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