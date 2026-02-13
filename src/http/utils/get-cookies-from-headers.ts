export function getCookieFromHeaders(headers: HeadersInit) {
  const outgoingHeaders = new Headers()

  const incomingHeaders = new Headers(headers)
  const cookies = incomingHeaders.get('cookie')

  if (!cookies) return undefined

  outgoingHeaders.set('cookie', cookies)
  outgoingHeaders.set('Content-Type', 'application/json')

  return outgoingHeaders
}
