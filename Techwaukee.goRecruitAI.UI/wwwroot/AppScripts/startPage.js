/// <reference path="commondatastore.js" />
var counter = 0;
$(document).ready(function () {
    //$('#lblRolename').text(" | "+getSession('Rolename'));
    //$('#lblEmployeename').text(getSession('Name'));

    //if ((getSession('TWE_ID')) == undefined) {
    //    window.location.href = "Login.aspx";
    //}

    //else if ((getSession('TWE_ID') == "TWEI0000")) {
    //    $('#li_user').css('display', 'block');
    //    $('#li_client').css('display', 'block');
    //    $('#li_supplier').css('display', 'block');
    //    $('#li_config').css('display', 'block');
    //    $('#li_job').css('display', 'none');
    //    $('#li_cand').css('display', 'none');
    //    $('#li_vendor').css('display', 'none');
    //    document.getElementById("anchDashboard").href = "Superadmin_Dashboard.aspx";
    //    document.getElementById("btnlogout").href = "Login.aspx";

    //}
    //else if ((getSession('TWE_ID')).includes("TWV")) {
    //    $('#li_dashboard').css('display', 'none');
    //    $('#li_supplierdash').css('display', 'block');
    //    $("#anchSupplierdash").addClass("active");
    //    $('#li_job').css('display', 'none');
    //    $('#li_cand').css('display', 'none');
    //    $('#li_vendor').css('display', 'none');
    //    $('#li_team').css('display', 'none');
    //    if (getSession("RegionValue") == "2000") {
    //        $('#imgFlagindia').css('display', 'block');
    //    }
    //    else if (getSession("RegionValue") == "2001") {
    //        $('#imgFlagus').css('display', 'block');
    //    }
    //    document.getElementById("btnlogout").href = "Vendor_Login.aspx";
    //}
    ////else if ((getSession('TWE_ID') == "TWEI0001") || (getSession('TWE_ID') == "TWEU0001")) {
    ////    $('#li_user').css('display', 'none');
    ////    $('#li_client').css('display', 'none');
    ////    $('#li_config').css('display', 'none');
    ////    $('#li_job').css('display', 'block');
    ////    $('#li_cand').css('display', 'block');
    ////    $('#li_vendor').css('display', 'block');
    ////    $('#li_team').css('display', 'block');
    ////    document.getElementById("anchDashboard").href = "Report_Jobs.aspx";
    ////}
    //else {
    //    $('#li_user').css('display', 'none');
    //    $('#li_client').css('display', 'none');
    //    $('#li_config').css('display', 'none');
    //    $('#li_job').css('display', 'block');
    //    $('#li_cand').css('display', 'block');
    //    //$('#li_vendor').css('display', 'none');
    //    document.getElementById("btnlogout").href = "Login.aspx";
    //    if (getSession("RegionValue") == "2000") {
    //        if (getSession('Designation') == "4001") {
    //            document.getElementById("anchDashboard").href = "RecruiterDashboardPage.aspx";
    //            document.getElementById("anchjobList").href = "JobListindia.aspx";

    //            document.getElementById("anchPerf").href = "ManagerFeedbackpageIndia.aspx?id=" + getSession('TWE_ID') + "&name=" + getSession('Name').replace(" ", "%20");
    //            //$('#li_perf').css('display', 'block');

    //            $('#li_closure').css('display', 'none');

    //        }
    //        else if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager") {
    //            //else if (getSession('Designation') == "4000") {
    //            document.getElementById("anchjobList").href = "ManagerJobListindia.aspx";
    //            document.getElementById("closurelist").href = "ClosureCandidateListIndia.aspx";
    //            //$('#li_team').css('display', 'block');
    //            if (getSession('Designation') == "4000") {
    //                document.getElementById("anchDashboard").href = "RecruiterDashboard_Ind.aspx";
    //                $('#li_report').css('display', 'block');
    //            }
    //            else {
    //                document.getElementById("anchDashboard").href = "Report_Jobs.aspx";
    //            }
    //            //$('#li_closure').css('display', 'block');

    //        }

    //        document.getElementById("candOverview").href = "CandidateOverviewindia.aspx";
    //        document.getElementById("candView").href = "CandidateListindia.aspx";
    //        document.getElementById("candSearch").href = "CandidateSearchIndia.aspx";
    //        //document.getElementById("teamList").href = "ManagerdashboardIndia.aspx";
    //        $('#imgFlagindia').css('display', 'block');
    //        $('#li_vendor').css('display', 'none');
    //        $('#li_Benchsales').css('display', 'none');
    //        $('#li_cand').css('display', 'none');
    //    }

    //    else if (getSession("RegionValue") == "2001") {
    //        if (getSession('Designation') == "4001") {
    //            document.getElementById("anchDashboard").href = "RecruiterDashboardPage.aspx";
    //            document.getElementById("anchjobList").href = "JobList.aspx";
    //            document.getElementById("anchPerf").href = "ManagerFeedbackpage.aspx?id=" + getSession('TWE_ID') + "&name=" + getSession('Name').replace(" ", "%20");
    //           // $('#li_perf').css('display', 'block');
    //            $('#li_Benchsales').css('display', 'block');
    //            $('#li_closure').css('display', 'none');
    //            $('#li_addjob').css('display', 'none');
    //        }
    //        else if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager") {
    //            //else if (getSession('Designation') == "4000") {
    //            document.getElementById("anchjobList").href = "ManagerJobList.aspx";
    //            document.getElementById("closurelist").href = "ClosureCandidateList.aspx";
    //            //$('#li_team').css('display', 'block');
    //            if (getSession('Designation') == "4000") {
    //                $('#li_report').css('display', 'block');
    //                document.getElementById("anchDashboard").href = "RecruiterDashboard.aspx";
    //            }
    //            else {
    //                document.getElementById("anchDashboard").href = "Report_Jobs.aspx";
    //            }
    //            //$('#li_closure').css('display', 'block');
    //            $('#li_addjob').css('display', 'block');
    //        }
    //        document.getElementById("candOverview").href = "CandidateOverview.aspx";
    //        document.getElementById("candView").href = "CandidateList.aspx";
    //        document.getElementById("candSearch").href = "CandidateSearch.aspx";
    //        document.getElementById("vendView").href = "Vendorlist.aspx";
    //        document.getElementById("vendSearch").href = "VendorSearch.aspx";
    //        //document.getElementById("teamList").href = "ManagerDashboard.aspx";
    //        $('#imgFlagus').css('display', 'block');
    //        $('#li_vendor').css('display', 'none');
    //        $('#li_Benchsales').css('display', 'none');
    //        $('#li_cand').css('display', 'none');
    //        $('#li_addjob').css('display', 'none');

    //    }

    //    else if (getSession("RegionValue") == "2002") {
    //        if (getSession("Region") == "USA") {
    //            document.getElementById("anchDashboard").href = "RecruiterDashboard.aspx";
    //            if (getSession('Designation') == "4001") {
    //                document.getElementById("anchjobList").href = "JobList.aspx";
    //                document.getElementById("anchPerf").href = "RecruiterPerformance.aspx";
    //                $('#li_perf').css('display', 'block');
    //                $('#li_closure').css('display', 'none');
    //            }
    //            else if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager") {
    //                //else if (getSession('Designation') == "4000") {
    //                document.getElementById("anchjobList").href = "ManagerJobList.aspx";
    //                document.getElementById("closurelist").href = "ClosureCandidateList.aspx";
    //                //$('#li_team').css('display', 'block');
    //                if (getSession('Designation') == "4000") {
    //                    $('#li_report').css('display', 'block');
    //                }
    //                //$('#li_closure').css('display', 'block');
    //            }
    //            document.getElementById("candOverview").href = "CandidateOverview.aspx";
    //            document.getElementById("candView").href = "CandidateList.aspx";
    //            document.getElementById("candSearch").href = "CandidateSearch.aspx";
    //            document.getElementById("vendView").href = "Vendorlist.aspx";
    //            document.getElementById("vendSearch").href = "VendorSearch.aspx";
    //            //document.getElementById("teamList").href = "ManagerDashboard.aspx";
    //            $('#imgFlagus').css('display', 'block');
    //            $('#li_vendor').css('display', 'block');
    //        }
    //        else if (getSession("Region") == "India") {
    //            document.getElementById("anchDashboard").href = "RecruiterDashboard_Ind.aspx";
    //            if (getSession('Designation') == "4001") {
    //                document.getElementById("anchjobList").href = "JobListindia.aspx";
    //                document.getElementById("anchPerf").href = "RecruiterPerformanceIndia.aspx";
    //                $('#li_perf').css('display', 'block');
    //                $('#li_closure').css('display', 'none');
    //            }
    //            else if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager") {
    //                //else if (getSession('Designation') == "4000") {
    //                document.getElementById("anchjobList").href = "ManagerJobListindia.aspx";
    //                document.getElementById("closurelist").href = "ClosureCandidateListIndia.aspx";
    //                //$('#li_team').css('display', 'block');
    //                if (getSession('Designation') == "4000") {
    //                    $('#li_report').css('display', 'block');
    //                    //$('#li_closure').css('display', 'block');
    //                }
    //            }
    //            document.getElementById("candView").href = "CandidateOverviewindia.aspx";
    //            document.getElementById("candSearch").href = "CandidateSearchIndia.aspx";
    //            //document.getElementById("teamList").href = "ManagerdashboardIndia.aspx";
    //            $('#imgFlagindia').css('display', 'block');
    //            $('#li_vendor').css('display', 'none');
    //        }

    //    }

    //}
    //if (getSession("RegionValue") == "2002") {
    //    $("#li_select").css("display", "block");
    //}
    ////getDuration(6, "Daily");
    //getDuration('365', 'Monthly');
    //stopLoader();
});

var arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getTimeline() {
    if (Validateduration() == true) {
        $('#dropdownMenuButton').text('This Duration');
        var dt = new Date($('#txtStartdate').val().substring(6, 10), parseInt($('#txtStartdate').val().substring(3, 5)) - 1, $('#txtStartdate').val().substring(0, 2));
        var dt2 = new Date($('#txtEnddate').val().substring(6, 10), parseInt($('#txtEnddate').val().substring(3, 5) - 1), $('#txtEnddate').val().substring(0, 2));

        setSession("Duration", dt.getFullYear() + "-" + pad2(dt.getMonth()) + "-" + dt.getDate() + "$" + dt2.getFullYear() + "-" + pad2(dt2.getMonth()) + "-" + dt2.getDate());
        $('#lblDurationview').text(pad2(dt.getDate()) + " " + arr[dt.getMonth()] + " " + dt.getFullYear() + " To " + pad2(dt2.getDate()) + " " + arr[dt2.getMonth()] + " " + dt2.getFullYear());
        getDashboardPage(getSession('TWE_ID'), getSession('Duration'), "Daily");
        $('#txtStartdate').val("");
        $('#txtEnddate').val("");
        $("#btnClose").trigger("click");
    }
}
function getDuration(noofdays, strType) {
    if (strType == "Daily") {
        $('#dropdownMenuButton').text('This Week');
    }
    else if (strType == "Weekly") {
        $('#dropdownMenuButton').text('This Month');
    }
    else if (strType == "Monthly") {
        $('#dropdownMenuButton').text('This Year');
    }
    $('#dropdownMenuButton').css("display", "none");

    var d1 = new Date;
    var dt = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());

    var s4 = d1.getFullYear() + '-' + (parseInt(d1.getMonth()) + parseInt(1)) + '-' + d1.getDate();
    var someDate = new Date(s4);

    var startDate = new Date(s4);

    someDate.setDate(someDate.getDate());
    var dd = someDate.getDate();
    var mm = someDate.getMonth() + 1;
    var y = someDate.getFullYear();

    startDate.setDate(startDate.getDate() - noofdays);
    var st_dd = startDate.getDate();
    var st_mm = startDate.getMonth() + 1;
    var st_y = startDate.getFullYear();
    startFormattedDate = (st_y) + '-' + pad2(st_mm) + '-' + pad2(st_dd);

    var someFormattedDate = "";
    someFormattedDate = y + '-' + pad2(mm) + '-' + pad2(dd);
    $('#hdnDuration').val(startFormattedDate + "$" + someFormattedDate);
    setSession("Duration", startFormattedDate + "$" + someFormattedDate);

    if (getSession('Page') == "CandidateOverview" || getSession('Page') == "CandidateOverviewIndia") {
        $('#lblDurationview').text(pad2(dd) + " " + arr[someDate.getMonth()] + " " + y);
    }
    else {
        $('#lblDurationview').text(pad2(st_dd) + " " + arr[startDate.getMonth()] + " " + st_y + " To " + pad2(dd) + " " + arr[someDate.getMonth()] + " " + y);
    }

    //if (getSession('Page') == "ManagerDashboard" && counter=="0") {
    //    counter++;
    //    getMgrDashboardPage(getSession('RecruiterID'), getSession('Duration'), strType);

    //}
    //else {
    getDashboardPage(getSession('TWE_ID'), getSession('Duration'), strType);
    //}
}

