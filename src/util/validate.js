import Joi from '@hapi/joi'
import { message } from 'antd'

export default function validate(data, schema) {
  const { error, value } = Joi.validate(data, schema)
  if (error) {
    const { details = [{}] } = error
    const { context = {} } = details[0]
    const { label = '请输入正确的信息' } = context
    message.error(label)
  }
  return { error, value }
}
