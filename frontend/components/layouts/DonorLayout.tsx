import Link from "next/link";
import { useRouter } from "next/router";
import { useNetwork } from "wagmi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { chain } = useNetwork();
  console.log(router?.pathname);
  return (
    <section className="pt-32 pb-24 px-[60px] h-full">
      <div className="flex gap-x-24 w-[80%] h-full">
        <div className="flex w-full h-full">
          <aside className="w-[30%] p-6 pt-0">
            <ul className="flex flex-col gap-y-2">
              <Link href="/donor">
                <li
                  className={`${
                    router.asPath == "/donor" &&
                    "border-b-2 border border-b-black"
                  } rounded-md py-3 px-2`}
                >
                  Dashboard
                </li>
              </Link>

              <Link href="/donor/active-campaigns">
                <li
                  className={`${
                    (router?.pathname == "/donor/active-campaigns" ||
                      router?.pathname?.includes("donor/campaign")) &&
                    "border-b-2 border border-b-black"
                  } rounded-md py-3 px-2`}
                >
                  Active Campaigns
                </li>
              </Link>
            </ul>
          </aside>

          {chain?.unsupported ? (
            <div className="card w-[70%]">
              <div className="text-center">
                <h3 className="text-red-400 font-bold text-xl">
                  Wrong Network
                </h3>

                <div>
                  <p>Kindly switch to Polygon, Scroll, Optimism or Celo</p>
                  <ul>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <main className="card w-[70%]">
              <section>{children}</section>
            </main>
          )}
        </div>
      </div>
    </section>
  );
};
export default Layout;
