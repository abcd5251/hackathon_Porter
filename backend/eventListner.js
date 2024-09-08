const ethers = require('ethers');
const fs = require('fs');

configPath = "./chainsConfig.json";
const chains = JSON.parse(fs.readFileSync(configPath, "utf8"));

const abiPath = "./contractABI.json";
const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

const providers = chains.map(chain => ({
  name: chain.name,
  provider: new ethers.providers.JsonRpcProvider(chain.rpc),
  contract: new ethers.Contract(chain.contract, contractABI, new ethers.providers.JsonRpcProvider(chain.rpc)),
}));




// Listen ApproveOp events
providers.forEach(({ name, contract }) => {
  contract.on('ApproveOp', (target, calldataHash, calldata) => {
    console.log(`${name}: Event received - Target: ${target}, Calldata Hash: ${calldataHash}`);
    console.log("Event Detected:");
    console.log("Target Address:", target);
    console.log("Calldata Hash:", calldataHash);
    console.log("Calldata:", calldata);
    // Handle events and generate UserOperation
    sendUserOperation(contract, target, calldata);
  });
});

// Handle ApproveOp function
async function sendUserOperation(contract, sender, calldata) {
  // Construct UserOperation

  userOperation.params[0].sender = sender;
  userOperation.params[0].callData = calldata;

  try {
    const response = await fetch(contract.Bundler, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendUserOperation)
    });

    const data = await response.json();
    let paymasterAndData = data.paymasterAndData;
    let preVerificationGas = data.preVerificationGas;
    let maxFeePerGas = data.maxFeePerGas;
    let maxPriorityFeePerGas = data.maxPriorityFeePerGas;

  } catch (error) {

  }
}


// let userOperation = {
//   "jsonrpc": "2.0",
//   "id": 0,
//   "method": "pm_sponsorUserOperation",
//   "params": [
//     {
//       sender: "0x2c298CcaFF..c236fCC66dB2",
//       nonce: "0x17",
//       initCode: "0x",
//       callData: "0xf3....0000",
//       callGasLimit: "0x12a87",
//       verificationGasLimit: "0x1a332",
//       preVerificationGas: "0xe95c",
//       maxFeePerGas: "0x5f4ecdc0",
//       maxPriorityFeePerGas: "0x59682f00",
//       paymasterAndData: "0x",
//       signature: "0x"
//     },
//     "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
//   ]
// }

const userOperation = await kernelClient.prepareUserOperationRequest({
  userOperation: {
      
      callData: await account.encodeCallData({
          to: zeroAddress,
          value: BigInt(0),
          data: "0x"
      })
  },
  account: kernelClient.account,
})

const erc20Amount = await paymasterClient.estimateGasInERC20({
  userOperation,
  gasTokenAddress: gasTokenAddresses[chain.id]["USDC"]
})
