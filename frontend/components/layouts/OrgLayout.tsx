import Link from "next/link";
import OrgContextProvider from "../../contexts/OrgContext";
import { useRouter } from "next/router";
import { useNetwork } from "wagmi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { chain, chains } = useNetwork();

  return (
    <section className="pt-32 pb-24 px-[60px] h-full">
      <div className="flex gap-x-24 w-[80%] h-full">
        <div className="flex w-full h-full">
          <aside className="w-[30%] p-6 pt-0">
            <ul className="flex flex-col gap-y-2">
              <Link href="/organization">
                <li
                  className={`${
                    (router.asPath == "/organization" ||
                      router.asPath == "/organization/create") &&
                    "border-b-2 border border-b-black"
                  } rounded-md py-3 px-2`}
                >
                  Dashboard
                </li>
              </Link>

              <Link href="/organization/campaign">
                <li
                  className={`${
                    router.pathname?.includes("organization/campaign") &&
                    "border-b-2 border border-b-black"
                  } rounded-md py-3 px-2`}
                >
                  Manage Campaigns
                </li>
              </Link>
            </ul>
          </aside>

          {chain?.id == 1442 ? (
            <OrgContextProvider>
              <main className="card w-[70%]">
                <section>{children}</section>
              </main>
            </OrgContextProvider>
          ) : (
            <div className="card text-center w-[70%]">
              <h3 className="font-bold text-xl text-red-400">Oops!</h3>
              <p>
                The Organization section is only accessble on Scroll Network.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Layout;
