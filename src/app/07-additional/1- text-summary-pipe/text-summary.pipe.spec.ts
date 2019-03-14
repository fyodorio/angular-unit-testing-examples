import { TextSummaryPipe } from './text-summary.pipe';

describe('TextSummaryPipe', () => {
  let pipe: TextSummaryPipe;

  beforeEach(() => {
    pipe = new TextSummaryPipe();
  });

  it('should return an empty string if input is null', () => {
    expect (pipe.transform(null)).toEqual('');
  });

  it('should return null if input is undefined', () => {
    expect (pipe.transform(undefined)).toEqual('');
  });

  it('should return empty string if input is an empty string', () => {
    expect (pipe.transform('')).toEqual('');
  });

  it('should return the same string if the length of input is less than the limit', () => {
    expect (pipe.transform('12345', 5)).toEqual('12345');
  });

  it('should summarize the input if it is longer than the limit', () => {
    expect(pipe.transform('12345678901', 5)).toEqual('12345...');
  });

  it('should assume 10 as the limit if not given', () => {
    expect(pipe.transform('12345678901')).toEqual('1234567890...');
  });
});
