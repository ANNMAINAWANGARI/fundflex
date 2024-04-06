## FUNDFLEX

### HomePage
![HomePage](/frontend/assets/Homepage.png)

### AuthenticationPage
![AuthenticationPage](/frontend/assets/HomeAuthentication.png)

### LendingPage
![LendingPage](/frontend/assets/LendingPage2.png)

### BorrowPage
![BorrowPage](/frontend/assets/BorrowPage.png)

## Tech Stack/ Tooling
- Frontend : Next.js 14
- Smart Contract : Solidity
- SDK : Arbitrum
- Authentication & DB : Ceramic Ethereum DID PKH & ComposeDB

## Project Scripts

In the project directory, you can run the following:
### `cd frontend` &&  ### `npm install`

In your .env.local file add SECRET_KEY="<did:privatekey-generator>"

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\


### `cd backend` && ### `npm install`

In your .env add PRIVATE_KEY ="<walletprivatekey>"

Run composedb daemon on wsl2/linux

Setup repo @ [https://github.com/ANNMAINAWANGARI/composedb_models](https://github.com/ANNMAINAWANGARI/composedb_models). Then

### `npx @ceramicnetwork/cli daemon`


