# zapp-pipes-provider-reshet

Data source provider for Reshet

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please keep in mind that in order to run this project you will need Applicaster `NPM TOKEN` in your env variables.

### Installing

1.  Clone this repo;
2.  Navigate to the project folder;
3.  Run `npm install`;

## Running the tests

We're using [https://github.com/avajs/ava](AVA) as our test runner.
Tests should be placed in the `test` folder which is following project folder structure.

## Deployment

Provider is an npm package which is part of our applicaster private npm account

### Deploying to npm

1.  Change version number inside `package.json` (or use `npm version patch/minor/major`)
2.  Build bundle: `npm run build`;
3.  Publish bundle to npm `npm publish`.

### Updating plugin-manifest

1.  Install zappifest if you don't have it yet. [https://github.com/applicaster/zappifest](Instllation instructions)
2.  Update npm package version number inside `plugin-manifest.json` file. `dependency_version: x.x.xx`
3.  run `zappifest publish --plugin-id <plugin ID> --manifest plugin-manifest.json --access-token <yourAccessToken>`

### Bundling DSP bundle for your app

Bundeling the data source provider to your app is done through the feed section in the ui builder. For more information please refer to http://developer-zapp.applicaster.com/Zapp-Pipes/7.-Connect-to-Zapp.html

## Development

### Testing locally in the browser

1.  run `npm start`
2.  open your browser at `http://localhost:8080/reshetnewsds/fetchData?type=[type]&param1=[param1]...&paramN=[paramN]`

## List of Handlers

### home - returns a feed of items

| Parameter | Description      | Type   | Example |
| --------- | ---------------- | ------ | ------- |
|           |
| id        | collection index | String | `id=0`  |

Url example: `reshetnewsds://fetchData?type=home&id=0`

### vod - returns a feed of items

| Parameter | Description      | Type   | Example |
| --------- | ---------------- | ------ | ------- |
|           |
| id        | collection index | String | `id=0`  |

Url example: `reshetnewsds://fetchData?type=vod&id=0`

### live - returns a feed of items

| Parameter | Description      | Type   | Example |
| --------- | ---------------- | ------ | ------- |
|           |
| id        | collection index | String | `id=0`  |

Url example: `reshetnewsds://fetchData?type=live&id=0`

### channel - returns a feed of items

| Parameter | Description | Type   | Example |
| --------- | ----------- | ------ | ------- |
|           |
| id        | channel id  | String | `id=0`  |

Url example: `reshetnewsds://fetchData?type=channel&id=12947`
