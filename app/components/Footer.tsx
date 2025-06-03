export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <section>
      <div className="bg-white p-2.5 w-full flex items-center justify-center mt-32">
        <p className="text-black">جميع الحقوق محفوظة &copy; {currentYear}</p>
      </div>
    </section>
  )
}
