import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import '../index.css';

const networks = [
  { name: "Ethereum", logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png" },
  { name: "Arbitrum", logo: "https://pbs.twimg.com/profile_images/1636368041188511745/CoZ-_TLh_400x400.png" },
  { name: "Polygon", logo: "https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png" },
  { name: "Optimism", logo: "https://moralis.io/wp-content/uploads/web3wiki/28optimism/637aee5401271816b742f1d0_01HdMDRzEw5i8L7vAxa2TtoWOFBrT8ybtRTaRv_InkE.jpeg" },
  { name: "Base", logo: "https://rdbk.rootdata.com/uploads/public/b6/1677162284082.jpg" },
  { name: "Hedera", logo: "https://ethglobal.b-cdn.net/organizations/bdi3h/square-logo/default.png" },
  { name: "Linea", logo: "https://image.theblockbeats.info/headimage/2023-08-09/395e01b67465ed3a55ff13786ab6a650d013d6e5.png?x-oss-process=image/quality,q_50/format,webp" },
];

const NetworkSelection: React.FC = () => {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleNetworkSelection = (networkName: string) => {
    setSelectedNetworks((prev) =>
      prev.includes(networkName)
        ? prev.filter((name) => name !== networkName)
        : [...prev, networkName]
    );
  };

  const handleCancel = () => {
    setSelectedNetworks([]);
  };

  const handleNext = () => {
    navigate("/transfer", { state: { selectedNetworks } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Network</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {networks.slice(0, 6).map((network) => (
            <div
              key={network.name}
              className={`bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 ${
                selectedNetworks.includes(network.name) ? "border-2 border-purple-600" : ""
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
                Amount: 0.00
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`bg-gray-200 text-gray-400 px-4 py-2 rounded-lg ${
              selectedNetworks.length > 0 ? "cursor-pointer hover:bg-purple-600 hover:text-white" : "cursor-not-allowed"
            }`}
            disabled={selectedNetworks.length === 0}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex items-center mt-6">
        <ConnectButton showBalance={true} />
      </div>
    </div>
  );
};

export default NetworkSelection;
