<!-- @format -->

# Getting Started

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Pages

### `MapDashboardPage`

Handle users map

### `MapFormPage`

Handle users form

## Components

### `Map`

Handle the users map

### `AddUsers`

Handle the form fileds and submit users

### `FormComponent`

Handle the form logic

## About the stack

1. For global state I used Recoil.
2. For styling, I used "Ant D" components library and styled-components.
3. I used Formik and AJV for managing the form and validation.

note: I add to the Users API country (Andorra) that don't exist on the google map for some rison (maybe they write it diffrent).
For prevent issues like that we shoud send the country code insted the country name.
