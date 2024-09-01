import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import '../index.css';

import { networks } from "../config/networksConfig";

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
        <h2 className="text-2xl font-bold text-center mb-6">You want to transfer from</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {networks.slice(0, 7).map((network) => (
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
            className={`px-4 py-2 rounded-lg ${
              selectedNetworks.length > 0
                ? "bg-purple-600 text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={selectedNetworks.length === 0}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <div className="fixed top-0 right-5 m-4">
        <ConnectButton showBalance={true} />
      </div>
    </div>
  );
};

export default NetworkSelection;
