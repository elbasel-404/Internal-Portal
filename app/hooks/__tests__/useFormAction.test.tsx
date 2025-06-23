import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { useFormAction } from "../useFormAction"
import { toast } from "sonner"

// Mock dependencies
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}))

describe("useFormAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should initialize with default state", () => {
    // Mock action function
    const mockAction = vi.fn()

    // Render the hook
    const { result } = renderHook(() => useFormAction(mockAction))

    // Assert initial state
    expect(result.current.state).toEqual({
      success: false,
      errors: null,
      id: null,
    })
    expect(result.current.pending).toBe(false)
  })

  it("should handle successful form submission", async () => {
    // Mock successful response
    const mockResponse = {
      success: true,
      errors: null,
      id: 123,
    }

    // Mock action function
    const mockAction = vi.fn().mockResolvedValue(mockResponse)

    // Render the hook
    const { result } = renderHook(() => useFormAction(mockAction))

    // Mock FormData
    const mockFormData = {} as FormData

    // Trigger the action
    await act(async () => {
      await result.current.action(mockFormData)
    })

    // Assert state after successful submission
    expect(result.current.state).toEqual(mockResponse)
    expect(result.current.pending).toBe(false)

    // Assert that action was called with form data
    expect(mockAction).toHaveBeenCalledWith(mockFormData)

    // Assert toast calls
    expect(toast.success).toHaveBeenCalledWith("تم انشاء الطلب بنجاح")
  })

  it("should handle validation errors", async () => {
    // Mock error response
    const mockResponse = {
      success: false,
      errors: ["Error 1", "Error 2"],
      id: null,
    }

    // Mock action function
    const mockAction = vi.fn().mockResolvedValue(mockResponse)

    // Render the hook
    const { result } = renderHook(() => useFormAction(mockAction))

    // Mock FormData
    const mockFormData = {} as FormData

    // Trigger the action
    await act(async () => {
      await result.current.action(mockFormData)
    })

    // Assert state after failed submission
    expect(result.current.state).toEqual(mockResponse)
    expect(result.current.pending).toBe(false)

    // Assert toast error calls for each error message
    expect(toast.error).toHaveBeenCalledTimes(2)
    expect(toast.error).toHaveBeenNthCalledWith(1, "Error 1")
    expect(toast.error).toHaveBeenNthCalledWith(2, "Error 2")
  })

  it("should handle loading state", async () => {
    // Mock action function that takes time to resolve
    const mockAction = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            errors: null,
            id: 123,
          })
        }, 100)
      })
    })

    // Render the hook
    const { result } = renderHook(() => useFormAction(mockAction, "test-toast"))

    // Trigger the action but don't wait for it to complete
    act(() => {
      result.current.action({} as FormData)
    })

    // Assert loading state right after triggering
    expect(result.current.pending).toBe(true)
    expect(toast.loading).toHaveBeenCalledWith("جاري انشاء الطلب", {
      id: "test-toast",
    })
  })

  it("should handle exceptions", async () => {
    // Mock action function that throws an error
    const mockAction = vi.fn().mockRejectedValue(new Error("Network error"))

    // Render the hook
    const { result } = renderHook(() => useFormAction(mockAction))

    // Mock console.error to avoid test output noise
    const originalConsoleError = console.error
    console.error = vi.fn()

    // Trigger the action
    await act(async () => {
      await result.current.action({} as FormData)
    })

    // Restore console.error
    console.error = originalConsoleError

    // Assert state after exception
    expect(result.current.state).toEqual({
      success: false,
      errors: ["حدث خطأ أثناء معالجة النموذج"],
      id: null,
    })
    expect(result.current.pending).toBe(false)

    // Assert error was logged
    expect(console.error).toHaveBeenCalled()
  })
})
