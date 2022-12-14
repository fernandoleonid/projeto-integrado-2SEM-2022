const createPizzaTypeOptions = {
  body: {
    type: "object",
    required: ["name", "dimensions"],
    properties: {
      name: {
        type: "string",
      },
      dimensions: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        code: {
          type: "number",
        },
        payload: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              status: {
                type: "boolean",
              },
              name: {
                type: "string",
              },
              dimensions: {
                type: "string",
              },
            },
          },
        },
        error: {
          type: "boolean",
        },
      },
    },
  },
};
const updatePizzaTypeOptions = {
  body: {
    type: "object",
    required: ["name", "dimensions"],
    properties: {
      name: {
        type: "string",
      },
      dimensions: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        statusCode: {
          type: "number",
        },
        message: {
          type: "array",
          items: {
            type: "string",
          },
        },
        error: {
          type: "boolean",
        },
      },
    },
  },
};

export { updatePizzaTypeOptions, createPizzaTypeOptions };
