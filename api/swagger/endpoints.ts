export const Endpoints = {
  post_uploadFile: {
    path: "/pet/{petId}/uploadImage",
    method: "POST",
    codeResponses: [200],
  },
  post_addPet: {
    path: "/pet",
    method: "POST",
    codeResponses: [405],
  },
  put_updatePet: {
    path: "/pet",
    method: "PUT",
    codeResponses: [400, 404, 405],
  },
  get_findPetsByStatus: {
    path: "/pet/findByStatus",
    method: "GET",
    codeResponses: [200, 400],
  },
  get_findPetsByTags: {
    path: "/pet/findByTags",
    method: "GET",
    codeResponses: [200, 400],
  },
  get_getPetById: {
    path: "/pet/{petId}",
    method: "GET",
    codeResponses: [200, 400, 404],
  },
  post_updatePetWithForm: {
    path: "/pet/{petId}",
    method: "POST",
    codeResponses: [405],
  },
  delete_deletePet: {
    path: "/pet/{petId}",
    method: "DELETE",
    codeResponses: [400, 404],
  },
  post_placeOrder: {
    path: "/store/order",
    method: "POST",
    codeResponses: [200, 400],
  },
  get_getOrderById: {
    path: "/store/order/{orderId}",
    method: "GET",
    codeResponses: [200, 400, 404],
  },
  delete_deleteOrder: {
    path: "/store/order/{orderId}",
    method: "DELETE",
    codeResponses: [400, 404],
  },
  get_getInventory: {
    path: "/store/inventory",
    method: "GET",
    codeResponses: [200],
  },
  post_createUsersWithArrayInput: {
    path: "/user/createWithArray",
    method: "POST",
    codeResponses: [null],
  },
  post_createUsersWithListInput: {
    path: "/user/createWithList",
    method: "POST",
    codeResponses: [null],
  },
  get_getUserByName: {
    path: "/user/{username}",
    method: "GET",
    codeResponses: [200, 400, 404],
  },
  put_updateUser: {
    path: "/user/{username}",
    method: "PUT",
    codeResponses: [400, 404],
  },
  delete_deleteUser: {
    path: "/user/{username}",
    method: "DELETE",
    codeResponses: [400, 404],
  },
  get_loginUser: {
    path: "/user/login",
    method: "GET",
    codeResponses: [200, 400],
  },
  get_logoutUser: {
    path: "/user/logout",
    method: "GET",
    codeResponses: [null],
  },
  post_createUser: {
    path: "/user",
    method: "POST",
    codeResponses: [null],
  },
};
