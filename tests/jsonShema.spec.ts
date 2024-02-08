import { test } from "@playwright/test";
// import { Endpoints } from "@helpers/endpoints";
import {
  saveSwaggerToFile,
  saveSchemasToFile,
  saveAllVarianOfResponses,
  getSchemaFromSwagger,
} from "@helpers/swaggerParser";
// import { Swaggers } from "@helpers/swaggers";

test.describe("Swagger helper functions @swagger", async () => {
  test(`Save JSON Swagger to local file`, async () => {
    await saveSwaggerToFile("all");
  });

  test(`Save short Endpoint's info to file`, async () => {
    // await saveSchemasToFile(endpoint);
    await saveAllVarianOfResponses("all");
  });

  test.only("Get schema for GET_getInventory - 200 from swagger", async () => {
    const schemaData = await getSchemaFromSwagger("GET_getInventory", "200");
    console.log("GET_getInventory - 200", schemaData);
  });

  test("Save all schemas for endpoint to files", async () => {
    await saveSchemasToFile("all");
  });
});
