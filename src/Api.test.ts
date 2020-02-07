import * as cp from 'child_process'
import * as path from 'path'
import Api from './Api'

const sleep = (msec: number) => new Promise((resolve: Function) => setTimeout(resolve, msec))

describe('API test', () => {

  let api = new Api('', 'http://localhost:8000//1/')
  let server: cp.ChildProcessWithoutNullStreams
  beforeAll(async () => {
    server = cp.spawn('node', [path.resolve(__dirname, '..', 'mock/mock.js')])
    server.stdout.setEncoding('utf-8')
    server.stdout.on('data', (data) => {
      console.log(data)
    })
    await sleep(400)
  }, 500)

  afterAll(() => {
    server.kill()
  })

  test('get user', async () => {
    const resp = {
      'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'nickname': 'string'
    }
    let res = await api.GetMe()
    expect(res).toStrictEqual(resp)
  })

  test('update user nickname', async () => {
    const resp = {
      'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'nickname': 'test'
    }
    let res = await api.PostMe('test')
    expect(res).toStrictEqual(resp)
  })

})
