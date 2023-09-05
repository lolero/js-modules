/**
 * Stop execution of async function for a given amount of milliseconds
 *
 * @param {number} milliseconds - Amount of milliseconds to freeze execution
 */
export async function sleep(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}
