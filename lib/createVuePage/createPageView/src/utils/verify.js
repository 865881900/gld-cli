import { isString } from 'loadsh/lang';
import ValidError from './error/ValidError';
import RenderError from "../error/reanderError";

export function validateIsPhone(phone) {
  if (!isString(phone)) {
    throw new ValidError('请输入正确的手机号');
  }
  if (phone === '') {
    throw new ValidError('手机号不能为空');
  }
  if (!/^1\d{10}$/.test(phone)) {
    throw new ValidError('请输入正确的手机号');
  }
}

/**
 *
 * @param v: 被校验的对象
 * @param validateMap: 字段key和字段说明的对象
 * @throws ValidError: 校验异常
 */
export function validateDataParam(v = {}, validateMap = {}) {
  const keys = Object.keys(validateMap);
  keys.forEach((key) => {
    if (v[key] === '' || v[key] === void 0) {
      throw new ValidError(`${validateMap[key]}不能为空`);
    }
  });
}

/**
 * 根据校验依据函数,对值进行校验
 * @param data: 校验对象
 * @param verifyAccording: 校验依据函数
 * @throws ValidError: 校验异常
 */
export function verifyConform(data, verifyAccording = () => true, errorMessage) {
  if(!verifyAccording(data)){
    throw new RenderError(errorMessage)
  }
}
