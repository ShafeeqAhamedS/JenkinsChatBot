import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react'; // Add send icon import
import { sendMessage as apiSendMessage } from './apis/api'; // Import sendMessage API
import { Textarea } from "@/components/ui/textarea"

function App() {
  const [messages, setMessages] = useState([]); // Add messages state
  const [input, setInput] = useState(''); // Add input state
  const [loading, setLoading] = useState(false); // Add loading state
  const textareaRef = useRef(null); // Add ref for textarea

  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true); // Set loading to true
    try {
      const data = await apiSendMessage(input);
      const botMessage = { sender: 'bot', text: data.response };
      console.log(data);
      console.log(botMessage);
      setMessages(prevMessages => [...prevMessages, botMessage]);
      // Update URL and history with data.unique_key
      // Example:
      // window.history.pushState(null, '', `/?key=${data.unique_key}`);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error appropriately
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      <div className="max-w-7xl w-[70vw] mx-auto p-8 text-center flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto messages mt-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === 'user'
                  ? 'self-end bg-gray-200 text-black  rounded-full max-w-[30%] min-w-fit ml-auto text-right'
                  : 'self-start w-1/2 mr-auto text-left'
              } rounded-lg p-2 m-2`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}
          {loading && ( // Render rhythm animation when loading is true
            <div className="self-start rounded-full max-w-[30%] mr-auto p-2 m-2">
              <div className="flex space-x-1">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>^</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>v</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>^</span>
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 w-full mt-4">
          <div className="relative">
            <Textarea
              ref={textareaRef} // Add ref
              value={input}
              onChange={handleInput} // Use handleInput
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full rounded-3xl px-4 py-4 pr-16 resize-none overflow-hidden" // Increased padding-right
              placeholder="Shoot your question..."
            />
            <Button 
              onClick={sendMessage}
              className="absolute right-3 bottom-3 bg-transparent"
              variant = "ghost"
            >
                <Send />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
