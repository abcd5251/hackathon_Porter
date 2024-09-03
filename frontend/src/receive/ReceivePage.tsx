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
      }
    };
    processNetworksSequentially();
  }, [selectedNetworks]);

  useEffect(() => {
    if (status.every(s => s === 'Successful')) {
      setAllSuccessful(true);
      toast.success('All the tokens are successfully bridging to the target chain! 🦄');
    }
  }, [status]);

  const handleReturn = () => {
    navigate('/network');
  };

  if (selectedNetworks.length === 0) {
    return <div>Invalid navigation, no networks selected!</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Receive Tokens</h1>
      <div className="flex justify-between items-start space-x-4">
        
        {/* Tokens Section */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">Tokens</h2>
          <div className="border rounded-lg p-4">
            {selectedNetworks.map((network, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={`/images/${network}.png`}
                    alt={`${network} icon`}
                    className="w-6 h-6 mr-2"
                  />
                  <div>
                    <div className="font-semibold">{network}</div>
                    <div className="text-sm text-gray-500">USDT</div>
                  </div>
                </div>
                <div className="text-lg">{transferBalances[network]} USDT</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows Section */}
        <div className="w-1/6 flex flex-col justify-center items-center">
          {selectedNetworks.map((_, index) => (
            <div key={index} className="flex flex-col items-center mb-8">
              <span className="text-gray-600 text-sm mb-2">{status[index]}</span>
              <svg className={`w-8 h-8 text-blue-500 ${status[index] === 'transferring' ? 'animate-bounce-right' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          ))}
        </div>

        {/* Receiving Chain Section */}
        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-4 text-center">Receiving Chain</h2>
          <div className="border rounded-lg p-4 flex flex-col space-y-4">
            <ConnectButton showBalance={true} />
          </div>
          <div className="text-center text-lg font-semibold mt-8">
            Receiving <span className="text-red-500">{Object.values(transferBalances).reduce((a, b) => a + b, 0)} USDT</span><br />
            on {chain?.name} chain at address {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ''}.
          </div>
        </div>
      </div>

      {/* Conditionally render the Return button if all are successful */}
      {allSuccessful && (
        <div className="text-center mt-8">
          <button
            onClick={handleReturn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Return
          </button>
        </div>
      )}

      <ToastContainer
        position="top-center"
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
    </div>
  );
};

export default ReceivePage;
