# Dependencies:
`npm install`

# Run MongoDB 4.2
`docker run -d -p 10000:27017 --name mongodb-4.2-polygon-test mongo:4.2`

## Optional: check the mongoDB is running
`docker ps`:
`1538a7ffe856 mongo:4.2 "docker-entrypoint.s…" 5 seconds ago Up 4 seconds 0.0.0.0:10000->27017/tcp mongodb-4.2-polygon-test`

# Connect to MongoDB and set a geometrical index
`mongo localhost:10000`

Optional:
`db.getCollection("docs").remove({})`

Required:
`db.getCollection("docs").createIndexes([{geometry: "2dsphere" }])`

# Run the test:
`node app`
