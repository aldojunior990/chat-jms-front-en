export function ConnectionForm() {
  return (
    <form className="flex w-full justify-center gap-1 items-center" action="">
      <input
        type="text"
        placeholder="Insira seu nome de usuario"
        name=""
        id=""
        className="px-4 h-12 border"
      />
      <input
        type="submit"
        className="h-12 px-4 rounded-sm bg-primary text-white cursor-pointer"
        value="Conectar"
        name=""
        id=""
      />
    </form>
  );
}
