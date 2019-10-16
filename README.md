# Beachbody on demand



## Folder Structure

```
├── program_data --> folder containing BeachBody programs page API data
│   ├── items.json
│   ├── program_types.json
│   ├── trainers.json
│   ├── workout_duration_max.json
│   ├── workout_duration_min.json
│   └── workout_levels.json
├── README.md
└── src
    ├── index.js --> is the JavaScript entry point
    ├── query.js --> queries (analog of API endpoint) of the project (/programs, /programs?programtype=, /proograms?trainer=)
    └── types.js --> data types of the queries with all required properties 
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


