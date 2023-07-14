import { GG_ADDRESS } from "@/constants";
import { useAccountStore } from "@/store/account";
import { Contract, ContractRunner, InterfaceAbi, ethers } from "ethers";
import GreedyGeese from "../artifacts/contracts/GreedyGeese.sol/GreedyGeese.json";

interface MintButtonProps {
  cost: string;
  setError: (error: string) => void;
  fetchData: () => void;
}

export const MintButton: React.FC<MintButtonProps> = (props) => {
  const { isConnected } = useAccountStore();
  const getSmartContract = (
    addressContract: string,
    abi: InterfaceAbi,
    provider: ContractRunner
  ): Contract => new ethers.Contract(addressContract, abi, provider);

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
          value: ethers.parseUnits(props.cost, "ether"),
        };
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        props.fetchData();
      } catch (err: any) {
        props.setError(err.message);
      }
    }
  }
  return (
    <button
      className="rounded-full bg-green-500 py-2 px-4 mt-8"
      onClick={mint}
      disabled={!isConnected}
    >
      Mint now
    </button>
  );
};
