import AppRoutes from "./AppRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ItineraryContextProvider } from "./context/ItineraryContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ItineraryContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className="bg-green-50 min-h-screen flex flex-col items-center">
            <AppRoutes />
            <ReactQueryDevtools />
          </div>
        </QueryClientProvider>
      </ItineraryContextProvider>
    </AuthProvider>
  );
}

export default App;
