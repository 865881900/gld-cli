// input ,number, confirm, list, rawlist, expand, checkbox, password,editor
exports.vueTemplateList = [
  {
    message: '请选择模板',
    name: 'template',
    type: 'rawlist',
    choices: [
      {
        gitUrl: 'https://github.com/865881900/vue-management-template.git',
        name: 'vue基础模板',
        value: 'template1',
      }
    ]
  },
  {
    when: (answers) => answers.template === 'template2',
    name: 'isVueX',
    message: '是否使用VueX',
    type: 'confirm',
  },
  {
    when: (answers) => answers.template === 'template2',
    name: 'isRouter',
    message: '是否使用Router',
    type: 'confirm',
  }
]