function getDashboardPage(TWE_Id, duration, strType) {
    var st = duration.split("$");

    var strdata = { "TWE_Id": TWE_Id, "Startdate": st[0], "Enddate": st[1], "strType": strType };
    if (TWE_Id != "") {
        if (getSession("Page") == "Dashboard")
            common_api_ajax_request("api/Recrutingdashboard", "DASHBOARD", strdata);

        else if (getSession("Page") == "DashboardIndia")
            common_api_ajax_request("api/RecrutingdashboardIndia", "DASHBOARDIND", strdata);
        //else if (getSession("Page") == "JoblistIndia")
        //    common_api_ajax_request("api/JobListIndia", "JOBLISTINDIA", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        alert("fill");
    }
}

//function getMgrDashboardPage(TWE_Id, duration, strType) {
//    var st = duration.split("$");

//    var strdata = { "TWE_Id": TWE_Id, "Startdate": st[0], "Enddate": st[1], "strType": strType };
//    if (TWE_Id != "") {
//        common_api_ajax_request("api/ManagerdashboardIndia", "MGRDASHBOARD", strdata);
//    }
//}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

function Validateduration() {
    var count = 0;
    var emptycount = 0;
    if ($('#txtStartdate').val() == "") {
        $('#txtStartdate').addClass("is-invalid");
        emptycount++;
    }
    else {
        $('#txtStartdate').removeClass("is-invalid");
        count++;
    }

    if ($('#txtEnddate').val() == "") {
        $('#txtEnddate').addClass("is-invalid");
        emptycount++;
    }
    else {
        $('#txtEnddate').removeClass("is-invalid");
        count++;
    }

    if (parseInt(emptycount) > 0) {
        return false;
    }

    else if (parseInt(count) > 0) {
        return true;
    }
}

