import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReceivePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedNetworks = [], transferBalances = {} } = location.state || {};
  const { address, chain } = useAccount();
  
  const [status, setStatus] = useState(Array(selectedNetworks.length).fill('transferring'));
  const [allSuccessful, setAllSuccessful] = useState(false);

  const sendApiRequest = async (network, index) => {
    
    try {
      const response = await axios.post('https://shines-server.onrender.com/process_text', {
        twitter_acount: network,
        content: 'bb',
      });
      await new Promise(resolve => setTimeout(resolve, 3000));

      if (response.status === 200) {
        
        setStatus(prevStatus => {
          const newStatus = [...prevStatus];
          newStatus[index] = 'Successful';
          return newStatus;
        });
        
      }
    } catch (error) {
      console.error(`Error sending data to ${network}:`, error);
    }
    
  };

  useEffect(() => {
    const processNetworksSequentially = async () => {
      for (let i = 0; i < selectedNetworks.length; i++) {
        await sendApiRequest(selectedNetworks[i], i);
        // Show toast notification after each successful transfer
        toast.success(`${selectedNetworks[i]} transfer successfully!`);
      }
    };
    processNetworksSequentially();
  }, [selectedNetworks]);

  useEffect(() => {
    if (status.every(s => s === 'Successful')) {
      setAllSuccessful(true);
    }
  }, [status]);

  const handleReturn = () => {
    navigate('/network');
  };

  if (selectedNetworks.length === 0) {
    return <div>Invalid navigation, no networks selected!</div>;
  }

  return (
    
    <div className="w-full mx-auto p-4 max-w-[650px]">
      <h2 className="text-5xl font-bold text-center mb-6 text-gray-300">Receive Tokens</h2>
      <div className="flex justify-between items-start space-x-4">
        
        {/* Tokens Section */}
        <div className="w-3/4">  {/* Increased size to 3/4 */}
          <h2 className="text-xl font-semibold mb-4 text-center">Tokens</h2>
          <div className="border rounded-lg p-4">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Network</th>
                  <th className="px-4 py-2 text-left">Token</th>
                  <th className="px-4 py-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {selectedNetworks.map((network, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 flex items-center">
                      <img
                        src={`/images/${network}.png`}
                        alt={`${network} icon`}
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-semibold">{network}</span>
                    </td>
                    <td className="px-4 py-2">USDC</td>
                    <td className="px-4 py-2 text-right">{transferBalances[network]} USDC</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Arrows Section */}
        <div className="flex flex-col items-center justify-center w-16 h-[312px]">
          <svg className="w-8 h-8 text-blue-500 animate-bounce-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        {/* Receiving Chain Section */}
        <div className="w-2/3">
          <h2 className="text-xl font-semibold mb-4 text-center">Receiving Chain</h2>
          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <ConnectButton showBalance={true} />
          </div>
          <div className="text-lg font-semibold mt-6 text-white">
            Receiving <span className="text-red-500">{Object.values(transferBalances).reduce((a, b) => a + b, 0)} USDC</span><br />
            on {chain?.name} chain at address {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ''}
          </div>
        </div>
      </div>

      {/* Conditionally render the Return button if all are successful */}
      {allSuccessful && (
        <div className="text-center mt-8">
          <button
            onClick={handleReturn}
            className="px-4 py-2 rounded-lg bg-yellow-600"
          >
            Home
          </button>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <style>
        {`
          @keyframes bounce-right {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(10px); }
          }

          .animate-bounce-right {
            animation: bounce-right 1s infinite;
          }
        `}
      </style>
      <div className="fixed top-0 left-5 m-4">
        <img src="/images/logo.jpg" alt="Logo" className="w-16 h-16" />
      </div>
    </div>
    
  );
};

export default ReceivePage;
