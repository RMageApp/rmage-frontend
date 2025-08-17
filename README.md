# RMage Frontend

This repository contains the source code for the cross-platform **React Native mobile application** for RMage, targeting both iOS and Android.

## Overview

This application provides the complete user interface for both Landlord and Tenant user roles. It communicates with the `rmage-backend` via a RESTful API to handle all data and user actions.

## Tech Stack

- **Framework:** React Native
- **Language:** TypeScript
- **State Management:** (To be decided - e.g., React Context, Zustand, Redux)
- **Navigation:** React Navigation

## Getting Started

### Prerequisites

- Node.js & npm/yarn
- Watchman (macOS)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RMageApp/rmage-frontend.git
    cd rmage-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**

    *   **For iOS:**
        ```bash
        npx react-native run-ios
        ```
    *   **For Android:**
        ```bash
        npx react-native run-android
        ```

---
