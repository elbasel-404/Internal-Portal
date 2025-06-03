//app/test/page.tsx
import type { Route } from "next"
import Link from "next/link"

const testLinks = [
  {
    title: "Icons",
    links: [{ title: "Icon", link: "/test/icons" }],
  },
  {
    title: "UI Components",
    links: [
      { title: "Carousel", link: "/test/ui/carousel" },
      { title: "Switch", link: "/test/ui/switch" },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "Charts", link: "test/components/charts" },
      { title: "Drag And Drop", link: "/test/components/dragAndDrop" },
    ],
  },
  {
    title: "Actions",
    links: [
      {
        title: "Update Home Page Slot",
        link: "/test/actions/updateHomePageSlot",
      },
    ],
  },
]

const TestPage = () => {
  return (
    <div className="text-2xl flex items-center justify-center h-screen bg-black text-white p-8">
      {testLinks.map((section, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 mt-8 h-full flex-1"
        >
          <h2 className="text-3xl font-bold">{section.title}</h2>
          {section.links.map((link, linkIndex) => (
            <Link
              key={linkIndex}
              href={link.link as Route}
              className="hover:text-yellow-300 text-blue-400 underline decoration-wavy"
            >
              {link.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TestPage
