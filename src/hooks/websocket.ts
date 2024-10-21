class WebSocketConnection {
  private constructor(readonly socket: WebSocket) {
    this.socket = socket;
  }

  public static createConnection(username: string): WebSocketConnection {
    return new WebSocketConnection(
      new WebSocket(`ws://localhost:8080/chat?username=${username}`)
    );
  }
}

export async function createConnection(username: string): Promise<string> {
  const connection = WebSocketConnection.createConnection(username);

  return new Promise((resolve, reject) => {
    connection.socket.addEventListener("open", () => {
      console.log("Conexão estabelecida");
    });

    connection.socket.addEventListener("message", (event) => {
      console.log(event.data);
      // resolve(event.data);
    });

    connection.socket.addEventListener("error", (error) => {
      console.error("Erro na conexão WebSocket:", error);
      reject(error);
    });

    connection.socket.addEventListener("close", (event) => {
      console.log("Conexão WebSocket fechada:", event.reason);
    });
  });
}

// Exporta a classe WebSocketConnection junto com createConnection
export { WebSocketConnection };
