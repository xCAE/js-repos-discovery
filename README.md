This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Sending Feedback](#sending-feedback)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)


## Release

During working on its task I'm getting familiar with GraphQL and apollo-client.
Most of logic in my app provided by src/DiscoverRepos component. 

## By the Tasks: 

### #task1: ReposPages.js component query repositories info and then render the page with results.
### #task2: FilterLicenses.js component query and render list of licenses
### #task3: FilterNames.js component render the search input.

Final string for query is generated with method `getQueryString` from src/gqls/helpers from user selection data and other certain filter pre-conditions accordingly with the task.  

## Optionsl Tasks:

### #task4: For testing queries I used `react-test-renderer` for rendering,  MockedProvider from `react-apollo/test-utils` and `waait` for async testing.
### #task5: Any previously queried and fetched results are stored and can be retrieved it the future from LocalStorage using [apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist) module in /App.js component.
### #task6: The pagination realized with helper method `getPageGqlQuery` and methods of DiscoverRepos.js component such as `goToNextPage` and `goToPreviousPage`.
### #task7: It is not an real progress indicator, but I think its enough to just displaying "Loading..." in some cases.

## Folder Structure

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      DiscoverRepos.js
      FilterLicense.js
      FilterNames.js
      PagesNavigation.js
      Repository.js
      ReposPages.js
    gqls/
      constants.js
      helpers.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs testing script.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

