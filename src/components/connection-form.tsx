type ConnectionFormProps = {
  isConnected: boolean;
  isLoading: boolean;
};

export function ConnectionForm({
  isConnected,
  isLoading,
}: ConnectionFormProps) {
  return (
    <form className="flex w-full justify-center gap-1 items-center" action="">
      <input
        type="text"
        placeholder="Insira seu nome de usuario"
        name=""
        id=""
        className="px-4 h-12 border"
      />
      <button
        type="submit"
        className={`h-12 rounded-sm text-white cursor-pointer w-24 text-sm ${
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
