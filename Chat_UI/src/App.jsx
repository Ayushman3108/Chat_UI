import './App.css'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { useState } from 'react';

function App() {
  const createChat = () => ({
    id: Date.now(),
    title: "New chat",
    createdAt: new Date().toISOString(),
  });

  const [chats, setChats] = useState(() => {
    const firstChat = createChat();
    return [firstChat];
  });
  const [chatId, setChatId] = useState(() => chats[0].id);

  const createNewChat = () =>{
     const nextChat = createChat();
     setChats((previousChats) => [nextChat, ...previousChats]);
     setChatId(nextChat.id);
  };

  const selectChat = (id) => {
    setChatId(id);
  };

  const updateChatTitle = (id, title) => {
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === id && chat.title === "New chat"
          ? { ...chat, title }
          : chat
      )
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={chatId}
        createNewChat={createNewChat}
        selectChat={selectChat}
      />
      <ChatWindow chatId={chatId} updateChatTitle={updateChatTitle}/>
    </div>
  )
}

export default App;
