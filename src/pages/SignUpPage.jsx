import { useEffect } from 'react';
import SignUpForm from '../components/SignUpForm';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';

export default function SignUpPage() {
  const userStore = useUserStore();
  const signUpFormStore = useSignUpFormStore();

  useEffect(() => () => {
    userStore.resetSignUpStatus();
    signUpFormStore.reset();
  }, []);

  return (
    <SignUpForm />
  );
}
