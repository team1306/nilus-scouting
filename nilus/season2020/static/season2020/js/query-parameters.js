/* A script to fetch query parameters and insert them into the page.
 * 
 * Pages with this script included can insert parameters into their html 
 * by using a <element class = "search-parameter">{keyvalue}</element>
 * 
 * This module contains external access functions inside of a global object called queryParamters.
 * Fields inside of queryParameters are:
 *  - queryParameters.findOne(key): a function that returns the value of the given key in the search
 *                                  parameters, or null if missing.
 *  - queryParameters.findAll(): a function that returns all key-value pairs from the search params in an Object
 * 
 * This file contains the following functions for internal use only: 
 * - insertPageParameters() : finds all and inserts content to all proper <element> tags
 * 
 * Script requirments: 
 *  - JQuery 
 */
var queryParameters = {}
let searchparams = (new URL(document.location)).searchParams;

/**
 * Transforms the query string into a javascript object with the same keys and values
 * 
 * If the query string is malformed or missing, it could throw an error. Relies on string parsing.
 * 
 * @return {Object} search query parameters.
 */
queryParameters.getAll = function () {
    // taken directly from stack overflow :^)
    // https://stackoverflow.com/a/8649003/10717280
    let search = location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
}

/**
 * Finds the value of a single field in the search query params.
 * @param {String} key - field name. Must be top-level; i.e "field1"
 *  or "field2", NOT "field.subfield"
 * @return field value or undefined
 */
queryParameters.getOne = function (key) {
    return searchparams.get(key);
}

/**
 * Find all <span> of class "search-parameter" and insert 
 */
function insertPageParameters() {
    $(".search-parameter").html((index, oldhtml) => {
        let paramName = oldhtml;
        let paramValue = queryParameters.getOne(paramName);
        console.log(paramValue)
        console.log(paramName+ ": "+ paramValue);
        return paramValue;
    });
}

$(document).ready(insertPageParameters);
