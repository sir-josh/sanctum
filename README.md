# Sanctum x Gnosis [Techfiesta]

Live Demo - [YouTube Video](https://youtu.be/pw_UZUs1FkY) <br />
Live Link - [Sanctum dApp](https://Sanctum.vercel.app) <br />
Slides - [Presentation Slides](https://Sanctum.vercel.app/SanctumSlides.pdf)

## ✨ Description

[Sanctum](https://sanctum-eth.vercel.app) is a decentralized savings app. Sanctum integrates with [Monerium](https://monerium.dev) which allows easy conversion of fiat Euro, USD and GBP into their stablecoin equivalent. Users can then connect and save their stablecoins securely on the Gnosis blockchain with Sanctum.

Our features empowers personal financial habits by:

- Allowing users set their locked savings duration
- Implementing early retrieval penalty fee, which helps guide them on your journey to financial well-being.
- A gamified earning model that rewards users in RAIN tokens as they meet their savings goals.
- Visualize their savings goals history.

![Sanctum Dashboard](/public/img/dashboard-screen.png)

## 💻 How we built Sanctum

We created and deployed 2 smart contracts in Gnosis Chiado:

1. Sanctum 0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c - [View source code](https://github.com/iamendy/Sanctum/blob/main/contracts/Sanctum.sol) | [View on gnosis-chiado scan](https://gnosis-chiado.blockscout.com/address/0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c)

2. SanctumToken 0x5A505E3f96bB4d322aaA9Eb81d82B330DB2dAA85 - [View source code](https://github.com/iamendy/Sanctum/blob/main/contracts/SanctumToken.sol) | [View on gnosis-chiado scan](https://gnosis-chiado.blockscout.com/address/0x5A505E3f96bB4d322aaA9Eb81d82B330DB2dAA85)

Here are some of the recent transactions on Sanctum:

1. Savings [View txn on Gnosis Chiado](https://gnosis-chiado.blockscout.com/tx/0xb20c4fb6af21901533b19c1ac5ce36a7e2775efcc7049e6f44f747f77927d2e0)

2. Break Piggy [View txn on Gnosis Chiado](https://gnosis-chiado.blockscout.com/tx/0x7bea58bee8ba73e866846dd29aa78be8b2ec7cdf5225053f737da67683ce732b)

3. RAIN Token transfers [View on Gnosis Chiado](https://gnosis-chiado.blockscout.com/address/0x5A505E3f96bB4d322aaA9Eb81d82B330DB2dAA85?tab=internal_txns)

This is an original work by our team. We built our solution using: **`NextJs/Typescript`**, **`Wagmi`**, **`Rainbowkit`**, **`Prisma`**, **`TailwindCSS`**, **`Remix`**, **`PostgresSQL`** and **`Monerium SDK`**.

## 🚀 Accomplishments that we're proud of

🍥 Implemented an idea that was birthed from our personal pain point.<br />
🍥 Deployed our dApp on the Gnosis network which means we will have the best of speed, cost and mobility for our users. <br />
🍥 Had fun, and learnt a whole lot building our solution. <br />

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

6. Update `DATABASE_URL` from Railway on the .env file

7. Update your Monerium `NEXT_PUBLIC_MONERIUM_CLIENT_ID` and `NEXT_PUBLIC_MONERIUM_CLIENT_SECRET` on the .env file

8. Run `npx prisma migrate dev` to push migrations to the database

9. Run `yarn dev` to start the DApp on your development environment.

10. You can connect your wallet and enjoy a world of limitless possibilities.
    ---- transactions ----

11. Sanctum Scroll- https://sepolia.scrollscan.dev/address/0x60a9cf1599dd6b5be36b0cfb60323b6a68a0a03f
12. Terminal Filecoin - https://calibration.filfox.info/en/address/t410fqlwkhc7il3e4bkkvl5agy4bvg6ba3oedzxnjeeq?t=1
13. Terminal Polygon Zk -

14. Campaign donation

    1. On Scroll - https://sepolia.scrollscan.dev/tx/0xdc3727d45917aa631f9603569422f937165a9abc68b8a8edeecc9f94880ac5ca
    2. Filecoin To Scroll - https://testnet.axelarscan.io/gmp/0x520e607a2d79d3e64d56dd05b1be78b3e08dd3c840a68e7c800e97a8132b6d99

15. Campaign fund Withdrawal - https://sepolia.scrollscan.dev/tx/0x9fdfdeb12896748ed2c8038f220a3a25638a1a0b04bd7a891ebcb50b8c0f7fb4
