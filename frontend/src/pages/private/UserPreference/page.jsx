'use client'

import AuthLayout from '@/components/auth/AuthLayout'
import AuthCard from '@/components/auth/AuthCard'
import UserPreferencesForm from '@/components/Form/PreferenceForm'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect } from 'react'

export default function UserPreference() {
    useEffect(() => {    
        toast.success("Please complete the below information for completing the signup process.", {
            position: 'top-center',
            duration: 5000,
            style: {
                background: '#333',
            }
        });
    }, [])
  return (
    <AuthLayout>
      <Toaster />
      <motion.div
      initial={{ x: 100, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: -100, opacity: 0 }}   
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full"
    >
        <AuthCard
          title="Your Preferences"
          subtitle="Please complete the below information so that we could match you with the other users."
          footerText=""
          footerLink=""
          footerLinkText=""
      >
        <UserPreferencesForm />
      </AuthCard>
      </motion.div>
    </AuthLayout>
  )
}
