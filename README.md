## Install dependencies:
`npm install`

## Run MongoDB 4.2
`docker run -d -p 10000:27017 --name mongodb-4.2-polygon-test mongo:4.2`

## Connect to MongoDB and set a geometrical index
`mongo localhost:10000`

`db.getCollection("docs").createIndexes([{geometry: "2dsphere" }])`

## Run the test:
`node app`

## Optional
If the index creation fails, remove documents before the index creation:
`db.getCollection("docs").remove({})`
`db.getCollection("docs").createIndexes([{geometry: "2dsphere" }])`
