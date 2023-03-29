import Ajv, {ErrorObject} from 'ajv'
import {memoize} from './util'

const ajv = new Ajv()
const ajvCompile = memoize(ajv.compile)

export type ISchema = Record<string, any>

export class ValidationError extends Error {
  constructor(message: string, public errors?: ErrorObject[] | null) {
    super(message)
    this.errors = errors
  }
}

export const validate = (schema: ISchema, target: any) => {
  const ajvValidate = ajvCompile(schema)

  if (!ajvValidate(target)) {
    throw new ValidationError('Invalid workflow', ajvValidate.errors)
  }
}
