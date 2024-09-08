const ethers = require('ethers');
const fs = require('fs');

configPath = "./chainsConfig.json";
const chainConfigs = JSON.parse(fs.readFileSync(configPath, "utf8"));

const abiPath = "./contractABI.json";
const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

// const providers = chainConfigs.map(chain => ({
//   name: chain.name,
//   provider: new ethers.providers.JsonRpcProvider(chain.rpc),
//   contract: new ethers.Contract(chain.contract, contractABI, new ethers.providers.JsonRpcProvider(chain.rpc)),
// }));

console.log(chainConfigs);

let call = {
    dstEid: 101, // target chain Endpoint ID 
    target: "0xTargetContractAddress", 
    calldata: "yourCalldata", 
    option: "0x",
    fee: {
        nativeFee: ethers.utils.parseEther("0.01"), 
        lzTokenFee: ethers.utils.parseUnits("10", 18) 
    }
}

let crossChainData = [
    {
        chainName: "Arbitrum Sepolia",
        calldata: "0x"
    },
    {
        chainName: "Optimism Sepolia",
        calldata: "0x"
    }
];

console.log(crossChainData[0].chainName);
let calls = [];

async function procesCall(crossChainData, targetChainName) {
    let targetNbr = -1;
    for (let i = 0; i < crossChainData.length; i++) {
        for (let j = 0; j < chainConfigs.length; j++) {
            if (targetChainName==chainConfigs[j].name) {
                targetNbr = j;
            }
            if (chainConfigs[j].name == crossChainData[i].chainName) {
                call.dstEid = chainConfigs[j].eid;
                call.target = chainConfigs[j].contract;
                call.calldata = crossChainData[i].calldata;
                console.log(call);
                calls.push(call);
            }
        }
    }
    if (targetNbr == -1) {
        console.log("Target chain not found");
        return;
    }

    if (calls.length == 0) {
        console.log("Source chain not found");
        return;
    }
    sendCrossChainTxn(targetNbr);
}

async function sendCrossChainTxn(targetNbr) {
    const provider = new ethers.providers.JsonRpcProvider(chainConfigs[targetNbr].rpc);

    // use private key to sign a transaction
    const wallet = new ethers.Wallet("3e1c59de146cfa09fff46f82c4502ae57387093379c857555800f9cb8cbdbb3b", provider);
    
    const contract = new ethers.Contract(chainConfigs[targetNbr].contract, contractABI, wallet);
    
    try {
        console.log(calls)
        const tx = await contract.send(calls, {value: ethers.utils.parseEther("0")}); // 可以設置 value 為跨鏈消息支付的額外費用
        console.log("Transaction sent, hash:", tx.hash);
        
        const receipt = await tx.wait();
        console.log("Transaction confirmed, receipt:", receipt);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

procesCall(crossChainData, "Sepolia");


// // listen events
// providers.forEach(({ name, contract }) => {
//   contract.on('ApproveOp', (target, calldataHash, calldata) => {
//     console.log(`${name}: Event received - Target: ${target}, Calldata Hash: ${calldataHash}`);
//     console.log("Event Detected:");
//     console.log("Target Address:", target);
//     console.log("Calldata Hash:", calldataHash);
//     console.log("Calldata:", calldata);
//     // handle UserOperation
//     sendUserOperation(contract, target, calldata);
//   });
// const call = [
//     {
//         dstEid: 101, // target chain Endpoint ID 
//         target: "0xTargetContractAddress", // target address
//         calldata_: yourCalldata, // use web3.js
//         option: "0x", 
//         fee: {
//             nativeFee: ethers.utils.parseEther("0.01"), 
//             lzTokenFee: ethers.utils.parseUnits("10", 18) 
//         }
//     }
// ];

// async function procesCall(){


// }
