#!/bin/bash
echo "========= IMPORTING DB ========="

for filename in ./dbimport/*.json; do
s=${filename##*/}
collection=${s%.json}
echo "Importing collection: ${collection} from file ${filename}"
mongoimport --host 127.0.0.1:27017 -c ${collection} --file="${filename}" --db tabu --jsonArray --drop --maintainInsertionOrder --numInsertionWorkers 4
done

echo "========= FINISHED IMPORTING DB ========="
