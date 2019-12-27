/* eslint-disable handle-callback-err */
const _ = require('lodash')

const MongoClient = require('mongodb').MongoClient
const basePolygon = require('./intersecting-polygon')

// Connection URL
const uri = 'mongodb://localhost:10000/test'

// Database Name
const dbName = 'test'

// How many features we will insert
const featuresToInsert = 10000

const removeAllDocuments = (db, callback) => {
    const collection = db.collection('docs')
    collection.deleteMany({}, function (err, result) {
        callback(result)
    })
}

// Use connect method to connect to the server
MongoClient.connect(uri, (err, client) => {
    console.log('Connected successfully to server')

    const db = client.db(dbName)
    const collection = db.collection('docs')

    removeAllDocuments(db, () => {
        const bulk = collection.initializeUnorderedBulkOp()

        // Create 10000 features
        for (let i = 0; i < featuresToInsert; ++i) {

            // Each feature is an auto-intersecting polygon
            const feature = _.clone(basePolygon)
            feature.id = i
            bulk.insert(feature)
        }

        bulk.execute((error, result) => {
            if (error) {
                // Count errors that contains an empty errmsg field
                const { true: wellFormedErrors, false: badlyFormedErrors } = _.countBy(error.writeErrors, (error) => {
                    return error.err.errmsg !== ''
                })

                console.log(`Errors with errmsg: ${wellFormedErrors}`)
                console.log(`Errors with empty errmsg: ${badlyFormedErrors}`)
                //
                // Prints:
                //
                // Errors with errmsg: 1391
                // Errors with empty errmsg: 8609
                //
            } else {
                console.log(result.result.nInserted === featuresToInsert)
            }
            client.close()
        })
    })
})
