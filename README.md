# Polyhoot! Web client

<img width="120" height="120" alt="Polyhoot! Logo"
     src="https://github.com/Polyhoot/.github/blob/main/logo.jpeg?raw=true" align="right">
     
### Main web application for Polyhoot! game. Used for creating packs and hosting games.


**For demo visit [polyhoot.ciphen.net](https://polyhoot.ciphen.net/)**
## Features

- Selfhosting available
- Import questions directly from Kahoot
- Create your own packs
- Host a game for [`android`](https://github.com/Polyhoot/android) and [`web`](https://github.com/Polyhoot/play) clients

## Tech

We use a number of open source projects to work properly:

- [TypeScript](https://github.com/microsoft/TypeScript) - TypeScript is a strongly typed programming language that builds on JavaScript
- [ReactJS](https://github.com/facebook/react) - JavaScript library for building user interfaces.
- [Grommet](https://github.com/grommet/grommet) - grommet is a react-based framework & components library
- [nanostores](https://github.com/nanostores/nanostores) - A tiny state manager for React
- [Webpack](https://github.com/webpack/webpack) - Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser

And of course Polyhoot! itself is open source with a [public repository](https://github.com/Polyhoot/web)
 on GitHub.

## Installation

Polyhoot! requires [Node.js](https://nodejs.org/) v12+ to run. **Latest LTS is recommended!**
It also requires [Yarn](https://yarnpkg.com/).

Install the dependencies and devDependencies and start the server.

Change `getSocketUrl.ts` and `getServerUrl.ts`.

```sh
cd web
yarn
yarn build
```


## Development

Want to contribute? Great!

Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run this commands.

```sh
yarn start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
## License

`Apache License 2.0`

**Free Software, Hell Yeah!**