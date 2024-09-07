const Chatbox = ({ messages, setMessages }) => {
  return (
    <div className="fixed bottom-16 right-5 w-80 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">XMTP Recording</h3>
      </div>
      <div className="h-64 overflow-y-scroll border rounded p-2 bg-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              message.sender === "assistant"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbox;
