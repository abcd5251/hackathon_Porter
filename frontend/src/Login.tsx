// Login.tsx
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Login: React.FC = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to NetworkSelection if the user is connected
    if (isConnected) {
      navigate("/network");
    }
  }, [isConnected, navigate]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <ConnectButton showBalance={true} />
    </div>
  );
};

export default Login;
