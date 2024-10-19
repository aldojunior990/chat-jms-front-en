export function ConnectionForm() {
  return (
    <form className="flex w-full justify-center gap-1 items-center" action="">
      <input
        type="text"
        placeholder="Insira seu nome de usuario border"
        name=""
        id=""
        className="px-4 h-12"
      />
      <input
        type="submit"
        className="h-12 px-4 rounded-sm bg-primary text-white"
        value="Conectar"
        name=""
        id=""
      />
    </form>
  );
}
