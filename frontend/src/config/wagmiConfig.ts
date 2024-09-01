import { rainbowWeb3AuthConnector } from "../RainbowWeb3authConnector";
import {
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from "wagmi";
import {
    sepolia,
    mainnet,
    polygon,
    arbitrum,
    optimism,
    hedera,
  } from "wagmi/chains";
import {
    getDefaultConfig,
} from "@rainbow-me/rainbowkit";

export const config = getDefaultConfig({
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