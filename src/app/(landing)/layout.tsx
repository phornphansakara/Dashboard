import { Navbar1 } from "@/components/layout/navbar"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Navbar1/>
    {children}
    </>
  )
}