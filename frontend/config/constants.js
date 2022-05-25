import { name, address, network, deployer } from "./contractMeta.json";
const { abi } = require(`../artifacts/contracts/${name}.sol/${name}.json`);

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
}

export const CONTRACT_ABI = abi;
export const CONTRACT_ADDRESS = address;
export const DEPLOYER_ADDRESS = deployer;
export const DEPLOYED_NETWORK = NETWORKS[network];