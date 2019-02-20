Demo: https://siarohin.github.io/mentor-dashboard

============

Data
./node-component/

Download all XLSX files in the folder. The data source folder: ../node-component/src/rawSource/
Open ../src/settings.js. Configure your local pathname and the name of JSON.
Run npm start
The script will generate json file into the folder. Default settings: ../build/data.json
React component
./react-component/

Open ../react-component/src/components/constant.js
Change data in the Cards: rssGithub, privatePrefix
Change path to JSON sourceJsonURL
Change fileName fileJsonName. Default: data.json
Configure
github oAuth

Go to https://github.com/settings/profile
Select Developer settings => new OAuth app
Enter
Application name: mentor-dashboard
Homepage URL: example, https://siarohin.github.io/mentor-dashboard/
Authorization callback URL* http://localhost (see below)
Copy your Github ID and SecretKey
firebase

Go to https://firebase.google.com/
Register or Enter
Click Add project
Select name and click OK
Open menu Authentication => Providers
Click on GitHub and paste your ID and SecretKey from gitHub (step 4)
Copy callback link, return to https://github.com/settings/applications/, select mentor-dashboard
Change Authorization callback URL* from http://localhost to firebase callback link
./react-component/

Open package.json and change "homepage": "https://siarohin.github.com/mentor-dashboard" for your homepage
Open ../react-component/src/firebase/firebase.js
Enter your apiKey and authDomain from Firebase. For more details see: https://console.firebase.google.com/project/ projectName => settings
Run npm start to run dev server or npm deploy to deploy your app
Work
After your react-component is deployed, you must run ./node-component/ (## Data) only.
