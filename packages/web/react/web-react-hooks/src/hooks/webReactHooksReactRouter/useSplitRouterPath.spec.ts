import { useLocation } from 'react-router-dom';
import useSplitRouterPath from './useSplitRouterPath';

jest.mock('react-router-dom');

describe('useSplitRouterPath', () => {
  const useLocationMock = jest.mocked<() => { pathname: string }>(useLocation);

  it('Should split empty router path', async () => {
    useLocationMock.mockReturnValue({
      pathname: 'localhost:8000',
    });

    const splitRouterPath = useSplitRouterPath();

    expect(splitRouterPath).toHaveLength(0);
  });

  it('Should split empty router path with query params', async () => {
    useLocationMock.mockReturnValue({
      pathname: 'localhost:8000?queryParam1=test1&queryParam2=test2',
    });

    const splitRouterPath = useSplitRouterPath();

    expect(splitRouterPath).toHaveLength(0);
  });

  it('Should split router path', async () => {
    useLocationMock.mockReturnValue({
      pathname:
        'localhost:8000/pathSection1/pathSection2/pathSection3/pathSection4?queryParam1=test1&queryParam2=test2',
    });

    const splitRouterPath = useSplitRouterPath();

    expect(splitRouterPath[0]).toBe('pathSection1');
    expect(splitRouterPath[1]).toBe('pathSection2');
    expect(splitRouterPath[2]).toBe('pathSection3');
    expect(splitRouterPath[3]).toBe('pathSection4');
  });
});
