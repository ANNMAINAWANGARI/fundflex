import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    ethereumSepolia:{
      url: 'https://rpc.ankr.com/eth_sepolia',
      chainId: 11155111,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
  
};

export default config;
