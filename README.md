# [App] Proffy
[![typescript](https://img.shields.io/badge/typescript-3.9.7-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![react-native](https://img.shields.io/badge/react--native-0.61.4-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-5.1.0-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![expo](https://img.shields.io/badge/expo-37.0.0-000000?style=flat-square&logo=expo)](https://expo.io/)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/proffy-app/blob/main/LICENSE)
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
  * [OS](#os)

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
> This project was built with [Expo](https://expo.io), to know how to run it in your phone see [Expo client for iOS and Android](https://docs.expo.io/versions/v37.0.0/get-started/installation/#2-mobile-app-expo-client-for-ios) and in your computer see [Running the Expo client on your computer](https://docs.expo.io/versions/v37.0.0/get-started/installation/#running-the-expo-client-on-your-computer).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.
