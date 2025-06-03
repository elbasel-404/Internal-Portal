"use client"

import { useOnClickOutside } from "@hooks"
import {
  CapaIcon,
  DotsIcon,
  EngineeringIcon,
  GraphIcon,
  TicketIcon,
  UserAltIcon,
} from "@icons"
import { Button } from "@ui"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, type ReactNode } from "react"

interface MenuItemProps {
  title: string
  icon: ReactNode
  items: string[]
}

const menuItems: MenuItemProps[] = [
  {
    title: "الموارد البشرية",
    icon: <UserAltIcon />,
    items: [
      "خدمات الموارد البشرية",
      "المتعاقدين",
      "التدريب",
      "التوظيف",
      "الرواتب و التعويضات",
      "الأداء و المكافآت",
      "التطوير التنظيمي",
    ],
  },
  {
    title: "المشتريات",
    icon: <TicketIcon />,
    items: ["المشتريات", "مخزون", "طلبات الشراء"],
  },
  {
    title: "المالية",
    icon: <GraphIcon />,
    items: ["المصروفات", "المالية", "مخزون", "الميزانية"],
  },
  {
    title: "الأنظمة الأخرى",
    icon: <CapaIcon />,
    items: ["بنك الأفكار", "طلبات المرافق و الخدمات الإدارية", "الاستفسارات"],
  },
  {
    title: "اعدادات النظام",
    icon: <EngineeringIcon />,
    items: ["اعدادات النظام", "اعدادات البوابة", "نماذج التخاطبات"],
  },
]

export const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setIsOpen(false))

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Button
        variant="secondary"
        onClick={toggleModal}
        className="hover:bg-secondary w-full p-2.5 rounded-full"
      >
        <DotsIcon />
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleModal}
        ></div>
      )}

      {/* Modal Content */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-700 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {/* Modal Box */}
        <div
          ref={ref}
          className="relative bg-white w-full mx-6 lg:mx-16 h-[400px] lg:h-fit overflow-auto rounded-lg  transform transition-transform duration-500 ease-in-out"
        >
          {/* Content */}
          <div className="p-4 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-right">
              {menuItems.map((section, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <div className="flex items-center justify-start gap-4 rounded-md bg-cloudGray px-4 py-2.5">
                      <div className="p-2.5 bg-primary-opacity rounded-xl">
                        {section.icon}
                      </div>
                      <span className="font-bold text-xl 2xl:text-2xl text-foreground">
                        {section.title}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <div>
                          <Link
                            href="#"
                            className="block px-4 py-2.5 border-b border-cloudGray text-strom-gray text-lg hover:bg-primary-opacity hover:border-r-4 hover:border-r-primary"
                          >
                            {item}
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="hidden lg:block absolute bottom-0 right-0">
                <Image
                  src="/Vector-logo.svg"
                  alt="vector-logo"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
