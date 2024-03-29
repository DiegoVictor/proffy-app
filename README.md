# [App] Proffy
[![AppVeyor](https://img.shields.io/appveyor/build/diegovictor/proffy-app?logo=appveyor&style=flat-square)](https://ci.appveyor.com/project/DiegoVictor/proffy-app)
[![typescript](https://img.shields.io/badge/typescript-5.2.2-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![react-native](https://img.shields.io/badge/react--native-0.72.5-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-6.0.8-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-8.51.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![expo](https://img.shields.io/badge/expo-49.0.13-000000?style=flat-square&logo=expo)](https://expo.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/proffy-app?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/proffy-app)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/proffy-app/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This app version allow everyone to see all open incidents from all NGOs. All the resources used by this application comes from its [`API`](https://github.com/DiegoVictor/proffy-api).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [Expo](#expo)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/proffy-app/main/screenshots/landing.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/proffy-app/main/screenshots/give-classes.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/proffy-app/main/screenshots/search.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/proffy-app/main/screenshots/proffys.jpg" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/proffy-app/main/screenshots/favorites.jpg" width="32%" />

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/proffy-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
API_URL|API's url with version (v1)|`http://localhost:3333/v1`

### API
Start the [`API`](https://github.com/DiegoVictor/proffy-api) (see its README for more information). In case of any change in the API's port or host remember to update the `env`'s `API_URL` property too.
> Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3333 tcp:3333`

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
$ npm run start
```
> This project was built with [Expo](https://expo.io), to know how to run the app see [Expo Go](https://docs.expo.dev/get-started/expo-go/).

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
