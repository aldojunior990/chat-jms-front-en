import { ConnectionForm } from "@/components/connection-form";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center  bg-background text-primary">
      <ConnectionForm />
    </div>
  );
}
