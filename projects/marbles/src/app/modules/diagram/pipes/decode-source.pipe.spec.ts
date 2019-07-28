import { DecodeSourcePipe } from './decode-source.pipe';

describe('DecodeSourcePipe', () => {
  it('create an instance', () => {
    const pipe = new DecodeSourcePipe();
    expect(pipe).toBeTruthy();
  });

  it('empty source of lenght 4', () => {
    const pipe = new DecodeSourcePipe();

    const input = '+---->';
    const expected_output = ['', '', '', ''];

    expect(pipe.transform(input)).toEqual(expected_output);
  });

  it('empty source of lenght 10', () => {
    const pipe = new DecodeSourcePipe();

    const input = '+---------->';
    const expected_output = ['', '', '', '', '', '', '', '', '', ''];

    expect(pipe.transform(input)).toEqual(expected_output);
  });

  it('some marbles', () => {
    const pipe = new DecodeSourcePipe();

    const input = '+--A---B--->';
    const expected_output = ['', '', 'A', '', '', '', 'B', '', '', ''];

    expect(pipe.transform(input)).toEqual(expected_output);
  });

  it('consecutive marbles', () => {
    const pipe = new DecodeSourcePipe();

    const input = '+--A---BC-->';
    const expected_output = ['', '', 'A', '', '', '', 'B', 'C', '', ''];

    expect(pipe.transform(input)).toEqual(expected_output);
  });

  it('parenthesis', () => {
    const pipe = new DecodeSourcePipe();

    const input = '+--A---(BC)-->';
    const expected_output = ['', '', 'A', '', '', '', 'BC', '', ''];

    expect(pipe.transform(input)).toEqual(expected_output);
  });

  it('square brackets', () => {
    const pipe = new DecodeSourcePipe();

    const input = '+--{G1,G2,G567}---(BC)-->';
    const expected_output = ['', '', ['G1', 'G2', 'G567'], '', '', '', 'BC', '', ''];

    expect(pipe.transform(input)).toEqual(expected_output);
  });
});
