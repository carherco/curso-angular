import { CursoPage } from "./app.po";

describe('curso App', () => {
  let page: CursoPage;

  beforeEach(() => {
    page = new CursoPage();
  });

  it('should display message saying Curso de angular', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Curso de angular');
  });
});
