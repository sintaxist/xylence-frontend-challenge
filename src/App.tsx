import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Shared/Header";
import { useEffect, useState, useCallback } from "react";
import Dashboard from "@/components/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-appBg transition-colors duration-300 w-full overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex flex-col items-center">
          
          <Header isDark={isDark} toggleTheme={toggleTheme} />
          
          <Dashboard />

        </div>
      </main>
    </QueryClientProvider>
  );
}