// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Welcome } from '../components/Welcome/Welcome';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import { QueryClient } from '@tanstack/react-query';
import { AuthenticationForm } from '../components/Login/LoginPage';

// const queryClient = new QueryClient();

export default function LoginPage() {
  // center the login form:
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    window: '500',
  };
  return (
    <div style={style}>
      <AuthenticationForm />
    </div>
  );
}
