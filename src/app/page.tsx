"use client";
import { CardNFTs } from "@/components/CardNFTs";
import { ConnectButton } from "@/components/ConnectButton";
import { Contract, ContractRunner, InterfaceAbi, ethers } from "ethers";
import { useEffect, useState } from "react";
import GreedyGeese from "../artifacts/contracts/GreedyGeese.sol/GreedyGeese.json";

interface DataContract {
  cost: string;
  totalSupply: string;
}

const GG_ADDRESS = "0xF047B7A4dE9311a9788F93a8e4050B0508d1De77";

export default function Home() {
  const [error, setError] = useState("");
  const [data, setData] = useState<DataContract>({} as DataContract);

  useEffect(() => {
    fetchData();
  }, []);

  const getSmartContract = (
    address: string,
    abi: InterfaceAbi,
    provider: ContractRunner
  ): Contract => new ethers.Contract(address, abi, provider);

  async function fetchData() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(
        GG_ADDRESS,
        GreedyGeese.abi,
        provider
      );

      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const data = {
          cost: ethers.formatEther(cost),
          totalSupply: String(totalSupply),
        };
        setData(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
  }

  async function mint() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getSmartContract(GG_ADDRESS, GreedyGeese.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: ethers.parseUnits(data.cost, "ether"),
        };
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        fetchData();
      } catch (err: any) {
        setError(err.message);
      }
    }
  }

  return (
    <main className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col items-center justify-between p-24">
      <ConnectButton />
      <CardNFTs />

      <h1 className="mt-8 text-5xl block sm:inline bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Mint a Greedy Gees NFT !
      </h1>
      <p className="text-2xl font-bold mt-4">{data.totalSupply} / 50</p>
      <p className="mt-8">
        Each Greedy Geese NFT costs {data.cost} eth (excluding gas fees)
      </p>

      <button
        className="rounded-full bg-green-500 py-2 px-4 mt-8"
        onClick={mint}
      >
        Mint now
      </button>
    </main>
  );
}
