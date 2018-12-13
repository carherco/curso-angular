import { CursoPage } from "./app.po";

describe('curso App', () => {
  let page: CursoPage;

  beforeEach(() => {
    page = new CursoPage();
  });

  it('Debe aparecer un h1 con el texto Home', () => {
    page.navigateTo();
    expect(page.getH1Text()).toEqual('Home');
  });

  it('Debe aparecer un h2 con el texto Login', () => {
    page.navigateTo();
    page.getLoginLink().click();

    expect(page.getH2Text()).toEqual('Login');

  });
});
