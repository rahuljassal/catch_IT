import { Sidebar } from "./Sidebar";

export function ProtectedLayout({ children }) {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
