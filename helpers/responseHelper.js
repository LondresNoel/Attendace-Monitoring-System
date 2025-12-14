// helper para standardized success response
export const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message,
  };

  // pag add han data kon ada
  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

// helper para standardized error response
export const errorResponse = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    message,
  };

  // pag add han error details kon development mode
  if (error && process.env.NODE_ENV === "development") {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};
