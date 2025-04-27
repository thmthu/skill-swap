'use client'

import AuthLayout from '@/components/auth/AuthLayout'
import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/Form/loginForm'

export default function Login() {
  return (
    <AuthLayout>
      <AuthCard
        title="Hello, Welcome to"
        subtitle="Enter your email and password to login to your account."
        footerText="Don't have an account?"
        footerLink="/auth?state=signup"
        footerLinkText="Sign Up"
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  )
}
