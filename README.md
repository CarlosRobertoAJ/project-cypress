# Cypress Backend Testing Project

## Introduction
This project is an automated test suite for backend testing using Cypress. The API endpoints tested belong to [Serverest](https://serverest.dev/#/), specifically the User tool, covering the following HTTP methods:

- **GET**
- **POST**
- **PUT**
- **DELETE**

This project originates from a Master Class on test automation, taught by **Alexandre Silva**.

## Prerequisites
Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [Cypress](https://www.cypress.io/)

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project folder:

   ```sh
   cd <project-folder>
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

## Running the Tests

Run Cypress tests in headless mode:

```sh
npx cypress run
```

Run Cypress tests in interactive mode:

```sh
npx cypress open
```

Then, select the test file and run it from the Cypress GUI.

---
