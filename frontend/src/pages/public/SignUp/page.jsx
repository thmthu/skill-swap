'use client'

import AuthLayout from '@/components/auth/AuthLayout'
import AuthCard from '@/components/auth/AuthCard'
import SignupForm from '@/components/Form/SignupForm'
import { motion } from 'framer-motion'
export default function SignUp() {
  return (
    <AuthLayout>
       <motion.div
      initial={{ x: 100, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: -100, opacity: 0 }}  
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full"
    >
      <AuthCard
        title="Hello, Welcome to"
        subtitle="Enter your email and password to signup to your account."
        footerText="Already have an account?"
        footerLink="/auth?state=login"
        footerLinkText="Login"
      >
        <SignupForm />
      </AuthCard>
      </motion.div>
    </AuthLayout>
  )
}
