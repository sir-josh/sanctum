import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-32 pb-24 px-[60px] h-full">
      <div className="flex gap-x-24 w-[80%] h-full">
        <div className="flex w-full h-full">
          <aside className="w-[30%] p-6 pt-0">
            <ul className="flex flex-col gap-y-2">
              <Link href="/organization">
                <li className="border-b-2 border rounded-md border-b-black py-3 px-2">
                  Dashboard
                </li>
              </Link>

              <Link href="/organization/campaign">
                <li className=" px-2 py-3 ">Manage Campaigns</li>
              </Link>
            </ul>
          </aside>

          <main className="card w-[70%]">
            <section>{children}</section>
          </main>
        </div>
      </div>
    </section>
  );
};
export default Layout;
