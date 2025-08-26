import { PdfFileIcon, PrinterIcon } from "@icons"
import { colors } from "@lib"
import { getSession } from "@server"
import { Button } from "@ui"
import { useEffect, useState, useTransition } from "react"

interface FileAttachmentProps {
  fileId: number
}

export const FileAttachment = ({ fileId }: FileAttachmentProps) => {
  const [fName, setFName] = useState("")
  const [fExtension, setFExtension] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const fetchFileData = async (): Promise<{
    fileName: string
    fileExtension: string
    fileId: string
  }> => {
    const session = await getSession()
    const accessToken = session?.access_token

    if (!accessToken) {
      throw new Error("Authentication required")
    }

    const response = await fetch(
      `https://apis.monshaat.gov.sa/ERP/TaskService/api/call/all.requests/get_attachment_details?kwargs={%22attachment_id%22%3A${fileId}}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-api-key": "85ced9c9-b64b-4d76-85a5-ae3b869b044d",
        },
        cache: "force-cache" as RequestCache,
        next: { revalidate: false },
      },
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${response.status} ${response.statusText}`,
      )
    }

    const result = await response.json()
    const fileData = result?.[0]

    if (!fileData?.name) {
      throw new Error("Invalid file data received")
    }

    if (!fileData.id) {
      throw new Error("Invalid file data received")
    }

    return {
      fileName: fileData.name,
      fileExtension: fileData.extension,
      fileId: fileData.id,
    }
  }

  const loadFileData = async (): Promise<void> => {
    try {
      setError(null)
      const fileData = await fetchFileData()
      const fileName = fileData.fileName
      const fileExtension = fileData.fileExtension
      setFName(fileName)
      setFExtension(fileExtension)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load file"
      setError(errorMessage)
    }
  }

  useEffect(() => {
    startTransition(() => {
      loadFileData()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isLoading = isPending || (!fileId && !error)
  const downloadUrl = fileId
    ? `https://publicapis.monshaat.gov.sa/ERP/TaskService/api/attachment/download/${fileId}`
    : ""

  if (error) {
    return <ErrorState error={error} />
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <FileCard
      fileExtension={fExtension}
      fileName={fName}
      downloadUrl={downloadUrl}
    />
  )
}

// Separate components for better readability and reusability
const LoadingSkeleton = () => (
  <div className="rounded-lg gap-3 px-4 flex items-center bg-grey-50 py-3 animate-pulse">
    {/* File Icon Skeleton */}
    <div className="w-10 h-10 flex bg-gray-200 items-center rounded-md justify-center animate-pulse">
      <div className="w-4 h-4 bg-gray-300 rounded"></div>
    </div>

    {/* File Name Skeleton */}
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded-md w-3/4 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
    </div>

    {/* Action Button Skeleton */}
    <div className="flex gap-2 ml-auto">
      <div className="w-6 h-6 bg-gray-200 rounded-sm animate-pulse"></div>
    </div>
  </div>
)

const ErrorState = ({ error }: { error: string }) => (
  <div className="rounded-lg gap-3 px-4 flex items-center bg-red-50 py-3 border border-red-200">
    <div className="w-10 h-10 flex bg-red-100 items-center rounded-md justify-center">
      <PdfFileIcon className="w-4 h-4 text-red-500" />
    </div>

    <div className="flex-1">
      <p className="text-red-700 font-medium text-sm">Error loading file</p>
      <p className="text-red-600 text-xs mt-1">{error}</p>
    </div>

    <div className="text-red-400 text-xs bg-red-100 px-2 py-1 rounded">
      Failed
    </div>
  </div>
)

const FileCard = ({
  fileName,
  fileExtension,
  downloadUrl,
}: {
  fileName: string
  fileExtension: string
  downloadUrl: string
}) => (
  <div className="group rounded-lg my-4 gap-3 px-4 flex items-center bg-grey-50 py-3 hover:bg-gray-100 hover:shadow-sm transition-all duration-200 cursor-pointer border border-gray-100">
    {/* File Icon */}
    <div className="w-10 h-10 flex bg-[#FFF4CF] items-center rounded-md justify-center group-hover:bg-[#FFE8A3] transition-colors">
      <PdfFileIcon className="w-4 h-4 text-amber-600" />
    </div>

    {/* File Info */}
    <div className="flex-1 min-w-0">
      <p
        className="text-sm font-medium text-gray-900 truncate"
        title={fileName}
      >
        {fileName}
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{fileExtension}</p>
    </div>

    {/* Actions */}
    <div className="flex gap-2 ml-auto opacity-70 group-hover:opacity-100 transition-opacity">
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button
          className="bg-primary-opacity hover:bg-primary/20 rounded-md w-8 h-8 p-0 transition-all duration-200 hover:scale-105"
          title="Download file"
        >
          <PrinterIcon
            className="w-3.5 h-3.5"
            width={14}
            height={14}
            fill={colors.light.primary}
          />
        </Button>
      </a>
    </div>
  </div>
)
