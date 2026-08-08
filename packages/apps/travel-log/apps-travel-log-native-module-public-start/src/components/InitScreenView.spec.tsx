import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { InitScreenView } from './InitScreenView';

// Reference React Native test. `@testing-library/react-native` v14 made `render`
// **async** (v13 was sync), so it must be awaited before `screen` is populated —
// without the await it fails with "`render` function has not been called".
// Matchers such as `toBeOnTheScreen` are registered by importing the package's
// main entry, so no extra setup file is needed.
describe('InitScreenView', () => {
  describe('render', () => {
    it('renders the heading and initializing copy', async () => {
      await render(<InitScreenView />);

      expect(screen.getByText('Welcome to Travel Log!')).toBeOnTheScreen();
      expect(screen.getByText('Initializing...')).toBeOnTheScreen();
    });
  });
});
