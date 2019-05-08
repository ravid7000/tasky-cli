const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')

const htmlPath = 'prod/index.html'
const replaceHtmlFile = '../../careerforms/templates/career-form-template.html'
const djangoStaticPath = 'static/careerforms/prod/static'


const readFile = p => {
    return fs.readFileSync(path.join(process.cwd(), p), 'utf8')
}

const writeFile = (p, content) => {
    return fs.writeFileSync(path.join(process.cwd(), p), content, 'utf8')
}

function run () {
    try {
        const htmlFileContent = cheerio.load(readFile(htmlPath))
        let html = htmlFileContent('body').html()
        html = '<!-- ::REACT:: -->' + html.replace(/static/g, djangoStaticPath) + '<!-- ::/REACT:: -->'
        let replaceHtmlFileContent = readFile(replaceHtmlFile)
        const leftIndex = replaceHtmlFileContent.indexOf('<!-- ::REACT:: -->')
        const rightIndex = replaceHtmlFileContent.indexOf('<!-- ::/REACT:: -->') + '<!-- ::/REACT:: -->'.length
        const leftContent = replaceHtmlFileContent.substring(0, leftIndex)
        const rightContent = replaceHtmlFileContent.substring(rightIndex + 1, replaceHtmlFileContent.length - 1)
        replaceHtmlFileContent = leftContent + html + rightContent
        writeFile(replaceHtmlFile, replaceHtmlFileContent)
        console.log('Done !!!')
    } catch (err) {
        console.log(err)
    }
}

run()