const config = require('../src/config.json')
const path = require('path')
const fs = require('fs')

const sourceDir = path.resolve(__dirname, './../tsc/type') // 拷贝的源文件夹
const toDir = path.resolve(__dirname, '../dist/types') // 目标目录 dist/types

const basePath = path.join(toDir, 'packages')

const fileList = [] // 存放文件

let packages = []

const preContent = `
declare type Install<T> = T & {
    install(app: import('vue').App): void;
};\n`
const start = 'declare const _default:'
const end = ';\nexport default _default;\n'
// 匹配从 start 开始到 end结束的字符串，并捕获中间的部分。
const regex = new RegExp(`${start}([\\s\\S]*?)${end}`)

// 递归push文件路径到到fileList
const getCompList = (basePath) => {
  const files = fs.readdirSync(basePath)
  console.log(files, '==files')
  files.forEach((filename) => {
    const filedir = path.join(basePath, filename)
    // console.log(filedir, '==filedir')
    // 根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filedir)
    const isFile = stats.isFile() // 是文件
    const isDir = stats.isDirectory() // 是文件夹
    if (isFile) {
      fileList.push(filedir)
    }
    if (isDir) {
      getCompList(filedir) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
}

// 获取组件名  [ 'Button', true ]
const getCompName = (name) => {
  if (!packages.length) {
    config.nav.forEach((item) => {
      packages = packages.concat(item.packages)
    })
  }
  const packageName = packages.find(item => item.name.toLowerCase() === name.toLowerCase())
  if (packageName) {
    if (packageName?.setup === true) {
      return [packageName.name, true]
    }
    return [packageName.name, false]
  }
  return ''
}

// 获取文件名
const getFileName = (filePath) => {
  // 如：C:\Users\m1780\Desktop\新建文件夹\cq-shop-components-vite\dist\types\packages\button\button.vue.d.ts
  const lastSeparatorIndex = filePath.lastIndexOf(path.sep) // 获取最后一个路径分隔符的位置
  let name = filePath.substring(0, lastSeparatorIndex)
  // C:\Users\m1780\Desktop\新建文件夹\cq-shop-components-vite\dist\types\packages\button
  name = name.substring(name.lastIndexOf(path.sep) + 1)
  // path.sep 返回当前操作系统的路径分隔符。在 Windows 上是 \，在 macOS 和 Linux 上是 /。
  return name
}

// resolver文件夹
const getResolver = () => {
  const source = path.resolve(__dirname, '../tsc/type/src/resolver')
  // const source = path.join(sourceDir, 'resolver')
  const to = path.resolve(__dirname, '../dist/types/resolver')
  fs.cp(source, to, { recursive: true }, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
}

fs.cp(sourceDir, toDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
    return
  }

  const oldName = path.join(toDir, 'src/taro.build.d.ts') // copy之前的目录
  const newName = path.join(toDir, 'index.d.ts')// copy之后的目录

  fs.rename(oldName, newName, (err) => {
    if (err) {
      console.error(err)
    }
  })

  getCompList(basePath)

  fileList.forEach((item) => {
    const content = fs.readFileSync(item).toLocaleString()
    const inputs = content.match(regex)

    if (inputs && inputs.length) {
      let name = getFileName(item)
      const _ComponentName = getCompName(name)
      if (_ComponentName) {
        const [componentName, setup] = _ComponentName
        let remain = `
declare module 'vue' {
    interface GlobalComponents {
        Nut${componentName}: typeof _default;
    }
}`
        if (setup) {
          let changeContent = content.replace(
            'export default _default;',
            `declare const _nut_default: WithInstall<typeof _default>;\nexport default _nut_default;\n${remain}`
          )
          changeContent = `import type { WithInstall } from '../../utils';\n` + changeContent
          fs.writeFileSync(item, changeContent)
        } else {
          let changeContent = content.replace(regex, `${preContent}${start} Install<${inputs[1]}>${end}${remain}`)
          fs.writeFileSync(item, changeContent)
        }
      }
    }
  })

  // resolver 类型文件
  getResolver()
})
