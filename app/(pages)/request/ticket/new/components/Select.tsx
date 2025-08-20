"use client"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { useState } from "react"

interface SelectProps {
  links: {
    label: string
    href: string
  }[]
  placeholder?: string
  className?: string
}

export const Select = ({
  links,
  placeholder = "Select an option",
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const handleOptionClick = (label: string) => {
    setSelectedLabel(label)
    setIsOpen(false)
  }

  if (links.length === 0) return
  return (
    <div className={twMerge("relative w-full", className)}>
      {/* Select Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          selectStyle,
          isOpen && "ring-2 ring-blue-500 bg-[#007497]/20",
          "cursor-pointer select-none flex items-center justify-between",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className={twMerge(
            "transition-colors duration-200",
            selectedLabel ? "text-[#11274A]" : "text-[#11274A]/60",
          )}
        >
          {selectedLabel || placeholder}
        </span>

        {/* Chevron Icon */}
        <svg
          className={twMerge(
            "w-5 h-5 transition-transform duration-500 ease text-[#007497]",
            isOpen && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      <div
        className={twMerge(
          "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50",
          "transform transition-all duration-500 ease origin-top",
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-90 -translate-y-4 pointer-events-none",
        )}
        role="listbox"
      >
        <div className="py-1 max-h-60 overflow-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#007497]/30 hover:scrollbar-thumb-[#007497]/50 scrollbar-thumb-rounded-full">
          {links.map(({ href, label }, index) => {
            return (
              <Link
                href={href}
                className={twMerge(
                  optionStyle,
                  // Add staggered animation delay for each option
                  isOpen && `animate-in slide-in-from-top-2 duration-200`,
                )}
                style={{
                  animationDelay: isOpen ? `${index * 75}ms` : "0ms",
                }}
                key={href + label}
                onClick={() => handleOptionClick(label)}
                role="option"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleOptionClick(label)
                  }
                }}
              >
                <span className="block truncate">{label}</span>

                {/* Selected indicator */}
                {selectedLabel === label && (
                  <svg
                    className="w-4 h-4 text-[#007497] animate-in zoom-in-75 duration-300 ease"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}

const selectStyle = twMerge(
  "text-[#11274A] appearance-none bg-[#007497]/10 block w-full border border-gray-200",
  "p-4 rounded-md transition-all duration-300 ease",
  "hover:bg-[#007497]/15 hover:border-[#007497]/30 hover:shadow-sm",
  "focus:border-[#007497] focus:!outline-0 focus:ring-2 focus:ring-blue-500/20",
  "active:scale-[0.996] active:bg-[#007497]/20",
)

const optionStyle = twMerge(
  "flex items-center justify-between px-4 py-3 text-[#11274A]",
  "hover:bg-[#007497]/10 hover:text-[#007497] cursor-pointer",
  "transition-all duration-300 ease",
  "hover:translate-x-2 hover:shadow-sm hover:bg-gradient-to-r hover:from-[#007497]/5 hover:to-[#007497]/15",
  "focus:bg-[#007497]/15 focus:text-[#007497] focus:outline-none",
  "active:bg-[#007497]/20 active:scale-[0.98] active:translate-x-1",
  "border-l-4 border-transparent hover:border-[#007497]/50",
  "group relative overflow-hidden",
)
