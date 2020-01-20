# Test task

## To Run

## `yarn install && yarn start`

Please be sure you've defined API url with `export REACT_APP_CORE_API_DOMAIN=https://set-proper-url/api`
Note to pre-install yarn on your machine

## With Docker

```
    docker build -t alphafx --build-arg URL=https://set-proper-url/api .
    docker run -p 80:80 -d alphafx 
```

Then open [localhost](http://localhost)

## Possible TODOs:

- Testing, all the way
- Improve API – current requests are with POST method (possibly switch to GraphQL)
- Handle auth if needed
- Add localisation
- Eject CRA config


# Generic CRA info below

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
