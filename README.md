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
  - JavaScript
  - React.js
  - React Native
  - Expo
- **Backend**:
  - Node.js
  - Express.js
- **Databases**: 
  - InfluxDB (Time series data)
  - MariaDB (Relational data)
- **Hardware**:
  - Arduino (for data collection from solar panels)
## Screenshots

![WhatsApp Image 2024-05-29 at 14 07 19_f1d92806](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/51a9f991-106e-49ee-85e7-fe61771828b4)
![WhatsApp Image 2024-05-26 at 20 07 37_b48b796d](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/2d978f96-3a5c-4e07-a9c4-bb8c5e0db9f1)
![WhatsApp Image 2024-05-26 at fgf20 07 38_a2933779](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/b3698a23-9cf3-4854-9af8-3aff82768cad)
![WhatsApp Image 2024-05-29 rrrat 11 18 53_da4bb500](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/47b6eafb-2c42-41af-b32a-dcf411342192)
![Screenshot_1717335577](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/68f542ca-6293-4ac7-849e-cb6cb8d6fd0e)


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
