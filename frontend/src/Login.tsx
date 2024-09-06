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
      {/* Logo */}
      <img
        src="/images/logo.jpg" // Ensure this path points to your logo
        alt="Logo"
        style={{ width: "200px", marginBottom: "100px" }} // Adjust size as needed
      />

      {/* Description */}
      <p
        style={{
          textAlign: "center",
          marginBottom: "50px",
          padding: "0 10px",
          color: "#ffffff",
          fontWeight: "bold", // Bold text
        }}
      >
        Unlock the full potential of your idle USDC across multiple chains
      </p>
      <p
        style={{
          textAlign: "center",
          marginBottom: "50px",
          padding: "0 10px",
          color: "#ffffff",
          fontWeight: "bold", // Bold text
        }}
      >
        Efficiently transfer to a target chain for usage
      </p>

      {/* Connect Button */}
      <ConnectButton showBalance={true} />
    </div>
  );
};

export default Login;
