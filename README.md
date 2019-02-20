Demo: https://siarohin.github.io/mentor-dashboard

============

## Data
`./node-component/`

1. Download all XLSX files in the folder. The data source folder: `../node-component/src/rawSource/`
2. Open `../src/settings.js`. Configure your local pathname and the name of JSON.
2. Run `npm start`
3. The script will generate json file into the folder. Default settings: `../build/data.json`


## React component
`./react-component/`

1. Open `../react-component/src/components/constant.js`
2. Change data in the Cards: `rssGithub`, `privatePrefix`
3. Change path to JSON `sourceJsonURL`
4. Change fileName `fileJsonName`. Default: `data.json`


## Configure
`github oAuth`

1. Go to `https://github.com/settings/profile`
2. Select `Developer settings` => `new OAuth app`
3. Enter
- Application name: `mentor-dashboard`
- Homepage URL: example, `https://siarohin.github.io/mentor-dashboard/`
- Authorization callback URL* `http://localhost` (see below)
4. Copy your Github ID and SecretKey

`firebase`
1. Go to `https://firebase.google.com/`
2. Register or Enter
3. Click `Add project`
4. Select name and click OK
5. Open menu `Authentication` => `Providers`
6. Click on GitHub and paste your ID and SecretKey from gitHub (step 4)
7. Copy callback link, return to `https://github.com/settings/applications/`, select `mentor-dashboard`
8. Change Authorization callback URL* from `http://localhost` to firebase callback link

`./react-component/`
1. Open package.json and change `"homepage": "https://siarohin.github.com/mentor-dashboard"` for your homepage
2. Open `../react-component/src/firebase/firebase.js`
3. Enter your apiKey and authDomain from Firebase.
For more details see: https://console.firebase.google.com/project/ projectName => settings
4. Run `npm start` to run dev server or `npm deploy` to deploy your app


## Work
After your react-component is deployed, you must run `./node-component/` (## Data) only.
