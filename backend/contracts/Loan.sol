// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

// Collateralized Lending Pool
contract CollateralizedLendingPool is ReentrancyGuard, Pausable{
    
    enum LoanStatus { Open, Funded, Repayed, Defaulted }
    struct Loan {
        uint256 loanId;
        Borrower borrower;
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
        uint256 points;
    }
    struct Lender{
        address lender_address;
        uint256 points;
        Loan[] loan_type;
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
    event LoanRestructured(uint256 indexed loanId, uint256 newDuration);
    event LoanLiquidated(uint256 indexed loanId, uint256 collateralValue);
    event FundsLent(address indexed lender, uint256 amount);

    modifier onlyBorrower(uint256 loanId) {
      require(msg.sender == loans[loanId].borrower.borrower_address, "Only the borrower can perform this action");
      _;
    }

    function createLoan(
        uint256 amount,
        uint256 interest,
        uint256 duration,
        address collateralToken,
        address lendingToken,
        uint256 collateralAmount
    ) public whenNotPaused nonReentrant{
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
        uint256 totalAmount = calculateTotalAmount(amount, interest,duration);
        loans[loanCount] = Loan({
            loanId: loanCount,
            borrower: Borrower({
                borrower_address:msg.sender,
                points:0
            }),
            status: LoanStatus.Open,
            amount: amount,
            interest: interest,
            duration: duration,
            lendingToken: lendingToken,
            startTime: 0,
            repaid: false,
            collateralToken: collateralToken,
            collateralAmount: collateralAmount,
            totalAmount: totalAmount
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


    function lend(uint256 loanId, uint256 amount) external whenNotPaused nonReentrant{
      require(amount > 0, "Lend amount must be greater than 0");
      Loan storage loan = loans[loanId];
      require(loan.loanId == loanId, "Invalid loan ID");
      require(!loan.repaid, "Loan has already been repaid");
      require(loan.amount == amount, "Lend amount must match the loan amount");
      IERC20 lending_Token = IERC20(loan.lendingToken);

      // Transfer the lending tokens from the lender to the borrower
      require(lending_Token.transferFrom(msg.sender, loan.borrower.borrower_address, amount), "Token transfer failed");

      // Update the loan start time
      loan.startTime = block.timestamp;
      loan.status = LoanStatus.Funded;

      emit FundsLent(msg.sender, amount);
    }
    

    function repayLoan(uint256 loanId) public payable onlyBorrower(loanId) whenNotPaused nonReentrant {
        Loan storage loan = loans[loanId];
        // require(loan.loanId == loanId, "Invalid loan ID");
        // require(msg.sender == loan.borrower.borrower_address, "Only the borrower can repay the loan");
        // require(!loan.repaid, "Loan has already been repaid");
        if (loan.loanId != loanId || msg.sender != loan.borrower.borrower_address || loan.repaid) {
           revert("Invalid loan or repayment conditions");
        }

        uint256 totalAmount = calculateTotalAmount(loan.amount, loan.interest,loan.duration);
        require(msg.value == totalAmount, "Incorrect repayment amount");

        loan.repaid = true;
        loan.status = LoanStatus.Repayed;
        loan.totalAmount = 0;
        emit LoanRepaid(loanId);
    }
    function withdrawCollateral(uint256 loanId) public onlyBorrower(loanId) nonReentrant{
        Loan storage loan = loans[loanId];
        require(loan.loanId == loanId, "Invalid loan ID");
        require(msg.sender == loan.borrower.borrower_address, "Only the borrower can withdraw collateral");
        require(loan.repaid, "Loan must be repaid to withdraw collateral");

        IERC20 token = IERC20(loan.collateralToken);
        require(
            token.transfer(msg.sender, loan.collateralAmount),
            "Collateral withdrawal failed"
        );

        emit CollateralWithdrawn(loanId, loan.collateralAmount);
    }


    function calculateTotalAmount(uint256 amount, uint256 interest,uint256 duration) internal pure returns (uint256) {
        
        uint256 totalInterest = (amount * interest * duration) / (100 * 365 days);
        return amount + totalInterest;
    }
   
    function restrutureLoan(uint256 loanId, uint256 newDuration) public{
        Loan storage loan = loans[loanId];
        require(loan.loanId == loanId, "Invalid loan ID");
        require(!loan.repaid, "Loan has already been repaid");

    // Implement the logic to validate the new duration and update the loan terms
        loan.duration = newDuration;
        emit LoanRestructured(loanId, newDuration);
    }
    

    function getLoanDetails(uint256 loanId) public view returns (Loan memory) {
        return loans[loanId];
    }

   function liquidateLoan(uint256 loanId) public {
       Loan storage loan = loans[loanId];
       require(loan.loanId == loanId, "Invalid loan ID");
       require(block.timestamp >= loan.startTime + loan.duration, "Loan is not due yet");
       require(!loan.repaid, "Loan has already been repaid");

    // Liquidate the collateral
    //using arbitrum bridge, bridge the collateral token for arb/eth and send it to lender
    //deduct points from lender
    IERC20 token = IERC20(loan.collateralToken);
    uint256 collateralValue = calculateCollateralValue(loan.collateralAmount, loan.collateralToken);
    uint256 totalAmount = loan.totalAmount;
    if (collateralValue >= totalAmount) {
        // Transfer the total amount to the lending pool
        // ...
        // Mark the loan as repaid
        loan.repaid = true;
    } else {
        // Transfer the collateral value to the lending pool
        // ...
        // Mark the loan as partially repaid
        loan.repaid = true;
        // ... (handle the remaining debt)
    }

    emit LoanLiquidated(loanId, collateralValue);
   }

function calculateCollateralValue(uint256 collateralAmount, address collateralToken) internal view returns (uint256) {
    // Implement the logic to calculate the current value of the collateral
    // based on the token price or other factors
    // ...
}
}