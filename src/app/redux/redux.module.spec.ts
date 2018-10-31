import { ReduxModule } from './redux.module';

describe('ReduxModule', () => {
  let reduxModule: ReduxModule;

  beforeEach(() => {
    reduxModule = new ReduxModule();
  });

  it('should create an instance', () => {
    expect(reduxModule).toBeTruthy();
  });
});
