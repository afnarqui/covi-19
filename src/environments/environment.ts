// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://corona.lmao.ninja/v2/countries',
  firebaseConfig: {
    apiKey: "AIzaSyCHcv_QvIreZl_zbmL-mOfx28PNo6Ea50U",
    authDomain: "covi-2019.firebaseapp.com",
    databaseURL: "https://covi-2019.firebaseio.com",
    projectId: "covi-2019",
    storageBucket: "covi-2019.appspot.com",
    messagingSenderId: "981023355222",
    appId: "1:981023355222:web:7b8c6742fcaf2713ca66f7"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
