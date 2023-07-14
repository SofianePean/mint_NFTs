import { ethers } from "ethers";
const provider = new ethers.BrowserProvider(window.ethereum);

export const REQUIRED_NETWORK_ID = "0x5";

export const shortenedAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const getNetworkName = async (): Promise<string> => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    return network.name;
  } catch (error) {
    console.error("Error getting network name:", error);
    throw error;
  }
};

export const getBalance = async (address: string): Promise<number> => {
  try {
    const balance = await provider.getBalance(address);
    return parseFloat(ethers.formatEther(balance));
  } catch (error) {
    console.log("Error getting balance:", error);
    throw error;
  }
};

export const getAccountInfo = async (address: string) => {
  try {
    const [networkName, balance] = await Promise.all([
      getNetworkName(),
      getBalance(address),
    ]);

    return {
      networkName,
      balance,
    };
  } catch (error) {
    console.error("Error getting account info:", error);
    throw error;
  }
};

export const getChainId = async (): Promise<string> => {
  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    return chainId;
  } catch (error) {
    console.error("Error getting chain ID:", error);
    throw error;
  }
};

export const switchNetworkToGoerli = async (): Promise<any> => {
  try {
    const switchResult = await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: REQUIRED_NETWORK_ID }],
    });
    return switchResult;
  } catch (error) {
    console.error("Error switching network:", error);
    throw error;
  }
};
