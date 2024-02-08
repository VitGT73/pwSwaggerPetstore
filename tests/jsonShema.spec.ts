import { Endpoints, EndpointKeys } from "@helpers/endpoints";
import {
  saveSwaggerToFile,
  getSwaggerFromFile,
  saveSchemasToFile,
  saveAllVarianOfResponses,
} from "@helpers/swaggerParser";
import { Swaggers } from "@helpers/swaggers";
import { test } from "@playwright/test";

test.describe("Swagger helper functions @swagger", async () => {

  test.only(`Save JSON Swagger to local file`, async () => {

    await saveSwaggerToFile('all');
  });

  test.only(`Save short Endpoint's info to file`, async () => {
    // await saveSchemasToFile(endpoint);
    await saveAllVarianOfResponses('all');
  });


  // test("Get schemas /auth from file", async () => {
  //   const schema = await getSwaggerFromFile(EndpointKeys["auth"]);

  //   console.log("/login", schema.paths["/login"]["post"]["responses"][200]["content"]["*/*"].schema);
  //   console.log("/validate", schema.paths["/validate"]["post"]["responses"][200]["content"]["*/*"].schema);
  //   console.log("/logout", schema.paths["/logout"]["post"]["responses"][200]["content"]["*/*"].schema);
  // });


  // test.only("Save all schemas for endpoint to files", async () => {
  //   for (const endpoint of EndpointKeys) {
  //     await saveSchemasToFile(endpoint);
  //   }
  // });
});
