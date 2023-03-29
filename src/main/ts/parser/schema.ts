import {ISchema} from '../schema'

// https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions
export const workflowSchema: ISchema = {
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
                anyOf: [
                  { $ref: '#/$defs/action' },
                  { $ref: '#/$defs/command' },
                ]
              }
            }
          }
        }
      }
    }
  },
  required: ['jobs', 'on'],
  $defs: {
    command: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        run: {
          type: 'string',
        }
      }
    },
    action: {
      type: 'object',
      properties: {
        need: {
          type: 'array',
          items: {
            type: 'string',
          }
        },
        name: {
          type: 'string',
        },
        uses: {
          type: 'string',
        },
        run: {
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
      }
    }
  }
}
