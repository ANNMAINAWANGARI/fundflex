// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Collateralized Lending Pool
contract CollateralizedLendingPool {
    struct Loan {
        uint256 loanId;
        address borrower;
        uint256 amount;
        uint256 interest;
        uint256 duration;
        uint256 startTime;
        bool repaid;
        address collateralToken;
        uint256 collateralAmount;
    }
    struct Borrower{
        address borrower;
        uint256 points;
    }
    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;
    event LoanCreated(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interest,
        uint256 duration,
        address collateralToken,
        uint256 collateralAmount
    );
    event LoanRepaid(uint256 indexed loanId);
    event CollateralWithdrawn(uint256 indexed loanId, uint256 amount);
    function createLoan(
        uint256 amount,
        uint256 interest,
        uint256 duration,
        address collateralToken,
        uint256 collateralAmount
    ) public {
        require(amount > 0, "Loan amount must be greater than 0");
        require(interest > 0, "Interest rate must be greater than 0");
        require(duration > 0, "Loan duration must be greater than 0");
        require(
            collateralToken != address(0),
            "Invalid collateral token address"
        );
        require(collateralAmount > 0, "Collateral amount must be greater than 0");

        IERC20 token = IERC20(collateralToken);
        require(
            token.transferFrom(msg.sender, address(this), collateralAmount),
            "Collateral transfer failed"
        );

        loanCount++;
        loans[loanCount] = Loan({
            loanId: loanCount,
            borrower: msg.sender,
            amount: amount,
            interest: interest,
            duration: duration,
            startTime: block.timestamp,
            repaid: false,
            collateralToken: collateralToken,
            collateralAmount: collateralAmount
        });

        emit LoanCreated(
            loanCount,
            msg.sender,
            amount,
            interest,
            duration,
            collateralToken,
            collateralAmount
        );
    }
    function repayLoan(uint256 loanId) public payable {
        Loan storage loan = loans[loanId];
        require(loan.loanId == loanId, "Invalid loan ID");
        require(msg.sender == loan.borrower, "Only the borrower can repay the loan");
        require(!loan.repaid, "Loan has already been repaid");

        uint256 totalAmount = calculateTotalAmount(loan);
        require(msg.value == totalAmount, "Incorrect repayment amount");

        loan.repaid = true;
        emit LoanRepaid(loanId);
    }
    function withdrawCollateral(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        require(loan.loanId == loanId, "Invalid loan ID");
        require(msg.sender == loan.borrower, "Only the borrower can withdraw collateral");
        require(loan.repaid, "Loan must be repaid to withdraw collateral");

        IERC20 token = IERC20(loan.collateralToken);
        require(
            token.transfer(msg.sender, loan.collateralAmount),
            "Collateral withdrawal failed"
        );

        emit CollateralWithdrawn(loanId, loan.collateralAmount);
    }
    function calculateTotalAmount(Loan memory loan) internal pure returns (uint256) {
        uint256 interest = (loan.amount * loan.interest) / 100;
        return loan.amount + interest;
    }

    function getLoanDetails(uint256 loanId) public view returns (Loan memory) {
        return loans[loanId];
    }
}