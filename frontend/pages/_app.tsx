import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celoAlfajores } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Inter } from "next/font/google";
import Layout from "../components/layouts/Layout";
import OrgLayout from "../components/layouts/OrgLayout";
import DonorLayout from "../components/layouts/DonorLayout";
import { useRouter } from "next/router";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["400", "500", "700"],
});

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [celoAlfajores],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Sanctum",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <main className={`${inter.className}`}>
          <Layout>
            {router?.pathname?.includes("organization") ? (
              <OrgLayout>
                <Component {...pageProps} />
              </OrgLayout>
            ) : router?.pathname?.includes("donor") ? (
              <DonorLayout>
                <Component {...pageProps} />
              </DonorLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;