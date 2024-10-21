'use client'
import React, { useState, useEffect } from 'react';

interface Message {
  type: string;
  content: string;
  sender: string;
  receiver: string;
}

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Conectar ao WebSocket ao montar o componente
    const newSocket = new WebSocket(`ws://localhost:8080/chat?username=${username}`);

    newSocket.onopen = () => {
      console.log(`Conexão estabelecida como ${username}`);
    };

    newSocket.onmessage = (event) => {
      const response: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, response]);
      console.log(`Resposta recebida -> ${response}`);
    };

    newSocket.onerror = (error) => {
      console.error(`Erro na conexão: ${error}`);
    };

    newSocket.onclose = () => {
      console.log('Conexão encerrada');
    };

    setSocket(newSocket);

    // Limpar a conexão ao desmontar o componente
    return () => {
      newSocket.close();
    };
  }, [username]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && message) {
      const payload: Message = {
        type: 'topic',
        content: message,
        sender: username,
        receiver: 'aldo', // Nome do usuário utilizado como exemplo para o campo "queue"
      };

      socket.send(JSON.stringify(payload));
      console.log(`Mensagem enviada -> ${payload}`);
      setMessage('');
    }
  };

  return (
    <div className='bg-neutral-800 min-h-screen'>
      <h1>Chat WebSocket</h1>
      <input
      className='bg-neutral-600'
        type="text"
        placeholder="Digite seu nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <form onSubmit={sendMessage}>
        <input
        className='bg-neutral-600'
          type="text"
          placeholder="Digite sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{`${msg.sender}: ${msg.content}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
