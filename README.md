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
<span style="display:block;text-align:center">
  <img src="./.readme/ng_serve_angular.png"/>
</span>

3. Now it is time to run the back-end, the real application. On another terminal (click the `+` icon on the top right corner of the terminal in VSC) run the following command:
```
nodemon server.js
```
It should show the following result:

<span style="display:block;text-align:center">
  <img src="./.readme/nodemon_server_js.png"/>
</span>

4. The system is now up and running, to access the interface open a web browser and go to:
```
http://localhost:4200/
```


Remember that `ng serve` runs a development server for the angular project. To build run `ng build`. The build artifacts will be stored in the `dist/` directory.

---

## 2. SONOS Speaker
No actions are required for the speaker to be discoverable by the MB. It has just to be on the same network of the Message Broker.

---

## 3. Smart TV
GitHub repository: https://github.com/Xfox1/thesis-tv-app.

Since the Smart TV app is emulated using Angular, the steps to run it are almost equal to the ones of the Message Broker:

1. Install dependencies: `npm install`
2. Run Angular development server: `ng serve`
3. On another terminal move to the `./server` folder and execute: `nodemon index.js`
4. On a web browser visit: `http://localhost:4200/`

---

## 4. Smartphone App
GitHub repository: https://github.com/Xfox1/thesis-smartphone-app

1. After downloading and opening the project with Android Studio connect an Android device via USB to the computer and press the green run (<img src="./.readme/run_button.png">) button in the top right corner.

<span style="display:block;text-align:center">
  <img src="./.readme/android_studio_top_bar.png"/>
</span>

2. Wait for the new prompt to show to show the phone connected via USB. If it is not shown, it may be required to enable `USB debugging` from the phone’s settings.

3. Select the device and wait for the app to be installed on it.

<span style="display:block;text-align:center">
  <img src="./.readme/android_studio_run_app.png"/>
</span>

4. After the application is installed, it is not required to leave the phone plugged, although it may be useful to go on the `Run` tab (<img src="./.readme/run_button_2.png">) in the bottom left corner, to inspect the debugging messages sent from the app.

<span style="display:block;text-align:center">
  <img src="./.readme/android_studio_debug.png"/>
</span>

---

## 5. Add devices to the Message Broker network

1. On the `Connected devices` card click the <img src="./.readme/plus.png"> sign, and wait for the popup to load the discovered devices.

<span style="display:block;text-align:center">
  <img src="./.readme/mb_add_device.png"/>
</span>

2. Click `Add` next to all the devices that are needed to join the Message Broker network. They should appear in the `Connected devices` card.

<span style="display:block;text-align:center">
  <img src="./.readme/mb_connected_devices.png"/>
</span>

---

## 6. Send interaction

1. In the `Test area` card write complete all the mandatory field (title and description). It is also possible to choose to which device the interaction has to be sent. Custom inputs can be added or a set of predefined test fields can be user (clicking on `Test Fields` button).

<span style="display:block;text-align:center">
  <img src="./.readme/mb_test_area.png"/>
</span>

2. After sending it, it should appear as pending interaction (yellow dot) in the `Latest interactions` card.

<span style="display:block;text-align:center">
  <img src="./.readme/mb_latest_interactions.png"/>
</span>
