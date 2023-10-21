import Link from "next/link";
import OrgContextProvider from "../../contexts/OrgContext";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <OrgContextProvider>
      <section className="pt-32 pb-24 px-[60px] h-full">
        <div className="flex gap-x-24 w-[80%] h-full">
          <div className="flex w-full h-full">
            <aside className="w-[30%] p-6 pt-0">
              <ul className="flex flex-col gap-y-2">
                <Link href="/organization">
                  <li
                    className={`${
                      router.asPath == "/organization" &&
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

            <main className="card w-[70%]">
              <section>{children}</section>
            </main>
          </div>
        </div>
      </section>
    </OrgContextProvider>
  );
};
export default Layout;
