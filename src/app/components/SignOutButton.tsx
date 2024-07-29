"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const SignOutButton = () => {
    return (
        <div>
            <Button
                className="text-[17px] font-semibold rounded-sm p-3 bg-purple-800 hover:bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-500"
                variant={'outline'}
                onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
            >
                Sign Out
            </Button>
        </div>
    )
}

export default SignOutButton