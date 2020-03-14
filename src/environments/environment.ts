// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint: "https://minto.cognitiveservices.azure.com/face/v1.0/detect",
  subscriptionKey: "f1c0008a30ae4156a4d80152fde1d58f",
  // api: "http://192.168.0.19:8080/restaurant-merchant-api"

  api: "https://travelswift.azurewebsites.net/restaurant-merchant-api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
