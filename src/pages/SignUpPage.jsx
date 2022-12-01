import { useEffect } from 'react';
import SignUpForm from '../components/SignUpForm';
import useUserStore from '../hooks/useUserStore';

export default function SignUpPage() {
  const userStore = useUserStore();
  useEffect(() => () => {
    userStore.resetSignUpStatus();
  }, []);

  return (
    <SignUpForm />
  );
}
