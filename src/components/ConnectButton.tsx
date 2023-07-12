"use client";
import { useEffect, useState } from "react";

export const ConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setCurrentAddress(accounts[0]);
      }
    }
  };

  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setIsConnected(true);
          setCurrentAddress(accounts[0]);
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      {isConnected ? (
        <p>Connected Address: {currentAddress}</p>
      ) : (
        <button
          className="rounded-full bg-neutral-500 text-white py-2 px-4"
          onClick={connectToMetaMask}
        >
          Connect to MetaMask
        </button>
      )}
    </div>
  );
};
