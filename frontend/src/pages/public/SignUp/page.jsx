'use client'

import AuthLayout from '@/components/auth/AuthLayout'
import AuthCard from '@/components/auth/AuthCard'
import SignupForm from '@/components/Form/SignupForm'

export default function SignUp() {
  return (
    <AuthLayout>
      <AuthCard
        title="Hello, Welcome to"
        subtitle="Enter your email and password to signup to your account."
        footerText="Already have an account?"
        footerLink="/auth?state=login"
        footerLinkText="Login"
      >
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  )
}
