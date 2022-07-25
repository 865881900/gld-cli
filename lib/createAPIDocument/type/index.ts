/**
 * 解析类型:
 * 'swagger' | 's': swagger
 * 'localFile' | 'l': 本地文件
 */
export type CreateAPIAnalyticType = 'swagger' | 's' | 'localFile' | 'l';

/**
 * 文件输出类型:
 * expanding: 所有的接口在一个文件中输出
 * module: 按照模块形式输出
 */
export type FileOutletType = 'module' | 'expanding';



/**
 * 沈福成api函数风格:
 * lcc: 小驼峰
 * UCC: 大驼峰
 * u_c: 下划线
 */
export type FunctionNameStyle = 'lcc' | 'UCC' | 'u_c';

// 接口请求方式
export type ApiMethod = 'GET' | 'DELETE' | 'HEAD' | 'POST' | 'PUT' | 'PATCH';

//请求参数类型
export type aa = 'integer' | 'boolean' | 'byte' | 'short' |'double' | 'Boolean' | 'character' | 'long' | 'float' | 'array' | 'object';
