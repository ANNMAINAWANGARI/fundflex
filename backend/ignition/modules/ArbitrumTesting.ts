import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const LendingModule = buildModule("LendingModule", (m) => {
  

  const lending = m.contract("ArbitrumLendingContract");

  return { lending };
});

export default LendingModule;
