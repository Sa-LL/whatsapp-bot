export function errorHandler(error: any) {
  if (error.response) {
    if (error.response.request) {
      if (error.response.data) {
        if (error.response.data.message) {
          return `💥 ${error.response?.status}: ${error.response.data.message}`;
        } else {
          return `💥 ${error.response?.status}: ${error.response.data}`;
        }
      } else {
        return `💥 ${error.response?.status}: Ocurrió un error (no data)`;
      }
    } else {
      return `💥 ${error.response?.status}: Ocurrió un error (no request)`;
    }
  } else {
    return `💥 Ocurrió un error no especificado`;
  }
}
