# office-binge-tracker

> Tracking us watch the entirety of The Office

## Tech Used

- React
- [Gatsby](https://www.gatsbyjs.org/)
- [Netlify](https://www.netlify.com/), Netlify Functions, and Netlify Identity
- MongoDB
- [Material UI](https://material-ui.com/)

## 🚀 Quick start

```sh
$ git clone git@github.com:noahbass/office-binge-tracker.git
$ cd office-binge-tracker
$ cp .env.example .env
$ yarn
$ yarn develop
```

## Local Netlify Environment

Use [`Netlify Dev`](https://docs.netlify.com/cli/get-started/#netlify-dev) to develop in an environment similar to Netlify production (includes features like Netlify serverless functions).

Note: not included is a MongoDB instance, you'll have to run this yourself.

```sh
$ npm install netlify-cli -g
$ cp .env.example .env
$ # edit .env
$ netlify dev
```

## Deployment to Netlify

To build the project for production, use `yarn build`.

To deploy, use `netlify deploy` or from git. More on deploying to Netlify: [https://docs.netlify.com/site-deploys/create-deploys/](https://docs.netlify.com/site-deploys/create-deploys/).

## License

All code is licensed [MIT](LICENSE).
