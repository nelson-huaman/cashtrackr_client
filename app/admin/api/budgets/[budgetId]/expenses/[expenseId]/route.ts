import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"

export async function GET(request: Request, { params }: { params: { budgetId: string, expenseId: string } }) {

   await verifySession()

   const { budgetId, expenseId } = params

   const token = getToken()
   const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
   const req = await fetch(url, {
      headers: {
         'Authorization': `Bearer ${token}`
      }
   })

   const json = await req.json()
   if (!req.ok) {
      return Response.json(json.error, { status: req.status })
   }

   return Response.json(json)
}