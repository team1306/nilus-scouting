/** A wrapper for storage-related functionality.
 * 
 * Requires that the global/js/localForage.js file is included.
 * 
 * The namespace all functionality is included in is called store, and containes the following:
 * 
 *  -reportToKey({Object} scoreReport): takes in a match score report and returns the key. Sets
 *      storeReport.storageKey to the key for future reference.
 * 
 *  -matchToKey(matchNumber, teamNumber): returns the key for given match and team number, eg "1306"
 *      NOT "red 1". Usefull for situations that do not have the full score report
 *  
 *  -saveReport({Object} report): saves given score report. Returns the localForage promise object.
 * 
 *  -fetchReportByKey(key): returns the localForage promise object to get the score report. The .then
 *      function for the promise should take in a function one parameters, for the report value.
 * 
 *  -fetchReportsByMatch({int} match): Finds all reports with given match numbers. Returns a 
 *      promise object who passes an array of all found reports to .then function
 * 
 *  -fetchReportsByTeam({int} team): Finds all reports with given team numbers. Returns a promise 
 *      object who passes an array of all found reports to .then function
 * 
 *  -fetchReportsByFunction({Function} evaluator): Finds all (key, value) pairs for whom the eval
 *      function returns a truthy value. Returns a promise object who passes an array of all found
 *      reports to .then function
 * 
 *  -executeOnEach({Function} callback): Similar to fetchReportsByFunction, calls callback for each
 *      (key, value) pair in match reports.
 * 
 * More extensive documentation can be found at the head of each function.
 */

//namespace container
var store = {};
const unsubmittedRegistery = "unsubmitted";
//check dependency scripts
if (localforage) {
    console.log("Local Forage loaded correctly.")
    if (localforageFind) {
        localforageFind(localforage);
        console.log("Local Forage Find loaded correctly.");
    } else {
        throw "Unable to find Local Forage Find!"
    }
} else {
    throw "Unable to find local forage!"
}



/**
 * A consistent method for creating keys from match reports.
 * 
 * CAUTION: This method will return the generated key, but it will overwrite the "storageKey" field of the
 * given report. Make sure that nothing important is stored on report.storageKey
 * 
 * Match reports change every year: the only thing that can be relied upon to be included every
 * year that also refers to only one possible report is the combination of match and team. The key
 * is therefore created by combining these two, in the format "M{matchNumber}:T{teamNumber}"
 * 
 * @param {Object} report- the match report 
 */
store.reportToKey = function (report) {
    let key = store.matchToKey(report.matchNumber, report.teamNumber);
    report.storageKey = key;
    return key;
}

/**
 * Builds the match report key from the match and team number.
 * 
 * @param matchNumber
 * @param teamNumber - the actual team code, eg "1306" NOT "red 1"
 * @return {String} - the key, which is "M{matchNumber}:T{teamNumber}", eg "M4:T1306"
 */
store.matchToKey = function (matchNumber, teamNumber) {
    return "M" + matchNumber + ":T" + teamNumber;
}

/** 
 * Locally saves the score report. Updates the registery to 
 * 
 * @param {*} report - the match score report. MUST have fields matchNumber and teamNumber.
 */
store.saveReport = function (report) {
    let key = store.reportToKey(report);

    localforage.getItem(unsubmittedRegistery).then((unsubmitted) => {
        // Make sure the fields we need are included in the unsubmitted registery
        unsubmitted = unsubmitted || [];
        console.log(unsubmitted);
        // add current key to unsubmitted list
        unsubmitted.push(key);
        localforage.setItem(unsubmittedRegistery, unsubmitted);
    });

    // set report
    return localforage.setItem(key, report);
}

/**
 * No extra functionality over the localforage.getItem needed currently. 
 * 
 * Possible additions could include validation of key.
 * @param {String} key - key for report. Can be generated from store.matchToKey
 */
store.fetchReportByKey = localforage.getItem;

//Local Forage Find operations

/**
 * Returns a promise whose .then parameter is all stored match reports with given match number
 * @param {int} matchNumber
 * @return a promise. Functions listening to .then should take one paramater, which will be an
 *          array of any stored match reports with given number.
 */
store.fetchReportsByMatch = function (matchNumber) {
    let evaluateReport = (key, value) => { return value.matchNumber == matchNumber && value.isMatchReport; }
    return localforage.find(evaluateReport);
}

/**
 * Returns a promise whose .then parameter is all stored match reports with given match number
 * @param {int} teamNumber
 * @return a promise. Functions listening to .then should take one paramater, which will be an
 *          array of any stored match reports with given number.
 */
store.fetchReportsByTeam = function (teamNumber) {
    let evaluateReport = (key, value) => { return value.teamNumber == teamNumber && value.isMatchReport; }
    return localforage.find(evaluateReport);
}

/**
 * Returns a promise whose .then parameter containing all match reports accepted by the evaluation
 * function.
 * @param {Function} eval - a function with parameters (key, value) through which all reports are
 *                          passed. If the function returns a truthy value the report will be added
 *                          to the array given to the .then function.
 * @returns {Promise} results of the operation
 */
store.fetchReportsByFunction = function (evalCallback) {
    let evaluateReport = (key, value) => {
        return value.isMatchReport && evalCallback(key, value);
    }
    return localforage.find(evaluateReport);
}

/**
 * Gets the keys for all reports that have not been marked as submitted to the server.
 * @return {Promise} .then( (keys) =>{})
 */
store.fetchUnsubmittedReportKeys = function () {
    return localforage.getItem(unsubmittedRegistery);
}

store.markSubmitted = function (key) {
    localforage.getItem(unsubmittedRegistery).then((unsubmitted) => {
        // Make sure the fields we need are included in the unsubmitted registery
        unsubmitted = unsubmitted || [];
        // remove key from unsubmitted list
        unsubmitted = unsubmitted.filter((val) => { return val !== key; });
        localforage.setItem(unsubmittedRegistery, unsubmitted);
    });
}

/**
 * Runs the given callback for every (key, value) pair that is a match report. 
 * 
 * NOTE: Changing field in the value parameter does not reflect in the database. Use store.saveReport
 * @param {Function} callback - takes params (key, value) for each match report
 */
store.executeOnEach = function (callback) {
    // This one is a little bit of a hack. Since finding reports runs an evaluation function on
    // every item in localForage, it can also be used to execute operations for each element.
    // All that then remains is to check that an element is a match report before executing on top
    // of it. 
    localforage.find((key, value) => {
        if (value.isMatchReport) {
            callback(key, value);
        }
        // not actually collecting information so don't add anything to the list.
        return false;
    });
}

/**
 * Runs the given callback for every (key, value) pair that is a match report and listed as unsubmitted. 
 * 
 * NOTE: Changing field in the value parameter does not reflect in the database. Use store.saveReport
 * @param {Function} callback - takes params (key, value) for each match report
 */
store.executeOnEachUnsubmitted = function (callback) {
    console.log("calling")
    return store.fetchUnsubmittedReportKeys().then((keys) => {
        keys = keys || [];
        keys.forEach((key) => {
            this.fetchReportByKey(key).then((result) => {
                callback(key, result);
            })
        });
    });
}