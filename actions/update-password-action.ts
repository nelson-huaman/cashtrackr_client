"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas"


type ActionState = {
   errors: string[],
   success: string
}

export async function updatePassword(prevState: ActionState, formData: FormData) {

   const userPassword = UpdatePasswordSchema.safeParse({
      current_password: formData.get('current_password'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
   })

   if (!userPassword.success) {
      return {
         errors: userPassword.error.issues.map(issue => issue.message),
         success: ''
      }
   }

   const token = getToken()
   const url = `${process.env.API_URL}/auth/update-password`
   const req = await fetch(url, {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         current_password: userPassword.data.current_password,
         password: userPassword.data.password
      })
   })

   const json = await req.json()

   if (!req.ok) {
      const { error } = ErrorResponseSchema.parse(json)
      return {
         errors: [error],
         success: ''
      }
   }
   
   const success = SuccessSchema.parse(json)
   return {
      errors: [],
      success
   }
}
