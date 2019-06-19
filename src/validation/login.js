import Joi from '@hapi/joi'
import validate from '../util/validate'

const schema = Joi.object().keys({
  user: Joi.string().alphanum().min(3).max(30).required().label('用户名不合法'),
  password: Joi.string().min(8).required().label('密码不合法'),
})

export default function validateLogin(auth) {
  return validate(auth, schema)
}
