"use client";
import { useAccountStore } from "@/store/account";
import { useEffect } from "react";

export const ConnectButton = () => {
  const { address, setAddress, isConnected, setIsConnected } =
    useAccountStore();

  useEffect(() => {
    checkConnectionOfUser();
  }, []);

  console.log(address);

  const checkConnectionOfUser = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setAddress(accounts[0]);
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
          setAddress(accounts[0]);
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
        <p>Connected Address: {address}</p>
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
