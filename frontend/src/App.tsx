import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { rainbowWeb3AuthConnector } from "./RainbowWeb3authConnector";
import {
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  sepolia,
  mainnet,
  polygon,
  arbitrum,
  optimism,
  hedera,
} from "wagmi/chains";
import { useState } from "react";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "04309ed1007e77d1f119b85205bb779d",
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, hedera],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hedera.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [rainbowWeb3AuthConnector],
    },
    {
      groupName: "Others",
      wallets: [metaMaskWallet, walletConnectWallet, rainbowWallet],
    },
  ],
});

const queryClient = new QueryClient();

export default function App() {
  const [selectedNetwork, setSelectedNetwork] = useState(null);

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

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}>
              <ConnectButton showBalance={true} />
          </div>
          <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
            {/* Centered Network Selection */}
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
                    style={{ width: "120px", height: "160px" }} // Adjust width and height
                  >
                    <img
                      src={network.logo}
                      alt={`${network.name} logo`}
                      className="w-16 h-16 mb-2 object-cover"
                      style={{ width: "48px", height: "48px" }} // Set fixed size for images
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
