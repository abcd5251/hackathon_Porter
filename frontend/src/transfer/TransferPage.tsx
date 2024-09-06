import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useTokenDetails } from "../context/TokenContext";
import Chatbox from "../xmtp/chatbotXTMP";

const TransferPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedNetworks } = location.state;
  const { address, chain } = useAccount();

  const { tokenDetails, setTokenDetails } = useTokenDetails();
  const [transferBalances, setTransferBalances] = useState(
    selectedNetworks.reduce((acc, network) => ({ ...acc, [network]: 0 }), {})
  );
  const [bestAchievePriceActive, setBestAchievePriceActive] = useState(true);
  const [showChat, setShowChat] = useState(false); // State for showing Chatbox
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "2024/9/07 Transfer 10 USDC from Avalanche, Optimism to Sepolia",
    },
  ]);

  useEffect(() => {
    if (bestAchievePriceActive) {
      handleBestAchievePrice();
    }
  }, [bestAchievePriceActive]);

  const tokens = selectedNetworks.map((network) => ({
    icon: network,
    name: tokenDetails[network]?.name || "USDC",
    balance: tokenDetails[network]?.balance || 0,
    transferBalance: transferBalances[network],
  }));

  const handleTransferChange = (network, value) => {
    const balance = tokenDetails[network]?.balance || 0;
    const transferValue = parseFloat(value);

    if (transferValue > balance) {
      alert(`Transfer balance for ${network} cannot exceed wallet balance!`);
      setTransferBalances((prev) => ({ ...prev, [network]: 0 }));
    } else {
      setTransferBalances((prev) => ({ ...prev, [network]: transferValue }));
    }
    setBestAchievePriceActive(false);
  };

  const handleBestAchievePrice = () => {
    const bestNetworks = ["Base", "Optimism", "Arbitrum", "Avalanche"];
    const newBalances = {};

    selectedNetworks.forEach((network) => {
      if (bestNetworks.includes(network)) {
        newBalances[network] = tokenDetails[network]?.balance || 0;
      } else {
        newBalances[network] = 0;
      }
    });

    setTransferBalances(newBalances);
    setBestAchievePriceActive(true);
  };

  const handleToggleBestAchievePrice = () => {
    if (bestAchievePriceActive) {
      // Reset all transfer balances to 0 when unchecked
      setTransferBalances(
        selectedNetworks.reduce((acc, network) => ({ ...acc, [network]: 0 }), {})
      );
    } else {
      handleBestAchievePrice();
    }
    setBestAchievePriceActive(!bestAchievePriceActive);
  };

  const totalBalance = tokens.reduce(
    (sum, token) => sum + (token.transferBalance || 0),
    0
  );

  const handleBackClick = () => {
    navigate("/network");
  };

  const handleConfirmClick = () => {
    if (
      selectedNetworks.length > 0 &&
      Object.keys(transferBalances).length > 0
    ) {
      const updatedTokenDetails = { ...tokenDetails };
      selectedNetworks.forEach((network) => {
        updatedTokenDetails[network].balance -= transferBalances[network];
      });
      setTokenDetails(updatedTokenDetails);

      // Add new message to Chatbox
      const newMessage = `2024/9/08 Transfer ${totalBalance} USDC from ${selectedNetworks.join(
        ", "
      )} to ${chain?.name}`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "assistant", text: newMessage },
      ]);

      navigate("/receive", { state: { selectedNetworks, transferBalances } });
    } else {
      alert("Please select networks and transfer balances before confirming.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-5xl font-bold text-center mb-6 text-gray-300">
        Confirm your transfer
      </h2>
      <div className="flex justify-between items-start space-x-4">
        {/* From Section */}
        <div className="w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-center">From</h2>
          <div className="border rounded-lg p-4">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b">
                  <th className="font-semibold text-gray-300">Token</th>
                  <th className="font-semibold text-gray-300">Wallet Balance</th>
                  <th className="font-semibold text-gray-300">Transfer Balance</th>
                  <th className="font-semibold text-gray-300">Final</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index} className="border-b">
                    <td className="flex items-center py-2">
                      <img
                        src={`/images/${token.icon}.png`}
                        alt={`${token.icon} icon`}
                        className="w-6 h-6 mr-2"
                      />
                      <div>
                        <div className="font-semibold">{token.icon}</div>
                        <div className="text-sm text-gray-500">
                          {token.name}
                        </div>
                      </div>
                    </td>
                    <td>{token.balance.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={token.transferBalance}
                        onChange={(e) =>
                          handleTransferChange(token.icon, e.target.value)
                        }
                        className="border rounded px-2 py-1 w-20"
                      />
                    </td>
                    <td>
                      {(token.balance - token.transferBalance).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="bestAchievePrice"
              checked={bestAchievePriceActive}
              onChange={handleToggleBestAchievePrice}
              className="mr-2"
            />
            <label htmlFor="bestAchievePrice" className="text-white">
              Best Achieve Price
            </label>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="flex flex-col items-center justify-center w-16 h-[312px]">
          <svg
            className="w-8 h-8 text-blue-500 animate-bounce-right"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>

        {/* To Section */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">To</h2>
          <div className="border rounded-lg p-4 w-200">
            <ConnectButton showBalance={true} />
          </div>
          <div className="text-lg font-semibold text-white mt-6">
            Transfer{" "}
            <span className="text-red-500">{totalBalance.toFixed(2)} USDT</span>
            <br />
            from {selectedNetworks.join(", ")} to{" "}
            <span className="text-red-500">{chain?.name}</span> chain address{" "}
            {address
              ? `${address.slice(0, 8)}...${address.slice(-6)}`
              : ""}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBackClick}
          className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
        >
          Back
        </button>
        <button
          onClick={handleConfirmClick}
          className="px-4 py-2 rounded-lg bg-yellow-600"
        >
          Confirm
        </button>
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

      <style>
        {`
        .animate-bounce-right {
          animation: bounce-right 1s infinite;
        }
        @keyframes bounce-right {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }
      `}
      </style>
    </div>
  );
};

export default TransferPage;
