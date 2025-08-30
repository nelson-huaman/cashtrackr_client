import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
   title: 'CashTrakr - Olvidé mi Contraseña',
   description: 'CashTrakr - Olvidé mi Contraseña'
}

export default function ForgotPasswordPage() {
   return (
      <>
         <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu Contraseña?</h1>
         <p className="text-3xl font-bold">aquí puedes <span className="text-amber-500">reestablecerla</span></p>

         <ForgotPasswordForm />

         <nav className="mt-8 flex flex-col space-y-4">
            <Link
               href="/auth/login"
               className="text-center text-gray-500"
            >
               ¿Ya tienes cuenta? <span className="font-bold">Iniciar Sesión</span>
            </Link>
            
            <Link
               href="/auth/register"
               className="text-center text-gray-500"
            >
               ¿No tienes cuenta? <span className="font-bold">Crea una</span>
            </Link>
         </nav>
      </>
   )
}