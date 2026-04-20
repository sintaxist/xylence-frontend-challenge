// src/App.tsx
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { fetchStartups } from "./api/mock"; 
import { StartupCard } from "./components/StartupCard";
import { StartupCardSkeleton } from "./components/StartupCardSkeleton";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const { data: startups, isLoading } = useQuery({
    queryKey: ["startups"],
    queryFn: () => fetchStartups(),
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <main className="min-h-screen px-6 py-10 max-w-[1400px] mx-auto">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-textMain tracking-tighter">Xylence</h1>
          <p className="text-textSecondary text-xs mt-1 font-black uppercase tracking-[0.2em]">
            Predictive Feed
          </p>
        </div>
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-cardBg border border-cardBorder text-textMain hover:bg-textMain hover:text-cardBg transition-all duration-300 shadow-sm"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <StartupCardSkeleton key={i} index={i} />
            ))
          : startups?.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
      </section>
    </main>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}