import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
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
import Challenge31 from "./components/challenges/Challenge31";
import Challenge32 from "./components/challenges/Challenge32";
import Challenge33 from "./components/challenges/Challenge33";
import Challenge34 from "./components/challenges/Challenge34";
import Challenge35 from "./components/challenges/Challenge35";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/challenge/1" component={Challenge1} />
          <Route path="/challenge/2" component={Challenge2} />
          <Route path="/challenge/3" component={Challenge3} />
          <Route path="/challenge/4" component={Challenge4} />
          <Route path="/challenge/5" component={Challenge5} />
          <Route path="/challenge/6" component={Challenge6} />
          <Route path="/challenge/7" component={Challenge7} />
          <Route path="/challenge/8" component={Challenge8} />
          <Route path="/challenge/9" component={Challenge9} />
          <Route path="/challenge/10" component={Challenge10} />
          <Route path="/challenge/11" component={Challenge11} />
          <Route path="/challenge/12" component={Challenge12} />
          <Route path="/challenge/13" component={Challenge13} />
          <Route path="/challenge/14" component={Challenge14} />
          <Route path="/challenge/15" component={Challenge15} />
          <Route path="/challenge/16" component={Challenge16} />
          <Route path="/challenge/17" component={Challenge17} />
          <Route path="/challenge/18" component={Challenge18} />
          <Route path="/challenge/19" component={Challenge19} />
          <Route path="/challenge/20" component={Challenge20} />
          <Route path="/challenge/21" component={Challenge21} />
          <Route path="/challenge/22" component={Challenge22} />
          <Route path="/challenge/23" component={Challenge23} />
          <Route path="/challenge/24" component={Challenge24} />
          <Route path="/challenge/25" component={Challenge25} />
          <Route path="/challenge/26" component={Challenge26} />
          <Route path="/challenge/27" component={Challenge27} />
          <Route path="/challenge/28" component={Challenge28} />
          <Route path="/challenge/29" component={Challenge29} />
          <Route path="/challenge/30" component={Challenge30} />
          <Route path="/challenge/31" component={Challenge31} />
          <Route path="/challenge/32" component={Challenge32} />
          <Route path="/challenge/33" component={Challenge33} />
          <Route path="/challenge/34" component={Challenge34} />
          <Route path="/challenge/35" component={Challenge35} />
          {/* Catch-all route for 404 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
