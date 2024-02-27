# RadioBrowser


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Important

Currently, the project is functioning with internal data. To make the project work by requesting the API, find the file "Radio.tsx", `comment` out line 32:
#### `const data = getFilteredStations({ filter: stationFilter });`

and `uncomment` line 33:
#### ` const data = await getFilteredStationsApi({ stationFilter }) as Station[];`