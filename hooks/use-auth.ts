"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/stores/user-store";
import {
  loginApi,
  signupApi,
  logoutApi,
  type LoginCredentials,
  type SignupCredentials,
} from "@/services/auth-api";

export function useLogin() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      // Store token in localStorage (in real app, use httpOnly cookies)
      localStorage.setItem("auth-token", data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
}

export function useSignup() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("auth-token", data.token);
      toast.success(`Welcome, ${data.user.name}! Your account has been created.`);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Signup failed");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useUserStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      localStorage.removeItem("auth-token");
      toast.success("You have been logged out");
      router.push("/login");
    },
    onError: () => {
      // Still logout on frontend even if API fails
      logout();
      localStorage.removeItem("auth-token");
      router.push("/login");
    },
  });
}
