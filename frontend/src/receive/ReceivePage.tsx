import React from 'react';
import { useLocation } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';

const ReceivePage = () => {
  const location = useLocation();
  const { selectedNetworks = [], transferBalances = {} } = location.state || {};
  const { address, chain } = useAccount();

  if (selectedNetworks.length === 0) {
    return <div>Invalid navigation, no networks selected!</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Receive Tokens</h1>
      <div className="flex justify-between items-start space-x-4">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">Tokens</h2>
          <div className="border rounded-lg p-4">
            {selectedNetworks.map((network, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={`/images/${network}.png`}
                    alt={`${network} icon`}
                    className="w-6 h-6 mr-2"
                  />
                  <div>
                    <div className="font-semibold">{network}</div>
                    <div className="text-sm text-gray-500">USDT</div>
                  </div>
                </div>
                <div className="text-lg">{transferBalances[network]} USDT</div>
                <i className="fas fa-arrow-right ml-4"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-center">Receiving Chain</h2>
          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <ConnectButton showBalance={true} />
          </div>
          <div className="text-center text-lg font-semibold mt-8">
            Receiving <span className="text-red-500">{Object.values(transferBalances).reduce((a, b) => a + b, 0)} USDT</span><br />
            on {chain?.name} chain at address {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ''}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceivePage;
