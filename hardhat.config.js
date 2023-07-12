require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/1ab549ce88f240448f4429de364a7005",
      accounts: [`0x${process.env.ACCOUNT}`],
    },
  },
};
