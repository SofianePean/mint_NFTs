"use client";
import { useAccountStore } from "@/store/account";
import { useEffect, useState } from "react";
import {
  REQUIRED_NETWORK_ID,
  getAccountInfo,
  getChainId,
  shortenedAddress,
  switchNetworkToGoerli,
} from "./ConnectButtonUtils";

interface AccountInfo {
  networkName: string;
  balance: number;
}

export const ConnectButton = () => {
  const { address, setAddress, isConnected, setIsConnected } =
    useAccountStore();

  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    networkName: "",
    balance: 0,
  });

  useEffect(() => {
    checkConnectionOfUser();
  }, []);

  const checkConnectionOfUser = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setAddress(accounts[0]);

        const { networkName, balance } = await getAccountInfo(accounts[0]);

        setAccountInfo({
          networkName,
          balance,
        });
      }
    }
  };

  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        console.error("MetaMask is not installed.");
      }
      const chainId = await getChainId();

      if (chainId !== REQUIRED_NETWORK_ID) {
        const switchResult = await switchNetworkToGoerli();

        if (switchResult && switchResult.code === 4001) {
          console.log("Network switch request rejected");
          return;
        }
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setAddress(accounts[0]);

        const { networkName, balance } = await getAccountInfo(accounts[0]);

        setAccountInfo({
          networkName,
          balance,
        });
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="absolute top-4 right-4">
      {isConnected ? (
        <div className="flex justify-center items-center">
          <span className="uppercase ml-1 bg-pink-100 text-pink-800 text-base  mr-2 px-2.5 py-1 rounded ">
            {accountInfo.networkName}
          </span>
          <div className="flex justify-between items-center bg-blue-100 text-blue-800 text-base font-bold mr-2 px-0.5 py-0.5 rounded">
            <div className="mx-1">
              <span className="mr-1">{accountInfo.balance.toFixed(3)}</span>
              <span>ETH</span>
            </div>
            <div className="flex justify-between items-center bg-pink-800 text-white ml-1 text-base font-medium px-1.5 py-0.5 rounded">
              <p>{shortenedAddress(address)}</p>
            </div>
          </div>
        </div>
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
