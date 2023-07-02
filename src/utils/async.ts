export const asyncHandler = async (promise: Promise<unknown>) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
