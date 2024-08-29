export async function safeParseJSONResponse<T = unknown>(response: Response) {
  try {
    return (await response.json()) as T
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function safeParseJSON<T = unknown>(json: string) {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    console.error(e)
    return null
  }
}
