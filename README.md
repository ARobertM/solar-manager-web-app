# Solar Manager Web App

## Overview

The Solar Manager Web App is an advanced solution for monitoring and managing solar energy systems. It leverages modern technologies to provide real-time data visualization, performance analytics, and alerts, ensuring optimal performance and maintenance of solar installations.

## Features

- **Real-time Monitoring**: Track the performance of solar panels in real-time.
- **Data Visualization**: Interactive charts and graphs for better understanding of energy production and consumption.
- **Alerts & Notifications**: Receive notifications for system anomalies or maintenance needs.
- **User Management**: Multi-user support with role-based access control.
- **Mobile Support**: Access your data on the go with our React Native app.

## Tech Stack

- **Frontend**: 
  - ![JavaScript](https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png) JavaScript
  - ![React.js](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) React.js
  - ![React Native](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) React Native
  - ![Expo](https://upload.wikimedia.org/wikipedia/commons/3/3b/Expo-Logo.svg) Expo
- **Backend**:
  - ![Node.js](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg) Node.js
  - ![Express.js](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png) Express.js
- **Databases**: 
  - ![InfluxDB](https://upload.wikimedia.org/wikipedia/commons/c/c9/Influxdb_logo.svg) InfluxDB (Time series data)
  - ![MariaDB](https://upload.wikimedia.org/wikipedia/commons/9/9e/Mariadb-seal-shaded-browntext.svg) MariaDB (Relational data)
- **Hardware**:
  - ![Arduino](https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg) Arduino (for data collection from solar panels)

![WhatsApp Image 2024-05-29 at 14 07 19_f1d92806](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/c0611672-2530-4a75-b2b8-cf1c6a93d110)


## Installation

### Prerequisites

- Node.js
- InfluxDB
- MariaDB

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/ARobertM/solar-manager-web-app.git
    cd solar-manager-web-app
    ```

2. **Setup the Backend**:
    - Navigate to the backend directory:
      ```sh
      cd backend
      ```
    - Configure InfluxDB and MariaDB connections in the configuration file.
    - Install dependencies:
      ```sh
      npm install
      ```
    - Run the backend server:
      ```sh
      npm start
      ```

3. **Setup the Frontend**:
    - Navigate to the frontend directory:
      ```sh
      cd ../frontend/solar-monitor
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Run the frontend server:
      ```sh
      npm start
      ```

4. **Setup the Mobile App**:
    - Navigate to the mobile app directory:
      ```sh
      cd ../mobile-app
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Start the Expo server:
      ```sh
      expo start
      ```

## Usage

- Open your browser and go to `http://localhost:3000` to access the web app.
- Use the dashboard to monitor and manage your solar energy system.
- Use the mobile app to monitor your system on the go.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact [ARobertM](https://github.com/ARobertM).

---

This project aims to promote sustainable energy management by providing a reliable tool for solar energy monitoring and analysis.
