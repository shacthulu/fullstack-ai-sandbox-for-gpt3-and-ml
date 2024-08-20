import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Welcome } from '../components/Welcome/Welcome';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DevModeIndexPage from '../components/DevModeHomePage/DevModeIndexPage';

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevModeIndexPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
