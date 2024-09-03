import React, { useState, useMemo } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

const SendMessage = () => {
  const { address, chain } = useAccount();
  
  const signer = useMemo(() => Wallet.createRandom(), []);
  
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      if (!address || !signer) {
        alert('Please connect your wallet.');
        return;
      }
      
      const xmtp = await Client.create(signer, { env: "dev" });
      console.log("Client created", xmtp.address);

      const conversation = await xmtp.conversations.newConversation(recipient);
      await conversation.send(message);
      alert('Message sent!');
    } catch (error) {
      alert('Failed to send the message: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Send a Message</h2>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
      <div>
          <ConnectButton showBalance={true} />
      </div>
    </div>
  );
};

export default SendMessage;
