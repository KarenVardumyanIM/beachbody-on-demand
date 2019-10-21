# Beachbody on demand

## Folder Structure

```
├── program_data --> folder containing BeachBody programs page API data
│   ├── items.json
│   ├── filters.json
├── README.md
├── env-config.json --> config file for server environment mode
└── src
    ├── server.js --> is the JavaScript entry point
    ├── query.js --> queries (analog of API endpoint) of the project (/programs, /programs?programtype=, /proograms?trainer=)
    └── types.js --> data types of the queries with all required properties
```

## Available Scripts

In the project directory, you can run the following scripts:

### Production mode

#### `npm run start`

Runs the server in the production mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### Development mode

#### `npm run start-dev`

Runs the server in the development mode.<br>
Open [http://localhost:5001](http://localhost:5000) to view it in the browser.

#### `npm run format:check`

Checks source files code formatting and reports found issues.

#### `npm run format`

Enforces a consistent style by parsing source code and corrects it with its own rules that take the maximum line length into account, wrapping code when necessary.