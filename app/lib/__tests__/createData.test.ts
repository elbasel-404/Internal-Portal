import { describe, it, expect, vi, beforeEach } from "vitest"
import { createData } from "../createData"
import { z } from "zod"

// Set up proper typing for vi.mocked
vi.mock("node:fetch", () => ({
  default: vi.fn(),
}))

// Mock dependencies
vi.mock("@auth", () => ({
  getStoredEmployeeId: vi.fn(() => "123"),
}))

vi.mock("../../server/getFetchHeaders", () => ({
  getFetchHeaders: vi.fn(() => ({
    headers: {
      Authorization: "Bearer test-token",
      "x-api-key": "test-api-key",
    },
  })),
}))

// Mock fetch
global.fetch = vi.fn()

describe("createData", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(global.fetch).mockReset()
  })

  it("should handle successful submission", async () => {
    // Mock FormData
    const formData = new FormData()
    formData.append("field1", "value1")
    formData.append("field2", "value2")

    // Mock schema
    const schema = z.object({
      employee_id: z.string(),
      field1: z.string(),
      field2: z.string(),
    })

    // Mock fetch response
    const mockResponse = {
      json: vi.fn().mockResolvedValue([
        {
          data: { id: 456 },
          message: "Success",
          status: "success",
        },
      ]),
      status: 201,
      ok: true,
      statusText: "Created",
      headers: new Headers(),
      redirected: false,
      type: "basic",
      url: "https://example.com",
      bodyUsed: false,
      body: null,
      clone: () => mockResponse as unknown as Response,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(""),
    }

    // Use mockReturnValueOnce to return a promise resolving to our mock response
    vi.mocked(global.fetch).mockReturnValueOnce(
      Promise.resolve(mockResponse as unknown as Response),
    )

    // Call the function
    const result = await createData("api/test", schema, formData)

    // Assertions
    expect(result.success).toBe(true)
    expect(result.errors).toBe(null)
    expect(result.id).toBe(456)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  it("should handle validation errors", async () => {
    // Mock FormData with invalid values
    const formData = new FormData()
    formData.append("field1", "") // Empty value will fail validation

    // Mock schema that requires non-empty field1
    const schema = z.object({
      employee_id: z.string(),
      field1: z.string().min(1, "Field1 is required"),
    })

    // Call the function
    const result = await createData("api/test", schema, formData)

    // Assertions
    expect(result.success).toBe(false)
    expect(result.errors).toContain("Field1 is required")
    expect(result.id).toBe(null)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it("should handle server errors", async () => {
    // Mock FormData
    const formData = new FormData()
    formData.append("field1", "value1")

    // Mock schema
    const schema = z.object({
      employee_id: z.string(),
      field1: z.string(),
    })

    // Mock fetch response for server error
    const mockResponse = {
      json: vi.fn().mockResolvedValue([
        {
          error: "Server error message",
          status: "error",
        },
      ]),
      status: 400,
      ok: false,
      statusText: "Bad Request",
      headers: new Headers(),
      redirected: false,
      type: "basic",
      url: "https://example.com",
      bodyUsed: false,
      body: null,
      clone: () => mockResponse as unknown as Response,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(""),
    }

    vi.mocked(global.fetch).mockReturnValueOnce(
      Promise.resolve(mockResponse as unknown as Response),
    )

    // Call the function
    const result = await createData("api/test", schema, formData)

    // Assertions
    expect(result.success).toBe(false)
    expect(result.errors).toContain("Server error message")
    expect(result.id).toBe(null)
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  it("should handle failed fetch headers", async () => {
    // Import mocked module again to avoid require()
    await import("../../server/getFetchHeaders")
    // Use vi.Mock instead
    vi.mock("../../server/getFetchHeaders", () => ({
      getFetchHeaders: vi.fn(() => undefined),
    }))

    // Mock FormData
    const formData = new FormData()
    formData.append("field1", "value1")

    // Mock schema
    const schema = z.object({
      employee_id: z.string(),
      field1: z.string(),
    })

    // Call the function
    const result = await createData("api/test", schema, formData)

    // Assertions
    expect(result.success).toBe(false)
    expect(result.errors).toContain("Failed to get fetchHeaders")
    expect(result.id).toBe(null)
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it("should apply massageBody function to request body", async () => {
    // Mock FormData
    const formData = new FormData()
    formData.append("field1", "value1")

    // Mock massageBody function
    const massageBody = vi.fn((body) => ({
      ...body,
      extra_field: "extra_value",
    }))

    // Mock schema
    const schema = z.object({
      employee_id: z.string(),
      field1: z.string(),
      extra_field: z.string(),
    })

    // Mock fetch response
    const mockResponse = {
      json: vi.fn().mockResolvedValue([
        {
          data: { id: 456 },
          message: "Success",
          status: "success",
        },
      ]),
      status: 201,
      ok: true,
      statusText: "Created",
      headers: new Headers(),
      redirected: false,
      type: "basic" as ResponseType,
      url: "https://example.com",
      bodyUsed: false,
      body: null,
      clone: () => mockResponse as unknown as Response,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(""),
    }

    vi.mocked(global.fetch).mockReturnValueOnce(
      Promise.resolve(mockResponse as unknown as Response),
    )

    // Call the function
    await createData("api/test", schema, formData, massageBody)

    // Assertions
    expect(massageBody).toHaveBeenCalled()
    expect(massageBody).toHaveBeenCalledWith(
      expect.objectContaining({
        field1: "value1",
        employee_id: "123",
      }),
    )
  })
})
