"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SignupFormValues, signupSchema } from "./validation";
import { FormInput, FormInputPassword } from "@/components/form/form-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { serverSignUp } from "../actions";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: true,
    },
  });

  async function onSubmit(data: SignupFormValues) {
    try {
      const res = await serverSignUp(data);

      if (res?.error) {
        toast.error(res.message);

        return;
      }
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-end gap-4"
    >
      <FormInput control={form.control} name="name" label="Name" />

      <FormInput
        control={form.control}
        name="email"
        label="Email"
        type="email"
      />

      <FormInputPassword
        control={form.control}
        name="password"
        label="Password"
      />

      <FormInputPassword
        control={form.control}
        name="confirmPassword"
        label="Confirm password"
      />

      <FormCheckbox
        control={form.control}
        name="remember"
        label="Remember me"
      />

      <Button
        type="submit"
        size={"lg"}
        className="mt-4 max-md:w-full"
        disabled={form.formState.isSubmitting}
      >
        Sign up
      </Button>
    </form>
  );
};
