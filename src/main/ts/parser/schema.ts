import Ajv from 'ajv'

const ajv = new Ajv()

export const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    on: {
      type: 'string',
    },
    jobs: {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'object',
          properties: {
            steps: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  uses: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  with: {
                    type: 'object',
                    patternProperties: {
                      '.*': {
                        type: 'string',
                      }
                    }
                  },
                  env: {
                    type: 'object',
                    patternProperties: {
                      '.*': { type: 'string' }
                    }
                  }
                },
                required: ['uses'],
              }
            }
          }
        }
      }
    }
  },
  required: ['name', 'on'],
}

export const validate = ajv.compile(schema)
