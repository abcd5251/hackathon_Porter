import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { WagmiProvider } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Login";
import NetworkSelection from "./network/NetworkSelection";
import TransferPage from "./transfer/TransferPage";
import ReceivePage from "./receive/ReceivePage";
import XmtpChat from "./xmtp/XmtpChat";
import { config } from "./config/wagmiConfig";



const App: React.FC = () => {
  
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
              <Route path="/receive" element={<ReceivePage />} />
              <Route path="/xmtp" element={<XmtpChat />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;










