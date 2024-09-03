import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedNetworks } = location.state;
  const { address, chain } = useAccount();
  const tokenDetails = {
    Ethereum: { name: "eth", balance: 8232.36 },
    Arbitrum: { name: "arb", balance: 1123.53 },
    Polygon: { name: "matic", balance: 2.12 },
    Optimism: { name: "op", balance: 1.13 },
    Base: { name: "eth", balance: 432.56 },
    Hedera: { name: "eth", balance: 432.89 },
    Linea: { name: "eth", balance: 321.76 },
  };

  const [transferBalances, setTransferBalances] = useState(
    selectedNetworks.reduce((acc, network) => ({ ...acc, [network]: 0 }), {})
  );

  const tokens = selectedNetworks.map((network) => ({
    icon: network,
    name: "USDT",
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
  };

  const totalBalance = tokens.reduce(
    (sum, token) => sum + (token.transferBalance || 0),
    0
  );

  const handleBackClick = () => {
    navigate("/network");
  };

  const handleConfirmClick = () => {
    if (selectedNetworks.length > 0 && Object.keys(transferBalances).length > 0) {
      navigate("/receive", { state: { selectedNetworks, transferBalances } });
    } else {
      alert('Please select networks and transfer balances before confirming.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Confirm your transfer</h1>
      <div className="flex justify-between items-start space-x-4">
        {/* From Section */}
        <div className="w-1/2"> {/* Increased width */}
          <h2 className="text-xl font-semibold mb-4 text-center">From</h2>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Token</span>
              <span className="font-semibold">Wallet Balance</span>
              <span className="font-semibold">Transfer Balance</span>
              <span className="font-semibold">Final</span>
            </div>
            {tokens.map((token, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={`/images/${token.icon}.png`}
                    alt={`${token.icon} icon`}
                    className="w-6 h-6 mr-2"
                  />
                  <div>
                    <div className="font-semibold">{token.icon}</div>
                    <div className="text-sm text-gray-500">{token.name}</div>
                  </div>
                </div>
                <div>{token.balance}</div>
                <input
                  type="number"
                  value={token.transferBalance}
                  onChange={(e) => handleTransferChange(token.icon, e.target.value)}
                  className="border rounded px-2 py-1 w-20"
                />
                <div>{(token.balance - token.transferBalance).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="flex flex-col items-center justify-center w-16">
          <svg className="w-8 h-8 text-blue-500 animate-bounce-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        {/* To Section */}
        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-center">To</h2>
          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <ConnectButton showBalance={true} />
          </div>
        </div>
      </div>

      {/* Final Transfer Summary */}
      <div className="text-center text-lg font-semibold mt-8">
        Transfer <span className="text-red-500">{totalBalance.toFixed(2)} USDT</span><br />
        from {selectedNetworks.join(", ")} to <span className="text-red-500">{chain?.name}</span> chain address {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ''}.
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBackClick}
          className="bg-white text-black border border-gray-300 rounded-lg px-6 py-2 w-1/4"
        >
          Back
        </button>
        <button
          onClick={handleConfirmClick}
          className="bg-blue-500 text-white rounded-lg px-6 py-2 w-1/4"
        >
          Confirm
        </button>
      </div>

      <style>
        {`
          @keyframes bounce-right {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(10px); }
          }

          .animate-bounce-right {
            animation: bounce-right 1s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default App;
