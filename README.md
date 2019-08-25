<!--

# MessageBroker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
-->

# MessageBroker Documentation
This project was created with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9 and [NodeJS](https://nodejs.org/) version 10.15.3.  
<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="80"/>
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" width="80"/>

### Index
1. Starting Message Broker
2. SONOS Speaker
3. Smart TV
4. Smartphone App
5. Add device to the Message Broker network
6. Send interaction

## 1. Starting Message Broker
GitHub repository: https://github.com/Xfox1/message-broker.

After downloading and extracting it to a folder, open the project with any editor. Using Visual Studio Code is highly suggested.

1. First of all, it is necessary to install all the dependencies. Open a terminal inside Visual Studio Code (`` CTRL+` ``) or a system terminal, move to the project folder and execute:
```
npm install
```

2. Now run Angular development server (front-end):
```
ng serve
```
It should show the following result:

<img src="./.readme/ng_serve_angular.png"/>

3. Now it is time to run the back-end, the real application. On another terminal (click the `+` icon on the top right corner of the terminal in VSC) run the following command:
```
nodemon server.js
```
It should show the following result:

<img src="./.readme/nodemon_server_js.png"/>

## Run
1. Download the project and extract (if necessary) to a folder
2. Open a terminal in the folder of the project
3. Install dependencies: `npm install`
4. Run angular development server: `ng serve`
5. Run message broker app: on another terminal `nodemon server.js`
6. Open a web browser and go to `http://localhost:4200/`

Remember that `ng serve` runs a development server for the angular project. To build run `ng build`. The build artifacts will be stored in the `dist/` directory.
