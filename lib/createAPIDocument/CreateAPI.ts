/**
 * @file: 根据文档生成api接口类
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/7/15 5:56 PM
 *
 *
 *
 *
 * 初始化生成api命令
 * 参数:
 * 解析类型: swagger | localFile | 后续再加
 * 解析路径: string
 * 文件生成目录: 对项目当前node的相对路径
 * 文件风格:  每个对象分为单独文件, 全部在一个js文件中
 * 是否生成注解
 * 是否调用前校验
 * 接口函数名风格: 下划线| 大驼峰 | 小驼峰
 */


import {CreateAPIAnalyticType, FileOutletType} from './type';
import ICreateAPIOption from './interface/ICreateAPIOption';
import IParseFile from './interface/IParseFile';
import SwaggerParseFile from './parseFile/SwaggerParseFile';
import WriteFile from './writeFile/WriteFile';
import WriteFileModule from './writeFile/WriteFileModule';
import WriteFileExpanding from './writeFile/WriteFileExpanding';

export default class CreateAPI {
  // 解析类型
  analyticType: CreateAPIAnalyticType;

  // 解析路径: 当解析类型为swagger时, 解析路径为一个链接地址; 如果解析类型为localFile时,解析路径为相对当前项目根目录的文件
  analyticUrl: string;

  // 生成文件类型
  fileOutletType: FileOutletType;

  // 解析文件对象
  parseFile: IParseFile;

  // 生成js文件对象
  writeFile: WriteFile;


  constructor(createAPIOption: ICreateAPIOption) {
    this.analyticType = createAPIOption.analyticType;
    this.analyticUrl = createAPIOption.analyticUrl;
    this.fileOutletType = createAPIOption.fileOutletType;

    switch (this.analyticType) {
      case 'swagger':
      case 's':
        this.parseFile = new SwaggerParseFile();
        break;
      case 'localFile':
      case 'l':
        // this.parseFile = new LocalFileParseFile();
        break;
    }

    console.log(this.fileOutletType);
    if (this.fileOutletType === 'module' || this.fileOutletType === 'm') {
      this.writeFile = new WriteFileModule(
        createAPIOption.outputPathDirName,
        createAPIOption.requestBeforeIsVerify,
        createAPIOption.functionNameStyle,
        createAPIOption.isGeneratedComments
      );
    } else {
      this.writeFile = new WriteFileExpanding(
        createAPIOption.outputPathDirName,
        createAPIOption.requestBeforeIsVerify,
        createAPIOption.functionNameStyle,
        createAPIOption.isGeneratedComments
      );
    }
  }

  async run() {
    // 解析数据
    await this.parseFile.action(this.analyticUrl);
    // 写入文件
    await this.writeFile.beganWrite(this.parseFile.apiDataMap);
  }
}


