export default function SuccessMessage({ children }: { children: React.ReactNode }) {
   return (
      <p className="text-center my-4 bg-green-600 text-white font-bold p-3 text-sm">{children}</p>
   )
}