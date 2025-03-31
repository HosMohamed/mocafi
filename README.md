# [Deployed Application Link](https://mocafi-lac.vercel.app/)

## Project Introduction

This project is a standalone application for handling user-related UI and CRUD operations.

It consists of a single user wrapper module (`UserFlowModule`) and three child modules for each page (`UserLoginModule`, `UserRegistrationModule`, `UserProfileModule`).

The application consumes [GoRest](https://gorest.co.in) APIs.

## Available Pages

- **Login**
- **Registration**
- **User Profile**

## Technologies Used

- **Angular v19**
- **RxJS v7**
- **Jest**
- **SCSS**

## Local Development

1. Ensure that you are running Node.js v23 or later.
2. Run `npm install && ng serve` to start the application.

## Technical Decisions

The following development patterns are used to maintain code quality and streamline development.

### **User Experience**

- Each module consists of a single page that is lazily loaded on demand, ensuring smooth performance by reducing initial load times.
- A loading spinner is displayed during asynchronous operations.
- Buttons are disabled if the form is invalid.
- Inputs are disabled when they cannot be edited.
- If a user navigates to an undefined page, they are redirected to the login page.
- If an unauthenticated user attempts to access a protected page, they are redirected to the login page.

### **Error Handling**

- Every request is intercepted and retried up to three times before displaying an error message.
- Input and API errors are explicitly shown to help users resolve issues.

### **API Communications**

- The access token is a non-expiring token for development purposes, stored in an environment variable on the host server and automatically attached to every request.
- CRUD methods are generic to support custom types. However, they have limitations, discussed in the **"Real-World Application Considerations"** section.
- A `UserCommunication` service is created to handle user specific operations.
- `exhaustMap` is favored to process only the first submitted request, preventing unnecessary duplicate API calls since it grabs the first valid source observable and ignores the rest, unlike `switchMap` which would keep cancelling previous source observables that can be costly in a large scale application since it has specific uses.

### **Shared Components**

Shared components ensure a clean and consistent UI across the application.

### **Form Validation**

Form validation is centralized in a single pipe, ensuring consistency across multiple forms.

### **Clean Code**

- A functional programming approach is used for better readability and maintainability.
- Each page resides in its own directory, containing its module and child components.
- `DestroyRef` should be used whenever possible to manage component lifecycle properly.

### **Security**

Auth guards protect sensitive pages from unauthorized access.

## Real-World Application Production Level Considerations

Given that this is a demo project, the following considerations weren't implemented, but should be in a production-ready environment:

- NgRx should be used for state management.
- Specific error code handling such as 400, 404, 500, etc., should be implemented.
- Enforce strict password rules, requiring special characters and capital letters.
- Handling errors based on whether they are blocking/non-blocking.
- Use `shareReplay` to memoize requests when persisting data.
- Develop shared components as a separate library to improve modularity.
- Display a retry modal if an API request fails more than three times.
- Override HTTP methods to use generic types instead of returning `Observable<any>`.
- Move authentication headers to an HTTP interceptor instead of the API controller.
- Store error messages in a constants module.
- Replace the validation pipe with a service for better performance.
- Utilize global SCSS variables for styling consistency.

## Notes

- **Login credentials**:
  - **Username:** `SamHere`
  - **Password:** `adminadmin`
- **User deletion**: Deleting a user does **not** actually remove the account. This is intentional to prevent logging you out and losing user profile data (since hardcoded values are used for demonstration). If you wish to enable actual deletion, uncomment the delete code in `UserProfileComponent`.
