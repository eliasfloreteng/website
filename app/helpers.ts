export async function safeParseJSON<T = unknown>(json: string) {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    console.log("Failed to parse JSON:")
    console.log(json)
    console.error(e)
    return null
  }
}

export async function safeParseJSONResponse<T = unknown>(response: Response) {
  const text = await response.text()
  return safeParseJSON<T>(text)
}
