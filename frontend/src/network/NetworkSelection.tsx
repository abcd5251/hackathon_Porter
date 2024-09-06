import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { networks } from "../config/networksConfig";
import { useTokenDetails } from "../context/TokenContext";
import Chatbox from "../xmtp/chatbotXTMP";

const NetworkSelection: React.FC = () => {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);
  const navigate = useNavigate();
  const { tokenDetails } = useTokenDetails();
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "2024/9/07 Transfer 10 USDC from Avalanche, Optimism to Sepolia",
    },
  ]);

  const toggleNetworkSelection = (networkName: string) => {
    setSelectedNetworks((prev) =>
      prev.includes(networkName)
        ? prev.filter((name) => name !== networkName)
        : [...prev, networkName]
    );
  };

  const handleCancel = () => {
    setSelectedNetworks([]);
    setTokenAmount("");
  };

  const handleNext = () => {
    navigate("/transfer", { state: { selectedNetworks, tokenAmount } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[650px]">
        <h2 className="text-5xl font-bold text-center mb-6 text-black">Choose Network</h2>
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Enter the token amount you want to receive
        </h2>
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="Enter token amount"
          className="w-full p-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-black">You want to transfer from</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {networks.slice(0, 8).map((network) => (
            <div
              key={network.name}
              className={`bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 ${
                selectedNetworks.includes(network.name) ? "border-4 border-black" : ""
              }`}
              onClick={() => toggleNetworkSelection(network.name)}
              style={{ width: "120px", height: "160px" }}
            >
              <img
                src={network.logo}
                alt={`${network.name} logo`}
                className="w-16 h-16 mb-2 object-cover"
                style={{ width: "48px", height: "48px" }}
              />
              <span className="text-gray-700 text-center">{network.name}</span>
              <div className="mt-2 bg-white rounded-lg shadow p-1 text-sm text-gray-700">
                USDC: {tokenDetails[network.name]?.balance.toFixed(2) || 0}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-200">
          <button
            className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
            onClick={handleCancel}
          >
            Reset
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedNetworks.length > 0 && tokenAmount
                ? "bg-yellow-600 text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedNetworks.length === 0 || !tokenAmount}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* Chat Button */}
      <button
        className="fixed bottom-5 right-5 bg-purple-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowChat((prev) => !prev)}
      >
        💬 XMTP Recording
      </button>

      {/* Chatbox */}
      {showChat && <Chatbox messages={messages} setMessages={setMessages} />}

      <div className="fixed top-0 right-5 m-4">
        <ConnectButton showBalance={true} />
      </div>
      <div className="fixed top-0 left-5 m-4">
        <img src="/images/logo.jpg" alt="Logo" className="w-16 h-16" />
      </div>
    </div>
  );
};

export default NetworkSelection;
