import { DOCUMENT_ADDR } from '../config'

export function showWarn (str) {
  console.warn(str + ' 请参考相关文档: ' + DOCUMENT_ADDR)
}
