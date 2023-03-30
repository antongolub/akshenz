import {$, fs, tempy} from 'zx-extra'

export interface IBuildOptions {
  tag?: string,
  distro?: string
  deps?: string[]
  setups?: string[]
}

export const build = async({distro = 'debian', deps = [], setups = [], tag: _tag}: IBuildOptions): Promise<string> => {
  const cwd = tempy.temporaryDirectory()
  const tag = `${distro}-deps-${deps.join('-')}`

  try {
    // if (await $`docker images -q ${tag}`.toString()) {
    //   console.log(`image ${tag} exists`)
    //   return tag
    // }
  } catch {
    console.log('image does not exist, so it will be built')
  }


  const startSh = `#!/bin/sh
echo "Akzhenz!"
eval "$SCRIPT"`

  // # ${scripts.join('\n')}
  fs.writeFile(`${cwd}/start.sh`, startSh)

  const dockerfile = `
  FROM ${distro}
  RUN apt-get update
  RUN apt-get install -y ${deps.join(' ')}
  ${setups.join('\n')}
  COPY start.sh /start.sh
  RUN chmod +x /start.sh
  RUN mkdir /app
  WORKDIR /app
  ENTRYPOINT ["../start.sh"]
`

  await fs.writeFile(`${cwd}/Dockerfile`, dockerfile)
  await $`docker build -t local/${tag} ${cwd}`

  return tag
}
