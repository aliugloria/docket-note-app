import { Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Header = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (value: string) => void }) => (
  <header className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-zinc-200/70 bg-white px-4 sm:px-8 lg:px-12 dark:border-zinc-800 dark:bg-zinc-950">
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl bg-zinc-50 px-4 py-2.5 dark:bg-zinc-900">
      <Search size={18} className="shrink-0 text-zinc-400" aria-hidden="true" />
      <input aria-label="Search notes" type="search" placeholder="Search your notes" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="min-w-0 w-full bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400 dark:text-zinc-200" />
    </div>
    <div className="shrink-0"><ThemeToggle /></div>
  </header>
);

export default Header;
