import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function requestAccount() {
    console.log('Requesting account...');

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setWalletAddress(accounts[0]);
        setIsLoggedIn(true);
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('Meta Mask not detected');
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(walletAddress);
      setBalance(ethers.utils.formatEther(balance));
    }
  }

  useEffect(() => {
    if (walletAddress) {
      connectWallet();
    }
  }, [walletAddress]);

  function logout() {
    setWalletAddress("");
    setBalance("");
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={isLoggedIn ? logout : requestAccount}>
          {isLoggedIn ? "Logout" : "Connect Wallet"}
        </button>
        <h3>Wallet address: {walletAddress}</h3>
        <h3>Balance: {walletAddress ? balance + " ETH" : ""}</h3>
      </header>
    </div>
  );
}

export default App;
