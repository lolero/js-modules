import { useLocation } from 'react-router-dom';
import { useSplitRouterPath } from '../webReactHooksReactRouter';

jest.mock('react-router-dom');

describe('webReactHooksReactRouter', () => {
  const useLocationMock = jest.mocked<() => { pathname: string }>(useLocation);

  beforeEach(() => {
    useLocationMock.mockReturnValue({
      pathname:
        'localhost:8000/pathSection1/pathSection2/pathSection3/pathSection4?queryParam1=test1&queryParam2=test2',
    });
  });

  describe('useSplitRouterPath', () => {
    it('Should split router path', async () => {
      const splitRouterPath = useSplitRouterPath();

      expect(splitRouterPath[0]).toBe('pathSection1');
      expect(splitRouterPath[1]).toBe('pathSection2');
      expect(splitRouterPath[2]).toBe('pathSection3');
      expect(splitRouterPath[3]).toBe('pathSection4');
    });
  });
});
