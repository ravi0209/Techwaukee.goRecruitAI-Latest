/// <reference path="../jquery.js" />

//import { release } from "os";

var ajax_url = window.location.origin + "/";
//var ajax_url = "http://www.mygamestat.in/";
var onetimemodal = false;

function setSession(key, value) {
    localStorage[key] = value;
}

function getSession(key) {
    return localStorage[key];
}

function startLoader() {
    //setTimeout(function () {
        $(".container-fluid").addClass('hidden');
    $(".loader_cls").removeClass('hidden');

    //}, 1000);
}

function stopLoader() {
    //setTimeout(function () {
    $(".loader_cls").addClass('hidden');
    $(".container-fluid").removeClass('hidden');
    $("#div_Mainbody").removeClass("hidden");
    //}, 2000);
}

function clearSession() {
    localStorage.clear();
}

function logoutMedthod() {
    $("#logout_page").click(function () {
        setSession("loginid", "");
        setSession("ins_referalcode", "");
        window.location.href = "ad-login.aspx";
    });
}

function asynchAjax(ajax_object) {
    var data = $.ajax({
        type: 'POST',
        data: JSON.stringify({ '_jsonreq': ajax_object.data }),
        async: false,
        url: ajax_url + ajax_object.webservice + ajax_object.methodname,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            successCallBack(ajax_object.key, JSON.parse(response.d));
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function asynchControllerAjax(ajax_object) {
    startLoader();

    var data = $.ajax({
        type: 'POST',
        async: false,
        data: ajax_object.data,
        dataType: 'json',
        url: "/" + ajax_object.url,
        success: function (d) {
            successCallBack(ajax_object.key, d);
        },
        error: function (error) {
            //alert("please try again...");

            console.log(error);
        }
    });
}

function common_api_ajax_request(ajax_ws, key, data) {
    var _request = {};
    _request.url = ajax_ws;
    _request.key = key;
    _request.data = data;
    asynchControllerAjax(_request);
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}