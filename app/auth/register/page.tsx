import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
   title: 'CashTrakr - Crear Cuenta',
   description: 'CashTrakr - Crear Cuenta'
}

export default function RegisterPage() {
   return (
      <>
         <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
         <p className="text-3xl font-bold">y controla tus <span className="text-amber-500">finanzas</span></p>

         <RegisterForm />

         <nav className="mt-8 flex flex-col space-y-4">
            <Link
               href="/auth/login"
               className="text-center text-gray-500"
            >
               ¿Ya tienes cuenta? <span className="font-bold">Iniciar Sesión</span>
            </Link>

            <Link
               href="/auth/forgot-password"
               className="text-center text-gray-500"
            >
               ¿Olvidaste tu Contraseña? <span className="font-bold">Reestablecer</span>
            </Link>
         </nav>
      </>
   )
}