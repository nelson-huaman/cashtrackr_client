"use server"

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, PasswordValidationSchema, SuccessSchema } from "@/src/schemas"
import { error } from "console"
import { revalidatePath } from "next/cache"
import { success } from "zod"

type ActionStateType = {
   errors: string[]
   success: string
}
export const deleteBudget = async (budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) => {

   const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))
   if (!currentPassword.success) {
      return {
         errors: currentPassword.error.issues.map(issue => issue.message),
         success: ''
      }
   }

   const token = getToken()
   const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
   const checkPasswordReq = await fetch(checkPasswordUrl, {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         password: currentPassword.data
      })
   })

   const checkPasswordJson = await checkPasswordReq.json()
   if (!checkPasswordReq.ok) {
      const { error } = ErrorResponseSchema.parse(checkPasswordJson)
      return {
         errors: [error],
         success: ''
      }
   }

   // Eliminar
   const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
   const deleteBudgetReq = await fetch(deleteBudgetUrl, {
      method: 'DELETE',
      headers: {
         'Authorization': `Bearer ${token}`
      }
   })

   const deleteBudgetJson = await deleteBudgetReq.json()
   if (!deleteBudgetReq.ok) {
      const { error } = ErrorResponseSchema.parse(deleteBudgetJson)
      return {
         errors: [error],
         success: ''
      }
   }

   revalidatePath('/admin')

   const success = SuccessSchema.parse(deleteBudgetJson)
   return {
      errors: [],
      success
   }
}