function gotoDashboard() {
    if ((getSession('TWE_ID') == "TWEI0000")) {
        document.getElementById("anch_Role").href = "Superadmin_Dashboard.aspx";
    }
    else if (getSession("RegionValue") == "2000") {
        if (getSession('Designation') == "4001") {
            document.getElementById("anchDashboard").href = "RecruiterDashboardPage.aspx";
        }
        else if (getSession('Designation') == "4004" || getSession('Designation') == "4002") {
            document.getElementById("anch_Role").href = "Report_Jobs.aspx";
        }
        else if ((getSession('TWE_ID')).includes("TWV")){
            document.getElementById("anch_Role").href = "SupplierDashboard.aspx";
        }
        else {
            document.getElementById("anch_Role").href = "RecruiterDashboard_Ind.aspx";
        }
    }
    else if (getSession("RegionValue") == "2001") {
        if (getSession('Designation') == "4001") {
            document.getElementById("anchDashboard").href = "RecruiterDashboardPage.aspx";
        }
        else if (getSession('Designation') == "4004" || getSession('Designation') == "4002") {
            document.getElementById("anch_Role").href = "Report_Jobs.aspx";
        }
        else if ((getSession('TWE_ID')).includes("TWV")) {
            document.getElementById("anch_Role").href = "SupplierDashboard.aspx";
        }
        else {
            document.getElementById("anch_Role").href = "RecruiterDashboard.aspx";
        }
    }
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

function ValidateEmail(input) {
    var inputText = document.getElementById(input);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        //alert("Valid email address!");
        $("#" + input).removeClass("is-invalid");
        return true;
    }
    else {
        $("#" + input).addClass("is-invalid");
        $("#" + input).focus();
        //alert("You have entered an invalid email address!");
        return false;
    }
}