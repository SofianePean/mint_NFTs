import { DataContract } from "@/app/types/Contract";

interface NFTDescriptionProps {
  data: DataContract;
}

export const NFTDescription: React.FC<NFTDescriptionProps> = (props) => {
  return (
    <>
      <h1 className="mt-8 text-5xl block sm:inline bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        Mint a Greedy Gees NFT !
      </h1>
      <p className="text-2xl font-bold mt-4">{props.data.totalSupply} / 50</p>
      <p className="mt-8">
        Each Greedy Geese NFT costs {props.data.cost} eth (excluding gas fees)
      </p>
    </>
  );
};
