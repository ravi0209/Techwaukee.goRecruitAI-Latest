function numValidation(evt) {
    var e = event || evt;
    var charCode = e.which || e.keyCode;

    if (charCode == 43) {
        return true;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    if (e.keyCode == 13) {
        return false;
    }

    return true;
}