const Pizza = {
  type: "object",
  properties: {
    id: { type: "int" },
    pizza_type_id: { type: "string" },
    product: {
      type: "object",
      properties: {
        id: { type: "int" },
        name: { type: "string" },
        price: { type: "number" },
        likes: { type: "number" },
        created_by: { type: "number" },
        category_id: { type: "number" },
        status: { type: "boolean" },
        tbl_product_pictures: {
          type: "array",
          items: {
            type: "object",
            properties: {
              picture_id: { type: "int" },
            },
          },
        },
        pizza_ingredient: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "int " },
              ingredient: {
                type: "object",
                properties: {
                  id: { type: "int" },
                  name: { type: "string" },
                  status: { type: "boolean" },
                },
              },
            },
          },
        },
        pizza_stuffing: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "int " },
              stuffinge: {
                type: "object",
                properties: {
                  id: { type: "int" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
        pizza_type: {
          type: "object",
          properties: {
            name: { type: "object" },
            dimensions: { type: "object" },
          },
        },
      },
    },
  },
};

const createPizzaOptions = {
  body: {
    type: "object",
    required: [
      "price",
      "stuffing",
      "saleOffValue",
      "type",
      "picture",
      "ingredient",
      "categoria",
    ],
    properties: {
      picture: { type: "object" },
      price: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      ingredient: {
        type: "array",
        items: {
          type: "object",
          properties: {
            value: {
              type: "string",
            },
          },
        },
      },
      stuffing: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      categoria: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      saleOffValue: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      type: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
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
        payload: {
          type: "array",
          items: {
            Pizza,
          },
        },
        error: {
          type: "boolean",
        },
      },
    },
  },
};

const updatePizzaOptions = {
  body: {
    type: "object",
    properties: {
      picture: { type: "object" },
      price: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      ingredient: {
        type: "array",
        items: {
          type: "object",
          properties: {
            value: {
              type: "string",
            },
          },
        },
      },
      categoria: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      stuffing: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      saleOffValue: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      type: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
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
        message: {
          type: "string",
        },
        error: {
          type: "boolean",
        },
      },
    },
  },
};

export { createPizzaOptions, updatePizzaOptions };
