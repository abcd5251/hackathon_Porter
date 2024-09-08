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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* Banner Logo */}
      <img
        src="/images/banner.png"
        alt="Banner"
        style={{ width: "500px", marginBottom: "20px" }} 
      />

      {/* Logo */}
      <img
        src="/images/logo.png" 
        alt="Logo"
        style={{ width: "180px", marginBottom: "40px" }} 
      />

      {/* Description */}
      <p
        style={{
          textAlign: "center",
          padding: "0 12px",
          marginBottom: "50px",
          color: "rgb(26 55 31)",
          fontWeight: "bold",
        }}
      >
        Unlock the full potential of your idle USDC across multiple chains<br/>
        Efficiently transfer to a target chain for usage
      </p>

      {/* Connect Button */}
      <ConnectButton showBalance={true} />
    </div>
  );
};

export default Login;
