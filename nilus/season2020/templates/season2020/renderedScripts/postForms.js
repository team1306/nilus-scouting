/**
 * This module is for handling functionality related to sending forms to the server.
 * It is stored under a global namespace formSubmission
 * Methods:
 * 
 * - submitForm({Object} form): Returns a promise object for sending the form to the server.
 * 
 */

var formSubmission = {};

formSubmission.submitForm = function (form) {
    return new Promise((resolve, reject)=>{
        $.post("{% url 'season2020:submit_form' %}", form, resolve).fail(reject);
    })
}