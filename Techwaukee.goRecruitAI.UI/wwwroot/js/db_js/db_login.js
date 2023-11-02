var ajax_ws = "ws_web_login.asmx/";

$(document).ready(function () {
    //triggerClicking();
    getCredentials();
    btn_login();
    stopLoader();
});

//function successCallBack(key, value) {
//    var dd = value.d;
//    var ddd = dd.data;
//    if (key == "LOGIN") {
//        if (ddd.TWE_ID == null) {
//            //alert("Enter Valid username and password");
//            $("#Alert").css("display", "block");
//        } else {
//            setSession("TWE_ID", ddd.TWE_ID);
//            setSession("Name", ddd.name);
//            setSession("Mailid", ddd.emailid);
//            setSession("RegionValue", ddd.region);
//            setSession("Designation", ddd.designation);

//            subscribertype = value.d;
//            if (ddd.TWE_ID == "TWEI0000") {
//                window.location.href = "Superadmin_Dashboard.aspx";
//            }
//            else if (ddd.region == "2002") {
//                window.location.href = "SelectRegion.aspx";
//            }
//            else if (ddd.region == "2000") {
//                window.location.href = "RecruiterDashboard_Ind.aspx";
//            }
//            else if (ddd.region == "2001") {
//                window.location.href = "RecruiterDashboard.aspx";
//            }

//        }
//    }

//    stopLoader();
//}
function successCallBack(key, value) {
    var dd = value.d;
    var ddd = dd.data;
    if (key == "LOGIN") {
        if (ddd.TWE_ID == null) {
            //alert("Enter Valid username and password");
            $("#Alert").css("display", "block");
        } else {
            setSession("TWE_ID", ddd.TWE_ID);
            setSession("Name", ddd.name);
            setSession("Mailid", ddd.emailid);
            setSession("RegionValue", ddd.region);
            setSession("Designation", ddd.designation);
            setSession("Job", ddd.jobAccess);
            setSession("JobCreation", ddd.jobCreation);
            setSession("JobEdit", ddd.jobEdit);
            setSession("JobView", ddd.jobView);
            setSession("JobFeedback", ddd.jobFeedback);
            setSession("Candidate", ddd.candidateAccess);
            setSession("CandCreation", ddd.candCreation);
            setSession("CandidateView", ddd.candView);
            setSession("CandidateEdit", ddd.candEdit);
            setSession("Vendor", ddd.vendorAccess);
            setSession("VendCreation", ddd.vendCreation);
            setSession("VendorView", ddd.vendView);
            setSession("VendorEdit", ddd.vendEdit);
            setSession("Rolename", ddd.rolename);

            subscribertype = value.d;

            if (ddd.TWE_ID == "TWEI0000") {
                window.location.href = "Superadmin_Dashboard.aspx";
            }
            else if ((getSession('TWE_ID') == "TWEI0001") || (getSession('TWE_ID') == "TWEU0001") || ddd.designation == "4002") {
                window.location.href = "ManagerJobList.aspx";
                //window.location.href = "ManagerJobList.aspx";
            }
            else if (ddd.region == "2002") {
                window.location.href = "SelectRegion.aspx";
            }
            else if (ddd.designation == "4001") {
                //window.location.href = "RecruiterDashboardPage.aspx";
                window.location.href = "Joblist.aspx";
            }
            else if (ddd.region == "2000") {
                window.location.href = "RecruiterDashboard_Ind.aspx";
            }
            else if (ddd.region == "2001") {
                window.location.href = "RecruiterDashboard.aspx";
            }
        }
    }

    stopLoader();
}

var usertype = "";
function loginSubmit() {
    if (Validatelogin() == true) {
        //var username = $("#id_username").val().toUpperCase();
        var username = $("#id_username").val();
        var password = $("#id_psw").val();
        usertype = "1";

        var strdata = { "usertype": usertype, "username": username, "password": password };
        if (username != "" && password != "") {
            common_api_ajax_request("api/LoginValidation", "LOGIN", strdata);
            //common_api_ajax_request("RecruitingAPI/api/LoginValidation", "LOGIN", strdata);
        } else {
            alert("fill");
        }
    }
}

function btn_login() {
    $("#id_proced").click(function () {
        loginSubmit();
    });
}

function enterSubmit(e) {
    if (e.keyCode === 13) {
        loginSubmit();
    }
}

function Validatelogin() {
    var count = 0;
    var emptycount = 0;

    if ($('#id_username').val() == "") {
        $("#id_username").addClass("is-invalid");
        emptycount++;
    }
    else {
        $("#id_username").removeClass("is-invalid");
        count++;
    }

    if ($('#id_psw').val() == "") {
        $('#id_psw').addClass("is-invalid");
        emptycount++;
    }
    else {
        $('#id_psw').removeClass("is-invalid");
        count++;
    }

    document.getElementById("my_captcha_form").addEventListener("submit", function (evt) {
        var response = grecaptcha.getResponse();
        if (response.length == 0) {
            //reCaptcha not verified
            document.getElementById("div_captcha").style.display = "block";
            evt.preventDefault();
            emptycount++;
            return false;
        }
        else {
            document.getElementById("div_captcha").style.display = "none";
            count++;
        }
        //captcha verified
        //do the rest of your validations here
    });

    if (parseInt(emptycount) > 0) {
        return false;
    }

    else if (parseInt(count) > 0) {
        return true;
    }
}
$(document).ready(function () {
    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });
});

$("#rememberMe").click(function () {
    var username = $('#id_username').val();
    var password = $('#id_psw').val();
    var usertype = "1";

    if ($(this).prop("checked") == true) {
        $.cookie('username', username, { expires: 14 });
        $.cookie('password', password, { expires: 14 });
        $.cookie('usertype', usertype, { expires: 14 });
        $.cookie('remember', true, { expires: 14 });
    }
    else {
        // reset cookies
        $.cookie('username', null);
        $.cookie('password', null);
        $.cookie('usertype', null);
        $.cookie('remember', null);
    }
});

function getCredentials() {
    var remember = $.cookie('remember');
    if (remember == 'true') {
        $("#rememberMe").prop('checked', true);
        var username = $.cookie('username');
        var password = $.cookie('password');
        var usertype = $.cookie('usertype');
        // autofill the fields
        $('#id_username').val(username);
        $('#id_psw').val(password);
    }
}

function viewpass() {
    var x = document.getElementById("id_psw");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById("pass_unview").style.display = "block";
        document.getElementById("pass_view").style.display = "none";
    } else {
        x.type = "password";
        document.getElementById("pass_unview").style.display = "none";
        document.getElementById("pass_view").style.display = "block";
    }
}

function remCredentials() {
    var username = $('#id_username').val();
    var password = $('#id_psw').val();
    var usertype = "1";

    if ($("#rememberMe").prop("checked") == true) {
        $.cookie('username', username, { expires: 14 });
        $.cookie('password', password, { expires: 14 });
        $.cookie('usertype', usertype, { expires: 14 });
        $.cookie('remember', true, { expires: 14 });
    }
    else {
        // reset cookies
        $.cookie('username', null);
        $.cookie('password', null);
        $.cookie('usertype', null);
        $.cookie('remember', null);
    }
}