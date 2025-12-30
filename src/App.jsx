import { useState } from "react";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { ai } from "./apis/geminiApi";

function App() {
  const [messages, setMessages] = useState([]);

  async function handleContentSend(content) {
    setMessages((prevMessages) => [...prevMessages, { content, role: "user" }]);
    let response;
    async function main() {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
          systemInstruction: `Only create emails. If details are missing, ask clear follow-up questions.`,
        },
      });
      console.log(response.text);
    }
    await main();
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: response.text, role: "assistant" },
    ]);
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
