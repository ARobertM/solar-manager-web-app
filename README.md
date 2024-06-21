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

![WhatsApp Image 2024-05-26 at 20 14 18_4445aeba](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/193e27a7-accb-48a6-a129-ba7f3d892685)
![WhatsApp Image 2024-05-26 at fgf20 07 38_a2933779](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/c539a5d0-1653-4dae-ad90-0d538613365f)
![WhatsApp Image 2024-05-26 at 20 07 37_b48b796d](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/82b7c5a2-fe05-4df3-9a20-e6a6d0377a80)
![Screenshot_1717335577](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/ed9c34bb-13ba-45dc-83be-718894763229)
![WhatsApp Image 2024-05-29 at 14 07 19_f1d92806](https://github.com/ARobertM/solar-manager-web-app/assets/111703172/f3045872-31a3-4568-8273-6c1e1b433483)



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
