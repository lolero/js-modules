import { describe, expect, it } from '@jest/globals';
import { splitRouterPath } from './splitRouterPath';

describe('splitRouterPath', () => {
  it('Should split empty router path', () => {
    expect(splitRouterPath('localhost:8000')).toHaveLength(0);
  });

  it('Should split empty router path with query params', () => {
    expect(
      splitRouterPath('localhost:8000?queryParam1=test1&queryParam2=test2'),
    ).toHaveLength(0);
  });

  it('Should split router path', () => {
    const parts = splitRouterPath(
      'localhost:8000/pathSection1/pathSection2/pathSection3/pathSection4?queryParam1=test1&queryParam2=test2',
    );

    expect(parts[0]).toBe('pathSection1');
    expect(parts[1]).toBe('pathSection2');
    expect(parts[2]).toBe('pathSection3');
    expect(parts[3]).toBe('pathSection4');
  });
});
