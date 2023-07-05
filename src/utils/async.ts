import { errorHandler } from './apiResponse';

export function asyncHandler<T>(
  promise: Promise<T>
): Promise<[T | null, string | null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null])
    .catch<[null, string]>((error: any) => [null, errorHandler(error)]);
}
