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
    }
  },
  required: ['name', 'on'],
}

export const validate = ajv.compile(schema)
