import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { rainbowWeb3AuthConnector } from "./RainbowWeb3authConnector";
import {
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import {
  sepolia,
  mainnet,
  polygon,
  arbitrum,
  optimism,
  hedera,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Login";
import NetworkSelection from "./network/NetworkSelection";
import TransferPage from "./transfer/transferPage";

const App: React.FC = () => {

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
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/network" element={<NetworkSelection />} />
              <Route path="/transfer" element={<TransferPage />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;










