import puppeteer, { Page } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

interface Options {
  args: string[]
  executablePath: string
  headless: boolean
}
export async function getOptions(isDev: boolean): Promise<Options> {
  let options: Options

  const chromeExecPaths = {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
  
  const exePath = chromeExecPaths[process.platform]

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }

  return options
}

let _page: Page | null
async function getPage(isDev: boolean): Promise<Page> {
  if (_page) {
    return _page
  }

  const options = await getOptions(isDev)
  const browser = await puppeteer.launch(options)

  _page = await browser.newPage()

  return _page
}

export async function getScreenshot(html, isDev) {
  const page = await getPage(isDev)

  await page.setViewport({ width: 800, height: 800 })
  await page.setContent(html)

  const file = await page.screenshot({ type: 'png' })

  return file;
}