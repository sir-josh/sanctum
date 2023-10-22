# Sanctum  [EthOnline]

Live Demo - **For live the demo, check the ABOUT of this GitHub repo on the right pane** <br />
Live Link - [Sanctum dApp](https://Sanctum.vercel.app) <br />

## ✨ Description

[Sanctum](https://sanctum-eth.vercel.app) is a cutting-edge decentralized donation platform that redefines charitable giving and philanthropy, prioritizing transparency, efficiency, and donor empowerment. By leveraging blockchain technology and innovative features like Decentralized Autonomous Organizations (DAOs).

SANCTUM creates a secure and transparent ecosystem for donors to enable them to donate from different chains, while also ensuring the legitimacy of the NGOs receiving support. Here's why SANCTUM is a game-changer in the world of charitable giving:

## What Makes SANCTUM Unique:

### 1. Donating via different chains 

**As donors**, Donations on the Sanctum platform can be made from any blockchain network. This is done securely using Axelar SDK which enables cross-chain communication for web3. When users donate, they earn Sanctum tokens that allow them to participate in the dApp's future and community. Users can donate from the blockchain of their choice, and Sanctum ensures it reaches the beneficiary wallet!

### 2. Decentralized Decision-Making

**Empowerment through DAOs:** Unlike other donation platforms, SANCTUM integrates DAOs, enabling donors to participate in the decision-making process actively. Donors can join or create DAOs related to specific projects or causes. In these DAOs, donors can participate in decision-making, vote on project proposals, and actively oversee how funds are allocated and utilized.

### 3. Authenticating Legitimate NGOs

**Vetted and Verified:** Sanctum solves the problem of fraud in the NGO sector. After due diligence and approval, an NGO mints a soulbound NFT that serves as an on-chain verification. Once verified, an NGO can create campaigns for good cause.

![Sanctum Dashboard](/public/img/dashboard-screen.png)

## 💻 How we built Sanctum

We created and deployed 2 smart contracts in Scroll Sepolia:

1. Sanctum 0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c - [View source code](https://github.com/iamendy/Sanctum/blob/main/contracts/Sanctum.sol) | [View on sepolia-blockscout.scroll.io scan](https://gnosis-chiado.blockscout.com/address/0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c)  

2. SanctumToken 0x5A505E3f96bB4d322aaA9Eb81d82B330DB2dAA85 - [View source code](https://github.com/iamendy/Sanctum/blob/main/contracts/SanctumToken.sol) | [View on sepolia-blockscout.scroll.io scan](https://gnosis-chiado.blockscout.com/address/0x5A505E3f96bB4d322aaA9Eb81d82B330DB2dAA85) 

Here are some of the recent transactions on Sanctum:

1. Cregex [View txn on sepolia-blockscout.scroll.io scan](https://gnosis-chiado.blockscout.com/tx/0xb20c4fb6af21901533b19c1ac5ce36a7e2775efcc7049e6f44f747f77927d2e0) 


This is an original work by our team. We built our solution using: **`NextJs/Typescript`**, **`Wagmi`**, **`Rainbowkit`**, **`Prisma`**, **`TailwindCSS`**, **`Remix`**, **`PostgresSQL`** and **`Axelar SDK`**.

## 🚀 Accomplishments that we're proud of

🍥 We built Sanctum as a hybrid dApp. It implements PostgreSQL for transactional logic, while the core logic is powered by 2 smart contracts - Santum.sol and Terminal.sol.<br />
🍥 Sanctum contract is deployed on Scroll, while Terminal contracts are deployed on Filecoin, Celo, and Fantom (for the demo).. <br />
🍥 We then implemented Axelar to route users' donations from the Terminal on other chains, to Sanctum on Scroll, thereby making our dApp an interchain app. Users can easily donate irrespective of their chain! <br />
🍥 Santum uses GMP to route tokens from donor's chain to Scroll<br />

## 📈 What's next for Sanctum

To enable more web3 users have the best savings platform experience without hidden and overhead cost offered by traditional banks. We plan on:

- Integrating decentralized loan protocols and utility bills settlement with RAIN tokens.
- Add a liquidity pool that users can easily exchange RAIN Token for xDAI and GNO
- Implement smart wallet to allow better user experience managing savings as well as gasless transactions.
- Help our users increase their overall financial habits on-chain

## 🧑‍💻 Instructions for testing locally

\***\* Smart contract \*\***

Note: Recommend using [Remix](https://remix.ethereum.org) for quick smart contract deployment, or alternatively hardhat:

1. Deploy `Sanctum` on Gnosis by running the necessary Hardhat script

2. Deploy `SanctumToken` by passing the deployed `Sanctum` address.

\***\* Frontend \*\***

3. Update your deployed `Sanctum` address on the `src/connect.ts file.

4. Setup a PostGreSQL instance from [Railway](https://railway.app) (for authentication)

5. run `cp .env.example .env`

6. Update `DATABASE_URL` and `NEXT_PUBLIC_WC_PROJECT_ID` from Railway on the .env file


7. Run `npx prisma migrate dev` to push migrations to the database

8. Run `yarn dev` to start the DApp on your development environment.

9. You can connect your wallet and enjoy a world of limitless possibilities.
    ---- transactions ----

10. Sanctum Scroll- https://sepolia.scrollscan.dev/address/0x60a9cf1599dd6b5be36b0cfb60323b6a68a0a03f
11. Terminal Filecoin - https://calibration.filfox.info/en/address/t410fqlwkhc7il3e4bkkvl5agy4bvg6ba3oedzxnjeeq?t=1
12. Terminal Polygon Zk -

13. Campaign donation

    1. On Scroll - https://sepolia.scrollscan.dev/tx/0xdc3727d45917aa631f9603569422f937165a9abc68b8a8edeecc9f94880ac5ca
    2. Filecoin To Scroll - https://testnet.axelarscan.io/gmp/0x520e607a2d79d3e64d56dd05b1be78b3e08dd3c840a68e7c800e97a8132b6d99

15. Campaign fund Withdrawal - https://sepolia.scrollscan.dev/tx/0x9fdfdeb12896748ed2c8038f220a3a25638a1a0b04bd7a891ebcb50b8c0f7fb4
