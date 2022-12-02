import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';

export default function LoginPage() {
  const userStore = useUserStore();
  const loginFormStore = useLoginFormStore();

  const location = useLocation();

  useEffect(() => () => {
    userStore.resetLoginStatus();
    loginFormStore.reset();
  }, []);

  return (
    <LoginForm location={location} />
  );
}
