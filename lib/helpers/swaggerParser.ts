// import { createSchema } from "genson-js";
import SwaggerParser from "@apidevtools/swagger-parser";
import * as fs from "fs/promises";
import { Swaggers } from "@helpers/swaggers";
// import fs from "fs";

function getSwaggerDirName(endpoint: string) {
  const dirName = Swaggers[endpoint].dirName;
  return dirName;
}

function getSwaggerFileName(endpoint: string) {
  const dirName = getSwaggerDirName(endpoint);
  const swaggerFileName = `${dirName}/${Swaggers[endpoint].fileName}`;
  return swaggerFileName;
}

// export async function getEndpointURL(endpoint: string) {
//   const endpointURL = Endpoints[endpoint].swaggerURL;
//   return endpointURL;
// }

export async function saveSwaggerToFile(endpoint: string) {
  const jsonURL = Swaggers[endpoint].url;
  try {
    await fs.mkdir(getSwaggerDirName(endpoint), { recursive: true });
    const swagger = await getSwaggerFromURL(jsonURL);
    const swaggerString = JSON.stringify(swagger, null, 2);
    const swaggerFileName = getSwaggerFileName(endpoint);

    await writeDataToFile(swaggerFileName, swaggerString);

    console.log(`Swagger is dereference and saved.`);
  } catch (err) {
    console.error(err);
  }
}

export async function getSwaggerFromURL(jsonURL: string) {
  try {
    const swagger = await SwaggerParser.dereference(jsonURL);
    return swagger;
  } catch (err) {
    console.error(err);
  }
}

export async function getSwaggerFromFile(endpoint: string) {
  const swaggerFileName = getSwaggerFileName(endpoint);
  try {
    const swagger = await SwaggerParser.dereference(swaggerFileName);
    return swagger;
  } catch (err) {
    console.error(err);
  }
}

export async function getSchemaFromSwagger(endpoint: string, path: string, method: string, responseCode: string) {
  const swagger = await getSwaggerFromFile(endpoint);
  console.log(swagger);
  const schema = swagger.paths[path][method]["responses"][responseCode]["content"]["*/*"].schema;
  console.log(`схема для ${endpoint}, ${path}, ${method}, ${responseCode}`, schema);
  return schema;
}

export async function saveSchemasToFile(endpoint: string) {
  const swaggerFileName = getSwaggerFileName(endpoint);
  const dirName = getSwaggerDirName(endpoint);

  try {
    // Загрузка и дереференциация Swagger-спецификации
    const dereferencedSpec = await SwaggerParser.dereference(swaggerFileName);

    // Обход всех путей
    for (const path in dereferencedSpec.paths) {
      const pathObject = dereferencedSpec.paths[path];

      // Обход всех методов внутри пути
      for (const method in pathObject) {
        const methodObject = pathObject[method];

        // Проверка наличия блока "responses" внутри метода
        if (methodObject.responses) {
          // Обход всех кодов ответа внутри блока "responses"
          for (const responseCode in methodObject.responses) {
            const response = methodObject.responses[responseCode];

            // Проверка наличия схемы (schema) внутри кода ответа
            if (response.content && response.content["*/*"] && response.content["*/*"].schema) {
              const schemaFileName = `${path}_${method}_${responseCode}_schema.json`.replace("/", "_");
              const schemaFullFileName = `${dirName}/${schemaFileName}`;

              // Создание каталога "output", если он не существует
              await createDir(dirName);

              const schemaString = JSON.stringify(response.content["*/*"].schema, null, 2);
              await writeDataToFile(schemaFullFileName, schemaString);
              console.log(`Схема сохранена в файле: ${dirName}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при дереференциации Swagger-спецификации:", error);
  }
}

export async function saveAllVarianOfResponses(endpoint: string) {
  const dirName = getSwaggerDirName(endpoint); // Укажите имя вашей директории
  const swagger = await getSwaggerFromURL(Swaggers[endpoint].url); // !!! Сделать универсальным !!!!
  const Endpoints: Record<string, Record<string, any>> = {};

  try {
    for (const path in swagger.paths) {
      const pathObject = swagger.paths[path];

      for (const method in pathObject) {
        const methodObject = pathObject[method];

        if (methodObject.operationId) {
          const operationId = methodObject.operationId.replace(/(^\w+)(_)/, ""); // Удаление начальной части из operationId
          const operationKey = `${method}_${operationId}`;
          Endpoints[operationKey] = {
            path: path,
            method: method.toUpperCase(),
            codeResponses: [],
          };

          if (methodObject.responses) {
            for (const responseCode in methodObject.responses) {
              Endpoints[operationKey].codeResponses.push(parseInt(responseCode));
            }
          }
        }
      }
    }

    await createDir(dirName); // Функция создания директории
    const schemaHelperFileName = `${dirName}/endpoints.ts`; // Имя файла для сохранения
    await writeDataToFile(schemaHelperFileName, `export const Endpoints = ${JSON.stringify(Endpoints, null, 2)};`); // Функция записи данных в файл
  } catch (error) {
    console.error("Ошибка получения списка ответов из Swagger-спецификации:", error);
  }
}

export async function createDir(directoryName: string) {
  try {
    await fs.mkdir(directoryName, { recursive: true });
  } catch (mkdirError) {
    console.error("Ошибка при создании каталога:", mkdirError);
  }
}

export async function writeDataToFile(location: string, data: string) {
  try {
    await fs.writeFile(location, data, { encoding: "utf-8", flag: "w" });
  } catch (writeFileError) {
    console.error("Ошибка при записи в файл:", writeFileError);
  }
}
