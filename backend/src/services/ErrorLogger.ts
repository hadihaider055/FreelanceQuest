import { AxiosError } from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { cwd } from 'process'

export const filePath = path.join(cwd(), 'error-logs.txt')

class ErrorLogger {
  static async write(e: AxiosError): Promise<void> {
    let requestErrorString = ''

    if (e.response) {
      const {
        config: { baseURL, method, url, data, headers },
        data: responseData,
        headers: responseHeaders,
        status,
      } = e.response

      requestErrorString = `
    Base Url: ${baseURL}
    Url: ${url}
    Method: ${method}
    Request Data: ${data}
    Request Headers: ${JSON.stringify(headers)}
    Response Data: ${JSON.stringify(responseData)}
    Response Headers: ${JSON.stringify(responseHeaders)}
    Response Status: ${status}`
    }

    const errorPrintInstance = `Time: ${new Date()}
${requestErrorString ? `Request: ${requestErrorString}` : ''}
${e.stack}
====================
`

    let existingLogs = ''
    try {
      existingLogs = await fs.readFile(filePath, 'utf-8')
    } catch (e) {
      /**/
    }

    await fs.writeFile(filePath, existingLogs + errorPrintInstance)
  }

  static async read(): Promise<string> {
    try {
      const logs = await fs.readFile(filePath, 'utf-8')
      return logs
    } catch (e) {
      return ''
    }
  }
}

export default ErrorLogger
