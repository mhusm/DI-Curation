const parse  = require('csv-parse/lib/sync');
const fs  = require('fs');
const path  = require('path');

var input = fs.readFileSync('photos_exp.CSV');

var records = parse(input, {columns: true, delimiter: ';'});
records.forEach(record => {
    for (const key of Object.keys(record)) {
        if (record[key].length === 0) {
            record[key] = false;
        }
        else if (!isNaN(record[key]) && record[key].length >0) {
            record[key] = +record[key];
        }
        else if (record[key] === "x" || record[key] === "x") {
            record[key] = true;
        }
    }
});

// Speicherort und File name
fs.writeFile(path.join('public', 'photos1.js'), "var photos = " +JSON.stringify(records, null, '\t'), 'utf8', 
    err => {if(err) throw err;}
);
