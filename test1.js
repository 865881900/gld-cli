const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generator = require("@babel/generator")
console.log('generator', generator);
var jscode1 = `export default {
  name: 'Test',
  props: {
    title: {
      type: String,
      default: '这是title'
    }
  }
};
const a = 12;
`;
var jscode2 = `
function f(){
    var b = 123;
    a = ['a', 'b'];
}`;


// 将源码转换为AST
const ast = parser.parse(jscode1, {
  sourceType: 'unambiguous'
});
traverse.default(ast, {
  Statement(path) {
    if(path.type !== 'ExportDefaultDeclaration') {
      path.remove()
      console.log('删除');
    }
    // console.log('当前路径 类型:\n', path.type)
    // console.log('当前语句', path.getStatementParent().toString())
    // console.log('是否在列表中/是否存在兄弟节点', path.inList)
    // console.log('---------------------------------')
  }
});
// console.log(ast);

var a = generator.default(ast)
console.log(a)

