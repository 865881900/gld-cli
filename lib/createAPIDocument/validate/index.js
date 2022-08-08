// 根据类型转型
// string boolean integer array file
// string,integer,boolean,array,file,

// 被支持的方式;
const JOINT_METHOD = ['GET', 'DELETE', 'HEAD'];

function getParaType(type) {
  switch (type) {
    case 'string':
    case 'boolean':
    case 'array':
      return type;
    case 'integer':
      return 'number';
  }

  return false;
}


function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * "name": "sectionCode",
 *             "in": "query",
 *             "description": "标段(包)编号",
 *             "required": false,
 *             "type": "string"
 * @param data
 * @param paraTypes
 */

/**
 * 校验参数是否符合约定
 * @param item  参数的信息
 * @param value 参数的实际值
 * @param isPostQuery 是否是校验post方式的query的字段
 * @return code 错误值
 * 501: 必填
 */
function validate(item, value, isPostQuery) {
  const {required, name} = item;
  const paraType = getParaType(item.type);
  const valueType = getType(value);

  // 校验必填参数
  if (required && value === undefined) {
    return `参数${name}为必填参数`;
  }

  // 校验类型
  if (isPostQuery) {
    switch (paraType) {
      case 'boolean':
        if (value !== 'true' && value !== 'false') {
          return `参数'${name}'类型应为${paraType},当前为${getType(valueType)}`;
        }
        value = Boolean(value);
        break;
      case 'number':
        if (isNaN(value)) {
          return `参数'${name}'类型应为${paraType},当前为${getType(valueType)}`;
        }
        value = Number(value);
        break;
      case 'array':
        value = JSON.parse(value);
        if (!Array.isArray(value)) {
          return `参数'${name}'类型应为${paraType},当前为${getType(valueType)}`;
        }
    }
  } else {
    // 校验类型
    if (value !== undefined && paraType && valueType !== paraType) {
      return `参数'${name}'类型应为${paraType},当前为${valueType}`;
    }
  }

  // 校验枚举类型
  if (paraType !== 'array' && item.enum && item.enum.length > 0) {
    if (!item.enum.includes(value)) {
      return `参数${name}为枚举类型,类型: ${JSON.stringify(item.enum)}`;
    }
  }


  if (paraType === 'array' && value) {
    const codes = value.map(items => validate({
      ...item.items,
      required: false
    }, items, false)).filter(item => item !== '200');
    return codes.length > 0 ? `参数${name}为数组枚举类型,其中有参数的类型有误;类型: ${JSON.stringify(item.enum)}` : '200';
  }
  return '200';
}


/**
 * 解析post等请求方式中在url上拼接的参数
 */
function ganPathQuery(url) {
  const data = {};
  let query = url.split('?');
  if (query.length < 2) {
    return data;
  }
  query = query[1].split('&');
  query.forEach(item => {
    const d = item.split('=');
    data[d[0]] = d[1];
  });
  return data;
}


// 把对象的key扁平化
function flatObject(o, tag = '') {
  const keys = Object.keys(o);
  return keys.map(item => {
    const tags = `${tag ? `${tag}.${item}` : item}`;
    const v = o[item];
    if (getType(v) === 'object') {
      return flatObject(v, tags);
    }
    return tags;
  }).flat(10);
}



/**
 * 参数类型校验
 * @param data 参数对象
 * @param paraTypes 参数类型集合
 * @param path 请求路径
 * @param methods 请求方式
 */
module.exports.validateParameter = function (data, paraTypes, path, methods) {

  const error = [];
  let code;
  // 参数是否通过body传值;
  const isBody = !JOINT_METHOD.includes(methods.toUpperCase());
  const postQuery = ganPathQuery(path);

  // 找出必填项目
  const requiredNameList = paraTypes.filter(item => item.required).map(item => item.name);
  // 当前的参数
  const dataKeys = flatObject(data);

  requiredNameList.forEach(item => {
    if (!dataKeys.includes(item)) {
      dataKeys.push(item);
    }
  });


  dataKeys.forEach(item => {
    const paraType = paraTypes.find(items => items.name === item);
    if (isBody && paraType.in === 'query') {
      code = validate(paraType, postQuery[paraType.name], true);
    } else {
      code = validate(paraType, data[paraType.name], false);
    }
    if (code !== '200') {
      error.push(code);
    }
  });

  console.log(error);

  return error.length === 0;
};
