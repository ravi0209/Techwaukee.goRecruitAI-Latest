var strTile = "";
$(document).ready(function () {
    setSession("Page", "ManagerJoblist");

    $('#lblEmployeename').text(getSession('Name'));
    $("#anchDashboard").removeClass("active");
    $("#anchJob").addClass("active");
    $("#anchjobList").addClass("active");
    $('#anchJob').attr('aria-expanded', 'true');
    $("#div_Jobs").addClass("show");
    $('#lblPagetitle').text("Jobs List");
    $('#lblPagetitle1').text("Jobs List");
    $('#lblPagetitle2').text("Jobs");
    $('#dropdownMenuButton').css('display', 'none');
    $('#lblDurationview').css('display', 'none');
    getEmployeeDetails();
    //localStorage.removeItem("prevvisPage");

    getJoblist("Open");

    var url = window.location.href;
    hashes = url.split("?")[1];
    if (hashes != null) {
        var hash = hashes.split('&');

        if (hash.length == 2) {
            getJoblist('Feedback', 'NA');
        }
    }

    else {
        if (localStorage.getItem("prevvisPage") != null) {
            if (localStorage.getItem("prevvisPage").includes("FollowupPage.aspx")) {
                if (getSession('Tilename') == "Feedback") {
                    getJoblist(getSession('Tilename'), "All");
                }
                else
                    getJoblist(getSession('Tilename'), "");
            }
            else {
                getJoblist("Open", "");
            }
        }

        else {
            getJoblist("Open", "");
        }
    }
    //getJobPage(getSession('TWE_ID'), getSession('Duration'));
});

function getJoblist(tileValue, filtertype) {
    if (tileValue == "Feedback") {
        $("#div_open").removeClass("card-background-mask-info");
        $("#div_feedback").removeClass("colorchange");
        $("#div_feedback").addClass("colorchange2");
        $("#div_TLsubmitted").removeClass("colorchange2");
        $("#div_nosubmission").removeClass("colorchange2");
        $("#div_interview").removeClass("colorchange2");
        $("#div_Total").removeClass("colorchange2");
        $("#div_Closure").removeClass("colorchange2");
        $("#lblClosureus").removeClass("text-white");
        $("#lblClosurevalueus").removeClass("text-white");
        $("#lblFeedbackvalueus").addClass("text-white");
        $("#lblNosubmissionvalueus").removeClass("text-white");
        $("#lblTLSubmittedvalueus").removeClass("text-white");
        $("#lblInterviewvalueus").removeClass("text-white");
        $("#lblTotaljobsus").removeClass("text-white");
        $("#lblTotaljobsvalueus").removeClass("text-white");
        $("#div_TLsubmitted").addClass("colorchange");
        $("#div_nosubmission").addClass("colorchange");
        $("#div_interview").addClass("colorchange");
        $("#div_Total").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        strTile = "Feedback";
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        //document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        document.getElementById("btnstatusfilter").style.color = "#0c0c0c";

        document.getElementById("btnopendatefilter").style.color = "#0c0c0c";
        document.getElementById("div_norecord").style.display = "none";

        document.getElementById("div_record").style.display = "block";
        document.getElementById("btnstatusfilter").style.display = "inline";

        $('#lblTableheader').text("Candidate List-Feedback");
        $('#div_duration').css('display', 'none');

        if (filtertype == "All") {
            $('input[id="serFilter1"]').prop("checked", true);
        }
        else {
            $('input[id="serFilter2"]').prop("checked", true);
        }
        setSession("Tilename", tileValue);
    }

    else if (tileValue == "TL Submitted") {
        $("#div_open").removeClass("card-background-mask-info");
        $("#div_TLsubmitted").removeClass("colorchange");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_TLsubmitted").addClass("colorchange2");
        $("#div_nosubmission").removeClass("colorchange2");
        $("#div_interview").removeClass("colorchange2");
        $("#div_Total").removeClass("colorchange2");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_Closure").removeClass("colorchange2");
        $("#lblClosureus").removeClass("text-white");
        $("#lblClosurevalueus").removeClass("text-white");
        $("#lblFeedbackvalueus").removeClass("text-white");
        $("#lblNosubmissionvalueus").removeClass("text-white");
        $("#lblTLSubmittedvalueus").addClass("text-white");
        $("#lblInterviewvalueus").removeClass("text-white");
        $("#lblTotaljobsus").removeClass("text-white");
        $("#lblTotaljobsvalueus").removeClass("text-white");
        $("#div_feedback").addClass("colorchange");
        $("#div_nosubmission").addClass("colorchange");
        $("#div_interview").addClass("colorchange");
        $("#div_Total").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        $('#div_duration').css('display', 'none');
        strTile = "";
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        //document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        document.getElementById("btnstatusfilter").style.color = "#0c0c0c";

        document.getElementById("btnopendatefilter").style.color = "#0c0c0c";

        document.getElementById("btnstatusfilter").style.display = "inline";
        $('#lblTableheader').text("Jobs List-TL Submitted");
        setSession("Tilename", tileValue);
    }

    else if (tileValue == "No Submission") {
        $("#div_open").removeClass("card-background-mask-info");
        $("#div_nosubmission").removeClass("colorchange");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_TLsubmitted").removeClass("colorchange2");
        $("#div_nosubmission").addClass("colorchange2");
        $("#div_interview").removeClass("colorchange2");
        $("#div_Total").removeClass("colorchange2");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_Closure").removeClass("colorchange2");
        $("#lblClosureus").removeClass("text-white");
        $("#lblClosurevalueus").removeClass("text-white");
        $("#lblFeedbackvalueus").removeClass("text-white");
        $("#lblNosubmissionvalueus").addClass("text-white");
        $("#lblTLSubmittedvalueus").removeClass("text-white");
        $("#lblInterviewvalueus").removeClass("text-white");
        $("#lblTotaljobsus").removeClass("text-white");
        $("#lblTotaljobsvalueus").removeClass("text-white");
        $("#div_feedback").addClass("colorchange");
        $("#div_TLsubmitted").addClass("colorchange");
        $("#div_interview").addClass("colorchange");
        $("#div_Total").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        $('#div_duration').css('display', 'none');
        strTile = "No Submission";
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        //document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        //// document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        //document.getElementById("btnstatusfilter").style.color = "#0c0c0c";

        //document.getElementById("btnopendatefilter").style.color = "#0c0c0c";

        //document.getElementById("btnstatusfilter").style.display = "inline";
        $('#lblTableheader').text("Jobs List-No Submission");
        setSession("Tilename", tileValue);
    }

    else if (tileValue == "Interview") {
        $("#div_open").removeClass("card-background-mask-info");
        $("#div_interview").removeClass("colorchange");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_TLsubmitted").removeClass("colorchange2");
        $("#div_nosubmission").removeClass("colorchange2");
        $("#div_Total").removeClass("colorchange2");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_interview").addClass("colorchange2");
        $("#div_Closure").removeClass("colorchange2");
        $("#lblClosureus").removeClass("text-white");
        $("#lblClosurevalueus").removeClass("text-white");
        $("#lblFeedbackvalueus").removeClass("text-white");
        $("#lblNosubmissionvalueus").removeClass("text-white");
        $("#lblTLSubmittedvalueus").removeClass("text-white");
        $("#lblInterviewvalueus").addClass("text-white");
        $("#lblTotaljobsus").removeClass("text-white");
        $("#lblTotaljobsvalueus").removeClass("text-white");
        $("#div_nosubmission").addClass("colorchange");
        $("#div_feedback").addClass("colorchange");
        $("#div_TLsubmitted").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        $("#div_Total").addClass("colorchange");
        $('#div_duration').css('display', 'none');
        strTile = "Interview";

        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        //document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        ////document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        //document.getElementById("btnstatusfilter").style.color = "#0c0c0c";
        //document.getElementById("btnopendatefilter").style.color = "#0c0c0c";

        //document.getElementById("btnstatusfilter").style.display = "inline";
        $('#lblTableheader').text("Jobs List-Interview");
        setSession("Tilename", tileValue);
    }

    else if (tileValue == "Overall") {
        $("#div_open").removeClass("card-background-mask-info");
        $("#div_Total").removeClass("colorchange");
        $("#div_Total").addClass("colorchange2");
        $("#lblTotaljobsus").addClass("text-white");
        $("#lblTotaljobsvalueus").addClass("text-white");
        $("#div_TotalHeader").removeClass("colorchange");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_TLsubmitted").removeClass("colorchange2");
        $("#div_nosubmission").removeClass("colorchange2");
        $("#div_interview").removeClass("colorchange2");
        $("#div_Closure").removeClass("colorchange2");
        $("#lblClosureus").removeClass("text-white");
        $("#lblClosurevalueus").removeClass("text-white");
        $("#lblFeedbackvalueus").removeClass("text-white");
        $("#lblNosubmissionvalueus").removeClass("text-white");
        $("#lblTLSubmittedvalueus").removeClass("text-white");
        $("#lblInterviewvalueus").removeClass("text-white");
        $("#div_interview").addClass("colorchange");
        $("#div_nosubmission").addClass("colorchange");
        $("#div_feedback").addClass("colorchange");
        $("#div_TLsubmitted").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        $('#div_duration').css('display', 'none');
        strTile = "";
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        //document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        ////document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        //document.getElementById("btnstatusfilter").style.color = "#0c0c0c";

        //document.getElementById("btnopendatefilter").style.color = "#0c0c0c";

        //document.getElementById("btnstatusfilter").style.display = "inline";
        strTile = "Overall";
        $('#lblTableheader').text("Jobs List-Overall Jobs");
        setSession("Tilename", tileValue);
    }

    else if (tileValue == "Closure") {
        $("#div_open").removeClass("card-background-mask-info");
        $("#div_Closure").addClass("colorchange2");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_TLsubmitted").removeClass("colorchange2");
        $("#div_nosubmission").removeClass("colorchange2");
        $("#div_Total").removeClass("colorchange2");
        $("#div_feedback").removeClass("colorchange2");
        $("#div_interview").removeClass("colorchange2");
        $("#lblClosureus").addClass("text-white");
        $("#lblClosurevalueus").addClass("text-white");
        $("#lblFeedbackvalueus").removeClass("text-white");
        $("#lblNosubmissionvalueus").removeClass("text-white");
        $("#lblTLSubmittedvalueus").removeClass("text-white");
        $("#lblInterviewvalueus").removeClass("text-white");
        $("#lblTotaljobsus").removeClass("text-white");
        $("#lblTotaljobsvalueus").removeClass("text-white");
        $("#div_interview").addClass("colorchange");
        $("#div_nosubmission").addClass("colorchange");
        $("#div_feedback").addClass("colorchange");
        $("#div_TLsubmitted").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        $("#div_Total").addClass("colorchange");
        $('#div_duration').css('display', 'none');
        strTile = "Closure";
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        //document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        ////document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        //document.getElementById("btnstatusfilter").style.color = "#0c0c0c";

        //document.getElementById("btnopendatefilter").style.color = "#0c0c0c";

        //document.getElementById("btnstatusfilter").style.display = "inline";
        $('#lblTableheader').text("Jobs List-Interview");
        setSession("Tilename", tileValue);
    }

    else if (tileValue == "Open") {
        $("#div_open").addClass("card-background-mask-info");

        $("#div_feedback").removeClass("colorchange2");
        $("#div_TLsubmitted").removeClass("colorchange2");
        $("#div_nosubmission").removeClass("colorchange2");
        $("#div_interview").removeClass("colorchange2");
        $("#div_Total").removeClass("colorchange2");
        $("#div_interview").addClass("colorchange");
        $("#div_nosubmission").addClass("colorchange");
        $("#div_feedback").addClass("colorchange");
        $("#div_TLsubmitted").addClass("colorchange");
        $("#div_Total").addClass("colorchange");
        $("#div_TotalHeader").addClass("colorchange");
        $("#div_Closure").addClass("colorchange");
        $("#div_ClosureHeader").addClass("colorchange");
        $("#div_Closure").removeClass("colorchange2");
        $("#lblClosureus").removeClass("text-white");
        $("#lblClosurevalueus").removeClass("text-white");
        $("#lblFeedbackvalueus").removeClass("text-white");
        $("#lblNosubmissionvalueus").removeClass("text-white");
        $("#lblTLSubmittedvalueus").removeClass("text-white");
        $("#lblInterviewvalueus").removeClass("text-white");
        $("#lblTotaljobsus").removeClass("text-white");
        $("#lblTotaljobsvalueus").removeClass("text-white");
        $('#div_duration').css('display', 'none');
        strTile = "Open";
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;
        tdrowval4.length = 0;
        tdrowcount.length = 0;

        //document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        ////document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        //document.getElementById("btnstatusfilter").style.color = "#0c0c0c";
        //document.getElementById("btnopendatefilter").style.color = "#0c0c0c";
        //document.getElementById("btnstatusfilter").style.display = "none";
        $('#lblTableheader').text("Jobs List-Open Jobs");
        setSession("Tilename", tileValue);
    }
    else if (tileValue == "Inactive") {
        strTile = "Inactive";
        $('#lblTableheader').text("Jobs List-Inactive Jobs");
        setSession("Tilename", tileValue);
    }

    var TWE_Id = getSession('TWE_ID');
    var strdata = { "TWE_Id": TWE_Id, "tiletype": tileValue, "filtertype": filtertype };
    if (TWE_Id != "") {
        common_api_ajax_request("api/JobTable", "MANAGERJOBLIST", strdata);
    }
    else {
        alert("fill");
    }
}

