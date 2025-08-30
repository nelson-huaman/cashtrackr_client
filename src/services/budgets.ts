import { cache } from "react"
import getToken from "../auth/token"
import { notFound } from "next/navigation"
import { BudgetAPIResponseSchema, BudgetsAPIResponseSchema } from "../schemas"

export const getBudget = cache(async (id: string) => {

   const token = getToken()
   const url = `${process.env.API_URL}/budgets/${id}`
   const req = await fetch(url, {
      headers: {
         'Authorization': `Bearer ${token}`
      }
   })

   const json = await req.json()

   if (!req.ok) {
      notFound()
   }

   const budget = BudgetAPIResponseSchema.parse(json)
   return budget
})

export const getUserBudgets = async () => {
   try {
      const token = getToken()
      const url = `${process.env.API_URL}/budgets`
      const req = await fetch(url, {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      })

      if(!req.ok) {
         return []
      }

      const json = await req.json()
      const budgets = BudgetsAPIResponseSchema.parse(json)

      return budgets
   } catch (error) {
      console.log(error)
      return []
   }

}