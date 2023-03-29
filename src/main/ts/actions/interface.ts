export type IActionProvider = {
  name: string
  setup: string
  run: string
  requirements: {
    distro?: string[]
    platform: string[] // linux | darwin
    arch: string[]     // arm64 x64 x86_64 aarch64
    deps: string[]
  },
  schema?: Record<string, any>
}
