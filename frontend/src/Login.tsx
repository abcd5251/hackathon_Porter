import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Login: React.FC = () => {
  return (
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
  );
};

export default Login;
