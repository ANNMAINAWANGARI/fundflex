// import {time,loadFixture} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
// import {parseEther} from "viem"

// import { ethers, viem } from "hardhat";
// import { expect } from "chai";



// import { getAddress, parseGwei } from "viem";

// describe("ArbitrumLendingContract", function () {
//     async function deployContractFixture() {
//       const ArbitrumLendingContract = await ethers.deployContract("ArbitrumLendingContract");
//       return { ArbitrumLendingContract };
//     }
  
//     it("Should create a new loan", async function () {
//       const { ArbitrumLendingContract } = await loadFixture(deployContractFixture);
  
//       const amount = parseEther("1");
//       const interest = 10;
//       const duration = 30; // 30 days
//       const collateralToken = 0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d;
  
//       await expect(
//         await ArbitrumLendingContract.createLoan(amount, interest, duration, collateralToken)
//       )
//         .to.emit(ArbitrumLendingContract, "LoanCreated")
//         .withArgs(1, ((await ethers.getSigner().getAddress(), amount, interest, duration, collateralToken));
//     });
  
//     // Add more test cases for other functions and scenarios
//   });