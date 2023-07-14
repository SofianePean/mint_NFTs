"use client";
import { CardNFTs } from "@/components/CardNFTs";
import { ConnectButton } from "@/components/ConnectButton/ConnectButton";
import { MintButton } from "@/components/MintButton";
import { NFTDescription } from "@/components/NFTDescription";
import { GG_ADDRESS } from "@/constants";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import GreedyGeese from "../artifacts/contracts/GreedyGeese.sol/GreedyGeese.json";
import { DataContract } from "./types/Contract";

export default function Home() {
  const [error, setError] = useState("");
  const [data, setData] = useState<DataContract>({} as DataContract);

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <main className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col items-center justify-between p-24">
      <ConnectButton />
      <span>{error}</span>
      <CardNFTs />

      <NFTDescription data={data} />
      <MintButton cost={data.cost} setError={setError} fetchData={fetchData} />
    </main>
  );
}
