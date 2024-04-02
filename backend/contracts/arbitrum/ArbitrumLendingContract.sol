// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract ArbitrumLendingContract is Pausable,ReentrancyGuard {
    constructor() {
        eth_priceFeed = AggregatorV3Interface(0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165);
        usdc_priceFeed = AggregatorV3Interface(0x0153002d20B96532C639313c2d54c3dA09109309);
    }
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
    Loan[] public allloans;
    mapping(uint256 => Loan) public loans;
    uint256 public loanCount;
    AggregatorV3Interface internal eth_priceFeed;
    AggregatorV3Interface internal usdc_priceFeed;
    address constant ETH_PROXY = 0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165;
    address constant USDC_PROXY = 0x0153002d20B96532C639313c2d54c3dA09109309;
    uint256 public constant ARB_SEPOLIA_CHAIN_ID = 421614;

    event LoanCreated(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interest,
        uint256 duration,
        uint256 collateralAmount
    );
    event LoanRepaid(uint256 indexed loanId);
    event CollateralWithdrawn(uint256 indexed loanId, uint256 amount);
    event LoanRestructured(uint256 indexed loanId, uint256 newDuration);
    event LoanLiquidated(uint256 indexed loanId, uint256 collateralValue);

    modifier onlyBorrower(uint256 loanId) {
      require(msg.sender == loans[loanId].borrower.borrower_address, "Only the borrower can perform this action");
      _;
    }
    
    
    function getLatestETHPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = eth_priceFeed.latestRoundData();
        return price;
    }
    function getLatestUSDCPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = usdc_priceFeed.latestRoundData();
        return price;
    }

    function checkChainId() internal view returns (bool) {
        uint256 currentChainId = block.chainid;
        return currentChainId == ARB_SEPOLIA_CHAIN_ID;
    }



    function createLoan(
        uint256 amount,
        uint256 interest,
        uint256 duration
    ) public whenNotPaused nonReentrant{
        if (!checkChainId()) revert("You are not connected to the Arbitrum Sepolia network");
        if (amount<0) revert("Loan amount must be greater than 0");
        if(interest < 0) revert("Interest rate must eb greater than o");
        if(duration < 0) revert("Loan duration must be greater than 0");
        
        
        
        uint256 usdcEthPrice = uint256(getLatestUSDCPrice());
        uint256 ethUSD = uint256(getLatestETHPrice());
        // 105% collateral requirement

        

        uint256 etherAmountInUsd = (amount * ethUSD) / 1e18;
        uint256 requiredUsdcCollateral = (etherAmountInUsd * 1e6) / usdcEthPrice;
        require(IERC20(0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d).transferFrom(msg.sender, address(this), requiredUsdcCollateral), "USDC transfer failed");
        

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
            startTime: 0,
            repaid: false,
            
            collateralAmount: requiredUsdcCollateral,
            totalAmount: totalAmount
        });
        allloans.push(Loan({
            loanId: loanCount,
            borrower: Borrower({
                borrower_address:msg.sender,
                points:0
            }),
            status: LoanStatus.Open,
            amount: amount,
            interest: interest,
            duration: duration,
            startTime: 0,
            repaid: false,
            
            collateralAmount: requiredUsdcCollateral,
            totalAmount: totalAmount
        }));

        emit LoanCreated(
            loanCount,
            msg.sender,
            amount,
            interest,
            duration,
            requiredUsdcCollateral
        );
        
    }

    function calculateCollateral(uint256 amount) public view returns (uint256){
          uint256 usdcEthPrice = uint256(getLatestUSDCPrice());
        uint256 ethUSD = uint256(getLatestETHPrice());
        // 105% collateral requirement
         uint256 etherAmountInUsd = (amount * ethUSD) / 1e18;
        uint256 requiredUsdcCollateral = (etherAmountInUsd * 1e6) / usdcEthPrice; 
        return (requiredUsdcCollateral);
    }

    function calculateTotalAmount(uint256 amount, uint256 interest,uint256 duration) internal pure returns (uint256) {
        
        uint256 totalInterest = (amount * interest * duration) / (100 * 365 days);
        return amount + totalInterest;
    }

    function restructureLoan(uint256 loanId, uint256 newDuration) public{
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
       IERC20 token = IERC20(0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d);
    }
    function getAllLoans() public view returns(Loan[] memory){
        return allloans;
    }
}