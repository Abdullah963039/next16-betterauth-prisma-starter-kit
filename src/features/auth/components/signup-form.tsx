'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { SignupFormValues, signupSchema } from './validation'
import { FormInput, FormInputPassword } from '@/components/form/form-input'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export const SignupForm = () => {
  const router = useRouter()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  async function onSubmit(data: SignupFormValues) {
    try {
      await authClient.signUp.email({
        ...data,
        fetchOptions: {
          onError(context) {
            toast.error(context.error.message ?? context.error.statusText)
          },
          onSuccess() {
            router.push('/dashboard')
          }
        }
      })
    } catch {
      toast.error('Something went wrong')
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

      <Button
        type="submit"
        size={'lg'}
        className="mt-4 max-md:w-full"
        disabled={form.formState.isSubmitting}
      >
        Sign up
      </Button>
    </form>
  )
}
