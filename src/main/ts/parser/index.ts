import {ErrorObject} from 'ajv'
import {load} from 'js-yaml'

import {IWorkflow} from './interface'
import { validate } from './schema'

export class ValidationError extends Error {
  constructor(message: string, public errors?: ErrorObject[] | null) {
    super(message)
    this.errors = errors
  }
}

export const parse = (value: string): IWorkflow => {
  const raw = load(value) as IWorkflow

  if (!validate(raw)) {
    throw new ValidationError('Invalid workflow', validate.errors)
  }

  return raw
}

export {validate, schema} from './schema'
