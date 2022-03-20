const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV
export { isDev }

const fetcher = async (url: any, ...args: any) => {
  const res = await fetch(url, ...args)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}
export { fetcher }
