export const Endpoints = {
  POST_uploadFile: {
    path: "/pet/{petId}/uploadImage",
    method: "post",
    codeResponses: [200],
    tags: ["pet"],
  },
  POST_addPet: {
    path: "/pet",
    method: "post",
    codeResponses: [405],
    tags: ["pet"],
  },
  PUT_updatePet: {
    path: "/pet",
    method: "put",
    codeResponses: [400, 404, 405],
    tags: ["pet"],
  },
  GET_findPetsByStatus: {
    path: "/pet/findByStatus",
    method: "get",
    codeResponses: [200, 400],
    tags: ["pet"],
  },
  GET_findPetsByTags: {
    path: "/pet/findByTags",
    method: "get",
    codeResponses: [200, 400],
    tags: ["pet"],
  },
  GET_getPetById: {
    path: "/pet/{petId}",
    method: "get",
    codeResponses: [200, 400, 404],
    tags: ["pet"],
  },
  POST_updatePetWithForm: {
    path: "/pet/{petId}",
    method: "post",
    codeResponses: [405],
    tags: ["pet"],
  },
  DELETE_deletePet: {
    path: "/pet/{petId}",
    method: "delete",
    codeResponses: [400, 404],
    tags: ["pet"],
  },
  POST_placeOrder: {
    path: "/store/order",
    method: "post",
    codeResponses: [200, 400],
    tags: ["store"],
  },
  GET_getOrderById: {
    path: "/store/order/{orderId}",
    method: "get",
    codeResponses: [200, 400, 404],
    tags: ["store"],
  },
  DELETE_deleteOrder: {
    path: "/store/order/{orderId}",
    method: "delete",
    codeResponses: [400, 404],
    tags: ["store"],
  },
  GET_getInventory: {
    path: "/store/inventory",
    method: "get",
    codeResponses: [200],
    tags: ["store"],
  },
  POST_createUsersWithArrayInput: {
    path: "/user/createWithArray",
    method: "post",
    codeResponses: [null],
    tags: ["user"],
  },
  POST_createUsersWithListInput: {
    path: "/user/createWithList",
    method: "post",
    codeResponses: [null],
    tags: ["user"],
  },
  GET_getUserByName: {
    path: "/user/{username}",
    method: "get",
    codeResponses: [200, 400, 404],
    tags: ["user"],
  },
  PUT_updateUser: {
    path: "/user/{username}",
    method: "put",
    codeResponses: [400, 404],
    tags: ["user"],
  },
  DELETE_deleteUser: {
    path: "/user/{username}",
    method: "delete",
    codeResponses: [400, 404],
    tags: ["user"],
  },
  GET_loginUser: {
    path: "/user/login",
    method: "get",
    codeResponses: [200, 400],
    tags: ["user"],
  },
  GET_logoutUser: {
    path: "/user/logout",
    method: "get",
    codeResponses: [null],
    tags: ["user"],
  },
  POST_createUser: {
    path: "/user",
    method: "post",
    codeResponses: [null],
    tags: ["user"],
  },
} as const;

export const EndpointKeys: (keyof typeof Endpoints)[] = Object.keys(Endpoints) as (keyof typeof Endpoints)[];
