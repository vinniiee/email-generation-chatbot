import styles from "./Chat.module.css";
import ReactMarkdown from "react-markdown";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! Let's help you create your email.",
};

export function Chat({ messages }) {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div key={index} className={styles.Message} data-role={role}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
