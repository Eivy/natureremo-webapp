'use strict';
/**************************************************************************************************
 * This sample demonstrates a few more advanced features of Swagger-Express-Middleware,
 * such as setting a few options, initializing the mock data store, and adding custom middleware logic.
 **************************************************************************************************/

// const util = require('util');
const path = require('path');
const express = require('express');
const swagger = require('swagger-express-middleware');
const Middleware = swagger.Middleware;
const MemoryDataStore = swagger.MemoryDataStore;
const Resource = swagger.Resource;

let app = express();
let middleware = new Middleware(app);

// Initialize Swagger Express Middleware with our Swagger file
let swaggerFile = path.join(__dirname, 'swagger.yml');
middleware.init(swaggerFile, (err) => {

  // Create a custom data store with some initial mock data
  let myDB = new MemoryDataStore();
  myDB.save(
    new Resource('//1/users/me', {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "nickname": "string"
    }),
    new Resource('//1/devices', "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "temperature_offset": 0,
      "humidity_offset": 0,
      "created_at": "2020-02-06T06:23:20.410Z",
      "updated_at": "2020-02-06T06:23:20.410Z",
      "firmware_version": "string",
      "mac_address": "string",
      "serial_number": "string",
      "newest_events": {
        "te": {
          "val": 0,
          "created_at": "2020-02-06T06:23:20.410Z"
        },
        "hu": {
          "val": 0,
          "created_at": "2020-02-06T06:23:20.410Z"
        },
        "il": {
          "val": 0,
          "created_at": "2020-02-06T06:23:20.410Z"
        },
        "mo": {
          "val": 0,
          "created_at": "2020-02-06T06:23:20.410Z"
        }
      }
    }),
    new Resource('//1/appliances', '3fa85f64-5717-4562-b3fc-2c963f66afa6', {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "device": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "temperature_offset": 0,
        "humidity_offset": 0,
        "created_at": "2020-02-06T06:24:34.461Z",
        "updated_at": "2020-02-06T06:24:34.461Z",
        "firmware_version": "string",
        "mac_address": "string",
        "serial_number": "string"
      },
      "model": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "manufacturer": "string",
        "remote_name": "string",
        "name": "string",
        "image": "string"
      },
      "nickname": "string",
      "image": "string",
      "type": "AC",
      "settings": {
        "temp": "string",
        "mode": "",
        "vol": "",
        "dir": "",
        "button": ""
      },
      "aircon": {
        "range": {
          "modes": {
            "cool": {
              "temp": [ "string" ],
              "vol": [ "" ],
              "dir": [ "" ]
            },
            "warm": {
              "temp": [ "string" ],
              "vol": [ "" ],
              "dir": [ "" ]
            },
            "dry": {
              "temp": [ "string" ],
              "vol": [ "" ],
              "dir": [ "" ]
            },
            "blow": {
              "temp": [ "string" ],
              "vol": [ "" ],
              "dir": [ "" ]
            },
            "auto": {
              "temp": [ "string" ],
              "vol": [ "" ],
              "dir": [ "" ]
            }
          },
          "fixedButtons": [ "" ]
        },
        "tempUnit": ""
      },
      "signals": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "image": "string"
        }
      ],
      "tv": {
        "state": {
          "input": "t"
        },
        "buttons": [
          {
            "name": "string",
            "image": "string",
            "label": "string"
          }
        ]
      },
      "light": {
        "state": {
          "brightness": "string",
          "power": "on",
          "last_button": "string"
        },
        "buttons": [
          {
            "name": "string",
            "image": "string",
            "label": "string"
          }
        ]
      }
    }),
  );

  // Enable Express' case-sensitive and strict options
  app.enable('case sensitive routing');
  app.enable('strict routing');

  app.use(middleware.metadata());
  app.use(middleware.files(
    {
      // Override the Express App's case-sensitive and strict-routing settings
      // for the Files middleware.
      caseSensitive: false,
      strict: false
    },
    {
      // Serve the Swagger API from "/swagger/api" instead of "/api-docs"
      apiPath: '/swagger/api',

      // Disable serving the "PetStore.yaml" file
      rawFilesPath: false
    }
  ));

  app.use(middleware.parseRequest(
    {
      // Configure the cookie parser to use secure cookies
      // cookie: {
      //   secret: 'MySuperSecureSecretKey'
      // },

      // Don't allow JSON content over 100kb (default is 1mb)
      // json: {
      //   limit: '100kb'
      // },

      // Change the location for uploaded pet photos (default is the system's temp directory)
      // multipart: {
      //   dest: path.join(__dirname, 'photos')
      // }
    }
  ));

  // These two middleware don't have any options (yet)
  app.use(
    middleware.CORS(),
    middleware.validateRequest()
  );

  // Add custom middleware
  // app.patch('/pets/:petName', (req, res, next) => {
  //   if (req.body.name !== req.params.petName) {
  //     // The pet's name has changed, so change its URL.
  //     // Start by deleting the old resource
  //     myDB.delete(new Resource(req.path), (err, pet) => {
  //       if (pet) {
  //         // Merge the new data with the old data
  //         pet.merge(req.body);
  //       }
  //       else {
  //         pet = req.body;
  //       }
		//
  //       // Save the pet with the new URL
  //       myDB.save(new Resource('/pets', req.body.name, pet), (err, pet) => {
  //         // Send the response
  //         res.json(pet.data);
  //       });
  //     });
  //   }
  //   else {
  //     next();
  //   }
  // });

  // The mock middleware will use our custom data store,
  // which we already pre-populated with mock data
  app.use(middleware.mock(myDB));

  // Add a custom error handler that returns errors as HTML
  // app.use((err, req, res, next) => {
  //   res.status(err.status);
  //   res.type('html');
  //   res.send(util.format('<html><body><h1>%d Error!</h1><p>%s</p></body></html>', err.status, err.message));
  // });

  app.listen(8000, () => {
    console.log('Nature Remo Cloud API mock is now running at http://localhost:8000');
  });
});
