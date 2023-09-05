import { sleep } from './sleep';

describe('sleep', () => {
  it('Should freeze execution for given 500 milliseconds', async () => {
    const sleepMilliseconds = 10;

    const millisecondsStart = Date.now();
    await sleep(sleepMilliseconds);
    const millisecondsEnd = Date.now();

    expect(millisecondsEnd - millisecondsStart).toBeGreaterThanOrEqual(
      sleepMilliseconds,
    );
  });
});
