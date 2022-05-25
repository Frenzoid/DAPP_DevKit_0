import Head from 'next/head';

import Web3Modal from "web3modal";

import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS, DEPLOYED_NETWORK } from "../config/constants";


export default function Home() {

  const [web3provider, setWeb3provider] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const [onTransaction, setOnTransaction] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(true);
  const [greeter, setGreeter] = useState(null);
  const newGreet = useRef(null);


  const connect = async () => {
    const web3mod = getWeb3Modal();
    const provider = await web3mod.connect();

    // When provider changes, calls init();
    setWeb3provider(provider);
    setWalletConnected(true);
  }

  // Web3 Functions.
  const getWeb3Modal = () => {
    console.log(DEPLOYED_NETWORK);
    const web3mod = new Web3Modal({
      network: DEPLOYED_NETWORK.name,
      cacheProvider: true,
      displayNoInjectedProvider: true,
      providerOptions: {},
    });

    return web3mod;
  }

  const getEthersProvider = () => {
    const provider = new providers.Web3Provider(web3provider);
    return provider;
  }

  const getSigner = () => {
    const provider = getEthersProvider();
    const signer = provider.getSigner();
    return signer;
  }

  const getContract = () => {
    const signer = getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    return contract;
  }

  // Behaviours
  const init = () => {
    // When new provider is connected, check network.
    checkNetwork();

    // Set events.
    web3provider.on('chainChanged', _ => { console.log("chainChanged"); checkNetwork(); });
  }

  const checkNetwork = async () => {
    const signer = getSigner();
    if (await signer.getChainId() !== DEPLOYED_NETWORK.chainId)
      setWrongNetwork(true)
    else setWrongNetwork(false);
  }

  // Use effects.
  // Uncomment to connect when page loads.
  /*
  useEffect(() => {
    // Connect when page loads.
    if (!walletConnected) connect();
  });
  */

  useEffect(() => {
    // If provider changes, initializes new provider.
    if (web3provider) init();
  }, [web3provider]);

  useEffect(() => {
    // If we are in the current network, request data to contract.
    if (!wrongNetwork) {
      greet();
    }
  }, [wrongNetwork]);


  // Contract functions.
  const setGreeting = async () => {
    if (newGreet.current.value) {
      const contract = getContract();
      const tx = await contract.setGreeting(newGreet.current.value);

      setOnTransaction(true);
      await tx.wait();
      setOnTransaction(false);

      greet();
    }
  }

  const greet = async (e) => {
    const contract = getContract();
    const greeting = await contract.greet();
    setGreeter(greeting);
  }


  // Components render.
  const renderLoadingGif = () => {
    if (onTransaction)
      return (
        <div className={"text-center"} >
          <img width="50%"
            src="./loading.gif" alt="Loading..." />
        </div>
      );
  }

  const renderConnectButton = () => {
    if (!walletConnected) {
      return (
        <button className={"btn btn-primary mt-4 mx-auto"} onClick={connect}>
          Connect Wallet
        </button>
      )
    }
  }

  const renderWrongNetworkError = () => {
    if (walletConnected && wrongNetwork) {
      return (
        <div className={"alert alert-warning text-center"} role="alert">
          Wrong network selected, please switch to <a href="#" className={"alert-link"}>{DEPLOYED_NETWORK.name}</a>.
        </div>
      );
    }
  }

  const renderBody = () => {
    if (walletConnected && !wrongNetwork) {
      return (
        <div>
          <h1 className={"text-center mt-2 mb-2"}>{greeter}</h1>
          <div className={"input-group mb-3"}>
            <input type="text" ref={newGreet} className={"form-control"} />
            <div className={"input-group-append"}>
              <button className={"btn btn-primary"} type="button" onClick={setGreeting}>Set Greeter</button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Main return.
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {renderWrongNetworkError()}
      <div className={"container"}>
        {renderBody()}
        {renderConnectButton()}
        {renderLoadingGif()}
      </div>
    </div>
  )


}
