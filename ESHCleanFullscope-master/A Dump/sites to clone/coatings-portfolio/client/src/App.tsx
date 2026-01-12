import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Garage from "./pages/Garage";
import Interior from "./pages/Interior";
import Bathroom from "./pages/Bathroom";
import Industrial from "./pages/Industrial";
import Countertops from "./pages/Countertops";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/garage" component={Garage} />
      <Route path="/interior" component={Interior} />
      <Route path="/bathroom" component={Bathroom} />
      <Route path="/industrial" component={Industrial} />
      <Route path="/countertops" component={Countertops} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
