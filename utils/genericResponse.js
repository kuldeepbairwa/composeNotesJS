const createResponse = (success, message, data) => {
    return {
      success: success,
      message: message,
      result: data
    };
  };
module.exports = createResponse;  