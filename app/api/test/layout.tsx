import "../../(pages)/globals.css"

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="p-4 min-h-screen bg-black text-white">{children}</body>
    </html>
  )
}

export default RootLayout
