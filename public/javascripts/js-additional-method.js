$(function(e){
    $.validator.addMethod("noSpecialCharacters", function(value, element, arg){
        var response = true;
        if (value.match(arg)) {
            response = false;
        }
        return response;
    }, "No special characters allowed");

    $.validator.addMethod("dateFormat", function(value, element) {
        return value.match(/^\d\d?-\d\d?-\d\d\d\d$/);
    },
    "Please enter a date in the format dd-mm-yyyy.");

    $.validator.addMethod("spainPhoneNumber", (value, element) => {
        var str = value.toString().replace(/\s/g, '');
        return str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str);
    });
});
