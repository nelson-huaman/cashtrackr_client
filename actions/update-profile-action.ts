"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, ProfileFormSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { success } from "zod"

type ActionState = {
   errors: string[]
   success: string
}

export async function updateProfile(prevState: ActionState, formData: FormData) {

   const userData = ProfileFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email')
   })

   if (!userData.success) {
      return {
         errors: userData.error.issues.map(issue => issue.message),
         success: ''
      }
   }

   const token = getToken()
   const url = `${process.env.API_URL}/auth/user`
   const req = await fetch(url, {
      method: 'PUT',
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         name: userData.data.name,
         email: userData.data.email
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
   revalidatePath('/admin/profile/settings')

   return {
      errors: [],
      success
   }
}