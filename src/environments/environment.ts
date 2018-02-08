// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCXa8SjjELmLrd3hUgM0Ec1msP70Mgcwrk",
    authDomain: "aurora-hackathon.firebaseapp.com",
    databaseURL: "https://aurora-hackathon.firebaseio.com",
    projectId: "aurora-hackathon",
    storageBucket: "aurora-hackathon.appspot.com",
    messagingSenderId: "772003583940"
  },
  googleMapsKey: 'AIzaSyCFSOHdvKgZ0ucChwOTgFddYmztbIEKhCM'
};
