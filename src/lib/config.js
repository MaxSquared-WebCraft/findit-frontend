const env = process.env.NODE_ENV || 'production'
const appEnv = process.env.REACT_APP_ENV || 'production'

const production = {
  base: 'nix'
}

const development = {
  base: 'nix'
}

const local = {
  base: 'http://192.168.99.100:8081/'
}

const appEnvs = { production, development, local }

export default {
  ...appEnvs[appEnv],
  env,
}