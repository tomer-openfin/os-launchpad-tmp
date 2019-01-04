# OpenFin OS

OpenFin OS centralizes app discovery and can be customized with your own branding.

**Features**

* Customizable look and feel
* Supports custom application manifests from local and remote environments
* Searchable application directory

## Getting started

1. Clone this repository

Now set your `node` version. The version we're standardizing is in the `.nvmrc` file. If you're using [`nvm`](https://github.com/creationix/nvm) (which we recommenend that you do), you can simply `cd` into this directory and type `nvm use`. After that, continue with the next steps:

2. `npm i`
3. `npm start`
4. `npm run openfin`

## Development

### Scripts

| Script | Description |
| :--- | :--- |
| `build-storybook` | Create a static Storybook build. Creates a build artifact in `storybook-static`. |
| `build` | Build the application. Creates a build artifact in `build`. Be sure to run this with `NODE_ENV` set to `production` when deploying to production. |
| `check` | Runs `gts check`. |
| `clean` | Run `gts clean` and remove build artifacts. |
| `dev` | Run the application in development mode. |
| `docs` | Generate the API documentation. |
| `fix` | Run `gts fix`. |
| `openfin` | Run OpenFin. By default this opens the development mode application in OpenFin. |
| `react-devtools` | Start the remote React dev tools. This will only work in development mode. |
| `serve` | Run a simulated production environment. This should be run after creating the production build artifact. |
| `start` | Start the application in development mode, and then immediately start OpenFin. |
| `storybook` | Run Storybook. |
| `storyshorts` | Update any outdated snapshots generated by Storyshots. |
| `test:api` | Run newman against our Postman collection. |
| `test` | Run unit tests. |

### Environment varibles

| Variable | Description | Development only? |
| :--- | :--- | :---: |
| `API_URL` | Set the base url for the API host. | |
| `BACKEND` | API hostname to proxy requests to. | ✅ |
| `DEPLOY_LOCATION` | Set the `url` in the manifest. | |
| `DEV_TOOLS_ON_STARTUP` | Opens main application window's dev tools on startup. | ✅ |
| `ENTERPRISE` | Determine if the app should start in enterprise mode. | ✅ |
| `HOST` | Set the host for the application. | ✅ |
| `MOCK_POSTMAN_URI` | Postman mock server URI. | ✅ |
| `PASSWORD` | Default login password. | ✅ |
| `PORT` | Set the port for the application. | ✅ |
| `POSTMAN_API_KEY` | Postman API key. | ✅ |
| `POSTMAN_COLLECTION_UID` | UID of our Postman collection. Use this to run the API tests. | |
| `POSTMAN_ENVIRONMENT_UID` | UID of our Postman environment. Use this to run the API tests. | |
| `RUNTIME_VERSION` | Set the `runtime` in the manifest. | |
| `USERNAME` | Default login Username. | ✅ |

### Remote debugging

#### React

Run `npm run react-devtools`. This will pop up a new window, and that window will attach to the last OpenFin window that takes focus.

#### Redux

Open `http://remotedev.io/local/` in a browser. The application publishes Redux actions to the remote dev tools by default in development. There are other ways to remotely debug, you can find more information in the [Monitoring](https://github.com/zalmoxisus/remote-redux-devtools#monitoring) section of the `remote-redux-devtools` repo.

### Develping on macOS

This is the preferred development environment, however as of right now you won't be able to launch applications because there is no RVM in the macOS runtime of OpenFin. If you need to test this behavior, you can run the application in Windows inside a virtual machine. Details below.

### Running the app in a virtual machine

If you want to run the application in Windows inside of a virtual machine, you'll need to set a few environment variables.

First, get the IP address of your virtual machine. You can do this by running `ifconfig` to see all network interfaces, or run:

`ifconfig | grep vmnet1 -A 2 | grep inet | awk '{print $2}'`

Then, create a `.env` file and add the following variables:

```
DEPLOY_LOCATION=http://<vmnet1 address here>:8080
HOST=<vmnet1 address here>
PORT=8080
```

Start the application on your host machine, and start OpenFin in your guest machine. The application manifest will be available at `http://<vmnet1 address here>:8080/app.json`

### Build

When the build script is run, a build artifact is created in the `build` directory.
