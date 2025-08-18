import { Select } from "../../components/Select"

interface ReportProblemTicketPageProps {
  searchParams: Promise<{ 
    category?: string
    subcategory?: string 
    subcategory2?: string
    subcategory3?: string
  }>
}

interface CategoryItem {
  label: string
  value: string
}

interface CategoryLinks {
  label: string
  href: string
}

const ReportProblemTicketPage = async ({
  searchParams,
}: ReportProblemTicketPageProps) => {
  const { category, subcategory, subcategory2, subcategory3 } = await searchParams
  
  // API configuration
  const headers = new Headers()
  headers.append("Accept", "application/json")
  headers.append("x-api-key", "85ced9c9-b64b-4d76-85a5-ae3b869b044d")
  headers.append(
    "Authorization",
    "Basic bW9uc2hhYXRfbW9iaWxlX2FwcDpNMGJpbGVAcHA=",
  )

  const baseUrl = "https://helpstg.monshaat.gov.sa/api/tisu4"

  // Helper function to fetch category data
  const fetchCategoryData = async (endpoint: string): Promise<CategoryItem[]> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        headers,
        redirect: "follow",
      })
      const json = await response.json()
      return json.result || []
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      return []
    }
  }

  // Helper function to build query string
  const buildQueryString = (params: Record<string, string | undefined>): string => {
    const filteredParams = Object.entries(params)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join('&')
    return filteredParams ? `?${filteredParams}` : ''
  }

  // 1. Fetch main categories
  const mainCategories = await fetchCategoryData("monshaat_query_category")
  const mainCategoryLinks: CategoryLinks[] = mainCategories.map(({ label, value }) => ({
    label,
    href: buildQueryString({ category: value }),
  }))

  // 2. Fetch subcategories if main category is selected
  let subCategoryLinks: CategoryLinks[] = []
  if (category && mainCategories.length > 0) {
    const subCategories = await fetchCategoryData(
      `monshaat_query_subcategory?category_value=${encodeURIComponent(category)}`
    )
    subCategoryLinks = subCategories.map(({ label, value }) => ({
      label,
      href: buildQueryString({ category, subcategory: value }),
    }))
  }

  // 3. Fetch subcategory2 if subcategory is selected
  let subCategory2Links: CategoryLinks[] = []
  if (subcategory && subCategoryLinks.length > 0) {
    const subCategories2 = await fetchCategoryData(
      `monshaat_query_subcategory2?subcategory_value=${encodeURIComponent(subcategory)}`
    )
    subCategory2Links = subCategories2.map(({ label, value }) => ({
      label,
      href: buildQueryString({ category, subcategory, subcategory2: value }),
    }))
  }

  // 4. Fetch subcategory3 if subcategory2 is selected
  let subCategory3Links: CategoryLinks[] = []
  if (subcategory2 && subCategory2Links.length > 0) {
    const subCategories3 = await fetchCategoryData(
      `monshaat_query_subcategory3?subcategory_value=${encodeURIComponent(subcategory2)}`
    )
    subCategory3Links = subCategories3.map(({ label, value }) => ({
      label,
      href: buildQueryString({ category, subcategory, subcategory2, subcategory3: value }),
    }))
  }

  return (
    <div className="bg-white p-4">
      {/* Main Category - Always show if we have data */}
      {mainCategoryLinks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Main Category</h3>
          <Select links={mainCategoryLinks} />
        </div>
      )}
      
      {/* Subcategory - Only show if main category is selected and we have subcategory data */}
      {category && subCategoryLinks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Subcategory</h3>
          <Select links={subCategoryLinks} />
        </div>
      )}
      
      {/* Subcategory 2 - Only show if subcategory is selected and we have subcategory2 data */}
      {subcategory && subCategory2Links.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Subcategory 2</h3>
          <Select links={subCategory2Links} />
        </div>
      )}
      
      {/* Subcategory 3 - Only show if subcategory2 is selected and we have subcategory3 data */}
      {subcategory2 && subCategory3Links.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Subcategory 3</h3>
          <Select links={subCategory3Links} />
        </div>
      )}
      
      {/* Debug info - Only show if at least one category is selected */}
      {(category || subcategory || subcategory2 || subcategory3) && (
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Selected: {[category, subcategory, subcategory2, subcategory3]
              .filter(Boolean)
              .join(' → ')
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default ReportProblemTicketPage