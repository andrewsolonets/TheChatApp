import { Sidebar } from "./Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-screen   ">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
