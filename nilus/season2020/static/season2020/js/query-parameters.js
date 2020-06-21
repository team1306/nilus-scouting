/* A script to fetch query parameters and insert them into the page.
 * 
 * Pages with this script included can insert parameters into their html 
 * by using a <element class = "search-parameter">{keyvalue}</element>
 * 
 * This file contains the following functions for external and internal use:
 * - getOneSearchParameter(key) : returns the value of a specific key,
 *      or undefined if not found.
 * 
 * This file contains the following functions for internal use only: 
 * - insertPageParameters() : finds all and inserts content to all proper <element> tags
 * 
 * Script requirments: 
 *  - JQuery 
 */

let searchparams = (new URL(document.location)).searchParams;

/**
 * Equivalent of fetching search parameters directly from the document location.
 * 
 * @return {Object} search query parameters
 */
var getAllSearchParameters = function () {
    throw "not yet implemented!"
}

/**
 * Finds the value of a single field in the search query params.
 * @param {String} key - field name. Must be top-level; i.e "field1"
 *  or "field2", NOT "field.subfield"
 * @return field value or undefined
 */
var getOneSearchParameter = function (key) {
    return searchparams.get(key);
}

/**
 * Find all <span> of class "search-parameter" and insert 
 */
function insertPageParameters() {
    $(".search-parameter").html((index, oldhtml) => {
        let paramName = oldhtml;
        console.log(paramName);
        let paramValue = getOneSearchParameter(paramName);
        console.log(paramValue);
        return paramValue;
    });
}

$(document).ready(insertPageParameters);
