# Sanctum X Polygon [DoraHacks]

Live Demo - **For live the demo, check the ABOUT of this GitHub repo on the right pane** <br />
Live Link - [Sanctum dApp](https://Sanctum-dapp.vercel.app) <br />

## ✨ Description

[Sanctum](https://sanctum-dapp.vercel.app) combines the speed of Polygon and the interoperability of Axelar to allow users to donate to any cause across multiple chains.

SANCTUM creates a secure and transparent ecosystem for donors and NGOs. Users can donate from the blockchain of their choice, and Sanctum ensures it reaches the beneficiary wallet!

When users donate, they earn Sanctum tokens that allow them to participate in the dApp's future and community.

![Sanctum Dashboard](https://sanctum-dapp.vercel.app/public/img/sanctum-dashboard.png)

## 💻 How we built Sanctum

We created and deployed 2 smart contracts on Polygon:

1. Sanctum 0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c - [View on mumbai-scan](https://gnosis-chiado.blockscout.com/address/0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c)

2. SanctumToken 0x5A505E3f96bB4d322aaA9Eb81d82B330DB2dAA85 - [View on mumbai-scan](https://gnosis-chiado.blockscout.com/address/0x262848dA5f3eA7408d0ecF5E2DAa76e99338A74c)

Here are some of the recent transactions on Sanctum:

1. Sanctum Polygon- https://sepolia.scrollscan.dev/address/0x60a9cf1599dd6b5be36b0cfb60323b6a68a0a03f
2. Terminal Celo - https://calibration.filfox.info/en/address/t410fqlwkhc7il3e4bkkvl5agy4bvg6ba3oedzxnjeeq?t=1
3. Terminal Fantom -https://calibration.filfox.info/en/address/t410fqlwkhc7il3e4bkkvl5agy4bvg6ba3oedzxnjeeq?t=1
4. Campaign donation

   1. On Polygon - https://sepolia.scrollscan.dev/tx/0xdc3727d45917aa631f9603569422f937165a9abc68b8a8edeecc9f94880ac5ca
   2. Celo To Polygon - https://testnet.axelarscan.io/gmp/0x520e607a2d79d3e64d56dd05b1be78b3e08dd3c840a68e7c800e97a8132b6d99

5. Campaign fund Withdrawal - https://sepolia.scrollscan.dev/tx/0x9fdfdeb12896748ed2c8038f220a3a25638a1a0b04bd7a891ebcb50b8c0f7fb4

This is an original work by our team. We built our solution using: **`NextJs/Typescript`**, **`Wagmi`**, **`Rainbowkit`**, **`Prisma`**, **`TailwindCSS`**, **`Remix`**, **`PostgresSQL`** and **`Axelar SDK`**.

## 🚀 Accomplishments that we're proud of

🎉 We built Sanctum as a hybrid dApp. It implements PostgreSQL for transactional logic, while the core logic is powered by 2 smart contracts - Santum.sol and Terminal.sol.<br />
🎉 Sanctum contract is deployed on Polygon for speed and security, while Terminal contracts are deployed on Celo, and Fantom (for the demo).. <br />
🎉 We then implemented Axelar to route users' donations from the Terminal on other chains, to Sanctum on Polygon. This allow users easily donate irrespective of their chain! <br />
