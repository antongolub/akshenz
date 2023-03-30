export const memoize = (fn: any, memo = new Map(), ctx = {}) => function(...args: any[]) {
  const key = args[0]
  if (memo.has(key)) {
    return memo.get(key)
  }

  const value = fn.call(ctx, ...args)
  memo.set(key, value)
  return value
}

export const asArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

export const envify = (input: Record<string, string> = {}, prefix = ''): Record<string, string> => Object.entries(input).reduce<Record<string, string>>((acc, [key, value]) => {
  const k = (prefix+key).replace(/\W/g, '_')
  acc[k.toUpperCase()] = value
  return acc
}, {})

export const envToString = (input: Record<string, string>) => Object.entries(input).reduce((acc, [key, value]) => `${acc}${key}=${value}\n`, '')
