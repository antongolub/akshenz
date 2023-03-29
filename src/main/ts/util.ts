export const memoize = (fn: any, memo = new Map(), ctx = {}) => function(...args: any[]) {
  const key = args[0]
  if (memo.has(key)) {
    return memo.get(key)
  }

  const value = fn.call(ctx, ...args)
  memo.set(key, value)
  return value
}