import { ToSlugPipe } from './to-slug.pipe';

describe('ToSlugPipe', () => {
  it('create an instance', () => {
    const pipe = new ToSlugPipe();
    expect(pipe).toBeTruthy();
  });
});
