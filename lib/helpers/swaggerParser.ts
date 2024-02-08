// import { createSchema } from "genson-js";
import SwaggerParser from "@apidevtools/swagger-parser";
import * as fs from "fs/promises";
import { Swaggers } from "@helpers/swaggers";
import { Endpoints } from "@helpers/endpoints";
// import fs from "fs";

function getSwaggerDirName(tag: string) {
  const dirName = Swaggers[tag].dirName;
  return dirName;
}

function getSwaggerFileName(tag: string) {
  const dirName = getSwaggerDirName(tag);
  const swaggerFileName = `${dirName}/${Swaggers[tag].fileName}`;
  return swaggerFileName;
}

// export async function getEndpointURL(endpoint: string) {
//   const endpointURL = Endpoints[endpoint].swaggerURL;
//   return endpointURL;
// }

export async function saveSwaggerToFile(tag: string) {
  const jsonURL = Swaggers[tag].url;
  try {
    await fs.mkdir(getSwaggerDirName(tag), { recursive: true });
    const swagger = await getSwaggerFromURL(jsonURL);
    const swaggerString = JSON.stringify(swagger, null, 2);
    const swaggerFileName = getSwaggerFileName(tag);

    await writeDataToFile(swaggerFileName, swaggerString);

    console.log(`Swagger is dereference and saved.`);
  } catch (err) {
    console.error(err);
  }
}

export async function getSwaggerFromURL(tag: string) {
  const jsonURL = Swaggers[tag].url;
  try {
    const swagger = await SwaggerParser.dereference(jsonURL);
    return swagger;
  } catch (err) {
    console.error(err);
  }
}

export async function getSwaggerFromFile(tag: string) {
  const swaggerFileName = getSwaggerFileName(tag);
  try {
    const swagger = await SwaggerParser.dereference(swaggerFileName);
    return swagger;
  } catch (err) {
    console.error(err);
  }
}

export async function getSchemaFromSwagger(operationId: string, responseCode: string) {
  const tag = Endpoints[operationId].tags[0];
  const path = Endpoints[operationId].path;
  const method = Endpoints[operationId].method;
  const swagger = await getSwaggerFromFile(tag);
  const schemaData = swagger.paths[path][method]["responses"][responseCode]["schema"];
  // console.log(`схема для ${operationId} - ${responseCode}:`, schemaData);
  return schemaData;
}

export async function saveSchemasToFile(tag: string) {
  const dirName = getSwaggerDirName(tag);
  const swaggerFileName = getSwaggerFileName(tag);

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
            if (response.schema) {
              const tags = methodObject.tags;
              const operationId = methodObject.operationId || "unknown";
              const schemaFileName = `${tags[0]}.${method}.${operationId}.${responseCode}.schema.json`.replace(
                /\//g,
                "_"
              );
              const schemaFullFileName = `${dirName}/${schemaFileName}`;

              // Создание каталога "output", если он не существует
              await createDir(dirName);

              const schemaString = JSON.stringify(response.schema, null, 2);
              await writeDataToFile(schemaFullFileName, schemaString);
              console.log(`Схема сохранена в файле: ${schemaFullFileName}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при дереференциации Swagger-спецификации:", error);
  }
}

export async function saveAllVarianOfResponses(tag: string) {
  const dirName = getSwaggerDirName(tag); // Укажите имя вашей директории
  const swagger = await getSwaggerFromURL(Swaggers[tag].url);
  const Endpoints: Record<string, Record<string, any>> = {};

  try {
    for (const path in swagger.paths) {
      const pathObject = swagger.paths[path];

      for (const method in pathObject) {
        const methodObject = pathObject[method];

        if (methodObject.operationId) {
          const operationId = methodObject.operationId.replace(/(^\w+)(_)/, ""); // Удаление начальной части из operationId
          const operationKey = `${method.toUpperCase()}_${operationId}`;
          const tags = methodObject.tags;
          Endpoints[operationKey] = {
            path: path,
            method: method,
            codeResponses: [],
            tags: tags,
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
