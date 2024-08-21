import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address",
        {
          duration: 8000,
        }
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp };
}
