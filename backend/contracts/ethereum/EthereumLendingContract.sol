// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract EthereumLendingContract is Pausable,ReentrancyGuard {
    enum LoanStatus { Open, Funded, Repayed, Defaulted }
    struct Loan {
        uint256 loanId;
        Borrower borrower;
        Lender lender;
        LoanStatus status;
        uint256 amount;
        uint256 interest;
        uint256 duration;
        uint256 startTime;
        bool repaid;
        address lendingToken;
        address collateralToken;
        uint256 collateralAmount;
        uint256 totalAmount;
    }
    struct Borrower{
        address borrower_address;
    }
    struct Lender{
        address lender_address;
    }
    Loan[] public allloans;
    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;
    uint256 public constant SEPOLIA_CHAIN_ID = 11155111;

    
     event FundsLent(address indexed lender, uint256 amount);

     function checkChainId() internal view returns (bool) {
        uint256 currentChainId = block.chainid;
        return currentChainId == SEPOLIA_CHAIN_ID;
    }

    function lend(uint256 _loanId, uint256 _amount,address payable _recipient) external whenNotPaused nonReentrant{
      Loan storage loan = loans[_loanId];
      if (!checkChainId()) revert("You are not connected to the Ethereum network");
      if (loan.loanId != _loanId) revert("Invalid loan ID");
      if (loan.repaid) revert("Loan has already been repaid");
      if (loan.amount != _amount) revert("Lend amount must match the loan amount");
      if (_amount > msg.sender.balance) revert("Insufficient balance");
      (bool success, ) = _recipient.call{value: _amount}("");
      if (!success) revert("Loan lending Ether transfer failed");
        
      loan.startTime = block.timestamp;
      loan.borrower.borrower_address = _recipient;
      loan.lender.lender_address = msg.sender;
      loan.status = LoanStatus.Funded;

      emit FundsLent(msg.sender, _amount);
    }
}