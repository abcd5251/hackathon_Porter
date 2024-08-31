import { useLocation } from 'react-router-dom';

const TransferPage: React.FC = () => {
  const location = useLocation();
  const { selectedNetworks } = location.state;

  return (
    <div>
      <h1>Selected Networks</h1>
      <ul>
        {selectedNetworks.map(network => (
          <li key={network}>{network}</li>
        ))}
      </ul>
      {/* Your transfer functionality here */}
    </div>
  );
};

export default TransferPage;
