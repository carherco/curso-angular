import { CursoPage } from './app.po';

describe('curso App', () => {
  let page: CursoPage;

  beforeEach(() => {
    page = new CursoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
