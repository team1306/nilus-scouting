/** A wrapper for storage-related functionality.
 * 
 * Requires that the global/js/localForage.js file is included.
 * 
 * The namespace all functionality is included in is called store, and containes the following:
 * 
 *  -reportToKey(scoreReport): takes in a match score report and returns the key. Sets
 *      storeReport.storageKey to the key for future reference.
 * 
 *  -matchToKey(matchNumber, teamNumber): returns the key for given match and team number, eg "1306"
 *      NOT "red 1". Usefull for situations that do not have the full score report
 *  
 *  -saveReport(report): saves given score report. Returns the localForage promise object.
 * 
 *  -fetchReport(key): returns the localForage promise object to get the score report. The .then
 *      function for the promise should take in a function one parameters, for the report value.
 */

//namespace container
var store = {};

/**
 * A consistent method for creating keys from match reports.
 * 
 * CAUTION: This method will return the generated key, but it will overwrite the "storageKey" field of the
 * given report. Make sure that nothing important is stored on report.storageKey
 * 
 * Match reports change every year: the only thing that can be relied upon to be included every
 * year that also refers to only one possible report is the combination of match and team. The key
 * is therefore created by combining these two, in the format "matchNumber:teamNumber"
 * 
 * @param {Object} report- the match report 
 */
store.reportToKey = function(report){
    let key = store.matchToKey(report.matchNumber, report.teamNumber);
    console.log(key);
    report.storageKey = key;
    return key;
}

/**
 * Builds the match report key from the match and team number.
 * 
 * @param matchNumber
 * @param teamNumber - the actual team code, eg "1306" NOT "red 1"
 * @return {String} - the key, which is "matchNumber:teamNumber"
 */
store.matchToKey = function(matchNumber, teamNumber){
    console.log(matchNumber);
    return matchNumber+":"+teamNumber;
}

/** 
 * Locally saves the score report.
 * 
 * @param {*} report - the match score report. MUST have fields matchNumber and teamNumber.
 */
store.saveReport= function(report){
    console.log(report);
    let key = store.reportToKey(report);
    console.log(key);
    return localforage.setItem(key, report);
}

/**
 * No extra functionality over the localforage.getItem needed currently. 
 * 
 * Possible additions could include validation of key.
 */
store.fetchReport = localforage.getItem;