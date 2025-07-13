# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Deployment

This project is configured for deployment to GitHub Pages and is already set up with the necessary tooling.

### Current Configuration

The project is pre-configured with:
- **Homepage**: `https://randomgnome.github.io/cursor-list-combiner`
- **gh-pages package**: Already installed as a dev dependency
- **Deployment scripts**: `predeploy` and `deploy` scripts are configured

### Deployment Process

To deploy the application:

1. **Build and deploy in one command:**
   ```bash
   npm run deploy
   ```

This command will:
- Run `npm run build` to create a production build
- Push the build files to the `gh-pages` branch
- Make the app available at https://randomgnome.github.io/cursor-list-combiner

### For New Developers

If you're setting up this project for the first time:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd list-mixer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Updating the Deployment

To update the deployed application after making changes:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Deploy the updates:**
   ```bash
   npm run deploy
   ```

### Troubleshooting

**Common Issues:**
- **Deployment not updating**: Ensure you're running `npm run deploy` from the main branch
- **Build failures**: Check for TypeScript errors with `npm run build` first
- **404 errors**: GitHub Pages serves `index.html` for all routes by default

**Debugging:**
- Test the build locally: `npm run build && npm install -g serve && serve -s build`
- Check the GitHub Pages settings in your repository (Settings → Pages)
- Verify the `gh-pages` branch contains the latest build files

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
