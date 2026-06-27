function Sidebar({ createNewChat }) {
   return(
    <div className="sidebar">
        <h1>Sidebar</h1>
        <button className="new-chat" onClick={createNewChat}>+ New Chat</button>
        <div className="chat-list">
           <div className="chat-item">Mohit</div>
           <div className="chat-item">Rajesh</div>
           <div className="chat-item">Harsh</div>
           <div className="chat-item">Ankit</div>
        </div>
    </div>
   )
}
export default Sidebar;