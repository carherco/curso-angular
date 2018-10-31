import { ReduxNgRxModule } from './redux-ng-rx.module';

describe('ReduxNgRxModule', () => {
  let reduxNgRxModule: ReduxNgRxModule;

  beforeEach(() => {
    reduxNgRxModule = new ReduxNgRxModule();
  });

  it('should create an instance', () => {
    expect(reduxNgRxModule).toBeTruthy();
  });
});
