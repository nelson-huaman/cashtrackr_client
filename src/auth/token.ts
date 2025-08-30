import { cookies } from "next/headers"

const getToken = () => {
   const token = cookies().get('CASHTRAKR_TOKEN')?.value
   return token
}

export default getToken