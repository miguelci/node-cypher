import { Response } from 'supertest';
import app from '../src/app';
import Load from '../src/database/load';
import Node from '../src/entities/node';

jest.mock('../src/database/load');

const request = require('supertest');

describe('Get available endpoints', () => {
  it('should return 404 as default', (done) => {
    request(app).get('/')
      .expect(404)
      .end(() => done());
  });

  it('tree endpoint should return a correct result when data is available', (done) => {
    Load.prototype.start = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(new Node('name', 'description')));

    request(app).get('/tree')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((response: Response) => {
        expect(response.body).toMatch("{name:'name',description:'description',children:[]}");
      })
      .end(() => done());
  });
});
