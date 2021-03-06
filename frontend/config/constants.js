let contractMeta;
let artifact;

try {
    contractMeta = require("./contractMeta.json");
    artifact = require(`../artifacts/contracts/${contractMeta.name}.sol/${contractMeta.name}.json`);
} catch (e) {
    throw new Error("Could not load contractMeta or artifacts, did you forget to deploy your contract first?");
}

const { abi } = artifact;
const NETWORKS = {
    localhost: {
        name: "localhost",
        color: "#666666",
        chainId: 31337,
    },
    rinkeby: {
        name: "rinkeby",
        color: "#e0d068",
        chainId: 4,
    },
    ropsten: {
        name: "ropsten",
        color: "#F60D09",
        chainId: 3,
    },
    mumbai: {
        name: "mumbai",
        color: "#92D9FA",
        chainId: 80001,
    },
    goerli: {
        name: "goerli",
        color: "#00D0D0",
        chainId: 420,
    },
}

export const CONTRACT_ABI = abi;
export const CONTRACT_ADDRESS = contractMeta.address;
export const DEPLOYER_ADDRESS = contractMeta.deployer;
export const DEPLOYED_NETWORK = NETWORKS[contractMeta.network];