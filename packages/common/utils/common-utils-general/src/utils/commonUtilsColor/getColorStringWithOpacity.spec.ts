import getColorStringWithOpacity from './getColorStringWithOpacity';

describe('getColorStringWithOpacity', () => {
  it('Should throw error for invalid color strings', async () => {
    expect(() => getColorStringWithOpacity('invalidString', 0.5)).toThrow();
  });

  it('Should get color hex code with opacity from color hex code without opacity', async () => {
    const colorHexCodeWithOpacity = getColorStringWithOpacity('#AAAAAA', 0.5);

    expect(colorHexCodeWithOpacity).toBe('#AAAAAA80');
  });

  it('Should get color hex code with opacity from color hex code with opacity', async () => {
    const colorHexCodeWithOpacity = getColorStringWithOpacity('#AAAAAAFF', 0.5);

    expect(colorHexCodeWithOpacity).toBe('#AAAAAA80');
  });

  it('Should get color rgba string from rgb string with spaces', async () => {
    const colorHexCodeWithOpacity = getColorStringWithOpacity(
      'rgb(128, 128, 128)',
      0.5,
    );

    expect(colorHexCodeWithOpacity).toBe('rgba(128, 128, 128, 0.5)');
  });

  it('Should get color rgba string from rgb string without spaces', async () => {
    const colorHexCodeWithOpacity = getColorStringWithOpacity(
      'rgb(128,128,128)',
      0.5,
    );

    expect(colorHexCodeWithOpacity).toBe('rgba(128, 128, 128, 0.5)');
  });

  it('Should get color rgba string from rgba string', async () => {
    const colorHexCodeWithOpacity = getColorStringWithOpacity(
      'rgba(128, 128, 128, 1)',
      0.5,
    );

    expect(colorHexCodeWithOpacity).toBe('rgba(128, 128, 128, 0.5)');
  });
});
