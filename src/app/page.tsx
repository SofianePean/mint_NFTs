"use client";
import { Contract, ContractRunner, InterfaceAbi, ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import GreedyGeese from "../artifacts/contracts/GreedyGeese.sol/GreedyGeese.json";

interface DataContract {
  cost: string;
  totalSupply: string;
}

const GGaddress = "0xF047B7A4dE9311a9788F93a8e4050B0508d1De77";
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

      const signer = await provider.getSigner();
      // console.log("signer", signer);
      // const contract = getSmartContract(GGaddress, GreedyGeese.abi, signer);
      const contract = new ethers.Contract(
        GGaddress,
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
        console.log("data", data);
        setData(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="grid gap-1 grid-cols-5 bg-red-200">
        <Image alt="Image of NFT" src="/NFTs/40.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/41.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/42.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/43.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/44.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/45.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/46.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/47.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/48.png" width={150} height={200} />
        <Image alt="Image of NFT" src="/NFTs/49.png" width={150} height={200} />
      </div>

      <h1 className="mt-8 text-3xl">Mint a Greedy Gees NFT !</h1>
      <p className="text-2xl font-bold mt-4">{data.totalSupply} / 50</p>
      <p className="mt-8">
        Each Greedy Geese NFT costs {data.cost} eth (excluding gas fees)
      </p>

      <button className="rounded-full bg-green-500 py-2 px-4 mt-8">
        Mint now
      </button>
    </main>
  );
}