function getJobPage() {
    var TWE_Id = getSession('TWE_ID');
    var st = getSession('Duration').split("$");

    var strdata = { "TWE_Id": TWE_Id, "Startdate": st[0], "Enddate": st[1], "searchkey": $('#txtSearch').val() };
    if ($('#txtSearch').val() != "") {
        common_api_ajax_request("api/JobListIndia", "JOBSEARCHIND", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        getJoblist("Open");
        //alert("fill");
    }
}

function successCallBack(key, value) {
    var response = value.d;
    var resData = response.data;
    var listdata = resData.lstJob;
    var canddata = resData.lstCand;

    if (key == "MANAGERJOBLIST") {
        $('#lblOpenjobsus').text(resData.lsttiles[0].TileTitle);
        $('#lblOpenjobsvalueus').text(pad2(resData.lsttiles[0].TotalCount));

        $('#lblFeedbackus').text(resData.lsttiles[1].TileTitle);
        $('#lblFeedbackvalueus').text(pad2(resData.lsttiles[1].TotalCount));
        $('#lblFeedbackvalueus').text(pad2(resData.lsttiles[1].TotalCount));

        $('#lblTLSubmittedus').text(resData.lsttiles[2].TileTitle);
        $('#lblTLSubmittedvalueus').text(pad2(resData.lsttiles[2].TotalCount));

        $('#lblInterviewus').text(resData.lsttiles[3].TileTitle);
        $('#lblInterviewvalueus').text(pad2(resData.lsttiles[3].TotalCount));

        $('#lblClosureus').text(resData.lsttiles[4].TileTitle);
        $('#lblClosurevalueus').text(pad2(resData.lsttiles[4].TotalCount));

        $('#lblTotaljobsus').text(resData.lsttiles[5].TileTitle);
        $('#lblTotaljobsvalueus').text(pad2(resData.lsttiles[5].TotalCount));

        $('#lblNosubmissionus').text(resData.lsttiles[6].TileTitle);
        $('#lblNosubmissionvalueus').text(pad2(resData.lsttiles[7].TotalCount));

        $('#lblInactivejob').text(pad2(resData.lsttiles[6].TotalCount));

        if (listdata.length != 0) {
            $('#div_record').css('display', 'block');
            $('#div_norecord').css('display', 'none');
            $('#tblJoblist').css('display', 'table');
            $('#tblCandlist').css('display', 'none');
            $("#tblCandlist tbody").empty();
            createJobTable(listdata);
            getPaging(10);
        }

        else if (canddata.length != 0) {
            if (strTile == "Feedback") {
                $('#tblCandlist').css('display', 'table');
                $('#tblJoblist').css('display', 'none');
                $("#tblJoblist tbody").empty();
                createCandTable(canddata);
                getPaging(10);
            }
        }

        else {
            $('#div_record').css('display', 'none');
            $('#div_norecord').css('display', 'block');
        }

        stopLoader();
    }

    else if (key == "JOBSEARCHIND") {
        createJobTable(listdata);
        getPaging(10);
        //getPagination('#tblJoblist', 5);
        stopLoader();
        //stopLoader();
    }
    else if (key == "EMPLOYEE") {
        var option1 = new Option("--Select Employee--", "-1");
        $(option1).html("--Select Employee--");
        $("#drpEmployee").append(option1);

        for (var i = 0; i < resData.lstEmployee.length; i++) {
            var option = new Option(resData.lstEmployee[i].Name, resData.lstEmployee[i].ID);

            $(option).html(resData.lstEmployee[i].Name);
            $("#drpEmployee").append(option);
        }

        stopLoader();
    }
}

$('#maxRows').on('change', function () {
    getPaging($(this).val());
    //getPagination('#tblJoblist', $(this).val());
    //getPagination('#tblJoblist', $(this).val());
});

function createJobTable(data) {
    $("#tblJoblist tbody").empty();
    $("#tblJoblist thead").empty();

    createheadertable();
    var strTable = "";

    //if (getSession('JobCreation') == "1") {
    //    document.getElementById("btnNewJob").style.display = "";
    //}
    //else {
    //    document.getElementById("btnNewJob").style.display = "none";
    //}
    var str = "<input type ='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style ='margin:0px 6px;' placeholder = 'Search..' id = 'myInputjobs' onkeyup=filterFunction('myInputjobs','ul_job'); />";
    var str1 = "";
    var str2 = "";
    var str3 = "";
    var str4 = "";
    var arry = new Array;
    var arry1 = new Array;
    var arry2 = new Array;
    var arry3 = new Array;
    var i = 1;

    if (strTile == "Open" || strTile == "Inactive" || strTile == "Overall" || strTile == "Interview" || strTile == "No Submission") {
        //document.getElementById("th_priority").innerHTML = "Priority" +
        //    "<button id='btnpriorityfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none !important; box-shadow: none !important; color: #0c0c0c; font-size: 12px;'>" +
        //    "<i class='fas fa-filter' style='margin:4px;'></i>" +
        //    "</button>" +
        //    "<ul class='dropdown-menu text-xxs' aria-labelledby='dropdownMenuButton' id='ul_jobpriority' style='box-shadow:3px 8px 19px 0px;width: 200px;' >" +

        //    "</ul>";
        $('#btnpriorityfilter').css('display', 'inline');
        $('#th_priority').css('display', 'block');
        $('#th_priority').removeClass("text-center");

        $.each(data, function (key, item) {
            var assigneduser = item.Assigned_To.includes(getSession('TWE_ID'));

            if (item.Jobcode == "") {
            } else {
                var obj = {};
                var obj1 = {};
                var obj2 = {};
                var obj3 = {};

                obj.clientname = item.JobPriority;
                arry.push(obj);

                obj1.clientname = item.CreatedOn;
                arry1.push(obj1);

                obj2.clientname = item.JobClient;
                arry2.push(obj2);

                var regex = /\s/g;
                var replace = "%20";
                var strjob = item.JobTitle;
                var strjobname = strjob.replace(regex, replace);

                str += "<li onclick=searchJob('" + strjobname + "','0')><a class='dropdown-item' href='javascript:;'>" + item.JobTitle + " </a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('0') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";

                if (item.JobDuration == "") {
                    strstatename = "";
                }
                else {
                    strstatename = "<label class='text-secondary text-xs font-weight-bold mb-0 ms-1 me-1'>|</label>";
                }

                strTable += "<tr class='divControl' id='divControl_" + i + "' style='cursor:pointer;border-bottom: 1px solid #e9ecef !important;'><td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex px-2 py-1 ps-2'>" +
                    /*"<div><img src='" + item.JobMediaPath + "' class='avatar avatar-sm me-3'></div>" +*/

                    "<div class='d-flex flex-column justify-content-center'>" +

                    "<h6 class='mb-0 text-xs'><a class='color-change' href='FollowupPage.aspx?id=" + item.Jobcode + "' >" + item.JobTitle + "</a></h6>" +
                    "<label class='m-0 mt-1'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0' id='lblJobmonth'>" + item.JobDuration + "</label>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-1' id='lblJobmonthDuration' > " + item.JobDurationtype + "</label >" +
                    strstatename +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0' id = 'lblJobcontract' > " + item.JobType + "</label> " +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-1 me-1'>|</label>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0' id='lblJobcity'>" + item.JobState + "</label></label> " +
                    "</div></div></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');> <div class='col-md-12'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0'>" + item.JobCountry + "</label>" +
                    "</div></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');> <div class='col-md-12'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0'>" + item.JobRate + "</label>" +
                    "</div></td>";

                if (strTile == "Open" || strTile == "Interview" || strTile == "No Submission") {
                    var strPricand = "";
                    for (var a = 0; a < item.lstPriSkill.length; a++) {
                        strPricand += item.lstPriSkill[a].JobSkillName + "-" + item.lstPriSkill[a].JobYrsofExp + "\n";
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstSecSkill.length; b++) {
                        strSeccand += item.lstSecSkill[b].JobSkillName + "-" + item.lstSecSkill[b].JobYrsofExp + "\n";
                    }

                    strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');>" +
                        "<div class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-green' style = 'border-color: #00a10d !important;' aria-hidden='true' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "'>" +
                        "<i class='fas fa-check'></i>" +
                        " </div></td>";
                }

                if (strTile == "Overall") {
                    //$('#th_03').text('Skill');
                    //$('#th_04').text('Priority');
                    //$('#th_05').text('Open Date');
                    //$('#th_06').text('Client');
                    //$('#th_07').text('Submissions');

                    //$('#th_09').css("display", "block");

                    //if (strTile == "Overall") {
                    //    $('#th_08').text('Remarks');
                    //    $('#th_09').text('Status');
                    //}
                    //else {
                    //    $('#th_08').text('Status');
                    //    $('#th_09').text('Remarks');
                    //}
                }
                else if (strTile == "No Submission") {
                    //$('#th_03').text('Rate');
                    //$('#th_04').text('Skill');
                    //$('#th_05').text('Priority');
                    //$('#th_06').text('Open Date');
                    //$('#th_07').text('Client');
                    //$('#th_08').css("display", "none");
                    //$('#th_09').css("display", "none");
                }
                else if (strTile == "Open") {
                    //$('#th_03').text('Rate');
                    //$('#th_04').text('Skill');
                    ////$('#th_05').text('Priority');

                    //document.getElementById("th_05").innerHTML = "Priority" + "<button id='btnpriorityfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
                    //    "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
                    //    "</button>" +
                    //    "<ul class='dropdown-menu text-xxs' aria-labelledby='dropdownMenuButton' id='ul_jobpriority' style='box-shadow: 3px 8px 19px 0px; width: 200px;'>" +
                    //    "</ul>";
                    ////$('#th_06').text('Open Date');

                    //document.getElementById("th_06").innerHTML = "Open Date" + "<button id='btnopendatefilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none !important; box-shadow: none !important; color: #0c0c0c; font-size: 12px;'>" +
                    //    "<i class='fas fa-filter' style='margin: 4px;'></i>" +
                    //    "</button>" +
                    //    "<ul class='dropdown-menu text-xxs' aria-labelledby='dropdownMenuButton' id='ul_jobopendate' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
                    //    "</ul>";
                    ///*$('#th_07').text('Client');*/

                    //document.getElementById("th_07").innerHTML = "Client" + "<button id='btnclientfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none !important; box-shadow: none !important; color: #0c0c0c; font-size: 12px;'>" +
                    //    "<i class='fas fa-filter' style='margin: 4px;'></i>" +
                    //    "</button>" +
                    //    "<ul class='dropdown-menu text-xxs' aria-labelledby='dropdownMenuButton' id='ul_jobClient' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
                    //    "</ul>";
                    //$('#th_08').text('Submissions');
                    //$('#th_09').css("display", "none");
                }
                else if (strTile == "Interview") {
                    //$('#th_03').text('Rate');
                    //$('#th_04').text('Skill');
                    //$('#th_05').text('Boarded Date');
                    //$('#th_06').text('Priority');
                    //$('#th_07').text('Open Date');
                    //$('#th_08').text('Client');
                    //$('#th_09').text('Interview');
                }
                else if (strTile == "Closure") {
                    //$('#th_03').text('Rate');
                    //$('#th_04').text('Open Date');
                    //$('#th_05').text('Boarded Date');
                    //$('#th_06').text('Client');
                    //$('#th_07').text('Closure');
                    //$('#th_08').text('On Boarded');

                    $('#th_08').css("display", "block");
                }
                else if (strTile == "Inactive") {
                    //$('#th_03').text('Rate');
                    //$('#th_04').text('Priority');
                    //$('#th_05').text('Open Date');
                    //$('#th_06').text('Client');
                    //$('#th_07').text('Submissions');
                    //$('#th_08').text('Status');
                    //$('#th_09').text('Remarks');
                }

                else {
                    $('#th_09').css("display", "none");
                }

                if (item.JobPriority == "High") {
                    strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                        "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-red'>" + item.JobPriority + "</label>" +
                        //"<button type='button' class='btn btn-primary' style='padding: 8px;width: 46px;background-color:#fe6901;color: black;'>" +
                        //"<span>" + item.JobPriority + "</span>" +
                        //"<span class='badge badge-md badge-circle border-white text-white' style='top: 16px;left:-11px;background-color: #a9e7ff;color: black !important ;'>" + item.NoofSubmission + "</span>" +
                        //"</button>" +
                        "</div></td>";
                }
                else if (item.JobPriority == "Medium") {
                    strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                        "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-blue'>" + item.JobPriority + "</label>" +
                        //"<button type='button' class='btn btn-primary' style='padding: 8px;width: 65px;background-color:#ffcc00;color: black;'>" +
                        //"<span>" + item.JobPriority + "</span>" +
                        //"<span class='badge badge-md badge-circle border-white text-white' style='top: 16px;left:-11px;background-color: #a9e7ff;color: black !important ;'>" + item.NoofSubmission + "</span>" +
                        //"</button>" +
                        "</div></td>";
                }
                else if (item.JobPriority == "Low") {
                    strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                        "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-black'>" + item.JobPriority + "</label>" +
                        //"<button type='button' class='btn btn-primary' style='padding: 8px;width: 46px;background-color:#fdff93;color: black;'>" +
                        //"<span>" + item.JobPriority + "</span>" +
                        //"<span class='badge badge-md badge-circle border-white text-white' style='top: 16px;left:-11px;background-color: #a9e7ff;color: black !important ;'>" + item.NoofSubmission + "</span>" +
                        //"</button>" +
                        "</div></td>";
                }

                strTable += "<td class='align-middle' onclick=gotojobpage('" + item.Jobcode + "');><label class='text-secondary text-xs font-weight-bold mb-0 ms-0 ps-0' id='lblJobopendate'>" + item.CreatedOn + "</label></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0'>" + item.JobClient + "</label >" +
                    "</div></td>";
                if (strTile == "Open" || strTile == "Inactive" || strTile == "Overall") {
                    var strSubcount = "Submission" + "\n\n";

                    strSubcount += "Team Lead" + "\t" + item.NoofTLSubmission + "\n";
                    strSubcount += "B Partner" + "\t" + item.NoofBPSubmission + "\n";
                    strSubcount += "End Client" + "\t" + item.NoofECSubmission + "\n\n";
                    strSubcount += "Applied" + "\t" + item.NoofApplied + "\n";

                    strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                        "<div style='border-color: #146eff !important;' class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' aria-hidden='true' title='" + strSubcount + "'>" +
                        "<i class='fas fa-user text-color-blue'></i>" +
                        "</div>" +
                        "<span class=''>" + item.NoofSubmission + "</span>" +
                        "</td > ";
                }

                else if (strTile == "Interview") {
                    var strSubcount = "Interview" + "\n\n";

                    strSubcount += "B Partner" + "\t" + item.NoofTLSubmission + "\n";
                    strSubcount += "End Client" + "\t" + item.NoofBPSubmission + "\n";

                    strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                        "<div style='border-color: #146eff   !important;' class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center'  aria-hidden='true' title='" + strSubcount + "'>" +
                        "<i class='fas fa-user text-color-blue'></i>" +
                        "</div>" +
                        "<span class=''>" + item.NoofSubmission + "</span>" +
                        "</td > ";
                }

                if (strTile == "Inactive" || strTile == "Overall") {
                    if (strTile == "Inactive") {
                        if (item.JobStatus == "10201") {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                                "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-red'>Close</label>" +
                                "</div></td>";
                        }
                        else if (item.JobStatus == "10202") {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                                "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-grey'>Hold</label>" +
                                "</div></td>";
                        }

                        if (item.Remarks_Givenby == null && item.Remarks == null) {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                                " <div class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-green' style='border-color: #00a10d !important;'>" +
                                " <i class='fas fa-solid fa-star' aria-hidden='true'></i>" +
                                "</div>" +
                                "<span class=''></span>" +
                                "</td > ";
                        }
                        else {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                                " <div class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-green' style='border-color: #00a10d !important;'>" +
                                " <i class='fas fa-solid fa-star' aria-hidden='true' title='" + item.Remarks + "'></i>" +
                                "</div>" +
                                "<span class=''>" + item.Remarks_Givenby + "</span>" +
                                "</td > ";
                        }
                    }
                    else if (strTile == "Overall") {
                        if (item.Remarks_Givenby == null && item.Remarks == null) {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                                " <div class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-green' style='border-color: #00a10d !important;'>" +
                                " <i class='fas fa-solid fa-star' aria-hidden='true'></i>" +
                                "</div>" +
                                "<span class=''></span>" +
                                "</td > ";
                        }
                        else {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                                " <div class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-green' style='border-color: #00a10d !important;'>" +
                                " <i class='fas fa-solid fa-star' aria-hidden='true'></i>" +
                                "</div>" +
                                "<span class='' title='" + item.Remarks + "'>" + item.Remarks_Givenby + "</span>" +
                                "</td > ";
                        }
                        if (item.JobStatus == "10200") {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                                "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-green'>Active</label>" +
                                "</div></td>";
                        }
                        else if (item.JobStatus == "10201" || item.JobStatus == "10202") {
                            strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                                "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0 text-color-red'>Inactive</label>" +
                                "</div></td>";
                        }
                    }
                }

                if (strTile == "Open") {
                    var strAction1 = "<td class='align-middle'><div class='text-left'>" +
                        "<div class='dropdown pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='ni ni-bold-down text-secondary'></i> </a>" +
                        /*<i class="ni ni-bold-down"></i>*/
                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                    var strAction3 = "</ul></div></div></td></tr>";

                    var strAction21 = "";

                    var strAction22 = "";

                    var strAction23 = "";

                    var strAction24 = "";

                    if (getSession('JobView') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        // }
                    }
                    else if (getSession('JobView') == "1") {
                        if (assigneduser == true) {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        }
                    }

                    if (getSession('JobEdit') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        //}
                    }

                    else if (getSession('JobEdit') == "1") {
                        if (assigneduser == true) {
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }
                    }

                    strAction23 = " <li><a class='dropdown-item border-radius-md' id='CopyJD' style='cursor:not-allowed;'>Copy JD</a></li>" +
                        "<li><hr class='dropdown-divider'></li>";

                    strAction24 = "<li><a class='dropdown-item border-radius-md text-color-red' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='CloseJob'>Close Job</a></li>";
                }

                else if (strTile == "No Submission") {
                    var strAction1 = "<td class='align-middle'><div class='text-left'>" +
                        "<div class='dropdown pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='ni ni-bold-down text-secondary'></i> </a>" +
                        /*<i class="ni ni-bold-down"></i>*/
                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                    var strAction3 = "</ul></div></div></td></tr>";

                    var strAction21 = "";

                    var strAction22 = "";

                    var strAction23 = "";

                    var strAction24 = "";

                    if (getSession('JobView') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        // }
                    }
                    else if (getSession('JobView') == "1") {
                        if (assigneduser == true) {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        }
                    }

                    if (getSession('JobEdit') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        //}
                    }

                    else if (getSession('JobEdit') == "1") {
                        if (assigneduser == true) {
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }
                    }

                    strAction23 = " <li><a class='dropdown-item border-radius-md' id='CopyJD' style='cursor:not-allowed;'>Copy JD</a></li>" +
                        "<li><hr class='dropdown-divider'></li>";

                    strAction24 = "<li><a class='dropdown-item border-radius-md text-color-red' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='CloseJob'>Close Job</a></li>";
                }

                else if (strTile == "Interview") {
                    var strAction1 = "<td class='align-middle'><div class='text-left'>" +
                        "<div class='dropdown pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='ni ni-bold-down text-secondary'></i> </a>" +
                        /*<i class="ni ni-bold-down"></i>*/
                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                    var strAction3 = "</ul></div></div></td></tr>";

                    var strAction21 = "";

                    var strAction22 = "";

                    var strAction23 = "";

                    var strAction24 = "";

                    if (getSession('JobView') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        // }
                    }
                    else if (getSession('JobView') == "1") {
                        if (assigneduser == true) {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        }
                    }

                    if (getSession('JobEdit') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        //}
                    }

                    else if (getSession('JobEdit') == "1") {
                        if (assigneduser == true) {
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }
                    }

                    strAction23 = " <li><a class='dropdown-item border-radius-md' id='SendReminder' style='cursor: not-allowed;'>Send Reminder</a></li>" +
                        "<li><hr class='dropdown-divider'></li>";

                    strAction24 = "<li><a class='dropdown-item border-radius-md text-color-red' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='CloseJob'>Close Job</a></li>";
                }

                else if (strTile == "Inactive" || strTile == "Overall") {
                    var strAction1 = "<td class='align-middle'><div class='text-left'>" +
                        "<div class='dropdown pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='ni ni-bold-down text-secondary'></i> </a>" +
                        /*<i class="ni ni-bold-down"></i>*/
                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                    var strAction3 = "</ul></div></div></td></tr>";

                    var strAction21 = "";

                    var strAction22 = "";

                    var strAction23 = "";

                    var strAction24 = "";

                    if (getSession('JobView') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        // }
                    }
                    else if (getSession('JobView') == "1") {
                        if (assigneduser == true) {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        }
                    }

                    if (getSession('JobEdit') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        //}
                    }

                    else if (getSession('JobEdit') == "1") {
                        if (assigneduser == true) {
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }
                    }

                    strAction23 = " <li><a class='dropdown-item border-radius-md' id='CopyJD' style='cursor:not-allowed;'>Copy JD</a></li>" +
                        "<li><hr class='dropdown-divider'></li>";

                    strAction24 = "<li><a class='dropdown-item border-radius-md text-color-red' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='ReopenJob'>Reopen Job</a></li>";
                }

                if (strTile == "Feedback") {
                    if (getSession('JobFeedback') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        if (strTile == "Feedback") {
                            strAction21 = "";
                            strAction22 = "";

                            if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val() != "-1") {
                                strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val() + "' id='Feedback'>Feedback</a></li>";
                            }
                            else {
                                strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>";
                            }
                        }
                        else {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }

                        //}
                    }

                    else if (getSession('JobFeedback') == "1") {
                        if (assigneduser == true) {
                            if (strTile == "Feedback") {
                                strAction21 = "";
                                strAction22 = "";

                                if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val() != "-1") {
                                    strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val() + "' id='Feedback'>Feedback</a></li>";
                                }
                                else {
                                    strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>";
                                }
                            }
                        }
                        else {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }
                    }
                }

                strTable += strAction1 + strAction21 + strAction22 + strAction23 + strAction24 + strAction3;

                //if (strTile == "Feedback") {
                //    strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //        "<div class='dropdown float-lg-end pe-1'>" +
                //        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //        "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //        //"<li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //        //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //        " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>" +
                //        "</ul></div></div></td></tr>";

                //}
                //else {
                //    if (getSession('Designation') == "4001") {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }

                //    else {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }
                //}
            }
            i++;
        });
        $("#ul_job").empty();
        $("#ul_job").append(str);

        var taskAssArr = new Array;

        taskAssArr = arry;
        taskAssArr = removeDuplicates(taskAssArr);
        str1 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' onkeyup=filterFunction('myInputClient','ul_jobClient'); id='myInputClient'  />"
        for (var i = 0; i < taskAssArr.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr[i].clientname;
            var strClient = str.replace(regex, replace);
            str1 += " <li onclick=searchJob('" + strClient + "','4')><a class='dropdown-item' href='javascript:;'>" + taskAssArr[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('4') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }

        $("#ul_jobpriority").empty();
        $("#ul_jobpriority").append(str1);

        var taskAssArr1 = new Array;

        taskAssArr1 = arry1;
        taskAssArr1 = removeDuplicates(taskAssArr1);
        //if (taskAssArr1.length == "3") {
        str2 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputpriority' onkeyup=filterFunction('myInputpriority','ul_jobpriority'); />"
        for (var i = 0; i < taskAssArr1.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr1[i].clientname;
            var strpriority = str.replace(regex, replace);
            str2 += " <li onclick=searchJob('" + strpriority + "','5')><a class='dropdown-item' href='javascript:;'>" + taskAssArr1[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('5') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }

        $("#ul_jobopendate").empty();
        $("#ul_jobopendate").append(str2);
        //}

        var taskAssArr2 = new Array;

        taskAssArr2 = arry2;
        taskAssArr2 = removeDuplicates(taskAssArr2);
        str3 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputjobstatus'  onkeyup=filterFunction('myInputjobstatus','ul_jobstatus'); />"
        for (var i = 0; i < taskAssArr2.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr2[i].clientname;
            var strpjobstatus = str.replace(regex, replace);

            str3 += " <li onclick=searchJob('" + strpjobstatus + "','6')><a class='dropdown-item' href='javascript:;'>" + taskAssArr2[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('6') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#ul_jobClient").empty();
        $("#ul_jobClient").append(str3);
    }

    else if (strTile == "Feedback") {
        $('#th_priority').css('display', 'block');

        $.each(data, function (key, item) {
            var assigneduser = item.Assigned_To.includes(getSession('TWE_ID'));

            if (item.Jobcode == "") {
            } else {
                var obj = {};
                var obj1 = {};
                var obj2 = {};
                var obj3 = {};

                obj.clientname = item.JobClient;
                arry.push(obj);

                obj1.clientname = item.JobPriority;
                arry1.push(obj1);

                obj2.clientname = item.JobStatus;
                arry2.push(obj2);

                obj3.clientname = item.CreatedOn;
                arry3.push(obj3);

                var regex = /\s/g;
                var replace = "%20";
                var strjob = item.JobTitle;
                var strjobname = strjob.replace(regex, replace);

                str += "<li onclick=searchJob('" + strjobname + "','0')><a class='dropdown-item' href='javascript:;'>" + item.JobTitle + " </a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('0') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
                //str1 += " <li onclick=searchJob('" + item.Jobcode + "')><a class='dropdown-item' href='javascript:;'>" + item.JobClient + "</a></li>";
                //str2 += " <li onclick=searchJob('" + item.Jobcode + "')><a class='dropdown-item' href='javascript:;'>" + item.JobPriority + "</a></li>";
                //str3 += " <li onclick=searchJob('" + item.Jobcode + "')><a class='dropdown-item' href='javascript:;'>" + item.JobStatus + "</a></li>";
                //str4 += " <li onclick=searchJob('" + item.Jobcode + "')><a class='dropdown-item' href='javascript:;'>" + item.CreatedOn + "</a></li>";

                strTable += "<tr style='cursor:pointer;border-bottom: 1px solid #e9ecef !important;' class='divControl' id='divControl_" + i + "' >" +

                    "<td onclick = gotojobpage('" + item.Jobcode + "');> <div class='d-flex px-2 py-1'>" +
                    "<div><img src='" + item.JobMediaPath + "' class='avatar avatar-sm me-3'></div>" +

                    "<div class='d-flex flex-column justify-content-center'>" +

                    "<label class='mb-0 text-sm h6' id='lblJobname'>" + item.JobTitle + "</label>" +
                    "<label class='m-0'>" +
                    "<label class='text-secondary' id='lblJobmonth'>" + item.JobDuration + "</label><label class='text-secondary' id='lblJobmonthDuration'>" + item.JobDurationtype + "</label>|<label class='text-secondary' id='lblJobcontract'>" + item.JobType + "</label>|<label class='text-secondary' id='lblJobcity'>" + item.JobState + "</label></label>" +
                    "</div></div></td>";

                strTable +=
                    "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                    "<label class='text-xs font-weight-bold mb-0 ps-0'>" + item.JobClient + "</label > <br />" +
                    "</div ><div class='col-md-12' style='margin-top: -10px;'>" +
                    "<label class='text-xs text-secondary mb-0 ps-0'>" + item.JobContact + "</label>" +
                    "</div></td>";

                document.getElementById("th_priority").innerHTML = "Submissions" +

                    "<button id='btnpriorityfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none !important; box-shadow: none !important; color: #0c0c0c; font-size: 12px;diplay:none !important;'>" +
                    "<i class='fas fa-filter hidden' style='margin:4px;s'></i>" +
                    "</button>" +
                    "<ul class='dropdown-menu text-xxs' aria-labelledby='dropdownMenuButton' id='ul_jobpriority' style='box-shadow:3px 8px 19px 0px;width: 200px;' >" +

                    "</ul>";

                $('#th_priority').addClass("text-center");
                strTable += "<td class='text-center' onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                    "<span class='badge badge-md badge-circle border-white text-white' style='top: 16px;left:-11px;background-color: #3d74fc;'>" + item.NoofSubmission + "</span>" +
                    "</div></td>";

                if (item.JobStatus == "Open") {
                    strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.Jobcode + "');>" +
                        "<span class='badge badge-sm bg-gradient-success'>" + item.JobStatus + "</span></td>";
                }

                else if (item.JobStatus == "Close") {
                    strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.Jobcode + "');>" +
                        "<span class='badge badge-sm bg-gradient-danger'>" + item.JobStatus + "</span></td>";
                }

                else if (item.JobStatus == "Hold") {
                    strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.Jobcode + "');>" +
                        "<span class='badge badge-sm bg-gradient-secondary'>" + item.JobStatus + "</span></td>";
                }

                strTable += "<td class='align-middle text-center' onclick=gotojobpage('" + item.Jobcode + "');><label class='text-secondary text-xs font-weight-bold mb-0 ps-0' id='lblJobopendate'>" + item.CreatedOn + "</label></td>";

                var strAction1 = "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                    "<div class='dropdown float-lg-end pe-1'>" +
                    "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                    "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                    "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                var strAction3 = "</ul></div></div></td></tr>";

                var strAction21 = "";

                var strAction22 = "";

                var strAction23 = "";

                //alert(getSession('JobView'));
                //alert(getSession('JobEdit'));

                if (getSession('JobView') == "2") {
                    //if (assigneduser == true) {
                    //}
                    //else {
                    strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                    // }
                }
                else if (getSession('JobView') == "1") {
                    if (assigneduser == true) {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                    }
                }

                if (getSession('JobEdit') == "2") {
                    //if (assigneduser == true) {
                    //}
                    //else {
                    strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                    //}
                }

                else if (getSession('JobEdit') == "1") {
                    if (assigneduser == true) {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                    }
                }

                if (getSession('JobFeedback') == "2") {
                    //if (assigneduser == true) {
                    //}
                    //else {
                    if (strTile == "Feedback") {
                        strAction21 = "";
                        strAction22 = "";

                        if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val() != "-1") {
                            strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val() + "' id='Feedback'>Feedback</a></li>";
                        }
                        else {
                            strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>";
                        }
                    }

                    else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                    }

                    //}
                }

                else if (getSession('JobFeedback') == "1") {
                    if (assigneduser == true) {
                        if (strTile == "Feedback") {
                            strAction21 = "";
                            strAction22 = "";
                            if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val() != "-1") {
                                strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val() + "' id='Feedback'>Feedback</a></li>";
                            }
                            else {
                                strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>";
                            }
                        }
                    }
                    else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                    }
                }

                strTable += strAction1 + strAction21 + strAction22 + strAction23 + strAction3;

                //if (strTile == "Feedback") {
                //    if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val()!="-1") {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            //"<li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            " <li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val()+"' id='Feedback'>Feedback</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }

                //    else {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            //"<li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            " <li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }

                //}
                //else {
                //    if (getSession('Designation') == "4001") {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            "<li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }

                //    else {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            "<li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            " <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }
                //}
            }
            i++;
        });

        $("#ul_job").empty();
        $("#ul_job").append(str);

        var taskAssArr = new Array;

        taskAssArr = arry;
        taskAssArr = removeDuplicates(taskAssArr);
        str1 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' onkeyup=filterFunction('myInputClient','ul_jobClient'); id='myInputClient'  />"
        for (var i = 0; i < taskAssArr.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr[i].clientname;
            var strClient = str.replace(regex, replace);
            str1 += " <li onclick=searchJob('" + strClient + "','1')><a class='dropdown-item' href='javascript:;'>" + taskAssArr[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('1') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#ul_jobClient").empty();
        $("#ul_jobClient").append(str1);

        var taskAssArr1 = new Array;

        taskAssArr1 = arry1;
        taskAssArr1 = removeDuplicates(taskAssArr1);
        if (taskAssArr1.length == "3") {
            str2 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputpriority' onkeyup=filterFunction('myInputpriority','ul_jobpriority'); />"
            for (var i = 0; i < taskAssArr1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = taskAssArr1[i].clientname;
                var strpriority = str.replace(regex, replace);
                str2 += " <li onclick=searchJob('" + strpriority + "','2')><a class='dropdown-item' href='javascript:;'>" + taskAssArr1[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('2') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#ul_jobpriority").empty();
            $("#ul_jobpriority").append(str2);
        }

        var taskAssArr2 = new Array;

        taskAssArr2 = arry2;
        taskAssArr2 = removeDuplicates(taskAssArr2);
        str3 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputjobstatus'  onkeyup=filterFunction('myInputjobstatus','ul_jobstatus'); />"
        for (var i = 0; i < taskAssArr2.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr2[i].clientname;
            var strpjobstatus = str.replace(regex, replace);

            str3 += " <li onclick=searchJob('" + strpjobstatus + "','3')><a class='dropdown-item' href='javascript:;'>" + taskAssArr2[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('3') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#ul_jobstatus").empty();
        $("#ul_jobstatus").append(str3);

        taskAssArr3 = arry3;
        taskAssArr3 = removeDuplicates(taskAssArr3);

        str4 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputjobopendate' onkeyup=filterFunction('myInputjobopendate','ul_jobopendate');  />"
        for (var i = 0; i < taskAssArr3.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr3[i].clientname;
            var strjobdate = str.replace(regex, replace);

            str4 += " <li onclick=searchJob('" + strjobdate + "','4')><a class='dropdown-item' href='javascript:;'>" + taskAssArr3[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('4') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#ul_jobopendate").empty();
        $("#ul_jobopendate").append(str4);
    }

    else if (strTile == "Closure") {
        $('#th_priority').css('display', 'none');
        $('#th_priority').addClass("text-center");
        document.getElementById("th_priority").innerText = "Priority";

        $.each(data, function (key, item) {
            var assigneduser = item.Assigned_To.includes(getSession('TWE_ID'));

            if (item.Jobcode == "") {
            } else {
                var obj = {};
                var obj1 = {};
                var obj2 = {};
                var obj3 = {};

                obj.clientname = item.JobClient;
                arry.push(obj);

                obj1.clientname = item.JobPriority;
                arry1.push(obj1);

                obj2.clientname = item.JobStatus;
                arry2.push(obj2);

                obj3.clientname = item.CreatedOn;
                arry3.push(obj3);

                var regex = /\s/g;
                var replace = "%20";
                var strjob = item.JobTitle;
                var strjobname = strjob.replace(regex, replace);

                str += "<li onclick=searchJob('" + strjobname + "','0')><a class='dropdown-item' href='javascript:;'>" + item.JobTitle + " </a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('0') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";

                if (item.JobDuration == "") {
                    strstatename = "";
                }
                else {
                    strstatename = "<label class='text-secondary text-xs font-weight-bold mb-0 ms-1 me-1'>|</label>";
                }

                strTable += "<tr class='divControl' id='divControl_" + i + "' style='cursor:pointer;border-bottom: 1px solid #e9ecef !important;'><td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex px-2 py-1 ps-2'>" +
                    /*"<div><img src='" + item.JobMediaPath + "' class='avatar avatar-sm me-3'></div>" +*/

                    "<div class='d-flex flex-column justify-content-center'>" +

                    "<label class='mb-0 text-xs' id='lblJobname'>" + item.JobTitle + "</label>" +
                    "<label class='m-0 mt-1'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0' id='lblJobmonth'>" + item.JobDuration + "</label>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-1' id='lblJobmonthDuration' > " + item.JobDurationtype + "</label >" +
                    strstatename +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0' id = 'lblJobcontract' > " + item.JobType + "</label> " +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-1 me-1'>|</label>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0' id='lblJobcity'>" + item.JobState + "</label></label> " +
                    "</div></div></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');> <div class='col-md-12'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0'>" + item.JobCountry + "</label>" +
                    "</div></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');> <div class='col-md-12'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0'>" + item.JobRate + "</label>" +
                    "</div></td>";

                $('#th_04').text('Open Date');
                $('#th_05').text('Boarded Date');
                $('#th_06').text('Client');
                $('#th_07').text('Closure');
                $('#th_08').text('Onboarded');

                //if (strTile == "Inactive" || strTile == "Overall") {
                //    $('#th_04').text('Priority');
                //    $('#th_05').text('Open Date');
                //    $('#th_06').text('Client');
                //    $('#th_07').text('Submissions');

                //    $('#th_09').css("display", "block");

                //    if (strTile == "Overall") {
                //        $('#th_08').text('Remarks');
                //        $('#th_09').text('Status');
                //    }
                //    else {
                //        $('#th_08').text('Status');
                //        $('#th_09').text('Remarks');
                //    }
                //}
                //else if (strTile == "No Submission") {
                //    $('#th_08').text('');
                //}
                //else {
                //    $('#th_09').css("display", "none");
                //}

                strTable += "<td class='align-middle' onclick=gotojobpage('" + item.Jobcode + "');><label class='text-secondary text-xs font-weight-bold mb-0 ms-0 ps-0' id='lblJobopendate'>" + item.CreatedOn + "</label></td>";

                if (item.onboardedStartdate != null) {
                    strTable += "<td class='align-middle' onclick=gotojobpage('" + item.Jobcode + "');><label class='text-secondary text-xs font-weight-bold mb-0 ms-0 ps-0' id='lblJobonboarddate'>" + item.onboardedStartdate + "</label></td>";
                }
                else {
                    strTable += "<td class='align-middle' onclick=gotojobpage('" + item.Jobcode + "');><label class='text-secondary text-xs font-weight-bold mb-0 ms-0 ps-0' id='lblJobonboarddate'></label></td>";
                }

                //strTable += "<td class='align-middle' onclick=gotojobpage('" + item.Jobcode + "');><label class='text-secondary text-xs font-weight-bold mb-0 ms-0 ps-0' id='lblJobonboarddate'>" + item.onboardedStartdate + "</label></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='col-md- 12'>" +
                    "<label class='text-secondary text-xs font-weight-bold mb-0 ms-0'>" + item.JobClient + "</label >" +
                    "</div></td>";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                    " <div style='border-color: #146eff !important;' class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-blue'>" +
                    "<i class='fas fa-user' aria-hidden='true'></i>" +
                    "</div>" +
                    "<span class=''>" + item.NoofBPSubmission + "</span>" +
                    "</td > ";

                strTable += "<td onclick=gotojobpage('" + item.Jobcode + "');><div class='d-flex align-items-center'>" +
                    " <div style='border-color: #00a10d !important;' class='btn btn-icon-only btn-rounded btn-outline-info mb-0 me-2 btn-sm d-flex align-items-center justify-content-center text-color-green' style='border-color: #00a10d !important;'>" +
                    "<i class='fas fa-user' aria-hidden='true'></i>" +
                    "</div>" +
                    "<span class=''>" + item.NoofTLSubmission + "</span>" +
                    "</td > ";

                var strAction1 = "<td class='align-middle'><div class='text-left'>" +
                    "<div class='dropdown pe-1'>" +
                    "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                    "<i class='ni ni-bold-down text-secondary'></i> </a>" +
                    /*<i class="ni ni-bold-down"></i>*/
                    "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                var strAction3 = "</ul></div></div></td></tr>";

                var strAction21 = "";

                var strAction22 = "";

                var strAction23 = "";

                if (getSession('JobView') == "2") {
                    //if (assigneduser == true) {
                    //}
                    //else {
                    strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                    // }
                }
                else if (getSession('JobView') == "1") {
                    if (assigneduser == true) {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                    }
                }

                if (getSession('JobEdit') == "2") {
                    //if (assigneduser == true) {
                    //}
                    //else {
                    strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                    //}
                }

                else if (getSession('JobEdit') == "1") {
                    if (assigneduser == true) {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                    }
                }

                if (getSession('CopyJD') == "2") {
                    //if (assigneduser == true) {
                    //}
                    //else {
                    strAction22 = " <li><a class='dropdown-item border-radius-md' style='cursor:not-allowed;' id='Edit'>Copy JD</a></li>" +
                        "<li><hr class='dropdown-divider'></li>";
                    //}
                }

                else if (getSession('CopyJD') == "1") {
                    if (assigneduser == true) {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' style='cursor:not-allowed;' id='Edit'>Copy JD</a></li>";
                    }
                }

                else if (strTile == "Closure") {
                    var strAction1 = "<td class='align-middle'><div class='text-left'>" +
                        "<div class='dropdown pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='ni ni-bold-down text-secondary'></i> </a>" +
                        /*<i class="ni ni-bold-down"></i>*/
                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>";

                    var strAction3 = "</ul></div></div></td></tr>";

                    var strAction21 = "";

                    var strAction22 = "";

                    var strAction23 = "";

                    /*var strAction24 = "";*/

                    if (getSession('JobView') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        // }
                    }
                    else if (getSession('JobView') == "1") {
                        if (assigneduser == true) {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                        }
                    }

                    if (getSession('JobEdit') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                            "<li><hr class='dropdown-divider'></li>";
                        //}
                    }

                    else if (getSession('JobEdit') == "1") {
                        if (assigneduser == true) {
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                                "<li><hr class='dropdown-divider'></li>";
                        }
                    }

                    //strAction23 = " <li><a class='dropdown-item border-radius-md' id='CopyJD'>Copy JD</a></li>" +
                    //    "<li><hr class='dropdown-divider'></li>";

                    strAction23 = "<li><a class='dropdown-item border-radius-md text-color-red' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='OnBoard'>On Board</a></li>";
                }

                if (strTile == "Feedback") {
                    if (getSession('JobFeedback') == "2") {
                        //if (assigneduser == true) {
                        //}
                        //else {
                        if (strTile == "Feedback") {
                            strAction21 = "";
                            strAction22 = "";

                            if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val() != "-1") {
                                strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val() + "' id='Feedback'>Feedback</a></li>";
                            }
                            else {
                                strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>";
                            }
                        }
                        else {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }

                        //}
                    }

                    else if (getSession('JobFeedback') == "1") {
                        if (assigneduser == true) {
                            if (strTile == "Feedback") {
                                strAction21 = "";
                                strAction22 = "";

                                if ($('input[id="serFilter2"]').prop("checked") == true && $('select#drpEmployee option:selected').val() != "-1") {
                                    strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback&createdby=" + $('select#drpEmployee option:selected').val() + "' id='Feedback'>Feedback</a></li>";
                                }
                                else {
                                    strAction23 = " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>";
                                }
                            }
                        }
                        else {
                            strAction21 = "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>";
                            strAction22 = " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>";
                        }
                    }
                }

                strTable += strAction1 + strAction21 + strAction22 + strAction23 + strAction3;

                //if (strTile == "Feedback") {
                //    strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //        "<div class='dropdown float-lg-end pe-1'>" +
                //        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //        "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //        //"<li><a class='dropdown-item border-radius-md' href='FollowupPageIndia.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //        //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //        " <li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "&mode=Feedback' id='Feedback'>Feedback</a></li>" +
                //        "</ul></div></div></td></tr>";

                //}
                //else {
                //    if (getSession('Designation') == "4001") {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            //" <li><a class='dropdown-item border-radius-md' href='AddJobcode_Ind.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }

                //    else {
                //        strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                //            "<div class='dropdown float-lg-end pe-1'>" +
                //            "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                //            "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                //            "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                //            "<li><a class='dropdown-item border-radius-md' href='FollowupPage.aspx?id=" + item.Jobcode + "' id='View'>View</a></li>" +
                //            " <li><a class='dropdown-item border-radius-md' href='AddJobcode.aspx?id=" + item.Jobcode + "' id='Edit'>Edit</a></li>" +
                //            "</ul></div></div></td></tr>";
                //    }
                //}
            }
            i++;
        });
        $("#ul_job").empty();
        $("#ul_job").append(str);

        var taskAssArr = new Array;

        taskAssArr = arry;
        taskAssArr = removeDuplicates(taskAssArr);
        str1 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputClient' onkeyup=filterFunction('myInputClient','ul_jobClient'); />"
        for (var i = 0; i < taskAssArr.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr[i].clientname;
            var strClient = str.replace(regex, replace);

            str1 += " <li onclick=searchJob('" + strClient + "','1')><a class='dropdown-item' href='javascript:;'>" + taskAssArr[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('1') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }

        $("#ul_jobClient").empty();
        $("#ul_jobClient").append(str1);

        var taskAssArr1 = new Array;

        taskAssArr1 = arry1;
        taskAssArr1 = removeDuplicates(taskAssArr1);
        str2 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputpriority' onkeyup=filterFunction('myInputpriority','ul_jobpriority'); />"
        if (taskAssArr1.length == "3") {
            for (var i = 0; i < taskAssArr1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = taskAssArr1[i].clientname;
                var strpriority = str.replace(regex, replace);

                str2 += " <li onclick=searchJob('" + strpriority + "','2')><a class='dropdown-item' href='javascript:;'>" + taskAssArr1[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('2') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#ul_jobpriority").empty();
            $("#ul_jobpriority").append(str2);
        }

        var taskAssArr2 = new Array;

        taskAssArr2 = arry2;
        taskAssArr2 = removeDuplicates(taskAssArr2);
        str3 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputjobstatus' onkeyup=filterFunction('myInputjobstatus','ul_jobstatus'); />"
        for (var i = 0; i < taskAssArr2.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr2[i].clientname;
            var strpjobstatus = str.replace(regex, replace);

            str3 += " <li onclick=searchJob('" + strpjobstatus + "','2')><a class='dropdown-item' href='javascript:;'>" + taskAssArr2[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('2') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#ul_jobstatus").empty();
        $("#ul_jobstatus").append(str3);

        taskAssArr3 = arry3;
        taskAssArr3 = removeDuplicates(taskAssArr3);
        str4 += "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder='Search..' id='myInputjobopendate' onkeyup=filterFunction('myInputjobopendate','ul_jobopendate'); />"
        for (var i = 0; i < taskAssArr3.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = taskAssArr3[i].clientname;
            var strjobdate = str.replace(regex, replace);

            str4 += " <li onclick=searchJob('" + strjobdate + "','3')><a class='dropdown-item' href='javascript:;'>" + taskAssArr3[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('3') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }

        $("#ul_jobopendate").empty();
        $("#ul_jobopendate").append(str4);
    }

    $("#tblJoblist tbody").append(strTable);
}

function gotojobpage(jobid) {
    if (strTile == "" || strTile == "Open" || strTile == "Closure" || strTile == "Interview" || strTile == "Inactive" || strTile == "Overall" || strTile == "No Submission") {
        window.location.href = "FollowupPage.aspx?id=" + jobid;
    }
    else if (strTile == "Feedback") {
        window.location.href = "FollowupPage.aspx?id=" + jobid + "&mode=Feedback";
    }
}

function getFeedback() {
    var filtertype = "";
    if ($('input[id="serFilter1"]').prop("checked") == true) {
        $("#drpEmployee").val("-1").prop("selected", true);
        $('#drpEmployee').prop('disabled', true);
        filtertype = "All";
    }
    else if ($('input[id="serFilter2"]').prop("checked") == true) {
        filtertype = $('select#drpEmployee option:selected').val();
        $('#drpEmployee').prop('disabled', false);
    }

    getJoblist('Feedback', filtertype);
}

function getEmployeeDetails() {
    var strdata = { "region": "2001" };
    common_api_ajax_request("api/DropdownList", "EMPLOYEE", strdata);
}

function removeDuplicates(data) {
    return data.filter((data, index, self) =>
        index === self.findIndex((t) => (t.clientname === data.clientname)))
}

function filterFunction(inputname, ulname) {
    var input, filter, ul, li, a, i;
    input = document.getElementById(inputname);
    filter = input.value.toUpperCase();
    div = document.getElementById(ulname);
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

var tdrowcount = new Array;
var tdrowval1 = new Array;
var tdrowval2 = new Array;
var tdrowval3 = new Array;
var tdrowval4 = new Array;
var rowval1, rowval2, rowval3, rowval4;
var inputname1, inputname2, inputname3, inputname4;
var ulname1, ulname2, ulname3, ulname4;

function searchJob(filterval, filterrow) {
    tdrowval1.length = 0;
    tdrowval2.length = 0;
    tdrowval3.length = 0;
    tdrowval4.length = 0;

    filterval = filterval.replaceAll("%20", " ");

    var table = document.getElementById("tblJoblist");
    var tr = table.getElementsByTagName("tr");
    var filter = filterval;
    var div;

    if (strTile == "Open") {
        if (filterrow == "0") {
            div = document.getElementById("ul_job");
            document.getElementById("btnjobsfilter").style.color = "rgb(47 214 254 / 3)";
        }
        else if (filterrow == "4") {
            div = document.getElementById("ul_jobpriority");
            document.getElementById("btnpriorityfilter").style.color = "rgb(47 214 254 / 3)";
        }
        else if (filterrow == "5") {
            div = document.getElementById("ul_jobopendate");
            document.getElementById("btnopendatefilter").style.color = "rgb(47 214 254 / 3)";
        }
        //else if (filterrow == "3") {
        //    div = document.getElementById("ul_jobstatus");
        //    getPaging(5);
        //}
        else if (filterrow == "6") {
            div = document.getElementById("ul_jobClient");
            document.getElementById("btnclientfilter").style.color = "rgb(47 214 254 / 3)";
        }

        a = div.getElementsByTagName("a");
        icon = div.getElementsByTagName("i");
        var filterparam = "";
        var filterparam1 = new Array;

        const index = tdrowcount.findIndex(object => {
            return object.rowid === filterrow;
        });

        if (index != -1) {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = filter;
            tdrowcount.splice(index, 1, obj);
        }
        else {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = filter;

            tdrowcount.push(obj);
        }

        for (var i = 0; i < tdrowcount.length; i++) {
            if (filterrow == tdrowcount[i].rowid) {
            }
            else {
                filterparam = tdrowcount[i].rowid;
                filterparam1.push(tdrowcount[i].rowid);
            }
        }

        if (tdrowcount.length == 1) {
            if (filterrow == 0) {
                rowval1 = 4;
                rowval2 = 5;
                rowval3 = 6;

                inputname1 = "myInputpriority";
                ulname1 = "ul_jobpriority";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
                inputname3 = "myInputClient";
                ulname3 = "ul_jobClient";
            }
            else if (filterrow == 4) {
                rowval1 = 0;
                rowval2 = 5;
                rowval3 = 6;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
                inputname3 = "myInputClient";
                ulname3 = "ul_jobClient";
            }
            else if (filterrow == 5) {
                rowval1 = 0;
                rowval2 = 4;
                rowval3 = 6;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputpriority";
                ulname2 = "ul_jobpriority";
                inputname3 = "myInputClient";
                ulname3 = "ul_jobClient";
            }
            else if (filterrow == 6) {
                rowval1 = 0;
                rowval2 = 4;
                rowval3 = 5;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname3 = "myInputpriority";
                ulname3 = "ul_jobpriority";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow];
                var td2 = tr[i].getElementsByTagName("td")[rowval1];
                var td3 = tr[i].getElementsByTagName("td")[rowval2];
                var td4 = tr[i].getElementsByTagName("td")[rowval3];

                txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                txtValue2 = td2.getElementsByTagName("label")[0].innerText;
                txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                txtValue4 = td4.getElementsByTagName("label")[0].innerText;

                if (txtValue1.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                    tr[i].style.display = "";
                    var obj1 = {};
                    obj1.clientname = txtValue2;
                    tdrowval1.push(obj1);

                    var obj2 = {};
                    obj2.clientname = txtValue3;
                    tdrowval2.push(obj2);

                    var obj3 = {};
                    obj3.clientname = txtValue4;
                    tdrowval3.push(obj3);
                }
                else {
                    tr[i].style.display = "none";
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);
            tdrowval3 = removeDuplicates(tdrowval3);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';

            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);

            var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
            for (var i = 0; i < tdrowval3.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval3[i].clientname;
                var strClient = str.replace(regex, replace);
                str3 += " <li onclick=searchJob('" + strClient + "','" + rowval3 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval3 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname3).empty();
            $("#" + ulname3).append(str3);
        }

        else if (tdrowcount.length == 2) {
            tdrowval1.length = 0;
            tdrowval2.length = 0;

            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid
            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;

            if (filterrow1 == 0 && filterrow2 == 4 || (filterrow1 == 4 && filterrow2 == 0)) {
                rowval1 = 5;
                rowval2 = 6;

                inputname1 = "myInputjobopendate";
                ulname1 = "ul_jobopendate";
                inputname2 = "myInputpriority";
                ulname2 = "ul_jobpriority";
            }
            else if (filterrow1 == 0 && filterrow2 == 5 || filterrow1 == 5 && filterrow2 == 0) {
                rowval1 = 4;
                rowval2 = 6;

                inputname1 = "myInputpriority";
                ulname1 = "ul_jobpriority";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }
            else if (filterrow1 == 0 && filterrow2 == 6 || filterrow1 == 6 && filterrow2 == 0) {
                rowval1 = 4;
                rowval2 = 5;

                inputname1 = "myInputpriority";
                ulname1 = "ul_jobpriority";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }
            else if (filterrow1 == 4 && filterrow2 == 5 || filterrow1 == 5 && filterrow2 == 4) {
                rowval1 = 0;
                rowval2 = 6;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputpriority";
                ulname2 = "ul_jobpriority";
            }

            else if (filterrow1 == 4 && filterrow2 == 6 || filterrow1 == 6 && filterrow2 == 4) {
                rowval1 = 0;
                rowval2 = 5;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }

            else if (filterrow1 == 5 && filterrow2 == 6 || filterrow1 == 6 && filterrow2 == 5) {
                rowval1 = 0;
                rowval2 = 4;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputpriority";
                ulname2 = "ul_jobpriority";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[rowval1];
                var td4 = tr[i].getElementsByTagName("td")[rowval2];

                if (td1) {
                    txtValue1 = td1.getElementsByTagName("label")[0].innerText;

                    txtValue2 = td2.getElementsByTagName("label")[0].innerText;

                    txtValue3 = td3.getElementsByTagName("label")[0].innerText;

                    txtValue4 = td4.getElementsByTagName("label")[0].innerText;

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue3;
                        tdrowval1.push(obj1);

                        var obj2 = {};
                        obj2.clientname = txtValue4;
                        tdrowval2.push(obj2);
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);
            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';

            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);
        }

        else if (tdrowcount.length == 3) {
            tdrowval1.length = 0;
            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid;
            var filterrow3 = tdrowcount[2].rowid;
            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;
            var filterrowval3 = tdrowcount[2].rowval;

            if (filterrow1 == 0 && filterrow2 == 4 && filterrow3 == 5 || filterrow1 == 0 && filterrow2 == 5 && filterrow3 == 4 || filterrow1 == 4 && filterrow2 == 5 && filterrow3 == 0 || filterrow1 == 5 && filterrow2 == 4 && filterrow3 == 0 || filterrow1 == 4 && filterrow2 == 0 && filterrow3 == 5 || filterrow1 == 5 && filterrow2 == 0 && filterrow3 == 4) {
                rowval1 = 6;

                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
            }
            else if (filterrow1 == 4 && filterrow2 == 5 && filterrow3 == 6 || filterrow1 == 5 && filterrow2 == 6 && filterrow3 == 4 || filterrow1 == 6 && filterrow2 == 5 && filterrow3 == 4 || filterrow1 == 4 && filterrow2 == 6 && filterrow3 == 5 || filterrow1 == 6 && filterrow2 == 4 && filterrow3 == 5 || filterrow1 == 5 && filterrow2 == 4 && filterrow3 == 6) {
                rowval1 = 0;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
            }
            else if (filterrow1 == 0 && filterrow2 == 4 && filterrow3 == 6 || filterrow1 == 5 && filterrow2 == 0 && filterrow == 6 || filterrow1 == 6 && filterrow2 == 0 && filterrow2 == 4 || filterrow1 == 4 && filterrow2 == 6 && filterrow2 == 0 || filterrow1 == 6 && filterrow2 == 4 && filterrow2 == 0 || filterrow1 == 0 && filterrow2 == 6 && filterrow2 == 4) {
                rowval1 = 5;

                inputname1 = "myInputjobopendate";
                ulname1 = "ul_jobopendate";
            }
            else if (filterrow1 == 5 && filterrow2 == 6 && filterrow3 == 0 || filterrow1 == 6 && filterrow2 == 0 && filterrow3 == 5 || filterrow1 == 0 && filterrow2 == 5 && filterrow3 == 6 || filterrow1 == 6 && filterrow2 == 0 && filterrow3 == 5 || filterrow1 == 6 && filterrow2 == 5 && filterrow3 == 0 || filterrow1 == 0 && filterrow2 == 6 && filterrow3 == 5) {
                rowval1 = 4;

                inputname1 = "myInputpriority";
                ulname1 = "ul_jobpriority";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[filterrow3];
                var td4 = tr[i].getElementsByTagName("td")[rowval1];

                if (td1) {
                    txtValue1 = td1.getElementsByTagName("label")[0].innerText;

                    txtValue2 = td3.getElementsByTagName("label")[0].innerText;

                    txtValue3 = td3.getElementsByTagName("label")[0].innerText;

                    txtValue4 = td4.getElementsByTagName("label")[0].innerText;

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue4;
                        tdrowval1.push(obj1);
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);
        }

        else if (tdrowcount.length == 4) {
            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid;
            var filterrow3 = tdrowcount[2].rowid;
            var filterrow4 = tdrowcount[3].rowid;

            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;
            var filterrowval3 = tdrowcount[2].rowval;
            var filterrowval4 = tdrowcount[3].rowval;

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[filterrow3];
                var td4 = tr[i].getElementsByTagName("td")[filterrow4];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }
                    txtValue2 = td2.textContent || td2.innerText;
                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }
                    if (rowval1 == 0 || rowval1 == 1) {
                        txtValue4 = td4.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue4 = td4.textContent || td4.innerText;
                    }

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1 && txtValue4.toUpperCase().indexOf(filterrowval4.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        for (var i = 0; i < a.length; i++) {
            if (a[i].innerText.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                a[i].classList.add("li_selected");
                a[i].style.display = "";
                icon[i].style.display = "";
            }
            else {
                a[i].classList.remove("li_selected");
                a[i].style.display = "none";
                icon[i].style.display = "none";
            }
        }
    }

    else if (strTile == "Feedback") {
        if (filterrow == "0") {
            div = document.getElementById("ul_job");
            document.getElementById("btnjobsfilter").style.color = "rgb(47 214 254 / 3)";
        }
        else if (filterrow == "1") {
            div = document.getElementById("ul_jobClient");
            document.getElementById("btnclientfilter").style.color = "rgb(47 214 254 / 3)";
        }
        //else if (filterrow == "2") {
        //    div = document.getElementById("ul_jobpriority");
        //    document.getElementById("btnpriorityfilter").style.color = "rgb(47 214 254 / 3)";

        //}
        else if (filterrow == "3") {
            div = document.getElementById("ul_jobstatus");
            document.getElementById("btnstatusfilter").style.color = "rgb(47 214 254 / 3)";
            //    getPaging(5);
        }
        else if (filterrow == "4") {
            div = document.getElementById("ul_jobopendate");
            document.getElementById("btnopendatefilter").style.color = "rgb(47 214 254 / 3)";
        }

        a = div.getElementsByTagName("a");
        icon = div.getElementsByTagName("i");
        var filterparam = "";
        var filterparam1 = new Array;

        const index = tdrowcount.findIndex(object => {
            return object.rowid === filterrow;
        });

        if (index != -1) {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = filter;
            tdrowcount.splice(index, 1, obj);
        }
        else {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = filter;
            tdrowcount.push(obj);
        }

        for (var i = 0; i < tdrowcount.length; i++) {
            if (filterrow == tdrowcount[i].rowid) {
            }
            else {
                filterparam = tdrowcount[i].rowid;
                filterparam1.push(tdrowcount[i].rowid);
            }
        }

        if (tdrowcount.length == 1) {
            if (filterrow == 0) {
                rowval1 = 1;
                rowval2 = 3;
                rowval3 = 4;
                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
                inputname3 = "myInputjobopendate";
                ulname3 = "ul_jobopendate";
            }
            else if (filterrow == 1) {
                rowval1 = 0;
                rowval2 = 3;
                rowval3 = 4;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
                inputname3 = "myInputjobopendate";
                ulname3 = "ul_jobopendate";
            }
            else if (filterrow == 3) {
                rowval1 = 0;
                rowval2 = 1;
                rowval3 = 4;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputClient";
                ulname2 = "ul_jobClient";
                inputname3 = "myInputjobopendate";
                ulname3 = "ul_jobopendate";
            }
            else if (filterrow == 4) {
                rowval1 = 0;
                rowval2 = 1;
                rowval3 = 3;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputClient";
                ulname2 = "ul_jobClient";
                inputname3 = "myInputjobstatus";
                ulname3 = "ul_jobstatus";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow];
                var td2 = tr[i].getElementsByTagName("td")[rowval1];
                var td3 = tr[i].getElementsByTagName("td")[rowval2];
                var td4 = tr[i].getElementsByTagName("td")[rowval3];

                if (td1) {
                    if (filterrow == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    if (filterrow == 1 || filterrow == 2 || filterrow == 4 || filterrow == 0) {
                        txtValue2 = td2.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue2 = td2.textContent || td2.innerText;
                    }
                    if (rowval2 == 2) {
                        txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                    }
                    else if (rowval2 == 1) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }
                    if (filterrow == 4) {
                        txtValue4 = td4.getElementsByTagName("span")[0].innerText;
                    }
                    else {
                        txtValue4 = td4.textContent || td4.innerText;
                    }

                    if (txtValue1.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue2;
                        tdrowval1.push(obj1);

                        var obj2 = {};
                        obj2.clientname = txtValue3;
                        tdrowval2.push(obj2);

                        var obj3 = {};
                        obj3.clientname = txtValue4;
                        tdrowval3.push(obj3);
                    }
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);
            tdrowval3 = removeDuplicates(tdrowval3);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';

            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);

            var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
            for (var i = 0; i < tdrowval3.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval3[i].clientname;
                var strClient = str.replace(regex, replace);
                str3 += " <li onclick=searchJob('" + strClient + "','" + rowval3 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval3 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname3).empty();
            $("#" + ulname3).append(str3);
        }

        else if (tdrowcount.length == 2) {
            tdrowval1.length = 0;
            tdrowval2.length = 0;

            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid
            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;

            if (filterrow1 == 0 && filterrow2 == 1 || (filterrow1 == 1 && filterrow2 == 0)) {
                rowval1 = 3;
                rowval2 = 4;

                inputname1 = "myInputjobstatus";
                ulname1 = "ul_jobstatus";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }
            else if (filterrow1 == 0 && filterrow2 == 3 || filterrow1 == 3 && filterrow2 == 0) {
                rowval1 = 1;
                rowval2 = 4;

                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }
            else if (filterrow1 == 0 && filterrow2 == 4 || filterrow1 == 4 && filterrow2 == 0) {
                rowval1 = 1;
                rowval2 = 3;

                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
            }
            else if (filterrow1 == 1 && filterrow2 == 3 || filterrow1 == 3 && filterrow2 == 1) {
                rowval1 = 0;
                rowval2 = 4;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }

            else if (filterrow1 == 1 && filterrow2 == 4 || filterrow1 == 4 && filterrow2 == 1) {
                rowval1 = 0;
                rowval2 = 3;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
            }

            else if (filterrow1 == 3 && filterrow2 == 4 || filterrow1 == 4 && filterrow2 == 3) {
                rowval1 = 0;
                rowval2 = 1;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputClient";
                ulname2 = "ul_jobClient";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[rowval1];
                var td4 = tr[i].getElementsByTagName("td")[rowval2];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }
                    //else if (filterrow2 == 1 || filterrow2 == 0) {
                    //    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    //}
                    //else if (rowval1 == 1 || rowval1 == 0) {
                    //    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    //}
                    //else if (rowval2 == 1 || rowval2 == 0) {
                    //    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    //}
                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }
                    if (filterrow1 == 1 || filterrow1 == 3 || filterrow1 == 4) {
                        txtValue2 = td2.textContent || td2.innerText;
                    }
                    else if (filterrow1 == 0) {
                        txtValue2 = td2.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    }

                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    txtValue4 = td4.textContent || td4.innerText;

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue3;
                        tdrowval1.push(obj1);

                        var obj2 = {};
                        obj2.clientname = txtValue4;
                        tdrowval2.push(obj2);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);
            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';

            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);
        }

        else if (tdrowcount.length == 3) {
            tdrowval1.length = 0;

            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid;
            var filterrow3 = tdrowcount[2].rowid;
            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;
            var filterrowval3 = tdrowcount[2].rowval;

            if (filterrow1 != 4 && filterrow2 != 4 && filterrow3 != 4) {
                rowval1 = 4;
                inputname1 = "myInputjobopendate";
                ulname1 = "ul_jobopendate";
            }

            else if (filterrow1 != 0 && filterrow2 != 0 && filterrow3 != 0) {
                rowval1 = 0;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
            }
            else if (filterrow1 != 3 && filterrow2 != 3 && filterrow3 != 3) {
                rowval1 = 3;
                inputname1 = "myInputjobstatus";
                ulname1 = "ul_jobstatus";
            }
            else if (filterrow1 != 1 && filterrow2 != 1 && filterrow3 != 1) {
                rowval1 = 1;
                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[filterrow3];
                var td4 = tr[i].getElementsByTagName("td")[rowval1];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }

                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    txtValue2 = td2.textContent || td2.innerText;

                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    if (rowval1 == 0 || rowval1 == 1) {
                        txtValue4 = td4.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue4 = td4.textContent || td4.innerText;
                    }

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue4;
                        tdrowval1.push(obj1);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);
        }

        else if (tdrowcount.length == 4) {
            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid;
            var filterrow3 = tdrowcount[2].rowid;
            var filterrow4 = tdrowcount[3].rowid;

            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;
            var filterrowval3 = tdrowcount[2].rowval;
            var filterrowval4 = tdrowcount[3].rowval;

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[filterrow3];
                var td4 = tr[i].getElementsByTagName("td")[filterrow4];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }

                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    txtValue2 = td2.textContent || td2.innerText;

                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    if (rowval1 == 0 || rowval1 == 1) {
                        txtValue4 = td4.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue4 = td4.textContent || td4.innerText;
                    }

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1 && txtValue4.toUpperCase().indexOf(filterrowval4.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        for (var i = 0; i < a.length; i++) {
            if (a[i].innerText.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                a[i].classList.add("li_selected");
                a[i].style.display = "";
                icon[i].style.display = "";
            } else {
                a[i].classList.remove("li_selected");
                a[i].style.display = "none";
                icon[i].style.display = "none";
            }
        }
        //getPaging(5);
        getSearchPaging("#tblJoblist", 10);
    }

    else {
        if (filterrow == "0") {
            div = document.getElementById("ul_job");
            document.getElementById("btnjobsfilter").style.color = "rgb(47 214 254 / 3)";
            getPaging(10);
        }
        else if (filterrow == "1") {
            div = document.getElementById("ul_jobClient");
            document.getElementById("btnclientfilter").style.color = "rgb(47 214 254 / 3)";
            getPaging(10);
        }
        else if (filterrow == "2") {
            div = document.getElementById("ul_jobstatus");
            document.getElementById("btnstatusfilter").style.color = "rgb(47 214 254 / 3)";
            getPaging(10);
        }
        else if (filterrow == "3") {
            div = document.getElementById("ul_jobopendate");
            document.getElementById("btnopendatefilter").style.color = "rgb(47 214 254 / 3)";
            getPaging(10);
        }

        a = div.getElementsByTagName("a");
        icon = div.getElementsByTagName("i");

        var filterparam = "";
        var filterparam1 = new Array;

        const index = tdrowcount.findIndex(object => {
            return object.rowid === filterrow;
        });

        if (index != -1) {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = filter;
            tdrowcount.splice(index, 1, obj);
        }
        else {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = filter;

            tdrowcount.push(obj);
        }

        for (var i = 0; i < tdrowcount.length; i++) {
            if (filterrow == tdrowcount[i].rowid) {
            }
            else {
                filterparam = tdrowcount[i].rowid;
                filterparam1.push(tdrowcount[i].rowid);
            }
        }

        if (tdrowcount.length == 1) {
            if (filterrow == 0) {
                rowval1 = 1;
                rowval2 = 2;
                rowval3 = 3;
                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
                inputname3 = "myInputjobopendate";
                ulname3 = "ul_jobopendate";
            }
            else if (filterrow == 1) {
                rowval1 = 0;
                rowval2 = 2;
                rowval3 = 3;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
                inputname3 = "myInputjobopendate";
                ulname3 = "ul_jobopendate";
            }
            else if (filterrow == 2) {
                rowval1 = 0;
                rowval2 = 1;
                rowval3 = 3;
                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputClient";
                ulname2 = "ul_jobClient";
                inputname3 = "myInputjobopendate";
                ulname3 = "ul_jobopendate";
            }
            else if (filterrow == 3) {
                rowval1 = 0;
                rowval2 = 1;
                rowval3 = 2;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputClient";
                ulname2 = "ul_jobClient";
                inputname3 = "myInputjobstatus";
                ulname3 = "ul_jobstatus";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow];
                var td2 = tr[i].getElementsByTagName("td")[rowval1];
                var td3 = tr[i].getElementsByTagName("td")[rowval2];
                var td4 = tr[i].getElementsByTagName("td")[rowval3];

                if (td1) {
                    if (filterrow == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    if (filterrow == 1 || filterrow == 2 || filterrow == 3) {
                        txtValue2 = td2.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue2 = td2.textContent || td2.innerText;
                    }
                    if (rowval2 == 1) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    txtValue4 = td4.textContent || td4.innerText;

                    if (txtValue1.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue2;
                        tdrowval1.push(obj1);

                        var obj2 = {};
                        obj2.clientname = txtValue3;
                        tdrowval2.push(obj2);

                        var obj3 = {};
                        obj3.clientname = txtValue4;
                        tdrowval3.push(obj3);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);
            tdrowval3 = removeDuplicates(tdrowval3);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';

            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);

            var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
            for (var i = 0; i < tdrowval3.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval3[i].clientname;
                var strClient = str.replace(regex, replace);
                str3 += " <li onclick=searchJob('" + strClient + "','" + rowval3 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval3 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname3).empty();
            $("#" + ulname3).append(str3);
        }

        else if (tdrowcount.length == 2) {
            tdrowval1.length = 0;
            tdrowval2.length = 0;

            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid
            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;

            if (filterrow1 == 0 && filterrow2 == 1 || (filterrow1 == 1 && filterrow2 == 0)) {
                rowval1 = 2;
                rowval2 = 3;

                inputname1 = "myInputjobstatus";
                ulname1 = "ul_jobstatus";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }
            else if (filterrow1 == 0 && filterrow2 == 2 || filterrow1 == 2 && filterrow2 == 0) {
                rowval1 = 1;
                rowval2 = 3;

                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }
            else if (filterrow1 == 0 && filterrow2 == 3 || filterrow1 == 3 && filterrow2 == 0) {
                rowval1 = 1;
                rowval2 = 2;

                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
            }
            else if (filterrow1 == 1 && filterrow2 == 2 || filterrow1 == 2 && filterrow2 == 1) {
                rowval1 = 0;
                rowval2 = 3;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobopendate";
                ulname2 = "ul_jobopendate";
            }

            else if (filterrow1 == 1 && filterrow2 == 3 || filterrow1 == 3 && filterrow2 == 1) {
                rowval1 = 0;
                rowval2 = 2;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputjobstatus";
                ulname2 = "ul_jobstatus";
            }

            else if (filterrow1 == 2 && filterrow2 == 3 || filterrow1 == 3 && filterrow2 == 2) {
                rowval1 = 0;
                rowval2 = 1;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
                inputname2 = "myInputClient";
                ulname2 = "ul_jobClient";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[rowval1];
                var td4 = tr[i].getElementsByTagName("td")[rowval2];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }
                    //else if (filterrow2 == 1 || filterrow2 == 0) {
                    //    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    //}
                    //else if (rowval1 == 1 || rowval1 == 0) {
                    //    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    //}
                    //else if (rowval2 == 1 || rowval2 == 0) {
                    //    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    //}
                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    txtValue2 = td2.textContent || td2.innerText;

                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    txtValue4 = td4.textContent || td4.innerText;

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue3;
                        tdrowval1.push(obj1);

                        var obj2 = {};
                        obj2.clientname = txtValue4;
                        tdrowval2.push(obj2);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);
        }

        else if (tdrowcount.length == 3) {
            tdrowval1.length = 0;

            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid;
            var filterrow3 = tdrowcount[2].rowid;
            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;
            var filterrowval3 = tdrowcount[2].rowval;

            if (filterrow1 == 0 && filterrow2 == 1 && filterrow3 == 2 || filterrow1 == 0 && filterrow2 == 2 && filterrow3 == 1 || filterrow1 == 1 && filterrow2 == 2 && filterrow3 == 0 || filterrow1 == 2 && filterrow2 == 1 && filterrow3 == 0 || filterrow1 == 1 && filterrow2 == 0 && filterrow3 == 2 || filterrow1 == 2 && filterrow2 == 0 && filterrow3 == 1) {
                rowval1 = 3;

                inputname1 = "myInputjobopendate";
                ulname1 = "ul_jobopendate";
            }
            else if (filterrow1 == 1 && filterrow2 == 2 && filterrow3 == 3 || filterrow1 == 2 && filterrow2 == 3 && filterrow3 == 1 || filterrow1 == 3 && filterrow2 == 2 && filterrow3 == 1 || filterrow1 == 1 && filterrow2 == 3 && filterrow3 == 2 || filterrow1 == 3 && filterrow2 == 1 && filterrow3 == 2 || filterrow1 == 2 && filterrow2 == 1 && filterrow3 == 3) {
                rowval1 = 0;

                inputname1 = "myInputjobs";
                ulname1 = "ul_job";
            }
            else if (filterrow1 == 0 && filterrow2 == 1 && filterrow3 == 3 || filterrow1 == 1 && filterrow2 == 0 && filterrow == 3 || filterrow1 == 3 && filterrow2 == 0 && filterrow2 == 1 || filterrow1 == 1 && filterrow2 == 3 && filterrow2 == 0 || filterrow1 == 3 && filterrow2 == 1 && filterrow2 == 0 || filterrow1 == 0 && filterrow2 == 3 && filterrow2 == 1) {
                rowval1 = 2;

                inputname1 = "myInputjobstatus";
                ulname1 = "ul_jobstatus";
            }
            else if (filterrow1 == 2 && filterrow2 == 3 && filterrow3 == 0 || filterrow1 == 2 && filterrow2 == 0 && filterrow3 == 3 || filterrow1 == 0 && filterrow2 == 2 && filterrow3 == 3 || filterrow1 == 3 && filterrow2 == 0 && filterrow3 == 2 || filterrow1 == 3 && filterrow2 == 2 && filterrow3 == 0 || filterrow1 == 0 && filterrow2 == 3 && filterrow3 == 2) {
                rowval1 = 1;

                inputname1 = "myInputClient";
                ulname1 = "ul_jobClient";
            }

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[filterrow3];
                var td4 = tr[i].getElementsByTagName("td")[rowval1];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }

                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    txtValue2 = td2.textContent || td2.innerText;

                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    if (rowval1 == 0 || rowval1 == 1) {
                        txtValue4 = td4.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue4 = td4.textContent || td4.innerText;
                    }

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                        var obj1 = {};
                        obj1.clientname = txtValue4;
                        tdrowval1.push(obj1);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

            tdrowval1 = removeDuplicates(tdrowval1);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);
        }

        else if (tdrowcount.length == 4) {
            var filterrow1 = tdrowcount[0].rowid;
            var filterrow2 = tdrowcount[1].rowid;
            var filterrow3 = tdrowcount[2].rowid;
            var filterrow4 = tdrowcount[3].rowid;

            var filterrowval1 = tdrowcount[0].rowval;
            var filterrowval2 = tdrowcount[1].rowval;
            var filterrowval3 = tdrowcount[2].rowval;
            var filterrowval4 = tdrowcount[3].rowval;

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[filterrow1];
                var td2 = tr[i].getElementsByTagName("td")[filterrow2];
                var td3 = tr[i].getElementsByTagName("td")[filterrow3];
                var td4 = tr[i].getElementsByTagName("td")[filterrow4];

                if (td1) {
                    if (filterrow1 == 1 || filterrow1 == 0) {
                        txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                    }

                    else {
                        txtValue1 = td1.textContent || td1.innerText;
                    }

                    txtValue2 = td2.textContent || td2.innerText;

                    if (rowval1 == 0 || rowval2 == 1 || rowval1 == 1 || rowval2 == 0) {
                        txtValue3 = td3.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue3 = td3.textContent || td3.innerText;
                    }

                    if (rowval1 == 0 || rowval1 == 1) {
                        txtValue4 = td4.getElementsByTagName("label")[0].innerText;
                    }
                    else {
                        txtValue4 = td4.textContent || td4.innerText;
                    }

                    if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1 && txtValue4.toUpperCase().indexOf(filterrowval4.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        for (var i = 0; i < a.length; i++) {
            if (a[i].innerText.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                a[i].classList.add("li_selected");
                a[i].style.display = "";
                icon[i].style.display = "";
            } else {
                a[i].classList.remove("li_selected");
                a[i].style.display = "none";
                icon[i].style.display = "none";
            }
        }
    }

    // getPaging(5);
    getSearchPaging("#tblJoblist", 10);
    //getpage123();
}

function filtercancel(filterrow) {
    for (var i = 0; i < tdrowcount.length; i++) {
        if (tdrowcount[i].rowid == filterrow) {
            const index = tdrowcount.findIndex(object => {
                return object.rowid === filterrow;
            });

            if (index != -1) {
                var obj = {};
                obj.rowid = filterrow;
                obj.rowval = tdrowcount[index].rowval;
                tdrowcount.splice(index, 1);
            }
        }
    }

    var table = document.getElementById("tblJoblist");
    var tr = table.getElementsByTagName("tr");

    var div;

    if (strTile == "Open") {
        if (filterrow == "0") {
            div = document.getElementById("ul_job");
            document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "4") {
            div = document.getElementById("ul_jobpriority");
            document.getElementById("btnpriorityfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "5") {
            div = document.getElementById("ul_jobopendate");
            document.getElementById("btnopendatefilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "6") {
            div = document.getElementById("ul_jobClient");
            document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        }

        const index = tdrowcount.findIndex(object => {
            return object.rowid === filterrow;
        });

        if (index != -1) {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = tdrowcount[index].rowval;
            tdrowcount.splice(index, 1);
        }

        a = div.getElementsByTagName("a");
        icon = div.getElementsByTagName("i");

        //for (i = 1; i < tr.length; i++) {
        //    tr[i].style.display = "";

        //}
        //for (var i = 0; i < a.length; i++) {
        //    a[i].classList.remove("li_selected");
        //    a[i].style.display = "";
        //    icon[i].style.display = "none";

        //}
        if (tdrowcount.length > 0) {
            searchJob(tdrowcount[tdrowcount.length - 1].rowval, tdrowcount[tdrowcount.length - 1].rowid);
            getSearchPaging("#tblJoblist", 10);
        }
        else {
            tdrowval1.length = 0;
            tdrowval2.length = 0;
            tdrowval3.length = 0;
            tdrowval4.length = 0;

            var tr = table.getElementsByTagName("tr");
            inputname1 = "myInputjobs";
            ulname1 = "ul_job";
            inputname2 = "myInputpriority";
            ulname2 = "ul_jobpriority";
            inputname3 = "myInputjobopendate";
            ulname3 = "ul_jobopendate";
            inputname4 = "myInputClient";
            ulname4 = "ul_jobClient";

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[0];
                var td2 = tr[i].getElementsByTagName("td")[4];
                var td3 = tr[i].getElementsByTagName("td")[5];
                var td4 = tr[i].getElementsByTagName("td")[6];

                txtValue1 = td1.getElementsByTagName("label")[0].innerText;

                txtValue2 = td2.getElementsByTagName("label")[0].innerText;

                txtValue3 = td3.getElementsByTagName("label")[0].innerText;

                txtValue4 = td4.textContent || td4.innerText;

                tr[i].style.display = "";
                var obj1 = {};
                obj1.clientname = txtValue1;
                tdrowval1.push(obj1);

                var obj2 = {};
                obj2.clientname = txtValue2;
                tdrowval2.push(obj2);

                var obj3 = {};
                obj3.clientname = txtValue3.toUpperCase();
                tdrowval3.push(obj3);

                var obj4 = {};
                obj4.clientname = txtValue4;
                tdrowval4.push(obj4);
            }
            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);
            tdrowval3 = removeDuplicates(tdrowval3);
            tdrowval4 = removeDuplicates(tdrowval4);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + 0 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 0 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + 4 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 4 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);

            var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
            for (var i = 0; i < tdrowval3.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval3[i].clientname;
                var strClient = str.replace(regex, replace);
                str3 += " <li onclick=searchJob('" + strClient + "','" + 5 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 5 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname3).empty();
            $("#" + ulname3).append(str3);

            var str4 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname4 + '" onkeyup=filterFunction("' + inputname4 + '","' + ulname4 + '"); />';
            for (var i = 0; i < tdrowval4.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval4[i].clientname;
                var strClient = str.replace(regex, replace);
                str4 += " <li onclick=searchJob('" + strClient + "','" + 6 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval4[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 6 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname4).empty();
            $("#" + ulname4).append(str4);
        }

        //getPaging(10);
        getSearchPaging("#tblJoblist", "10");
    }
    else if (strTile == "Feedback") {
        if (filterrow == "0") {
            div = document.getElementById("ul_job");
            document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "1") {
            div = document.getElementById("ul_jobClient");
            document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "3") {
            div = document.getElementById("ul_jobstatus");
            document.getElementById("btnstatusfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "4") {
            div = document.getElementById("ul_jobopendate");
            document.getElementById("btnopendatefilter").style.color = "#0c0c0c";
        }

        const index = tdrowcount.findIndex(object => {
            return object.rowid === filterrow;
        });

        if (index != -1) {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = tdrowcount[index].rowval;
            tdrowcount.splice(index, 1);
        }

        a = div.getElementsByTagName("a");
        icon = div.getElementsByTagName("i");

        //for (i = 1; i < tr.length; i++) {
        //    tr[i].style.display = "";

        //}
        //for (var i = 0; i < a.length; i++) {
        //    a[i].classList.remove("li_selected");
        //    a[i].style.display = "";
        //    icon[i].style.display = "none";

        //}
        if (tdrowcount.length > 0) {
            searchJob(tdrowcount[tdrowcount.length - 1].rowval, tdrowcount[tdrowcount.length - 1].rowid);
            getSearchPaging("#tblJoblist", 10);
        }
        else {
            tdrowval1.length = 0;
            tdrowval2.length = 0;
            tdrowval3.length = 0;
            tdrowval4.length = 0;

            var tr = table.getElementsByTagName("tr");
            inputname1 = "myInputjobs";
            ulname1 = "ul_job";
            inputname2 = "myInputClient";
            ulname2 = "ul_jobClient";
            inputname3 = "myInputjobstatus";
            ulname3 = "ul_jobstatus";
            inputname4 = "myInputjobopendate";
            ulname4 = "ul_jobopendate";

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[0];
                var td2 = tr[i].getElementsByTagName("td")[1];
                var td3 = tr[i].getElementsByTagName("td")[3];
                var td4 = tr[i].getElementsByTagName("td")[4];

                txtValue1 = td1.getElementsByTagName("label")[0].innerText;

                txtValue2 = td2.getElementsByTagName("label")[0].innerText;

                txtValue3 = td3.getElementsByTagName("span")[0].innerText;

                txtValue4 = td4.textContent || td4.innerText;

                tr[i].style.display = "";
                var obj1 = {};
                obj1.clientname = txtValue1;
                tdrowval1.push(obj1);

                var obj2 = {};
                obj2.clientname = txtValue2;
                tdrowval2.push(obj2);

                var obj3 = {};
                obj3.clientname = txtValue3.toUpperCase();
                tdrowval3.push(obj3);

                var obj4 = {};
                obj4.clientname = txtValue4;
                tdrowval4.push(obj4);
            }
            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);
            tdrowval3 = removeDuplicates(tdrowval3);
            tdrowval4 = removeDuplicates(tdrowval4);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + 0 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 0 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + 1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);

            var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
            for (var i = 0; i < tdrowval3.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval3[i].clientname;
                var strClient = str.replace(regex, replace);
                str3 += " <li onclick=searchJob('" + strClient + "','" + 3 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 3 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname3).empty();
            $("#" + ulname3).append(str3);

            var str4 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname4 + '" onkeyup=filterFunction("' + inputname4 + '","' + ulname4 + '"); />';
            for (var i = 0; i < tdrowval4.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval4[i].clientname;
                var strClient = str.replace(regex, replace);
                str4 += " <li onclick=searchJob('" + strClient + "','" + 4 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval4[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 4 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname4).empty();
            $("#" + ulname4).append(str4);
        }

        //getPaging(5);
        getSearchPaging("#tblJoblist", 10);
    }
    else {
        if (filterrow == "0") {
            div = document.getElementById("ul_job");
            document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "1") {
            div = document.getElementById("ul_jobClient");
            document.getElementById("btnclientfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "2") {
            div = document.getElementById("ul_jobstatus");
            document.getElementById("btnstatusfilter").style.color = "#0c0c0c";
        }
        else if (filterrow == "3") {
            div = document.getElementById("ul_jobopendate");

            document.getElementById("btnopendatefilter").style.color = "#0c0c0c";
        }

        const index = tdrowcount.findIndex(object => {
            return object.rowid === filterrow;
        });

        if (index != -1) {
            var obj = {};
            obj.rowid = filterrow;
            obj.rowval = tdrowcount[index].rowval;
            tdrowcount.splice(index, 1);
        }

        a = div.getElementsByTagName("a");
        icon = div.getElementsByTagName("i");

        //for (i = 1; i < tr.length; i++) {
        //    tr[i].style.display = "";

        //}
        //for (var i = 0; i < a.length; i++) {
        //    a[i].classList.remove("li_selected");
        //    a[i].style.display = "";
        //    icon[i].style.display = "none";

        //}
        if (tdrowcount.length > 0) {
            searchJob(tdrowcount[tdrowcount.length - 1].rowval, tdrowcount[tdrowcount.length - 1].rowid);
            //sgetSearchPaging($('select#maxRows option:selected').val());
            getSearchPaging("#tblJoblist", 10);
        }
        else {
            tdrowval1.length = 0;
            tdrowval2.length = 0;
            tdrowval3.length = 0;
            tdrowval4.length = 0;

            var tr = table.getElementsByTagName("tr");
            inputname1 = "myInputjobs";
            ulname1 = "ul_job";
            inputname2 = "myInputClient";
            ulname2 = "ul_jobClient";
            inputname3 = "myInputjobstatus";
            ulname3 = "ul_jobstatus";
            inputname4 = "myInputjobopendate";
            ulname4 = "ul_jobopendate";

            for (i = 1; i < tr.length; i++) {
                var td1 = tr[i].getElementsByTagName("td")[0];
                var td2 = tr[i].getElementsByTagName("td")[1];
                var td3 = tr[i].getElementsByTagName("td")[2];
                var td4 = tr[i].getElementsByTagName("td")[3];

                txtValue1 = td1.getElementsByTagName("label")[0].innerText;

                txtValue2 = td2.getElementsByTagName("label")[0].innerText;

                txtValue3 = td3.textContent || td3.innerText;

                txtValue4 = td4.textContent || td4.innerText;

                tr[i].style.display = "";
                var obj1 = {};
                obj1.clientname = txtValue1;
                tdrowval1.push(obj1);

                var obj2 = {};
                obj2.clientname = txtValue2;
                tdrowval2.push(obj2);

                var obj3 = {};
                obj3.clientname = txtValue3;
                tdrowval3.push(obj3);

                var obj4 = {};
                obj4.clientname = txtValue4;
                tdrowval4.push(obj4);
            }
            tdrowval1 = removeDuplicates(tdrowval1);
            tdrowval2 = removeDuplicates(tdrowval2);
            tdrowval3 = removeDuplicates(tdrowval3);
            tdrowval4 = removeDuplicates(tdrowval4);

            var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
            for (var i = 0; i < tdrowval1.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval1[i].clientname;
                var strClient = str.replace(regex, replace);
                str1 += " <li onclick=searchJob('" + strClient + "','" + 0 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 0 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname1).empty();
            $("#" + ulname1).append(str1);

            var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
            for (var i = 0; i < tdrowval2.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval2[i].clientname;
                var strClient = str.replace(regex, replace);
                str2 += "<li onclick=searchJob('" + strClient + "','" + 1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname2).empty();
            $("#" + ulname2).append(str2);

            var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
            for (var i = 0; i < tdrowval3.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval3[i].clientname;
                var strClient = str.replace(regex, replace);
                str3 += " <li onclick=searchJob('" + strClient + "','" + 2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname3).empty();
            $("#" + ulname3).append(str3);

            var str4 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname4 + '" onkeyup=filterFunction("' + inputname4 + '","' + ulname4 + '"); />';
            for (var i = 0; i < tdrowval4.length; i++) {
                var regex = /\s/g;
                var replace = "%20";
                var str = tdrowval4[i].clientname;
                var strClient = str.replace(regex, replace);
                str4 += " <li onclick=searchJob('" + strClient + "','" + 3 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval4[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 3 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
            }
            $("#" + ulname4).empty();
            $("#" + ulname4).append(str4);

            //getPaging(5);
            getSearchPaging("#tblJoblist", 10);
        }
    }
}

function gotocandidatepage(candidateid, jobcode, jobname) {
    if (jobname == "Techwaukee") {
        window.location.href = 'CandidateViewInternalUS.aspx?id=' + candidateid + "&jobid=" + jobcode;
    }
    else {
        window.location.href = "Candidate_View.aspx?id=" + candidateid + "&jobid=" + jobcode;
    }
}

function createCandTable(data) {
    $("#tblCandlist tbody").empty();
    var strTable = "";
    var str = "<input type = 'text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidates' onkeyup=filterFunction('myInputcandidates','ul_Candidates'); />";
    var str1 = "<input type = 'text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidatestatus' onkeyup=filterFunction('myInputcandidatestatus','ul_Status'); />";
    var str2 = "<input type = 'text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidatesubmittedby' onkeyup=filterFunction('myInputcandidatesubmittedby','ul_Submitted'); />";

    var arry = new Array;
    var arry1 = new Array;
    var i = 1;
    $.each(data, function (key, item) {
        if (item.Jobcode == "") {
        } else {
            var strImg = "";
            var obj = {};
            var obj1 = {};

            obj.clientname = item.candidatestatus;
            arry.push(obj);

            obj1.clientname = item.submittedby;
            arry1.push(obj1);
            var strImg = "";

            if (item.linkedinURL == "") {
                strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important;'>";
            }
            else if (item.linkedinURL != "") {
                strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important;'>";
            }
            var regex = /\s/g;
            var replace = "%20";
            var strcand = item.candidatename;
            var strcandname = strcand.replace(regex, replace);

            var strclientjob = item.jobClient;
            var strclientjob1 = strclientjob.replace(regex, replace);

            str += " <li onclick=searchcand('" + strcandname + "','1')><a class='dropdown-item' href='javascript:;'>" + item.candidatename + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancelcand('1') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";

            strTable += "<tr style='cursor:pointer !important;' class='divControl' id='divControl_" + i + "'>" +
                "<td class='align-middle text-center text-sm' style='width: 0rem;'><div><a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a></div></td>" +
                "<td onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "','" + strclientjob1 + "') ;> <div class='d-flex px-2 py-1'>" +
                "<div class='d-flex flex-column justify-content-center'>" +
                "<h6 class='mb-0 text-sm'>" + item.candidatename + "</h6>" +
                "<p class='text-xs text-secondary mb-0'><a class='__cf_email__' data-cfemail='96fcf9fef8d6f5e4f3f7e2ffe0f3bbe2fffbb8f5f9fb'>" + item.candidateemailid + " | " + item.candidatemobno + " | " + "$ " + item.ratePerHr + "/Hr" + " - " + item.type + "</a></p>" +
                "</div ></div ></td > ";

            strTable += "<td onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";

            if (item.candidatestatus == "Submitted to TL" || item.candidatestatus == "Submitted to BP" || item.candidatestatus == "Submitted to EC" || item.candidatestatus == "Closure") {
                strTable += "<td class='align-middle text-center text-sm' onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');>" +
                    "<p class='text-xs font-weight-bold mb-0' style='display:none;'>" + item.jobcode + "</p>" +
                    "<p class='text-xs font-weight-bold mb-0'>" + item.jobTitle + "</p>" +
                    "<span class='badge badge-sm bg-gradient-success'>" + item.candidatestatus + "</span></td>";
            }

            else if (item.candidatestatus == "TL Rejected" || item.candidatestatus == "BP Rejected" || item.candidatestatus == "EC Rejected") {
                strTable += "<td class='align-middle text-center text-sm' onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');>" +
                    "<p class='text-xs font-weight-bold mb-0' style='display:none;'>" + item.jobcode + "</p>" +
                    "<p class='text-xs font-weight-bold mb-0'>" + item.jobTitle + "</p>" +
                    "<span class='badge badge-sm bg-gradient-danger'>" + item.candidatestatus + "</span></td>";
            }

            else if (item.candidatestatus == "BP Interview" || item.candidatestatus == "EC Interview") {
                strTable += "<td class='align-middle text-center text-sm' onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');>" +
                    "<p class='text-xs font-weight-bold mb-0' style='display:none;'>" + item.jobcode + "</p>" +
                    "<p class='text-xs font-weight-bold mb-0'>" + item.jobTitle + "</p>" +
                    "<span class='badge badge-sm bg-gradient-info'>" + item.candidatestatus + "</span></td>";
            }

            else if (item.candidatestatus == "Draft") {
                strTable += "<td class='align-middle text-center text-sm' onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');>" +
                    "<p class='text-xs font-weight-bold mb-0' style='display:none;'>" + item.jobcode + "</p>" +
                    "<p class='text-xs font-weight-bold mb-0'>" + item.jobTitle + "</p>" +
                    "<span class='badge badge-sm bg-gradient-secondary'>" + item.candidatestatus + "</span></td>";
            }

            else if (item.candidatestatus == "Pipeline") {
                strTable += "<td class='align-middle text-center text-sm' onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');>" +
                    "<p class='text-xs font-weight-bold mb-0' style='display:none;'>" + item.jobcode + "</p>" +
                    "<p class='text-xs font-weight-bold mb-0'>" + item.jobTitle + "</p>" +
                    "<span class='badge badge-sm bg-gradient-info'>" + item.candidatestatus + "</span></td>";
            }

            strTable += "<td onclick=gotocandidatepage('" + item.candidateid + "','" + item.jobcode + "');><p class='text-xs font-weight-bold mb-0'>" + item.submittedby + "</p><p class='text-xs text-secondary mb-0'> " + item.submitteddate + "|" + item.submittedtime + "</p></td>";

            var strCandTable;
            if (item.jobcode == "") {
                strCandTable = "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?id=" + item.candidateid + "' id='Edit'>Edit</a></li>";
            }
            else {
                strCandTable = "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?id=" + item.jobcode + "&jobId=" + item.candidateid + "' id='Edit'>Edit</a></li>";
            }

            strTable += "<td class='align-middle' style='display:none;'><div class='col-lg-3 col-1 my-auto text-end'>" +
                "<div class='dropdown float-lg-end pe-1'>" +
                "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View'>View</a></li>" +
                strCandTable +
                "</ul></div></div></td></tr>";
        }
        i++;
    });
    $("#ul_Candidates").empty();
    $("#ul_Candidates").append(str);

    var taskAssArr = new Array;

    taskAssArr = arry;
    taskAssArr = removeDuplicates(taskAssArr);

    for (var i = 0; i < taskAssArr.length; i++) {
        var regex = /\s/g;
        var replace = "%20";
        var str = taskAssArr[i].clientname;
        var strStatus = str.replace(regex, replace);

        str1 += " <li onclick=searchcand('" + strStatus + "','3')><a class='dropdown-item' href='javascript:;'>" + taskAssArr[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancelcand('3') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
    }

    $("#ul_Status").empty();
    $("#ul_Status").append(str1);

    var taskAssArr1 = new Array;

    taskAssArr1 = arry1;
    taskAssArr1 = removeDuplicates(taskAssArr1);

    for (var i = 0; i < taskAssArr1.length; i++) {
        var regex = /\s/g;
        var replace = "%20";
        var str = taskAssArr1[i].clientname;
        var strsubmittedby = str.replace(regex, replace);

        str2 += "<li onclick=searchcand('" + strsubmittedby + "','4')><a class='dropdown-item' href='javascript:;'>" + taskAssArr1[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancelcand('4') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
    }
    $("#ul_Submitted").empty();
    $("#ul_Submitted").append(str2);

    $("#tblCandlist tbody").append(strTable);
}

function searchcand(filterval, filterrow) {
    tdrowval1.length = 0;
    tdrowval2.length = 0;
    tdrowval3.length = 0;

    filterval = filterval.replaceAll("%20", " ");

    var table = document.getElementById("tblCandlist");
    var tr = table.getElementsByTagName("tr");
    var filter = filterval;
    var div;
    if (filterrow == "1") {
        div = document.getElementById("ul_Candidates");
        document.getElementById("btnCandidates").style.color = "rgb(47 214 254 / 3)";
    }
    else if (filterrow == "3") {
        div = document.getElementById("ul_Status");
        document.getElementById("btnStatus").style.color = "rgb(47 214 254 / 3)";
    }
    else if (filterrow == "4") {
        div = document.getElementById("ul_Submitted");
        document.getElementById("btnSubmitted").style.color = "rgb(47 214 254 / 3)";
    }

    a = div.getElementsByTagName("a");
    icon = div.getElementsByTagName("i");

    var filterparam = "";
    var filterparam1 = new Array;

    const index = tdrowcount.findIndex(object => {
        return object.rowid === filterrow;
    });

    if (index != -1) {
        var obj = {};
        obj.rowid = filterrow;
        obj.rowval = filter;
        tdrowcount.splice(index, 1, obj);
    }
    else {
        var obj = {};
        obj.rowid = filterrow;
        obj.rowval = filter;

        tdrowcount.push(obj);
    }

    for (var i = 0; i < tdrowcount.length; i++) {
        if (filterrow == tdrowcount[i].rowid) {
        }
        else {
            filterparam = tdrowcount[i].rowid;
            filterparam1.push(tdrowcount[i].rowid);
        }
    }

    if (tdrowcount.length == 1) {
        if (filterrow == 1) {
            rowval1 = 3;
            rowval2 = 4;

            inputname1 = "myInputcandidatestatus";
            ulname1 = "ul_Status";
            inputname2 = "myInputcandidatesubmittedby";
            ulname2 = "ul_Submitted";
        }
        else if (filterrow == 3) {
            rowval1 = 1;
            rowval2 = 4;

            inputname1 = "myInputcandidates";
            ulname1 = "ul_Candidates";
            inputname2 = "myInputcandidatesubmittedby";
            ulname2 = "ul_Submitted";
        }
        else if (filterrow == 4) {
            rowval1 = 1;
            rowval2 = 3;

            inputname1 = "myInputcandidates";
            ulname1 = "ul_Candidates";
            inputname2 = "myInputcandidatestatus";
            ulname2 = "ul_Status";
        }

        for (i = 1; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[filterrow];
            var td2 = tr[i].getElementsByTagName("td")[rowval1];
            var td3 = tr[i].getElementsByTagName("td")[rowval2];

            if (td1) {
                if (filterrow == 0) {
                    txtValue1 = td1.getElementsByTagName("label")[0].innerText;
                }
                else if (filterrow == 1) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                }
                else {
                    txtValue1 = td1.textContent || td1.innerText;
                }

                if (filterrow == 1) {
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                }

                else {
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                }

                if (filterrow == 1 || filterrow == 3) {
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }

                else if (filterrow == 4) {
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else {
                    txtValue3 = td3.textContent || td3.innerText;
                }

                // alert(txtValue1.toUpperCase());
                //alert(filter.toUpperCase());
                if (txtValue1.toUpperCase().trim().indexOf(filter.toUpperCase().trim()) > -1) {
                    tr[i].style.display = "";
                    var obj1 = {};
                    obj1.clientname = txtValue2;
                    tdrowval1.push(obj1);

                    var obj2 = {};
                    obj2.clientname = txtValue3.toUpperCase();
                    tdrowval2.push(obj2);
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        tdrowval1 = removeDuplicates(tdrowval1);
        tdrowval2 = removeDuplicates(tdrowval2);

        var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
        for (var i = 0; i < tdrowval1.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = tdrowval1[i].clientname;
            var strClient = str.replace(regex, replace);
            str1 += " <li onclick=searchcand('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancelcand('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#" + ulname1).empty();
        $("#" + ulname1).append(str1);

        var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
        for (var i = 0; i < tdrowval2.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = tdrowval2[i].clientname;
            var strClient = str.replace(regex, replace);
            str2 += "<li onclick=searchcand('" + strClient + "','" + rowval2 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancelcand('" + rowval2 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#" + ulname2).empty();
        $("#" + ulname2).append(str2);
    }
    else if (tdrowcount.length == 2) {
        var filterrow1 = tdrowcount[0].rowid;
        var filterrow2 = tdrowcount[1].rowid
        var filterrowval1 = tdrowcount[0].rowval;
        var filterrowval2 = tdrowcount[1].rowval;

        if (filterrow1 == 1 && filterrow2 == 3 || filterrow1 == 3 && filterrow2 == 1) {
            rowval1 = 4;
            inputname1 = "myInputcandidatesubmittedby";
            ulname1 = "ul_Submitted";
        }
        else if (filterrow1 == 3 && filterrow2 == 4 || filterrow1 == 4 && filterrow2 == 3) {
            rowval1 = 1;

            inputname1 = "myInputcandidates";
            ulname1 = "ul_Candidates";
        }
        else if (filterrow1 == 4 && filterrow2 == 1 || filterrow1 == 1 && filterrow2 == 4) {
            rowval1 = 3;

            inputname1 = "myInputcandidatestatus";
            ulname1 = "ul_Status";
        }

        for (i = 1; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[filterrow1];
            var td2 = tr[i].getElementsByTagName("td")[filterrow2];
            var td3 = tr[i].getElementsByTagName("td")[rowval1];

            if (td1) {
                if (filterrow1 == 4 && filterrow2 == 1) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 4) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("p")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 3 && filterrow2 == 1) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 3) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 4 && filterrow2 == 3) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("h6")[0].innerText;
                }
                else if (filterrow1 == 3 && filterrow2 == 4) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("p")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("h6")[0].innerText;
                }
                //alert(txtValue1.toUpperCase().trim() + "-" + filterrowval1.toUpperCase().trim() + "*" + txtValue2.toUpperCase().trim() + "-" + filterrowval2.toUpperCase().trim());
                if (txtValue1.toUpperCase().trim().indexOf(filterrowval1.toUpperCase().trim()) > -1 && txtValue2.toUpperCase().trim().indexOf(filterrowval2.toUpperCase().trim()) > -1) {
                    tr[i].style.display = "";
                    var obj1 = {};
                    obj1.clientname = txtValue3;
                    tdrowval1.push(obj1);
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        tdrowval1 = removeDuplicates(tdrowval1);

        var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
        for (var i = 0; i < tdrowval1.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = tdrowval1[i].clientname;
            var strClient = str.replace(regex, replace);
            str1 += " <li onclick=searchcand('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancelcand('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#" + ulname1).empty();
        $("#" + ulname1).append(str1);
    }
    else if (tdrowcount.length == 3) {
        var filterrow1 = tdrowcount[0].rowid;
        var filterrow2 = tdrowcount[1].rowid;
        var filterrow3 = tdrowcount[2].rowid;

        var filterrowval1 = tdrowcount[0].rowval;
        var filterrowval2 = tdrowcount[1].rowval;
        var filterrowval3 = tdrowcount[2].rowval;

        for (i = 1; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[filterrow1];
            var td2 = tr[i].getElementsByTagName("td")[filterrow2];
            var td3 = tr[i].getElementsByTagName("td")[filterrow3];

            if (td1) {
                if (filterrow1 == 4 && filterrow2 == 1 && filterrow3 == 3) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 4 && filterrow3 == 3) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 3 && filterrow2 == 1 && filterrow3 == 4) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 3 && filterrow3 == 4) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 4 && filterrow2 == 3 && filterrow3 == 1) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("h6")[0].innerText;
                }
                else if (filterrow1 == 3 && filterrow2 == 4 && filterrow3 == 1) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("p")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("h6")[0].innerText;
                }

                if (txtValue1.toUpperCase().indexOf(filterrowval1.toUpperCase()) > -1 && txtValue2.toUpperCase().indexOf(filterrowval2.toUpperCase()) > -1 && txtValue3.toUpperCase().indexOf(filterrowval3.toUpperCase()) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    for (var i = 0; i < a.length; i++) {
        if (a[i].innerText.toUpperCase().trim().indexOf(filter.toUpperCase().trim()) > -1) {
            a[i].classList.add("li_selected");
            a[i].style.display = "";
            icon[i].style.display = "";
        }
        else {
            a[i].classList.remove("li_selected");
            a[i].style.display = "none";
            icon[i].style.display = "none";
        }
    }
    //getPaging(5);
    getSearchPaging("#tblCandlist", 10);
}

function filtercancelcand(filterrow) {
    for (var i = 0; i < tdrowcount.length; i++) {
        if (tdrowcount[i].rowid == filterrow) {
            const index = tdrowcount.findIndex(object => {
                return object.rowid === filterrow;
            });

            if (index != -1) {
                var obj = {};
                obj.rowid = filterrow;
                obj.rowval = tdrowcount[index].rowval;
                tdrowcount.splice(index, 1);
            }
        }
    }

    var table = document.getElementById("tblCandlist");
    var tr = table.getElementsByTagName("tr");

    var div;

    if (filterrow == "1") {
        div = document.getElementById("ul_Candidates");
        document.getElementById("btnCandidates").style.color = "#0c0c0c";
    }
    else if (filterrow == "3") {
        div = document.getElementById("ul_Status");
        document.getElementById("btnStatus").style.color = "#0c0c0c";
    }
    else if (filterrow == "4") {
        div = document.getElementById("ul_Submitted");
        document.getElementById("btnSubmitted").style.color = "#0c0c0c";
    }

    const index = tdrowcount.findIndex(object => {
        return object.rowid === filterrow;
    });

    if (index != -1) {
        var obj = {};
        obj.rowid = filterrow;
        obj.rowval = tdrowcount[index].rowval;
        tdrowcount.splice(index, 1);
    }

    a = div.getElementsByTagName("a");
    icon = div.getElementsByTagName("i");

    //for (i = 1; i < tr.length; i++) {
    //    tr[i].style.display = "";

    //}
    //for (var i = 0; i < a.length; i++) {
    //    a[i].classList.remove("li_selected");
    //    icon[i].style.display = "none";

    //}
    if (tdrowcount.length > 0) {
        searchcand(tdrowcount[tdrowcount.length - 1].rowval, tdrowcount[tdrowcount.length - 1].rowid);
        getSearchPaging("#tblCandlist", 10);
    }
    else {
        tdrowval1.length = 0;
        tdrowval2.length = 0;
        tdrowval3.length = 0;

        var tr = table.getElementsByTagName("tr");

        inputname1 = "myInputcandidates";
        ulname1 = "ul_Candidates";
        inputname2 = "myInputcandidatestatus";
        ulname2 = "ul_Status";
        inputname3 = "myInputcandidatesubmittedby";
        ulname3 = "ul_Submitted";

        for (i = 1; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[1];
            var td2 = tr[i].getElementsByTagName("td")[3];
            var td3 = tr[i].getElementsByTagName("td")[4];

            txtValue1 = td1.getElementsByTagName("h6")[0].innerText;

            txtValue2 = td2.getElementsByTagName("span")[0].innerText;

            txtValue3 = td3.getElementsByTagName("p")[0].innerText;

            tr[i].style.display = "";
            var obj1 = {};
            obj1.clientname = txtValue1;
            tdrowval1.push(obj1);

            var obj2 = {};
            obj2.clientname = txtValue2.toUpperCase();
            tdrowval2.push(obj2);

            var obj3 = {};
            obj3.clientname = txtValue3.toUpperCase();
            tdrowval3.push(obj3);
        }
        tdrowval1 = removeDuplicates(tdrowval1);
        tdrowval2 = removeDuplicates(tdrowval2);
        tdrowval3 = removeDuplicates(tdrowval3);

        var str1 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname1 + '" onkeyup=filterFunction("' + inputname1 + '","' + ulname1 + '"); />';
        for (var i = 0; i < tdrowval1.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = tdrowval1[i].clientname;
            var strClient = str.replace(regex, replace);
            str1 += " <li onclick=searchcand('" + strClient + "','" + 1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancelcand('" + 1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#" + ulname1).empty();
        $("#" + ulname1).append(str1);

        var str2 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname2 + '" onkeyup=filterFunction("' + inputname2 + '","' + ulname2 + '"); />';
        for (var i = 0; i < tdrowval2.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = tdrowval2[i].clientname;
            var strClient = str.replace(regex, replace);
            str2 += "<li onclick=searchcand('" + strClient + "','" + 3 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval2[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancelcand('" + 3 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#" + ulname2).empty();
        $("#" + ulname2).append(str2);

        var str3 = '<input type="text" class="dataTable-input dataTable-input2 w-95 text-xxs" style="margin: 0px 6px;" placeholder="Search.." id="' + inputname3 + '" onkeyup=filterFunction("' + inputname3 + '","' + ulname3 + '"); />';
        for (var i = 0; i < tdrowval3.length; i++) {
            var regex = /\s/g;
            var replace = "%20";
            var str = tdrowval3[i].clientname;
            var strClient = str.replace(regex, replace);
            str3 += " <li onclick=searchcand('" + strClient + "','" + 4 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval3[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancelcand('" + 4 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
        }
        $("#" + ulname3).empty();
        $("#" + ulname3).append(str3);
    }
    getSearchPaging("#tblCandlist", 10);
}

function createheadertable() {
    var table = document.getElementById("tblJoblist");
    if (strTile == "Open") {
        var header = table.createTHead();

        var row = header.insertRow(0);
        row.style = "border-bottom: 2px solid #ababab;";

        var cell = row.insertCell(0);
        cell.innerHTML = "Job Title" + "<button id='btnjobsfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
            "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_job' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell.className = "text-uppercase";
        cell.className += " text-secondary";
        cell.className += " text-xxs";
        cell.className += " font-weight-bolder";
        cell.className += " ps-4";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "Location";

        cell1.className = "text-uppercase";
        cell1.className += " text-secondary";
        cell1.className += " text-xxs";
        cell1.className += " font-weight-bolder";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "Rate";

        cell2.className = "text-uppercase";
        cell2.className += " text-secondary";
        cell2.className += " text-xxs";
        cell2.className += " font-weight-bolder";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "Skill";

        cell3.className = "text-uppercase";
        cell3.className += " text-secondary";
        cell3.className += " text-xxs";
        cell3.className += " font-weight-bolder";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "Priority";

        cell4.className = "text-uppercase";
        cell4.className += " text-secondary";
        cell4.className += " text-xxs";
        cell4.className += " font-weight-bolder";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "Open Date" + "<button id='btnopendatefilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none !important; box-shadow: none !important; color: #0c0c0c; font-size: 12px;'>" +
            "<i class='fas fa-filter' style='margin: 4px;'></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_jobopendate' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell5.className = "text-uppercase";
        cell5.className += " text-secondary";
        cell5.className += " text-xxs";
        cell5.className += " font-weight-bolder";

        var cell6 = row.insertCell(6);
        cell6.innerHTML = "Client" + "<button id='btnclientfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none !important; box-shadow: none !important; color: #0c0c0c; font-size: 12px;'>" +
            "<i class='fas fa-filter' style='margin: 4px;'></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_jobClient' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell6.className = "text-uppercase";
        cell6.className += " text-secondary";
        cell6.className += " text-xxs";
        cell6.className += " font-weight-bolder";

        var cell7 = row.insertCell(7);
        cell7.innerHTML = "Submissions";

        cell7.className = "text-uppercase";
        cell7.className += " text-secondary";
        cell7.className += " text-xxs";
        cell7.className += " font-weight-bolder";

        var cell8 = row.insertCell(8);
        cell8.innerHTML = "";

        cell8.className = "text-uppercase";
        cell8.className += " text-secondary";
        cell8.className += " text-xxs";
        cell8.className += " font-weight-bolder";
    }

    else if (strTile == "No Submission") {
        var header = table.createTHead();

        var row = header.insertRow(0);
        row.style = "border-bottom: 2px solid #ababab;";

        var cell = row.insertCell(0);
        cell.innerHTML = "Job Title" + "<button id='btnjobsfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
            "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_job' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell.className = "text-uppercase";
        cell.className += " text-secondary";
        cell.className += " text-xxs";
        cell.className += " font-weight-bolder";
        cell.className += " ps-4";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "Location";

        cell1.className = "text-uppercase";
        cell1.className += " text-secondary";
        cell1.className += " text-xxs";
        cell1.className += " font-weight-bolder";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "Rate";

        cell2.className = "text-uppercase";
        cell2.className += " text-secondary";
        cell2.className += " text-xxs";
        cell2.className += " font-weight-bolder";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "Skill";

        cell3.className = "text-uppercase";
        cell3.className += " text-secondary";
        cell3.className += " text-xxs";
        cell3.className += " font-weight-bolder";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "Priority";

        cell4.className = "text-uppercase";
        cell4.className += " text-secondary";
        cell4.className += " text-xxs";
        cell4.className += " font-weight-bolder";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "Open Date";

        cell5.className = "text-uppercase";
        cell5.className += " text-secondary";
        cell5.className += " text-xxs";
        cell5.className += " font-weight-bolder";

        var cell6 = row.insertCell(6);
        cell6.innerHTML = "Client";

        cell6.className = "text-uppercase";
        cell6.className += " text-secondary";
        cell6.className += " text-xxs";
        cell6.className += " font-weight-bolder";

        var cell7 = row.insertCell(7);
        cell7.innerHTML = "";

        cell7.className = "text-uppercase";
        cell7.className += " text-secondary";
        cell7.className += " text-xxs";
        cell7.className += " font-weight-bolder";

        //document.getElementById("btnjobsfilter").style.color = "#0c0c0c";
        //document.getElementById("btnpriorityfilter").style.color = "#0c0c0c";
    }

    else if (strTile == "Interview") {
        var header = table.createTHead();

        var row = header.insertRow(0);
        row.style = "border-bottom: 2px solid #ababab;";

        var cell = row.insertCell(0);
        cell.innerHTML = "Job Title" + "<button id='btnjobsfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
            "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_job' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell.className = "text-uppercase";
        cell.className += " text-secondary";
        cell.className += " text-xxs";
        cell.className += " font-weight-bolder";
        cell.className += " ps-4";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "Location";

        cell1.className = "text-uppercase";
        cell1.className += " text-secondary";
        cell1.className += " text-xxs";
        cell1.className += " font-weight-bolder";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "Rate";

        cell2.className = "text-uppercase";
        cell2.className += " text-secondary";
        cell2.className += " text-xxs";
        cell2.className += " font-weight-bolder";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "Skill";

        cell3.className = "text-uppercase";
        cell3.className += " text-secondary";
        cell3.className += " text-xxs";
        cell3.className += " font-weight-bolder";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "Priority";

        cell4.className = "text-uppercase";
        cell4.className += " text-secondary";
        cell4.className += " text-xxs";
        cell4.className += " font-weight-bolder";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "Open Date";

        cell5.className = "text-uppercase";
        cell5.className += " text-secondary";
        cell5.className += " text-xxs";
        cell5.className += " font-weight-bolder";

        var cell6 = row.insertCell(6);
        cell6.innerHTML = "Client";

        cell6.className = "text-uppercase";
        cell6.className += " text-secondary";
        cell6.className += " text-xxs";
        cell6.className += " font-weight-bolder";

        var cell7 = row.insertCell(7);
        cell7.innerHTML = "Interview";

        cell7.className = "text-uppercase";
        cell7.className += " text-secondary";
        cell7.className += " text-xxs";
        cell7.className += " font-weight-bolder";

        var cell8 = row.insertCell(8);
        cell8.innerHTML = "";

        cell8.className = "text-uppercase";
        cell8.className += " text-secondary";
        cell8.className += " text-xxs";
        cell8.className += " font-weight-bolder";
    }

    else if (strTile == "Closure") {
        var header = table.createTHead();

        var row = header.insertRow(0);
        var cell = row.insertCell(0);
        row.style = "border-bottom: 2px solid #ababab;";

        cell.innerHTML = "Job Title" + "<button id='btnjobsfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
            "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_job' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell.className = "text-uppercase";
        cell.className += " text-secondary";
        cell.className += " text-xxs";
        cell.className += " font-weight-bolder";
        cell.className += " ps-4";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "Location";

        cell1.className = "text-uppercase";
        cell1.className += " text-secondary";
        cell1.className += " text-xxs";
        cell1.className += " font-weight-bolder";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "Rate";

        cell2.className = "text-uppercase";
        cell2.className += " text-secondary";
        cell2.className += " text-xxs";
        cell2.className += " font-weight-bolder";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "Open Date";

        cell3.className = "text-uppercase";
        cell3.className += " text-secondary";
        cell3.className += " text-xxs";
        cell3.className += " font-weight-bolder";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "Boarded Date";

        cell4.className = "text-uppercase";
        cell4.className += " text-secondary";
        cell4.className += " text-xxs";
        cell4.className += " font-weight-bolder";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "Client";

        cell5.className = "text-uppercase";
        cell5.className += " text-secondary";
        cell5.className += " text-xxs";
        cell5.className += " font-weight-bolder";

        var cell6 = row.insertCell(6);
        cell6.innerHTML = "Closure";

        cell6.className = "text-uppercase";
        cell6.className += " text-secondary";
        cell6.className += " text-xxs";
        cell6.className += " font-weight-bolder";

        var cell7 = row.insertCell(7);
        cell7.innerHTML = "On Boarded";

        cell7.className = "text-uppercase";
        cell7.className += " text-secondary";
        cell7.className += " text-xxs";
        cell7.className += " font-weight-bolder";

        var cell8 = row.insertCell(8);
        cell8.innerHTML = "";

        cell8.className = "text-uppercase";
        cell8.className += " text-secondary";
        cell8.className += " text-xxs";
        cell8.className += " font-weight-bolder";
    }

    else if (strTile == "Inactive") {
        var header = table.createTHead();

        var row = header.insertRow(0);
        row.style = "border-bottom: 2px solid #ababab;";

        var cell = row.insertCell(0);
        cell.innerHTML = "Job Title" + "<button id='btnjobsfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
            "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_job' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell.className = "text-uppercase";
        cell.className += " text-secondary";
        cell.className += " text-xxs";
        cell.className += " font-weight-bolder";
        cell.className += " ps-4";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "Location";

        cell1.className = "text-uppercase";
        cell1.className += " text-secondary";
        cell1.className += " text-xxs";
        cell1.className += " font-weight-bolder";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "Rate";

        cell2.className = "text-uppercase";
        cell2.className += " text-secondary";
        cell2.className += " text-xxs";
        cell2.className += " font-weight-bolder";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "Priority";

        cell3.className = "text-uppercase";
        cell3.className += " text-secondary";
        cell3.className += " text-xxs";
        cell3.className += " font-weight-bolder";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "Open Date";

        cell4.className = "text-uppercase";
        cell4.className += " text-secondary";
        cell4.className += " text-xxs";
        cell4.className += " font-weight-bolder";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "Client";

        cell5.className = "text-uppercase";
        cell5.className += " text-secondary";
        cell5.className += " text-xxs";
        cell5.className += " font-weight-bolder";

        var cell6 = row.insertCell(6);
        cell6.innerHTML = "Submissions";

        cell6.className = "text-uppercase";
        cell6.className += " text-secondary";
        cell6.className += " text-xxs";
        cell6.className += " font-weight-bolder";

        var cell7 = row.insertCell(7);
        cell7.innerHTML = "Status";

        cell7.className = "text-uppercase";
        cell7.className += " text-secondary";
        cell7.className += " text-xxs";
        cell7.className += " font-weight-bolder";

        var cell8 = row.insertCell(8);
        cell8.innerHTML = "Closed By";

        cell8.className = "text-uppercase";
        cell8.className += " text-secondary";
        cell8.className += " text-xxs";
        cell8.className += " font-weight-bolder";

        var cell9 = row.insertCell(9);
        cell9.innerHTML = "";

        cell9.className = "text-uppercase";
        cell9.className += " text-secondary";
        cell9.className += " text-xxs";
        cell9.className += " font-weight-bolder";
    }

    else if (strTile == "Overall") {
        var header = table.createTHead();

        var row = header.insertRow(0);
        row.style = "border-bottom: 2px solid #ababab;";

        var cell = row.insertCell(0);
        cell.innerHTML = "Job Title" + "<button id='btnjobsfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='background: none!important; box-shadow: none!important; color: #0c0c0c; font-size: 12px; '>" +
            "<i class='fas fa-filter' style ='margin:4px;' ></i>" +
            "</button>" +
            "<ul class='dropdown-menu text-xxs scrollbar' aria-labelledby='dropdownMenuButton' id='ul_job' style='box-shadow: 3px 8px 19px 0px; overflow: scroll; height: 140px; overflow-x: hidden; width: 200px;'>" +
            "</ul>";

        cell.className = "text-uppercase";
        cell.className += " text-secondary";
        cell.className += " text-xxs";
        cell.className += " font-weight-bolder";
        cell.className += " ps-4";

        var cell1 = row.insertCell(1);
        cell1.innerHTML = "Location";

        cell1.className = "text-uppercase";
        cell1.className += " text-secondary";
        cell1.className += " text-xxs";
        cell1.className += " font-weight-bolder";

        var cell2 = row.insertCell(2);
        cell2.innerHTML = "Rate";

        cell2.className = "text-uppercase";
        cell2.className += " text-secondary";
        cell2.className += " text-xxs";
        cell2.className += " font-weight-bolder";

        var cell3 = row.insertCell(3);
        cell3.innerHTML = "Priority";

        cell3.className = "text-uppercase";
        cell3.className += " text-secondary";
        cell3.className += " text-xxs";
        cell3.className += " font-weight-bolder";

        var cell4 = row.insertCell(4);
        cell4.innerHTML = "Open Date";

        cell4.className = "text-uppercase";
        cell4.className += " text-secondary";
        cell4.className += " text-xxs";
        cell4.className += " font-weight-bolder";

        var cell5 = row.insertCell(5);
        cell5.innerHTML = "Client";

        cell5.className = "text-uppercase";
        cell5.className += " text-secondary";
        cell5.className += " text-xxs";
        cell5.className += " font-weight-bolder";

        var cell6 = row.insertCell(6);
        cell6.innerHTML = "Submissions";

        cell6.className = "text-uppercase";
        cell6.className += " text-secondary";
        cell6.className += " text-xxs";
        cell6.className += " font-weight-bolder";

        var cell7 = row.insertCell(7);
        cell7.innerHTML = "Remark";

        cell7.className = "text-uppercase";
        cell7.className += " text-secondary";
        cell7.className += " text-xxs";
        cell7.className += " font-weight-bolder";

        var cell8 = row.insertCell(8);
        cell8.innerHTML = "Status";

        cell8.className = "text-uppercase";
        cell8.className += " text-secondary";
        cell8.className += " text-xxs";
        cell8.className += " font-weight-bolder";

        var cell9 = row.insertCell(9);
        cell9.innerHTML = "";

        cell9.className = "text-uppercase";
        cell9.className += " text-secondary";
        cell9.className += " text-xxs";
        cell9.className += " font-weight-bolder";
    }
}