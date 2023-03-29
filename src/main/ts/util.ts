export const memoize = (fn: any, memo = new Map()) => (...args: any[]) => {
  const key = args[0]
  if (memo.has(key)) {
    return memo.get(key)
  }

  const value = fn(...args)
  memo.set(key, value)
  return value
}