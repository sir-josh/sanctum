import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pt-32 pb-24 px-[60px] h-full">
      <div className="flex gap-x-24 w-[80%] h-full">
        <div className="flex w-full h-full">
          <aside className="w-[20%] p-6">
            <ul className="flex flex-col gap-y-2">
              <li className="border-b-2 border rounded-md border-b-black py-3 px-2">
                <Link href="#">Dashboard</Link>
              </li>
              <li className="py-3 px-2">
                <Link href="#">Register Organization</Link>
              </li>
              <li className=" px-2 py-3 ">
                <Link href="#">Manage Campaign</Link>
              </li>
            </ul>
          </aside>

          <main className="card w-[80%]">
            <section>{children}</section>
          </main>
        </div>
      </div>
    </section>
  );
};
export default Layout;
