import {Test, TestingModule} from '@nestjs/testing';
import {CatsController} from './cats.controller';
import {AppModule} from '../../app.module';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {of} from 'rxjs';

describe('CatsController', () => {
  let controller: CatsController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it(`/GET cats`, (done) => {
    request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .end((err, res) => {
        if (err) done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
