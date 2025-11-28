export interface IError {
  message: string;
  response: {
    data: {
      message: string | string[];
    };
  };
}

export const getErrorMessage = (error: IError) => {
  try {
    let message = 'Unknown error';
    if (error?.response?.data?.message) {
      message = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message.join(', ')
        : error?.response?.data?.message;
    } else if (error?.message) {
      message = error?.message;
    }
    return message;
  } catch {
    return 'Unknown error';
  }
};
