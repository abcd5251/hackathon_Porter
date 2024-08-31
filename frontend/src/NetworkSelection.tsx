import React, { useState } from "react";

const networks = [
  {
    name: "Ethereum",
    logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png",
  },
  {
    name: "Arbitrum",
    logo: "https://pbs.twimg.com/profile_images/1636368041188511745/CoZ-_TLh_400x400.png",
  },
  {
    name: "Polygon",
    logo: "https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png",
  },
  {
    name: "Optimism",
    logo: "https://moralis.io/wp-content/uploads/web3wiki/28optimism/637aee5401271816b742f1d0_01HdMDRzEw5i8L7vAxa2TtoWOFBrT8ybtRTaRv_InkE.jpeg",
  },
  {
    name: "Hedera",
    logo: "https://ethglobal.b-cdn.net/organizations/bdi3h/square-logo/default.png",
  },
];

const NetworkSelection: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Network</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {networks.map((network) => (
            <div
              key={network.name}
              className={`bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 ${
                selectedNetwork === network.name ? "border-2 border-purple-600" : ""
              }`}
              onClick={() => setSelectedNetwork(network.name)}
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
          <button className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50">
            Cancel
          </button>
          <button
            className={`bg-gray-200 text-gray-400 px-4 py-2 rounded-lg ${
              selectedNetwork ? "cursor-pointer hover:bg-purple-600 hover:text-white" : "cursor-not-allowed"
            }`}
            disabled={!selectedNetwork}
            onClick={() => alert(`Selected Network: ${selectedNetwork}`)}
          >
            Choose Network
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkSelection;
