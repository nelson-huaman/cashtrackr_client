
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
   return (
      <p className="text-center my-4 bg-red-600 text-white font-bold p-3 text-sm">{children}</p>
   )
}