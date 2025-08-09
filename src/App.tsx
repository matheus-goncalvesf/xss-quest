import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Challenge1 from "./components/challenges/Challenge1";
import Challenge2 from "./components/challenges/Challenge2";
import Challenge3 from "./components/challenges/Challenge3";
import Challenge4 from "./components/challenges/Challenge4";
import Challenge5 from "./components/challenges/Challenge5";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenge/1" element={<Challenge1 />} />
          <Route path="/challenge/2" element={<Challenge2 />} />
          <Route path="/challenge/3" element={<Challenge3 />} />
          <Route path="/challenge/4" element={<Challenge4 />} />
          <Route path="/challenge/5" element={<Challenge5 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
