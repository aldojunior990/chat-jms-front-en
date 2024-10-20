import Link from "next/link";
import { IoIosChatboxes } from "react-icons/io";
import { FaUser } from "react-icons/fa";

type ChatLinkProps = {
  title: string;
  isUser: boolean;
};

export function ChatLink({ isUser, title }: ChatLinkProps) {
  return (
    <Link href={`/chat/${title}`} className="w-full flex flex-col">
      <div className="p-4 flex items-center gap-4 font-normal text-md hover:bg-gray-100">
        {!isUser && <IoIosChatboxes className="size-5" />}
        {isUser && <FaUser className="size-5" />}
        {title}
      </div>
      <hr className="w-full" />
    </Link>
  );
}
