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
import Challenge6 from "./components/challenges/Challenge6";
import Challenge7 from "./components/challenges/Challenge7";
import Challenge8 from "./components/challenges/Challenge8";
import Challenge9 from "./components/challenges/Challenge9";
import Challenge10 from "./components/challenges/Challenge10";
import Challenge11 from "./components/challenges/Challenge11";
import Challenge12 from "./components/challenges/Challenge12";
import Challenge13 from "./components/challenges/Challenge13";
import Challenge14 from "./components/challenges/Challenge14";
import Challenge15 from "./components/challenges/Challenge15";
import Challenge16 from "./components/challenges/Challenge16";
import Challenge17 from "./components/challenges/Challenge17";
import Challenge18 from "./components/challenges/Challenge18";
import Challenge19 from "./components/challenges/Challenge19";
import Challenge20 from "./components/challenges/Challenge20";
import Challenge21 from "./components/challenges/Challenge21";
import Challenge22 from "./components/challenges/Challenge22";
import Challenge23 from "./components/challenges/Challenge23";
import Challenge24 from "./components/challenges/Challenge24";
import Challenge25 from "./components/challenges/Challenge25";
import Challenge26 from "./components/challenges/Challenge26";
import Challenge27 from "./components/challenges/Challenge27";
import Challenge28 from "./components/challenges/Challenge28";
import Challenge29 from "./components/challenges/Challenge29";
import Challenge30 from "./components/challenges/Challenge30";
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
          <Route path="/challenge/6" element={<Challenge6 />} />
          <Route path="/challenge/7" element={<Challenge7 />} />
          <Route path="/challenge/8" element={<Challenge8 />} />
          <Route path="/challenge/9" element={<Challenge9 />} />
          <Route path="/challenge/10" element={<Challenge10 />} />
          <Route path="/challenge/11" element={<Challenge11 />} />
          <Route path="/challenge/12" element={<Challenge12 />} />
          <Route path="/challenge/13" element={<Challenge13 />} />
          <Route path="/challenge/14" element={<Challenge14 />} />
          <Route path="/challenge/15" element={<Challenge15 />} />
          <Route path="/challenge/16" element={<Challenge16 />} />
          <Route path="/challenge/17" element={<Challenge17 />} />
          <Route path="/challenge/18" element={<Challenge18 />} />
          <Route path="/challenge/19" element={<Challenge19 />} />
          <Route path="/challenge/20" element={<Challenge20 />} />
          <Route path="/challenge/21" element={<Challenge21 />} />
          <Route path="/challenge/22" element={<Challenge22 />} />
          <Route path="/challenge/23" element={<Challenge23 />} />
          <Route path="/challenge/24" element={<Challenge24 />} />
          <Route path="/challenge/25" element={<Challenge25 />} />
          <Route path="/challenge/26" element={<Challenge26 />} />
          <Route path="/challenge/27" element={<Challenge27 />} />
          <Route path="/challenge/28" element={<Challenge28 />} />
          <Route path="/challenge/29" element={<Challenge29 />} />
          <Route path="/challenge/30" element={<Challenge30 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
