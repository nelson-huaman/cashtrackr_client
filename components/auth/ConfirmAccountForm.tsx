"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { confirmAcount } from "@/actions/confirm-acount-action"
import { useRouter } from "next/navigation"

export default function ConfirmAccountForm() {

   const router = useRouter()

   const [isComplete, setIsComplete] = useState(false)
   const [token, setToken] = useState('')

   const confirmAcountWithToken = confirmAcount.bind(null, token)
   const [state, dispatch] = useFormState(confirmAcountWithToken, {
      errors: [],
      success: ''
   })

   useEffect(() => {
      if (isComplete) {
         dispatch()
      }
   }, [isComplete, dispatch])

   useEffect(() => {
      if (state.errors) {
         state.errors.forEach(error => {
            toast.error(error)
         })
      }
      if (state.success) {
         toast.success(state.success, {
            onClose: () => {
               router.push('/auth/login')
            }
         })
      }
   }, [state, router])

   const handleChange = (token: string) => {
      setIsComplete(false)
      setToken(token)
   }

   const hanldeComplete = () => {
      setIsComplete(true)
   }

   return (
      <>
         <div className="flex justify-center gap-5 my-10">
            <PinInput
               value={token}
               onChange={handleChange}
               onComplete={hanldeComplete}
            >
               <PinInputField className="h-10 w-10 border border-gray-500 placeholder-white shadow rounded-lg text-center font-bold" />
               <PinInputField className="h-10 w-10 border border-gray-500 placeholder-white shadow rounded-lg text-center font-bold" />
               <PinInputField className="h-10 w-10 border border-gray-500 placeholder-white shadow rounded-lg text-center font-bold" />
               <PinInputField className="h-10 w-10 border border-gray-500 placeholder-white shadow rounded-lg text-center font-bold" />
               <PinInputField className="h-10 w-10 border border-gray-500 placeholder-white shadow rounded-lg text-center font-bold" />
               <PinInputField className="h-10 w-10 border border-gray-500 placeholder-white shadow rounded-lg text-center font-bold" />
            </PinInput>
         </div>
      </>
   )
}