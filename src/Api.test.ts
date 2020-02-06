import Api from './Api';
import request from 'request-promise-native';

jest.mock('request');

let api = new Api('', 'http://localhost:8000//1/');

test('get user', () => {
  const resp = {
    'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    'nickname': 'string'
  }
  request.get.mockResolvedValue(resp)
  api.GetMe().then((res) => expect(res).toBe(resp))
});

test('update user nickname', () => {
  const resp = {
    'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    'nickname': 'test'
  }
  request.post.mockResolvedValue(resp)
  api.PostMe('test').then((res) => expect(res).toBe(resp))
});
