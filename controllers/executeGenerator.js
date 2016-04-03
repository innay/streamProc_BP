'use strict';

let exec = require('child_process').exec;
let path = require('path');
let _ = require('lodash');

function findValidData(data) {
    let validData = data.match(/{[^{}]*}/g);
    return validData;
}

function execGenerator (localStorage) {
    let generatorPath = path.join(__dirname, '../utils/generator-windows-amd64.exe');
    localStorage.clear();
    let child = exec(generatorPath);

    child.stdout.on('data', (data) => {
        console.log("data: %s", data);
        let validOutput = findValidData(data);
        _.each(validOutput, (data) => {
            try {
                let eventData = JSON.parse(data);
                let eventCounter = localStorage.getItem(eventData.event_type) ? parseInt(JSON.parse(localStorage.getItem(eventData.event_type)).eventCounter) + 1 : 1;
                let oWords = localStorage.getItem(eventData.event_type) ? JSON.parse(localStorage.getItem(eventData.event_type)).wordsCount : null;
                let wordCounter = oWords ?
                    (JSON.parse(localStorage.getItem(eventData.event_type)).wordsCount[eventData.data] ?
                        parseInt(JSON.parse(localStorage.getItem(eventData.event_type)).wordsCount[eventData.data]) + 1 : 1) : 1;
                
                oWords = oWords || {};
                oWords[eventData.data] = wordCounter;
                localStorage.setItem(eventData.event_type, JSON.stringify({eventCounter: eventCounter, wordsCount: oWords}));
            } catch (e) {
                console.log("unable to parse input: %s", e);
                return false;
            }
        })

        return true;
    });
    child.stderr.on('data', (data) => {
        console.log('stderr: ' + data);
    });
}

module.exports = execGenerator;