import { useForm } from "react-hook-form";

type ConnectionFormProps = {
  isConnected: boolean;
  isLoading: boolean;
  establishConnection: (username: string) => void;
  closeConnection: () => void;
};

type FormValuesProps = {
  content: string;
};

export function ConnectionForm({
  isConnected,
  isLoading,
  establishConnection,
  closeConnection,
}: ConnectionFormProps) {
  const { register, handleSubmit } = useForm<FormValuesProps>();

  const onSubmit = (data: FormValuesProps) => {
    establishConnection(data.content);
  };

  return (
    <form
      className="flex w-full justify-center gap-1 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Insira seu nome de usuario"
        className="px-4 h-12 border"
        disabled={isConnected || isLoading}
        {...register("content")}
      />
      <button
        type="submit"
        className={`h-12 rounded-sm flex items-center justify-center text-white cursor-pointer w-24 text-sm hover:brightness-90 ${
          isConnected ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isLoading && (
          <span className="w-5 h-5 block bg-transparent border-4 border-t-4 border-t-transparent border-background rounded-full animate-spin"></span>
        )}

        {!isLoading && <>{isConnected ? "Desconectar" : "Conectar"}</>}
      </button>
    </form>
  );
}
