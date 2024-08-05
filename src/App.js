import { useState, useCallback,useMemo } from "react";
import { SupaBaseClient } from "./api/supabase/SupaBase";
import { clientes } from "./api/supabase/mock/client";
import { OpenAIClient } from "./api/openai/openAI";

import "./styles/App.css";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { ChatMessage } from "./components/ChatMessage/ChatMessage";
import { Arrow } from "./assets/Arrow";
import Loading from "./components/Loading/Loading";
import TypingIndicator from "./components/TypingIndicator/TypingIndicator";

const App = () => {
  const [cliente, setCliente] = useState(null);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [thread, setThread] = useState({});
  const [load, setLoad] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const SupabaseClient = useMemo(() => new SupaBaseClient(), []);
  const openaiClient = useMemo(() => new OpenAIClient(SupabaseClient), [SupabaseClient]);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setChat((prevChatLog) => [
      ...prevChatLog,
      { user: "user", message: input },
    ]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    const data = await openaiClient.chat(cliente, userInput, thread);
    setIsTyping(false);

    if (data?.message) {
      setChat((prevChatLog) => [
        ...prevChatLog,
        { user: "gpt", message: data.message },
      ]);
    }
    // console.log(data);
  }, [input, cliente, thread, openaiClient]);

  const firstMessage = useCallback(async (newClient, newThread) => {
    const message = "olá, preciso de ajuda";
    setChat((prevChatLog) => [
      ...prevChatLog,
      { user: "user", message },
    ]);

    const data = await openaiClient.chat(newClient, message, newThread);
    setLoad(false);

    if (data?.message) {
      setChat((prevChatLog) => [
        ...prevChatLog,
        { user: "gpt", message: data.message },
      ]);
    }
  }, [openaiClient]);

  const fetchClient = useCallback(async (clienteID) => {
    setLoad(true);
    setChat([]);

    const data = await SupabaseClient.getClienteById(Number(clienteID));
    const thread2 = await openaiClient.loadThread();
    setThread(thread2);
    setCliente(data);

    await firstMessage(data, thread2);
    setLoad(false);
  }, [SupabaseClient, openaiClient, firstMessage]);

  return (
    <div className="App">
      <SideMenu clientes={clientes} onSelectCliente={fetchClient} />

      <section className="chatbox">
        {load ? (
          <Loading />
        ) : (
          <>
            <div className="chat-log">
              {chat.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
            <div className="chat-input-holder">
              <form onSubmit={handleSubmit} className="form">
                <input
                  type="text"
                  placeholder="Mensagem ChatGPT"
                  className="chat-input-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className={`submit ${input ? "pointer" : ""}`}
                >
                  <Arrow fill={input} />
                </button>
              </form>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default App;
