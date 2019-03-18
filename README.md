# OpenFin OS

OpenFin OS centralizes app discovery and can be customized with your own branding.

**Features**

- Customizable look and feel
- Supports custom application manifests from local and remote environments
- Searchable application directory

## Getting started

1. Clone this repository

Now set your `node` version. The version we're standardizing is in the `.nvmrc` file. If you're using [`nvm`](https://github.com/creationix/nvm) (which we recommenend that you do), you can simply `cd` into this directory and type `nvm use`. After that, continue with the next steps:

2. `npm i`
3. `npm start`
4. In a separate console tab, `npm run openfin`

## Development

### Scripts

| Script            | Description                                                                                                                                       |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `build-storybook` | Create a static Storybook build. Creates a build artifact in `storybook-static`.                                                                  |
| `build`           | Build the application. Creates a build artifact in `build`. Be sure to run this with `NODE_ENV` set to `production` when deploying to production. |
| `check`           | Runs `gts check`.                                                                                                                                 |
| `clean`           | Run `gts clean` and remove build artifacts.                                                                                                       |
| `dev`             | Run the application in development mode.                                                                                                          |
| `docs`            | Generate the API documentation.                                                                                                                   |
| `fix`             | Run `gts fix`.                                                                                                                                    |
| `openfin`         | Run OpenFin. By default this opens the development mode application in OpenFin.                                                                   |
| `process-manager` | Start the Openfin Process Manager. This will only work in development mode.                                                                       |
| `react-devtools`  | Start the remote React dev tools. This will only work in development mode.                                                                        |
| `serve`           | Run a simulated production environment. This should be run after creating the production build artifact.                                          |
| `start`           | Start the application in development mode, and then immediately start OpenFin.                                                                    |
| `storybook`       | Run Storybook.                                                                                                                                    |
| `storyshorts`     | Update any outdated snapshots generated by Storyshots.                                                                                            |
| `test:api`        | Run newman against our Postman collection.                                                                                                        |
| `test`            | Run unit tests.                                                                                                                                   |

### Environment varibles

| Variable                  | Description                                                                                                    | Development only? |
| :------------------------ | :------------------------------------------------------------------------------------------------------------- | :---------------: |
| `BACKEND`                 | API hostname to proxy requests to.                                                                             |        ✅         |
| `DEPLOY_LOCATION`         | Set the `url` in the manifest.                                                                                 |                   |
| `DEV_TOOLS_ON_STARTUP`    | Opens main application window's dev tools on startup.                                                          |        ✅         |
| `ENTERPRISE`              | Determine if the app should start in enterprise mode.                                                          |        ✅         |
| `HOST`                    | Set the host for the application.                                                                              |        ✅         |
| `LOCAL_MANIFEST`          | Reroute requests to `/api/launcher.json` to use the locally-built `app.json` instead of the deployed manifest. |        ✅         |
| `MOCK_POSTMAN_URI`        | Postman mock server URI.                                                                                       |        ✅         |
| `PASSWORD`                | Default login password.                                                                                        |        ✅         |
| `PORT`                    | Set the port for the application.                                                                              |        ✅         |
| `POSTMAN_API_KEY`         | Postman API key.                                                                                               |        ✅         |
| `POSTMAN_COLLECTION_UID`  | UID of our Postman collection. Use this to run the API tests.                                                  |                   |
| `POSTMAN_ENVIRONMENT_UID` | UID of our Postman environment. Use this to run the API tests.                                                 |                   |
| `RUNTIME_VERSION`         | Set the `runtime` in the manifest.                                                                             |                   |
| `USERNAME`                | Default login Username.                                                                                        |        ✅         |

### Remote debugging

#### React

Run `npm run react-devtools`. This will pop up a new window, and that window will attach to the last OpenFin window that takes focus.

#### Redux

Open `http://remotedev.io/local/` in a browser. The application publishes Redux actions to the remote dev tools by default in development. There are other ways to remotely debug, you can find more information in the [Monitoring](https://github.com/zalmoxisus/remote-redux-devtools#monitoring) section of the `remote-redux-devtools` repo.

On a Windows virtual machine, open `http://<vmnet1 address here>:8000/` in a browser to view the remote Redux Devtools.

### Developing in Storybook

UI components can be developed in Storybook without launching Openfin (`npm run storybook`).

### Developing on macOS

This is the preferred development environment, however as of right now you won't be able to launch applications because there is no RVM in the macOS runtime of OpenFin. If you need to test this behavior, you can run the application in Windows inside a virtual machine. Details below.

### Running the app in a virtual machine

If you want to run the application in Windows inside of a virtual machine, you'll need to set a few environment variables.

First, get the IP address of your virtual machine. You can do this by running `ifconfig` to see all network interfaces, or run:

`ifconfig | grep vmnet1 -A 2 | grep inet | awk '{print $2}'`

Then, create a `.env` file (check the `.env.sample` file for details) and fill in the following variables:

```
HOST=<vmnet1 address here>
PORT=8080
```

Start the application on your host machine, and start OpenFin in your guest machine. The application manifest will be available at `http://<vmnet1 address here>:8080/api/launcher.json`

Should you ever need to kill all openfin processes on your VM, you can run the following command on powershell or the terminal: `taskkill /F /IM openfin.exe /T`

#### Installing Openfin on the VM
1. Download the Hyperblotter Openfin app from this [link](https://install.openfin.co/download?fileName=Hyperblotter&config=http://cdn.openfin.co/demos/hyperblotter/app.json).
2. Run the app.
3. After installation, edit the app's desktop shortcut.  In the Target field, edit the --config option to point to your DEPLOY_LOCATION, e.g., " --config="http://172.16.28.1:8080/app.json".
4. Launch the app.

### Build

When the build script is run, a build artifact is created in the `build` directory.

### GitHub Practices

New pull requests should request to be merged into the `develop` branch, and commits should be squashed when merging.
