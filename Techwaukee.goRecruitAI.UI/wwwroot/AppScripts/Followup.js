var PrimaryrecruiterID;
var Commentsbtn;
$(document).ready(function () {
    $("#lblDescription").append(strDesc);
  /*  setSession("Page", "Follow");*/
    $('#lblEmployeename').text(getSession('Name'));
    $("#anchDashboard").removeClass("active");
    $("#anchJob").addClass("active");
    $('#lblPagetitle').text("Job View");
    $('#lblPagetitle1').text("Job View");
    $('#lblPagetitle2').text("Jobs");

    $('#dropdownMenuButton').css('display', 'none');
    $('#lblDurationview').css('display', 'none');

    localStorage.removeItem("prevvisPage");

    var url = window.location.href;
    hashes = url.split("?")[1];
    if (getSession('Designation') == "4001") {
        document.getElementById("anchedit").style.display = "none";
        document.getElementById("div_update").style.display = "none";
    }
    else {
        document.getElementById("anchedit").style.display = "block";
    }

    if (hashes != null) {
        var hash = hashes.split('&');
        var params = hash[0].split("=");
        if (hash.length == 1) {
            //getJobFollowupData(params[1], "", getSession('TWE_ID'));
            getJobFollowupDatajob(params[1], "", getSession('TWE_ID'));
        }

        else if (hash.length > 1) {
            if (hash.length == 2) {
                //getJobFollowupData(params[1], "Feedback", "");
                getJobFollowupDatajob(params[1], "Feedback", "");
                $('#btnAdd').css('display', 'none');
            }
            else if (hash.length == 4) {
                var params1 = hash[2].split("=");
                var params2 = hash[3].split("=");
                var regex = "%20";
                var replace = " ";
                var strjob = params2[1];
                var strcandjob = strjob.replaceAll(regex, replace);
                document.getElementById("Candidatename").innerHTML = strcandjob;
                document.getElementById("candidatelist").style.display = "none";
                document.getElementById("Externalcandidatename").style.display = "block";

                Commentsbtn = params1[1];
                if (params1[1] == "BS") {
                    //getJobFollowupData(params[1], "", getSession('TWE_ID'));
                    getJobFollowupDatajob(params[1], "", getSession('TWE_ID'));
                    document.getElementById("Candtable").style.display = "none";
                    document.getElementById("btnCmt").style.display = "none";
                }
                else {
                    //getJobFollowupData(params[1], "Feedback", params1[1]);
                    getJobFollowupDatajob(params[1], "Feedback", params1[1]);
                    $('#btnAdd').css('display', 'none');
                }
            }
        }
    }
    if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager") {
        $('#div_matchcand').css('display', 'inline');
        $('#icon_edit').css('display', 'block');
        $('#btnCmt').css('display', 'inline');
        $("#div_OpenComments").css('display', 'inline');
        $("#div_comments").css('display', 'block');
    }
    else if (getSession('Rolename') == "Vendor") {
        //$('#div_matchcand').css('display', 'none');
        $('#btnCmt').css('display', 'none');
        $('#icon_edit').css('display', 'none');
        $("#div_OpenComments").css('display', 'none');
        $("#div_comments").css('display', 'none');
    }
    else {
        $('#div_matchcand').css('display', 'inline');
        $('#icon_edit').css('display', 'none');
        $('#btnCmt').css('display', 'none');
        $("#div_OpenComments").css('display', 'none');
        $("#div_comments").css('display', 'none');
    }

    if (Commentsbtn == "BS") {
        document.getElementById("btnCmt").style.display = "none";
    }
});

function getJobFollowupDatajob(jobid, type, createdBy) {
    Jobcode = jobid;
    Createdby = createdBy;
    var strdata = { "Jobid": jobid, "type": type, "createdBy": createdBy }
    common_api_ajax_request("api/FollowupJob", "FOLLOWJOB", strdata);
}

var CategoryType;
var Jobcode;
var Createdby
function getJobFollowupData(Category) {
    //var Category = "Added Candidate";

    //Jobcode = jobid;

    //var Category = "Bench Candidate";
    //var Category = "Rejected";
    //var Category = "Applied Candidate";
    //var Category = "Draft Candidate";
    //var Category = "Vendor Candidate";
    //var Category = "Closure";
    //var Category = "Interview Candidate";

    CategoryType = Category;
    var strdata = { "Jobid": Jobcode, "type": "", "createdBy": Createdby, "Category": Category }
    //common_api_ajax_request("api/FollowupJob", "FOLLOWJOB", strdata);
    common_api_ajax_request("api/JobViewData", "FOLLOWJOBTable", strdata);
}

var Jobskill = new Array;
var Candidateskill = new Array;
var AllData = new Array;

var SkillPercentage = 0;
var Clientnamechecking;

function successCallBack(key, value) {
    var response = value.d;
    var resData = response.data;

    if (key == "FOLLOWJOB") {
        $("#lblJobtitlePopup").text(resData.JobTitle);
        $("#lblJobidPopup").text(resData.Jobcodename);

        $("#anchupdate").attr("title","Update");
        $("#anchedit").attr("title", "Edit");
        $("#anchcopy").attr("title", "Copy Job details");
        $("#anch_website").attr("title", "Website");
        $("#anch_publish").attr("title", "Published");

        $("#imgJobimage").attr("src", resData.Jobimage);
        $("#lblJobtitle").text(resData.JobTitle);
        $("#lblJobid").text(resData.Jobcodename);
        $("#lblJobstatus").text(resData.Jobstatus);
        if (resData.Jobstatus == "Open") {
            $('#btnAdd').css('display', 'inline');

            $('#lblJobstatus').addClass("text-gradient text-success mb-2 text-sm");
            $("#lblOpenComments").text(resData.OpenComments);
        }
        else if (resData.Jobstatus == "Close") {
            $('#btnAdd').css('display', 'none');
            $("#lblCloseComments").text(resData.CloseComments);

            $('#lblJobstatus').addClass("text-gradient text-danger mb-2 text-sm");
        }
        else if (resData.Jobstatus == "Hold") {
            $('#btnAdd').css('display', 'none');
            $("#lblCloseComments").text(resData.CloseComments);

            $('#lblJobstatus').addClass("text-gradient text-dark mb-2 text-sm");
        }

        if (resData.Publish_Web == "Yes") {
            $('#div_publish').css('display', 'block');
            $('#div_website').css('display', 'block');
        }
        else {
            $('#div_publish').css('display', 'none');
            $('#div_website').css('display', 'none');
        }

        $("#lblMonth").text(resData.Duration);
        $("#lblMonthDuration").text(resData.Durationtype+" ");
        $("#lblEmptype").text(resData.EmplType + " ");
        $("#lblCity").text(resData.City);
        $("#lblState").text(resData.State);
        $("#lblCountry").text(resData.Country);
        $("#lblLocation").text(resData.Location + " ");
        $("#lblClientname").text(resData.Clientname);
        $("#lblContactperson").text(resData.Contactname);
        if ($("#lblCity").text() == "") {
            $('#lblCity1').css('display', 'none');
        }
        else {
            $('#lblCity1').css('display', 'inline');
        }

        if ($("#lblState").text() == "") {
            $('#lblState1').css('display', 'none');
        }
        else {
            $('#lblState1').css('display', 'inline');
        }

        Clientnamechecking = resData.Clientname
        $("#lblRate1").text(resData.Rate1);
        $("#lblWorktype1").text(resData.WorkType1);
        $("#lblRegion1").text(resData.Currency1);

        $("#lblRate2").text(resData.Rate2);
        $("#lblWorktype2").text(resData.WorkType2);
        $("#lblRegion2").text(resData.Currency2);

        $("#lblprimarycontact").text(resData.Primaryrecruitercontact);
        PrimaryrecruiterID = resData.PrimaryrecruiterID;

        if (resData.Rate2 == "0" || resData.Rate2 == "") {
            $('#div_rate').css('display', 'none');
        }

        else if (resData.Rate2 != "0" || resData.Rate2 != "") {
            $('#div_rate').css('display', 'block');
        }

        $("#lblCreatedname").text(resData.Created_By);
        $("#lblcreatedate").text(resData.Created_On);
        $("#lblcreatetime").text(resData.Created_Time);
        $("#lblUpdatedname").text(resData.Updated_By);
        $("#lblUpdatedate").text(resData.Updated_On);
        $("#lblUpdatetime").text(resData.Updated_Time);
        $("#lblAssignTovend").text(resData.AssignedToVendor);
        $("#lblAssignTovendcon").text(resData.AssignedToVendorContact);
        if (resData.Updated_By == "") {
            $('#update_div').css('display', 'none');
        }
        else {
            $('#update_div').css('display', 'block');
        }

        $("#lblPrioritylevel").text(resData.Prioritylevel);
        $("#lblAssignto").text(resData.AssignedTo);
        $("#lblSkill").text(resData.Skill);

        if (resData.Skill != "" && resData.Skill != null) {
            Jobskill = resData.Skill.trim().split('|');
        }

        $("#lblDescription").empty();
        $("#lblDescription").append(resData.Description);

        $("#lblRemarks").empty();

        var strRemarks = "";

        for (var x = 0; x < resData.jobremarksinfo.length; x++) {
            strRemarks += resData.jobremarksinfo[x].Remarks + "<br/>";
        }

        $("#lblRemarks").append(strRemarks);

        //if (document.getElementById("lblRemarks").innerHTML != "") {
        //    document.getElementById("div_RemarksUS").style.display = "block";
        //}
        //else {
        //    document.getElementById("div_RemarksUS").style.display = "none";
        //}

        //vishnu comment by 10 may 2023
        if (resData.jobremarksinfo.length!=0) {
            if (resData.jobremarksinfo[0].Remarks != "") {
                $("#lbljobremarks").append(resData.jobremarksinfo[0].Remarks);
                $("#lbllatestupdatename").append(resData.jobremarksinfo[0].Created_By);
            }
        }

        if (resData.CloseComments != "") {
            document.getElementById("div_CloseComments").style.display = "block";
        }
        else {
            document.getElementById("div_CloseComments").style.display = "none";
        }

        setSession("Jobid", resData.Jobcodename);
        setSession("JobTitle", resData.JobTitle);
        setSession("Jobimg", resData.Jobimage);
        setSession("JobDuration", resData.Duration);
        setSession("JobDurationtype", resData.Durationtype);
        setSession("Type", resData.EmplType);
        setSession("Location", resData.Location);
        setSession("City", resData.City);
        setSession("State", resData.State);

        //resData.matchingdatabasecandidatelistinfo = removecandDuplicates(resData.matchingdatabasecandidatelistinfo);
        //resData.matchingcandidatelistinfo = removecandDuplicates(resData.matchingcandidatelistinfo);

        //matching_canddatabase(resData.matchingdatabasecandidatelistinfo);
        //matching_cand(resData.matchingcandidatelistinfo);
        AllData = resData.matchingcandidatelistinfo;

        getPaging(5);
        //getPagination('#tblCandlist', 5);

        if (resData.lstPrimarySkill != "") {
            //document.getElementById("div_skill2").style.display = "block";
            //document.getElementById("div_skill1").style.display = "none";

            for (var i = 0; i < resData.lstPrimarySkill.length; i++) {
                var priSkilltble =
                    "<div class='col-lg-3 mt-2'>" +
                    "<button type='button' class='bg-gray-100 py-1 d-inline-block border border-light border-radius-md w-100 mb-1'>" +
                    "<div>" +
                    "<div class='row'>" +
                    "<div class='col-md-8 text-left'>" +
                    "<p class='mt-1 mb-0 ps-2 btn-tooltip textsmall' onmouseover=openskill('" + resData.lstPrimarySkill[i].JobSkillName + "'); id='lblskill11' data-bs-toggle='tooltip' data-bs-placement='bottom' title='" + resData.lstPrimarySkill[i].JobSkillName+"' data-container='body' data-animation='true' style='height: 22px !important; overflow: hidden;'>" +
                    resData.lstPrimarySkill[i].JobSkillName +
                    "</p>" +
                    "</div>" +
                    "<div class='col-md-4 ps-0 pe-4 text-right'>" +
                    "<p class='textsmall mb-0' style='margin-top: 6px;'>" + resData.lstPrimarySkill[i].JobYrsofExp + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</button>" +
                    "</div>";

                $("#div_primaryskill").append(priSkilltble);
            }
        }

        if (resData.lstSecondarySkill != "") {
            for (var i = 0; i < resData.lstSecondarySkill.length; i++) {
                var Skilltble =
                    "<div class='col-lg-3 mt-2'>" +
                    "<button type='button' class='bg-gray-100 py-1 d-inline-block border border-light border-radius-md w-100 mb-1'>" +
                    "<div>" +
                    "<div class='row'>" +
                    "<div class='col-md-8 text-left'>" +
                    "<p class='mt-1 mb-0 ps-2 btn-tooltip textsmall' onmouseover=openskill2('lblskill11'); id='lblskill11' data-bs-toggle='tooltip' data-bs-placement='bottom' title='" + resData.lstSecondarySkill[i].JobSkillName +"' data-container='body' data-animation='true' style='height: 22px !important; overflow: hidden;'>" +
                    resData.lstSecondarySkill[i].JobSkillName +
                    "</p>" +
                    "</div>" +
                    "<div class='col-md-4 ps-0 pe-4 text-right'>" +
                    "<p class='textsmall mb-0' style='margin-top: 6px;'>" + resData.lstSecondarySkill[i].JobYrsofExp + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</button>" +
                    "</div>";

                $("#div_secondaryskill").append(Skilltble);
            }
        }

        if (resData.Closure != 0) {
            document.getElementById("li_Closure").style.display = "block";
            document.getElementById("lblclosurecount").innerHTML = pad2(resData.Closure);
        }
        if (resData.Interview != 0) {
            document.getElementById("li_Interview").style.display = "block";
            document.getElementById("lblinterviewcount").innerHTML = pad2(resData.Interview);
        }
        if (resData.Added_cand != 0) {
            document.getElementById("li_InProgress").style.display = "block";
            document.getElementById("lblinprogresscount").innerHTML = pad2(resData.Added_cand);
        }
        if (resData.Applied_Cand != 0) {
            document.getElementById("li_Applied").style.display = "block";
            document.getElementById("lblappliedcount").innerHTML = pad2(resData.Applied_Cand);
        }
        if (resData.draft_cand != 0) {
            document.getElementById("li_Draft").style.display = "block";
            document.getElementById("lbldraftcount").innerHTML = pad2(resData.draft_cand);
        }
        if (resData.Rejected != 0) {
            document.getElementById("li_Rejected").style.display = "block";
            document.getElementById("lblrejectedcount").innerHTML = pad2(resData.Rejected);
        }

        if (resData.BenchCand != 0) {
            document.getElementById("li_Bench").style.display = "block";
            document.getElementById("lblbenchcount").innerHTML = pad2(resData.BenchCand);
        }
        if (resData.VendorCand != 0) {
            document.getElementById("li_Vendor").style.display = "block";
            document.getElementById("lblvendorcount").innerHTML = pad2(resData.VendorCand);
        }

        if (resData.Closure != 0) {
            getJobFollowupData('Closure');
            document.getElementById("anch_Closure").classList.add("active");
             $("#anch_Closure").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.Interview != 0) {
            getJobFollowupData('Interview Candidate');
            document.getElementById("a_Interview").classList.add("active");
            $("#a_Interview").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.Added_cand != 0) {
            getJobFollowupData('Added Candidate');
            document.getElementById("ach_Inprogress").classList.add("active");
            $("#ach_Inprogress").attr("aria-selected", true);
            //document.getElementById("a_InProgress").classList.add("active");
            //$("#a_InProgress").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.Applied_Cand != 0) {
            getJobFollowupData('Applied Candidate');
            document.getElementById("ach_InApplied").classList.add("active");
            $("#ach_InApplied").attr("aria-selected", true);
            //document.getElementById("a_InProgress").classList.add("active");
            //$("#a_InProgress").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.draft_cand != 0) {
            getJobFollowupData('Draft Candidate');
            document.getElementById("ach_InDraft").classList.add("active");
            $("#ach_InDraft").attr("aria-selected", true);
            //document.getElementById("a_InProgress").classList.add("active");
            //$("#a_InProgress").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.Rejected != 0) {
            getJobFollowupData('Rejected');
            document.getElementById("anch_Rejected").classList.add("active");
            $("#anch_Rejected").attr("aria-selected", true);
            //document.getElementById("a_InProgress").classList.add("active");
            //$("#a_InProgress").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.BenchCand != 0) {
            getJobFollowupData('Bench Cand');
            document.getElementById("ach_InBench").classList.add("active");
            $("#ach_InBench").attr("aria-selected", true);
            //document.getElementById("a_InProgress").classList.add("active");
            //$("#a_InProgress").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }
        else if (resData.VendorCand != 0) {
            getJobFollowupData('Vendor Cand');
            document.getElementById("ach_InVendor").classList.add("active");
            $("#ach_InVendor").attr("aria-selected", true);
            //document.getElementById("a_InProgress").classList.add("active");
            //$("#a_InProgress").attr("aria-selected", true);
            //$("#a_InProgress").click();
        }

        stopLoader();
    }

    else if (key == "GETJOBCOMMENTS") {
        document.getElementById("div_Comments").style.display = "block";
        $("#lblComments").empty();

        var strRemarks = "";

        for (var x = 0; x < resData.lstRemarks.length; x++) {
            strRemarks += resData.lstRemarks[x].Remarks + "<br/>" + "  -  " + "<b>" + resData.lstRemarks[x].Created_By + "   -  " + resData.lstRemarks[x].Created_On + "  -  " + resData.lstRemarks[x].Created_Time + "</b>" + "<hr>";
        }

        $("#lblComments").append(strRemarks);
        stopLoader();
    }

    else if (key == "ADDJOBCOMMENTS") {
        stopLoader();
        $("#msgpopup1").modal('show');
        //document.getElementById("lblComments").innerHTML = resData.remarks
    }

    else if (key == "CANDSEARCH") {
        //var listdata = resData._lstcandilist;

        createCandTable(resData);
        getPaging(5);
        //getPagination('#tblCandlist', 5);
        stopLoader();
    }

    else if (key == "FOLLOWJOBTable") {
        var listdata = resData.candidatelistinfo;
        if (CategoryType == "Matching") {
            MatchingProfile = listdata;
            createCandTableMatching("Matching");
        }
        else {
            //for (var i = 0; i < listdata.length; i++) {
            //    $("#hdnCandid").val(listdata[i].candidateid);
            //    $("#lblCandidatename").text(listdata[i].candidatename);
            //    $("#lblMobileNo").text(listdata[i].candidatemobno);
            //    $("#lblMailid").text(listdata[i].candidateemailid);
            //}

            createCandTableNew(listdata);
        }

        stopLoader();
    }
    else if (key == "CANDFEEDBACK") {
        popupfeedbackopen();
        if (resData != "") {
            $('#div_candfeedback').css('display', 'block');
            //getContactpersonData(resData.clientid);
            //getTimezoneData();
            feedback(resData,"Job");
        }
        stopLoader();
    }

    //if (document.getElementById("txtClosecom").value != "") {
    //    document.getElementById("div_CloseComments").style.display = "block";
    //}

    //else if (document.getElementById("txtRemarksUS").value != "") {
    //    document.getElementById("div_RemarksUS").style.display = "block";
    //}

    else if (key == "CandidateNotQual") {
        $("#feedbackpopup").modal("hide")
        //if ("AP") {
        //    getJobFollowupData('Applied Candidate');
        //}
        //else {
        //    getJobFollowupData('Bench Cand');
        //}

        var url = window.location.href;
        hashes = url.split("?")[1];

        if (hashes != null) {
            var hash = hashes.split('&');
            var params = hash[0].split("=");

            getJobFollowupDatajob(params[1], "", getSession('TWE_ID'));
        }

        stopLoader();
    }
}

$('#maxRows').on('change', function () {
    getPaging($(this).val());
    //getPagination('#tblCandlist', $(this).val());
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function getCandPage() {
    var val1 = $('#txtSearch').val();
    var matches = val1.match(/\d+/g);
    var serStr = "";
    if (matches != null) {
        var d = new Date(val1);
        serStr = formatDate(d);
    }
    else {
        serStr = $('#txtSearch').val();
    }

    var st = getSession('Duration').split("$");

    var strdata = { "jobid": $("#lblJobid").text(), "Startdate": st[0], "Enddate": st[1], "searchkey": serStr };
    if ($('#txtSearch').val() != "") {
        common_api_ajax_request("api/FollowupSearch", "CANDSEARCH", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        //alert("fill");
    }
}

function gotojobpage(candidateid) {
    if (Clientnamechecking == "Techwaukee") {
        window.location.href = 'CandidateViewInternalUS.aspx?id=' + candidateid;
    }
    else {
        window.location.href = "Candidate_View.aspx?id=" + candidateid;
    }
}

function gotoJobPage() {
    localStorage.removeItem("prevvisPage");
    localStorage.setItem("prevvisPage", window.location.href);
    const previousPageUrl = document.referrer;

    if (getSession('Designation') == "4001") {
        if (previousPageUrl.includes("Candidate_View.aspx")) {
            window.location.href = previousPageUrl;
        }
        else {
            window.location.href = "JobList.aspx";
        }
    }
    else if (getSession('Designation') == "4000" || getSession('Designation') == "4004" || getSession('Designation') == "4002") {
        if (previousPageUrl.includes("Candidate_View.aspx")) {
            window.location.href = previousPageUrl;
        }
        else {
            window.location.href = "ManagerJobList.aspx";
        }
    }
    else if (getSession('Rolename') == "Vendor") {
        window.location.href = "SupplierDashboard.aspx";
    }
}

function matching_canddatabase(data) {
    var str1 = "<ul class='list-group'>";
    var strratingdiv = "";
    var strImg = "";
    for (var f = 0; f < data.length; f++) {
        SkillPercentage = 0;
        Candidateskill = data[f].additionalskill.split(',');
        AddMark = parseFloat(100 / Jobskill.length);

        for (var p = 0; p < Jobskill.length; p++) {
            for (var j = 0; j < Candidateskill.length; j++) {
                if (Jobskill[p].toUpperCase().trim() == Candidateskill[j].toUpperCase().trim()) {
                    SkillPercentage = parseFloat(SkillPercentage) + parseFloat(AddMark);
                }
            }
        }

        data[f].skillpercentage = SkillPercentage;
    }
    var sorter1 = (a, b) => a.skillpercentage > b.skillpercentage ? 1 : -1;

    data.sort(sorter1);
    data.reverse(sorter1);
    //console.log(data);

    var g = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i].linkedinURL == "") {
            strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
        }
        else if (data[i].linkedinURL != "") {
            strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
        }

        strratingdiv = "<div class='row'>";

        for (var k = 1; k <= parseInt(data[i].rating); k++) {
            strratingdiv += "<span id='mrat_" + k + "' class='fa fa-star ratechecked' aria-hidden='true'></span>";
        }
        strratingdiv += "</div>";

        var p = (Math.round(data[i].skillpercentage) + Math.round(data[i].descmatchingpercentage));

        var pers = Math.round(p / 2);

        if (pers > 0) {
            g++;

            str1 += "<li class='list-group-item border-0 d-flex align-items-center px-0 mb-2'>" +

                "<div class='col-md-12 zm'>" +
                "<div class='row'>" +
                "<div class='col-md-12'>" +
                "<div class='row'>" +
                "<div class='col-md-12 pe-0'>" +
                "<div class='row'>" +
                "<div class='col-md-1 ps-2'>" +
                "<a href='" + data[i].linkedinURL + "' target='_blank'>" +
                strImg +
                "</a>" +
                "</div>" +
                "<div class='col-md-7 mt-1'>" +
                "<div class='d-flex'>" +
                "<div class='d-flex flex-column justify-content-center'>" +
                "<span class='' id='lblcadidateid' style='display: none;'>" + data[i].candidateid + "</span><h6 class='mb-0 text-sm' style='cursor: pointer;' onclick=Candidateview('" + data[i].candidateid + "') id = 'lblJobname'>" + data[i].candidatename + "</h6>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-3 text-right pe-0 mt-1'>" +
                "<p class='text-xs text-secondary mb-0'>" +
                "<span class='form-label m-0' style='color: black;'></span>" +
                "<span class='mb-0 text-sm' id='lblexperience'>" + data[i].totYrsExp + "</span>" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-12 mt-2'>" +
                "<div class='row'>" +
                "<div class='col-md-12'>" +
                "<div class='d-flex'>" +
                "<div class='d-flex flex-column justify-content-center'>" +
                "<p class='text-xs text-secondary mb-0' style='font-size: 10px !important;'>" +
                "<span class='form-label m-0' style='color: black;'>Skills :&nbsp;</span><span class='' id='lblskills'>" + data[i].additionalskill + " </span>" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-12 mt-2'>" +
                "<div class='row'>" +
                "<div class='col-md-6'>" +
                "<div>" +
                "<label class='form-label m-0 mb-2'>Matching Percentage</label>" +
                "<div class='progress progress-md'>" +
                "<div class='progress-bar bg-gradient-info w-" + pers + "' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>" +
                "</div>" +
                "</div>" +
                "<div style='float:right;font-size:12px;font-weight: bold;'><span > " + pers + "  </span>" + "%" + "</div>" +
                "</div >" +
                "<div class='col-6 pl-0'>" +
                "<label class='form-label m-0'></label>" +
                strratingdiv +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +

                //"<div>" +
                //"<a href='" + data[i].linkedinURL + "' target='_blank'>" +
                //strImg + "</a>" +
                //"</div>" +

                //"<div class='col-md-12'>" +

                //"<div class='row'>" +
                //"<div class='col-md-12'>" +
                //"<div class='d-flex ps-4 py-1'>" +
                //"<div class='d-flex flex-column justify-content-center'>" +
                //"<span class='' id='lblcadidateid' style='display:none;'>" + data[i].candidateid + "</span>" +
                //"<h6 class='mb-0 text-sm' style='cursor: pointer;' onclick=Candidateview('" + data[i].candidateid + "') id='lblJobname'>" + data[i].candidatename + "</h6>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +

                //"<div class='row'>" +
                //"<div class='col-md-12 pe-3'>" +
                //"<div class='d-flex ps-4 py-1'>" +
                //"<div class='d-flex flex-column justify-content-center'>" +

                //"<p class='text-xs text-secondary mb-0'>" +
                //"<span class='' id='lblskills'>" + data[i].additionalskill + "</span>" +
                //"<span style='font-weight:bold;'></span><span class='' id='lblexperience'>" + data[i].totYrsExp + "</span>" +
                //"</p>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +

                //"<div class='row ps-4'>" +
                //"<div class='col-md-12'>" +
                //strratingdiv +
                //"</div>" +
                //"</div>" +

                //"</div>" +
                "</li>";
        }
        str1 += "</ul>";
    }

    document.getElementById("lblmatchingcount").innerHTML = g;

    $('#div-matchjobs1').empty();
    $('#div-matchjobs1').append(str1);
}

function skillsorting() {
    if (document.getElementById("iconSort").className.includes("fa-arrow-up")) {
        document.getElementById("iconSort").classList.remove("fa-arrow-up");
        document.getElementById("iconSort").classList.add("fa-arrow-down");
        matching_candsort('ASC');
    }
    else if (document.getElementById("iconSort").className.includes("fa-arrow-down")) {
        document.getElementById("iconSort").classList.remove("fa-arrow-down");
        document.getElementById("iconSort").classList.add("fa-arrow-up");
        matching_candsort('DSC');
    }
}

function matching_candsort(skillval) {
    document.getElementById("lblmatchingcount").innerHTML = AllData.length;

    var str1 = "<ul class='list-group'>";
    var strratingdiv = "";
    var strImg = "";

    for (var f = 0; f < AllData.length; f++) {
        SkillPercentage = 0;
        Candidateskill = AllData[f].skill.split('|');
        AddMark = parseFloat(100 / Jobskill.length);

        for (var p = 0; p < Jobskill.length; p++) {
            for (var j = 0; j < Candidateskill.length; j++) {
                if (Jobskill[p] == Candidateskill[j]) {
                    SkillPercentage = parseFloat(SkillPercentage) + parseFloat(AddMark);
                }
            }
        }

        AllData[f].skillpercentage = SkillPercentage;
    }

    var sorter1 = (a, b) => a.skillpercentage > b.skillpercentage ? 1 : -1;

    AllData.sort(sorter1);
    if (skillval == "DSC") {
        AllData.reverse(sorter1);
    }
    console.log(AllData);

    for (var i = 0; i < AllData.length; i++) {
        if (AllData[i].linkedinURL == "") {
            strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
        }
        else if (AllData[i].linkedinURL != "") {
            strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
        }

        strratingdiv = "<div class='row'>" +
            "<div class='col-12 pl-0' id='mgrRatingDiv'>";
        for (var k = 1; k <= parseInt(AllData[i].rating); k++) {
            strratingdiv += "<span id='mrat_" + k + "' class='fa fa-star ratechecked' aria-hidden='true'></span>";
        }

        strratingdiv += "</div>";

        str1 += "<li class='list-group-item border-0 d-flex align-items-center px-0 mb-2'>" +

            "<div class='col-md-12 zm'>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<div class='row'>" +
            "<div class='col-md-12 pe-0'>" +
            "<div class='row'>" +
            "<div class='col-md-1 ps-2'>" +
            "<a href='" + AllData[i].linkedinURL + "' target='_blank'>" +
            strImg + "</a>" +
            "</div>" +
            "<div class='col-md-7 mt-1'>" +
            "<div class='d-flex'>" +
            "<div class='d-flex flex-column justify-content-center'>" +
            "<span class='' id='lblcadidateid' style='display: none;'>" + AllData[i].candidateid + "</span><h6 class='mb-0 text-sm' style='cursor: pointer;' onclick=Candidateview('" + AllData[i].candidateid + "') id = 'lblJobname'>" + AllData[i].candidatename + "</h6>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-3 text-right pe-0 mt-1'>" +
            "<p class='text-xs text-secondary mb-0'>" +
            "<span class='form-label m-0' style='color: black;'></span>" +
            "<span class='mb-0 text-sm' id='lblexperience'>" + AllData[i].totYrsExp + "</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-12 mt-2'>" +
            "<div class='row'>" +
            "<div class='col-md-12'>" +
            "<div class='d-flex'>" +
            "<div class='d-flex flex-column justify-content-center'>" +
            "<p class='text-xs text-secondary mb-0' style='font-size: 10px !important;'>" +
            "<span class='form-label m-0' style='color: black;'>Skills :&nbsp;</span><span class='' id='lblskills'>" + AllData[i].skill + "</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-12 mt-2'>" +
            "<div class='row'>" +
            "<div class='col-md-6'>" +
            "<div>" +
            "<label class='form-label m-0 mb-2'>Matching Percentage</label>" +
            "<div class='progress progress-md'>" +
            "<div class='progress-bar bg-gradient-info w-" + pers + "' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>" +
            "</div>" +
            "</div>" +
            "<div style='float:right;font-size:12px;font-weight: bold;'><span > " + pers + "  </span>" + "%" + "</div>" +
            "</div >" +
            "<div class='col-6 pl-0'>" +
            "<label class='form-label m-0'></label>" +
            strratingdiv +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +

            //"<div>" +
            //"<a href='" + AllData[i].linkedinURL + "' target='_blank'>" +
            //strImg + "</a>" +
            //"</div>" +

            //"<div class='col-md-12'>" +

            //"<div class='row'>" +
            //"<div class='col-md-12'>" +
            //"<div class='d-flex ps-4 py-1'>" +
            //"<div class='d-flex flex-column justify-content-center'>" +
            //"<span class='' id='lblcadidateid' style='display:none;'>" + AllData[i].candidateid + "</span>" +
            //"<h6 class='mb-0 text-sm' style='cursor: pointer;' onclick=Candidateview('" + AllData[i].candidateid + "') id='lblJobname'>" + AllData[i].candidatename + "</h6>" +
            //"</div>" +
            //"</div>" +
            //"</div>" +
            //"</div>" +

            //"<div class='row'>" +
            //"<div class='col-md-12 pe-3'>" +
            //"<div class='d-flex ps-4 py-1'>" +
            //"<div class='d-flex flex-column justify-content-center'>" +

            //"<p class='text-xs text-secondary mb-0'>" +
            //"<span class='' id='lblskills' >" + AllData[i].skill + "</span>" +
            //"<span class='mb-0 text-sm' style='color:black;' id='lblexperience'><br /> EXP - " + AllData[i].totYrsExp + "</span>" +
            //"</p>" +
            //"</div>" +
            //"</div>" +
            //"</div>" +
            //"</div>" +

            //"<div class='row ps-4'>" +
            //"<div class='col-md-12'>" +
            //strratingdiv +
            //"</div>" +
            //"</div>" +

            //"</div>" +

            "</li>";
    }
    str1 += "</ul>";

    $('#div-matchjobs').empty();
    $('#div-matchjobs').append(str1);
}

function matching_cand(data) {
    var str1 = "<ul class='list-group'>";
    var strratingdiv = "";
    var strImg = "";
    document.getElementById("lblmatchingcount1").innerHTML = data.length;
    var g = 0;

    for (var f = 0; f < data.length; f++) {
        SkillPercentage = 0;
        Candidateskill = data[f].skill.split(' | ');
        AddMark = parseFloat(100 / Jobskill.length);

        for (var p = 0; p < Jobskill.length; p++) {
            for (var j = 0; j < Candidateskill.length; j++) {
                if (Jobskill[p].toUpperCase().trim() == Candidateskill[j].toUpperCase().trim()) {
                    SkillPercentage = parseFloat(SkillPercentage) + parseFloat(AddMark);
                }
            }
        }

        data[f].skillpercentage = SkillPercentage;
    }

    var sorter1 = (a, b) => a.skillpercentage > b.skillpercentage ? 1 : -1;

    data.sort(sorter1);
    data.reverse(sorter1);

    for (var i = 0; i < data.length; i++) {
        SkillPercentage = 0;
        if (data[i].linkedinURL == "") {
            strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
        }
        else if (data[i].linkedinURL != "") {
            strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
        }

        strratingdiv = "<div class='row'>" +
            "<div class='col-12 pl-0' id='mgrRatingDiv'>";
        for (var k = 1; k <= parseInt(data[i].rating); k++) {
            strratingdiv += "<span id='mrat_" + k + "' class='fa fa-star ratechecked' aria-hidden='true'></span>";
        }

        strratingdiv += "</div>";

        var p = (Math.round(data[i].skillpercentage) + Math.round(data[i].descmatchingpercentage));
        var pers = Math.round(p / 2);
        if (pers > 0) {
            g++;

            str1 += "<li class='list-group-item border-0 d-flex align-items-center px-0 mb-2'>" +

                "<div class='col-md-12 zm'>" +
                "<div class='row'>" +
                "<div class='col-md-12'>" +
                "<div class='row'>" +
                "<div class='col-md-12 pe-0'>" +
                "<div class='row'>" +
                "<div class='col-md-1 ps-2'>" +
                "<a href='" + data[i].linkedinURL + "' target='_blank'>" +
                strImg + "</a>" +
                "</div>" +
                "<div class='col-md-7 mt-1'>" +
                "<div class='d-flex'>" +
                "<div class='d-flex flex-column justify-content-center'>" +
                "<span class='' id='lblcadidateid' style='display: none;'>" + data[i].candidateid + "</span><h6 class='mb-0 text-sm' style='cursor: pointer;' onclick=Candidateview('" + data[i].candidateid + "') id = 'lblJobname'>" + data[i].candidatename + "</h6>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-3 text-right pe-0 mt-1'>" +
                "<p class='text-xs text-secondary mb-0'>" +
                "<span class='form-label m-0' style='color: black;'>Exp -&nbsp;</span>" +
                "<span class='mb-0 text-sm' id='lblexperience'>" + data[i].totYrsExp + "</span>" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-12 mt-2'>" +
                "<div class='row'>" +
                "<div class='col-md-12'>" +
                "<div class='d-flex'>" +
                "<div class='d-flex flex-column justify-content-center'>" +
                "<p class='text-xs text-secondary mb-0' style='font-size: 10px !important;'>" +
                "<span class='form-label m-0' style='color: black;'>Skills :&nbsp;</span><span class='' id='lblskills'>" + data[i].skill + "</span>" +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='col-md-12 mt-2'>" +
                "<div class='row'>" +
                "<div class='col-md-6'>" +
                "<div>" +
                "<label class='form-label m-0 mb-2'>Matching Percentage</label>" +
                "<div class='progress progress-md'>" +
                "<div class='progress-bar bg-gradient-info w-" + p + "' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100'></div>" +
                "</div>" +
                "</div>" +
                "<div style='float:right;font-size:12px;font-weight: bold;'><span > " + p + "  </span>" + "%" + "</div>" +
                "</div >" +
                "<div class='col-6 pl-0'>" +
                "<label class='form-label m-0'>Recruiter Rating</label>" +
                strratingdiv +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +

                //"<div>" +
                //"<a href='" + data[i].linkedinURL + "' target='_blank'>" +
                //strImg + "</a>" +
                //"</div>" +

                //"<div class='col-md-12'>" +

                //"<div class='row'>" +
                //"<div class='col-md-12'>" +
                //"<div class='d-flex ps-4 py-1'>" +
                //"<div class='d-flex flex-column justify-content-center'>" +
                //"<span class='' id='lblcadidateid' style='display:none;'>" + data[i].candidateid + "</span>" +
                //"<h6 class='mb-0 text-sm' style='cursor: pointer;' onclick=Candidateview('" + data[i].candidateid + "') id='lblJobname'>" + data[i].candidatename + "</h6>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +

                //"<div class='row'>" +
                //"<div class='col-md-12 pe-3'>" +
                //"<div class='d-flex ps-4 py-1'>" +
                //"<div class='d-flex flex-column justify-content-center'>" +

                //"<p class='text-xs text-secondary mb-0'>" +
                //"<span class='' id='lblskills'>" + data[i].skill + "</span>" +
                //"<span style='font-weight:bold;'>   Exp:</span><span class='' id='lblexperience'> | " + data[i].totYrsExp + "</span>" +
                //"</p>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +
                //"</div>" +

                //"<div class='row ps-4'>" +
                //"<div class='col-md-12'>" +
                //strratingdiv +
                //"</div>" +
                //"</div>" +

                //"</div>" +

                "</li>";
        }
        str1 += "</ul>";
    }

    $('#div-matchjobs').empty();
    $('#div-matchjobs').append(str1);
}

function Candidateview(candidateid) {
    window.location.href = "Candidate_View.aspx?id=" + candidateid;
}

function editmode() {
    var x = document.getElementById("lblJobid").innerHTML;
    window.location.href = "AddJobcode.aspx?id=" + x;
}

function createCandTable(data) {
    $("#tblCandlist tbody").empty();
    var strTable = "";

    if (getSession('CandCreation') == "1") {
        document.getElementById("btnAdd").style.display = "inline";
    }
    else {
        document.getElementById("btnAdd").style.display = "none";
    }

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
            var strImg1 = "";
            var strColumn = "";
            var url = window.location.href;
            hashes = url.split("?")[1];

            if (hashes != null) {
                var hash = hashes.split('&');
                var params = hash[0].split("=");
                if (hash.length > 1) {
                    strColumn = "Feedback";
                }

                if (item.linkedinURL == "") {
                    strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
                    strImg1 = "<a>" + strImg + "</a>";
                }
                else if (item.linkedinURL != "") {
                    strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: -1rem !important; height: 20px !important; width: 20px !important;'>";
                    strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                }

                var regex = /\s/g;
                var replace = "%20";
                var strcand = item.candidatename;

                var strcandname = strcand.replaceAll(regex, replace);

                str += " <li onclick=searchJob('" + strcandname + "','1')><a class='dropdown-item' href='javascript:;'>" + item.candidatename + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('1') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";

                strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                    "<td class='align-middle text-center text-sm' style='width: 0rem;'><div>" + strImg1 + "</div></td>" +
                    "<td onclick=gotojobpage('" + item.candidateid + "');> <div class='d-flex px-2 py-1'>" +
                    "<div class='d-flex flex-column justify-content-center'>" +
                    "<h6 class='mb-0 text-sm'>" + item.candidatename + "</h6>" +
                    "<p class='text-xs text-secondary mb-0'><a >" + item.candidateemailid + " | " + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + " on " + item.type + "</a></p>" +
                    "</div ></div ></td > ";

                strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";

                if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager") {
                    if (item.CandidatestatusInt == "") {
                        if (item.candidatestatus == "Submitted to TL" || item.candidatestatus == "Submitted to BP" || item.candidatestatus == "Submitted to EC" || item.candidatestatus == "Closure" || item.candidatestatus == "BP Interview" || item.candidatestatus == "EC Interview") {
                            strTable += "<td><a onclick=Findclientname('" + item.candidateid + "')><i class='fa fa-exclamation-circle' style='color:red;' aria-hidden='true'></i></a></td>";
                        }
                        else if (item.candidatestatus == "Submitted") {
                            if (PrimaryrecruiterID == getSession('TWE_ID') || $('#lblCreatedname').text() == getSession('Name')) {
                                strTable += "<td><a onclick=Findclientname('" + item.candidateid + "')><i class='fa fa-exclamation-circle' style='color:red;' aria-hidden='true'></i></a></td>";
                            }
                            else {
                                strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                            }
                        }
                        else {
                            strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                        }
                    }
                    else {
                        if (item.CandidatestatusInt == "Submitted to TL" || item.CandidatestatusInt == "Scheduled" || item.CandidatestatusInt == "Approved" || item.CandidatestatusInt == "Scheduled Technical Interview") {
                            strTable += "<td><a onclick=Findclientname('" + item.candidateid + "')><i class='fa fa-exclamation-circle' style='color:red;' aria-hidden='true'></i></a></td>";
                        }
                        else if (item.candidatestatus == "Submitted") {
                            if (PrimaryrecruiterID == getSession('TWE_ID') || $('#lblCreatedname').text() == getSession('Name')) {
                                strTable += "<td><a onclick=Findclientname('" + item.candidateid + "')><i class='fa fa-exclamation-circle' style='color:red;' aria-hidden='true'></i></a></td>";
                            }
                            else {
                                strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                            }
                        }
                        else {
                            strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                        }
                    }
                }
                else if (getSession('Designation') == "4001") {
                    if (item.CandidatestatusInt == "Submitted to TL") {
                        strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                    }
                    else if (item.candidatestatus == "Submitted" && item.CandidatestatusInt == "") {
                        if (PrimaryrecruiterID == getSession('TWE_ID') || $('#lblCreatedname').text() == getSession('Name')) {
                            strTable += "<td><a onclick=Findclientname('" + item.candidateid + "')><i class='fa fa-exclamation-circle' style='color:red;' aria-hidden='true'></i></a></td>";
                        }
                        else {
                            strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                        }
                    }
                    else {
                        strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                    }
                }
                else {
                    strTable += "<td><i class='fa fa - exclamation- circle' aria-hidden='true'></i></td>";
                }

                if (item.CandidatestatusInt == "") {
                    if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager" || getSession('Designation') == "4001") {
                        if (item.candidatestatus == "Submitted") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>Waiting for Recruiter</span></td>";
                        }
                        else if (item.candidatestatus == "Submitted to TL" || item.candidatestatus == "Submitted to BP" || item.candidatestatus == "Submitted to EC" || item.candidatestatus == "Closure" || item.candidatestatus == "Onboarded") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>" + item.candidatestatus + "</span></td>";
                        }

                        else if (item.candidatestatus == "TL Rejected" || item.candidatestatus == "BP Rejected" || item.candidatestatus == "EC Rejected" || item.candidatestatus == "Not Onboarded" || item.candidatestatus == "Not Submitted") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-danger'>" + item.candidatestatus + "</span></td>";
                        }

                        else if (item.candidatestatus == "Draft") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-secondary'>" + item.candidatestatus + "</span></td>";
                        }

                        else if (item.candidatestatus == "BP Interview" || item.candidatestatus == "EC Interview") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-secondary'>" + item.candidatestatus + "</span></td>";
                        }

                        else if (item.candidatestatus == "Pipeline") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-info'>" + item.candidatestatus + "</span></td>";
                        }
                    }
                    else {
                        if (item.candidatestatus == "Submitted") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>" + item.candidatestatus + "</span></td>";
                        }
                        else if (item.candidatestatus == "Submitted to TL" || item.candidatestatus == "Submitted to BP" || item.candidatestatus == "Submitted to EC" || item.candidatestatus == "Closure" || item.candidatestatus == "Onboarded") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>Submitted</span></td>";
                        }

                        else if (item.candidatestatus == "TL Rejected" || item.candidatestatus == "BP Rejected" || item.candidatestatus == "EC Rejected" || item.candidatestatus == "Not Onboarded" || item.candidatestatus == "Not Submitted") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-danger'>Rejected</span></td>";
                        }

                        else if (item.candidatestatus == "Draft") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-secondary'>" + item.candidatestatus + "</span></td>";
                        }

                        else if (item.candidatestatus == "BP Interview" || item.candidatestatus == "EC Interview") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-secondary'>Interview Scheduled</span></td>";
                        }

                        else if (item.candidatestatus == "Pipeline") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-info'>" + item.candidatestatus + "</span></td>";
                        }
                    }
                }

                else {
                    if (getSession('Designation') == "4000" || getSession('Rolename') == "Manager" || getSession('Rolename') == "Senior Manager" || getSession('Designation') == "4001") {
                        if (item.candidatestatus == "Submitted" && item.CandidatestatusInt == "") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>Waiting for Recruiter</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Submitted to TL") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>" + item.CandidatestatusInt + "</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Scheduled Technical Interview") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-info'>" + item.CandidatestatusInt + "</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Approved" || item.CandidatestatusInt == "Offer Approved") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>" + item.CandidatestatusInt + "</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Scheduled") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-secondary'>" + item.CandidatestatusInt + "</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Rejected" || item.CandidatestatusInt == "Offer Rejected") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-danger'>" + item.CandidatestatusInt + "</span></td>";
                        }
                    }
                    else {
                        if (item.candidatestatus == "Submitted" && item.CandidatestatusInt == "") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>" + item.candidatestatus + "</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Submitted to TL") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>Submitted</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Scheduled Technical Interview") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-info'>Interview Scheduled</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Approved" || item.CandidatestatusInt == "Offer Approved") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-success'>Approved</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Scheduled") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-secondary'>Interview Scheduled</span></td>";
                        }
                        else if (item.CandidatestatusInt == "Rejected" || item.CandidatestatusInt == "Offer Rejected") {
                            strTable += "<td class='align-middle text-center text-sm' onclick=gotojobpage('" + item.candidateid + "');>" +
                                "<span class='badge badge-sm bg-gradient-danger'>Rejected</span></td>";
                        }
                    }
                }

                strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.submittedby + "</p><p class='text-xs text-secondary mb-0'> " + item.submitteddate + "|" + item.submittedtime + "</p></td>";
                if (strColumn == "Feedback") {
                    strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                        "<div class='dropdown float-lg-end pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Feedback.aspx?id=" + item.candidateid + "&jobid=" + $("#lblJobid").text() + "' id='View'>Feedback</a></li>" +
                        "</ul></div></div></td></tr>";
                }
                else {
                    strTable += "<td class='align-middle'><div class='col-lg-3 col-1 my-auto text-end'>" +
                        "<div class='dropdown float-lg-end pe-1'>" +
                        "<a class='cursor-pointer' id='dropdownTable' data-bs-toggle='dropdown' aria-expanded='false'>" +
                        "<i class='fa fa-ellipsis-v text-secondary'></i> </a>" +

                        "<ul class='dropdown-menu px-3 py-3 ms-sm-n8 ms-n3' aria-labelledby='dropdownTable'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "&jobid=" + $("#lblJobid").text() + "' id='View'>View</a></li>" +
                        " <li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + $("#lblJobid").text() + "&id=" + item.candidateid + "' id='Edit'>Edit</a></li>" +
                        "</ul></div></div></td></tr>";
                }
            }
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
        if (taskAssArr[i].clientname != null) {
            var str = taskAssArr[i].clientname;
            var strStatus = str.replace(regex, replace);

            str1 += " <li onclick=searchJob('" + strStatus + "','4')><a class='dropdown-item' href='javascript:;'>" + taskAssArr[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('4') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";
        }
    }

    $("#ul_Status").empty();
    $("#ul_Status").append(str1);

    var taskAssArr1 = new Array;

    taskAssArr1 = arry1;
    taskAssArr1 = removeDuplicates(taskAssArr1);

    for (var i = 0; i < taskAssArr1.length; i++) {
        var regex = /\s/g;
        var replace = "%20";
        if (taskAssArr1[i].clientname != null) {
            var str = taskAssArr1[i].clientname;
            var strsubmittedby = str.replace(regex, replace);

            str2 += "<li onclick=searchJob('" + strsubmittedby + "','5')><a class='dropdown-item' href='javascript:;'>" + taskAssArr1[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('5') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";
        }
    }
    $("#ul_Submitted").empty();
    $("#ul_Submitted").append(str2);

    $("#tblCandlist tbody").append(strTable);
}

var tdrowcount = new Array;
var tdrowval1 = new Array;
var tdrowval2 = new Array;
var tdrowval3 = new Array;
var tdrowval4 = new Array;
var rowval1, rowval2, rowval3;
var inputname1, inputname2, inputname3;
var ulname1, ulname2, ulname3;

function searchJob(filterval, filterrow) {
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
    else if (filterrow == "4") {
        div = document.getElementById("ul_Status");
        document.getElementById("btnStatus").style.color = "rgb(47 214 254 / 3)";
    }
    else if (filterrow == "5") {
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
            rowval1 = 4;
            rowval2 = 5;

            inputname1 = "myInputcandidatestatus";
            ulname1 = "ul_Status";
            inputname2 = "myInputcandidatesubmittedby";
            ulname2 = "ul_Submitted";
        }
        else if (filterrow == 4) {
            rowval1 = 1;
            rowval2 = 5;

            inputname1 = "myInputcandidates";
            ulname1 = "ul_Candidates";
            inputname2 = "myInputcandidatesubmittedby";
            ulname2 = "ul_Submitted";
        }
        else if (filterrow == 5) {
            rowval1 = 1;
            rowval2 = 4;

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
                if (filterrow == 1) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow == 4) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow == 5) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
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
    else if (tdrowcount.length == 2) {
        var filterrow1 = tdrowcount[0].rowid;
        var filterrow2 = tdrowcount[1].rowid
        var filterrowval1 = tdrowcount[0].rowval;
        var filterrowval2 = tdrowcount[1].rowval;

        if (filterrow1 == 1 && filterrow2 == 4 || filterrow1 == 4 && filterrow2 == 1) {
            rowval1 = 5;
            inputname1 = "myInputcandidatesubmittedby";
            ulname1 = "ul_Submitted";
        }
        else if (filterrow1 == 4 && filterrow2 == 5 || filterrow1 == 5 && filterrow2 == 4) {
            rowval1 = 1;

            inputname1 = "myInputcandidates";
            ulname1 = "ul_Candidates";
        }
        else if (filterrow1 == 5 && filterrow2 == 1 || filterrow1 == 1 && filterrow2 == 5) {
            rowval1 = 4;

            inputname1 = "myInputcandidatestatus";
            ulname1 = "ul_Status";
        }

        for (i = 1; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[filterrow1];
            var td2 = tr[i].getElementsByTagName("td")[filterrow2];
            var td3 = tr[i].getElementsByTagName("td")[rowval1];

            if (td1) {
                if (filterrow1 == 5 && filterrow2 == 1) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 5) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("p")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 4 && filterrow2 == 1) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 4) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 5 && filterrow2 == 4) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("h6")[0].innerText;
                }
                else if (filterrow1 == 4 && filterrow2 == 5) {
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
            str1 += " <li onclick=searchJob('" + strClient + "','" + rowval1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + rowval1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
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
                if (filterrow1 == 5 && filterrow2 == 1 && filterrow3 == 4) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 5 && filterrow3 == 4) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("p")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("span")[0].innerText;
                }
                else if (filterrow1 == 4 && filterrow2 == 1 && filterrow3 == 5) {
                    txtValue1 = td1.getElementsByTagName("span")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("h6")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 1 && filterrow2 == 4 && filterrow3 == 5) {
                    txtValue1 = td1.getElementsByTagName("h6")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("p")[0].innerText;
                }
                else if (filterrow1 == 5 && filterrow2 == 4 && filterrow3 == 1) {
                    txtValue1 = td1.getElementsByTagName("p")[0].innerText;
                    txtValue2 = td2.getElementsByTagName("span")[0].innerText;
                    txtValue3 = td3.getElementsByTagName("h6")[0].innerText;
                }
                else if (filterrow1 == 4 && filterrow2 == 5 && filterrow3 == 1) {
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
    getSearchPaging("#tblCandlist", $('select#maxRows option:selected').val());
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

    var table = document.getElementById("tblCandlist");
    var tr = table.getElementsByTagName("tr");

    var div;

    if (filterrow == "1") {
        div = document.getElementById("ul_Candidates");
        document.getElementById("btnCandidates").style.color = "#0c0c0c";
    }
    else if (filterrow == "4") {
        div = document.getElementById("ul_Status");
        document.getElementById("btnStatus").style.color = "#0c0c0c";
    }
    else if (filterrow == "5") {
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

    if (tdrowcount.length > 0) {
        searchJob(tdrowcount[tdrowcount.length - 1].rowval, tdrowcount[tdrowcount.length - 1].rowid);
        getSearchPaging("#tblCandlist", $('select#maxRows option:selected').val());
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
            var td2 = tr[i].getElementsByTagName("td")[4];
            var td3 = tr[i].getElementsByTagName("td")[5];

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
            str1 += " <li onclick=searchJob('" + strClient + "','" + 1 + "')><a class='dropdown-item' href='javascript:;'>" + tdrowval1[i].clientname + "</a></li>" + "<li><i class='fa fa-close'  onclick=filtercancel('" + 1 + "') style='float:right;margin-top:-19px;padding-right:10px;display:none;'></i></li>";
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
    }
    getSearchPaging("#tblCandlist", $('select#maxRows option:selected').val());
}

function openTechwaukee() {
    if (document.getElementById("chkTechwaukee").checked == true) {
        document.getElementById("div-matchjobs1").style.display = "block"
        document.getElementById("div-matchjobs").style.display = "none"

        document.getElementById("techdata").style.display = "block";
        document.getElementById("recruidata").style.display = "none";

        document.getElementById("lblmatchingcount1").style.display = "none";
        document.getElementById("lblmatchingcount").style.display = "inline";
    }
    else {
        document.getElementById("div-matchjobs1").style.display = "none"
        document.getElementById("div-matchjobs").style.display = "block"

        document.getElementById("techdata").style.display = "none";
        document.getElementById("recruidata").style.display = "block";

        document.getElementById("lblmatchingcount1").style.display = "inline";
        document.getElementById("lblmatchingcount").style.display = "none";
    }
}

function removecandDuplicates(data) {
    return data.filter((data, index, self) =>
        index === self.findIndex((t) => (t.candidateemailid === data.candidateemailid)))
}

function Findclientname(candid) {
    if (Clientnamechecking == "Techwaukee") {
        window.location.href = 'CandidateViewInternalUS.aspx?id=' + candid + "&jobid=" + $("#lblJobid").text();
    }
    else {
        window.location.href = 'Candidate_View.aspx?id=' + candid + "&jobid=" + $("#lblJobid").text();
    }
}

function Popup() {
    $("#msgpopup").modal('show');
    //$("#msgpopup").modal('hide');
}

function closepopup() {
    $("#msgpopup1").modal('hide');
    getjobComments();
}

function getjobComments(jobcode) {
    var Jobcode = document.getElementById("lblJobid").innerHTML;
    var strdata = {
        "Jobcode": Jobcode
    };
    common_api_ajax_request("api/JobUSComments", "GETJOBCOMMENTS", strdata);
}

$("#btnOk").click(function () {
    if (ValidateaddjobComments() == true) {
        $("#msgpopup").modal('hide');

        var Jobcode = document.getElementById("lblJobid").innerHTML;
        var JobCommentsUS = replaceAll(document.getElementById("txtCandidateComments").value, "'", "''");
        var Created_By = getSession('TWE_ID');
        //var url = window.location.href;
        //hashes = url.split("?")[1];
        //var Mode;
        //if (hashes != null) {
        //    Mode = "update";
        //}

        //else {
        //    Mode = "insert";
        //}

        var strdata = {
            "Jobcode": Jobcode, "JobCommentsUS": JobCommentsUS,
            "Created_By": Created_By
        };
        common_api_ajax_request("api/AddJobUSComments", "ADDJOBCOMMENTS", strdata);
    }
    $("#msgpopup").modal('hide');
});

function ValidateaddjobComments() {
    if (document.getElementById("txtCandidateComments").value == "") {
        return false;
    }
    else {
        return true;
    }
}

function CandidateApply() {
    var url = window.location.href;
    hashes = url.split("?")[1];

    if (hashes != null) {
        var hash = hashes.split('&');
        var params = hash[0].split("=");

        if (hash.length == 4) {
            var params1 = hash[1].split("=");

            var params2 = hash[2].split("=");
            if (params2[1] == "BS") {
                window.location.href = "Candidate.aspx?jobid=" + params[1] + "&candid=" + params1[1] + "&mode=BS";
            }
        }
        else {
            window.location.href = "Candidate.aspx";
        }
    }
    else {
        window.location.href = "Candidate.aspx";
    }
}

function OpenSkillCal(skill) {
    /*alert('Test');*/
    $("#" + skill).prop("title", $("#" + skill).text());
}

function filedownload(candname) {
    //var regex = ' ';
    //var replace = "%20";
    //var str = candname;
    //var strClient = str.replace(replace, regex);

    fileName = "Resume" + "/" + candname;

    //window.location.href = "http://huntcrew.techwaukee.com/api/FileAPI/GetFile?fileName=" + fileName;

    window.location.href = "/api/FileAPI/GetFile?fileName=" + fileName;
    //var str = "https://huntcrew.testing.techwaukee.com/api/FileAPI/GetFile?fileName=" + fileName;
    //window.open(str, "_blank");

    //var str = "http://huntcrew.techwaukee.com/api/FileAPI/GetFile?fileName=" + fileName;
    window.open(str, "_blank");
}

function downloadFile(a) {
    var fileName = "";

    if ((a.id).includes("Resume")) {
        fileName = "Resume" + "/" + $("#" + a.id).text();
    }
    else if ((a.id).includes("Driving")) {
        fileName = "Driving Licence" + "/" + $("#" + a.id).text();
    }
    else if ((a.id).includes("Visa")) {
        fileName = "Visa" + "/" + $("#" + a.id).text();
    }
    else if ((a.id).includes("Others")) {
        fileName = "Other Documents" + "/" + $("#" + a.id).text();
    }

    //window.location.href = "http://huntcrew.techwaukee.com/api/FileAPI/GetFile?fileName=" + fileName;
    //var str = "https://huntcrew.testing.techwaukee.com/api/FileAPI/GetFile?fileName=" + fileName;
    //window.open(str, "_blank");

    var str = "http://huntcrew.techwaukee.com/api/FileAPI/GetFile?fileName=" + fileName;
    window.open(str, "_blank");

    //window.location.href = "/api/FileAPI/GetFile?fileName=" + fileName;
}

function CalcateAll() {
    var FirstNo = document.getElementById("FirstNo").value;

    var SecondNo = document.getElementById("SecondNo").value;

    var strdata = {
        "FirstNo": FirstNo, "SecondNo": SecondNo
    }
    common_api_ajax_request("api/CalculateAll", "Calulate", strdata);
}

function createCandTableNew(data) {
    $("#tblCandlist tbody").empty();
    $("#tblCandlist thead").empty();
    var strTable = "";
    var strhead = "";

    //if (getSession('CandCreation') == "1") {
    //    document.getElementById("btnAdd").style.display = "inline";
    //}
    //else {
    //    document.getElementById("btnAdd").style.display = "none";
    //}

    if (CategoryType == "Added Candidate") {
        strhead += "<tr style='border-bottom: 2px solid black;' >" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>CANDIDATE NAME</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>LOCATION</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>DOCS</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>VISA</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>EXPERIENCE</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>SKILL RATING</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>ASSESSMENT</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder ps-0 pe-0 ps-2' id='th_CandStatus' style='display:block;' >STATUS<button id='btnCandStatusfilter' data-bs-dismiss='alert' aria-label='Close' data-bs-toggle='dropdown' class='btn bg-gradient-warning p-0 mb-0' type='button' style='color: rgb(12, 12, 12); font-size: 12px; background: none !important; box-shadow: none !important; display: inline;'><i class='fas fa-filter'' style='margin:4px;' aria-hidden='true' ></i></button>" +
            "<ul class='dropdown-menu text-xxs' aria-labelledby='dropdownMenuButton' id='ul_CandStatus' style='box-shadow:3px 8px 19px 0px;width: 200px;'></ul></th >" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>SUBMITTED BY</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            " </tr>";
    }
    else if (CategoryType == "Applied Candidate") {
        strhead += "<tr style='border-bottom: 2px solid;' >" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Candidate Name</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Location</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Docs</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Visa</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Experience</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Skill Rating</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'></th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }
    else if (CategoryType == "Bench Cand") {
        strhead += "<tr style='border-bottom:2px solid;'>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Candidate Name</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Location</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Docs</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Visa</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Experience</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Skill Rating</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Assessment</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Availability</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }
    else if (CategoryType == "Vendor Cand") {
        strhead += "<tr style='border-bottom:2px solid;'>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>CANDIDATE NAME</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>LOCATION</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>DOCS</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>VISA</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>EXPERIENCE</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>SKILL RATING</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>ASSESSMENT</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>SUBMITTED BY</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }

    else if (CategoryType == "Draft Candidate") {
        strhead += "<tr style='border-bottom:2px solid;'>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Candidate Name</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>location</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Docs</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Visa</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>experience</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Skill Rating</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Assessment</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>drafted By</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }
    else if (CategoryType == "Rejected") {
        strhead += "<tr style='border-bottom:2px solid;' >" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Candidate Name</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>location</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Docs</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Visa</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>experience</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Skill Rating</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Assessment</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>status</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Rejected By</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }
    else if (CategoryType == "Closure") {
        strhead += "<tr style='border-bottom:2px solid;' >" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Candidate Name</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>location</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 '>Docs</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Visa</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>experience</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 ps-2'>Skill Rating</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Assessment Rating</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Status</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Submitted By</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }
    else if (CategoryType == "Interview Candidate") {
        strhead += "<tr style='border-bottom:2px solid;'>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Candidate Name</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>location</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Docs</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Visa</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Experience</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>skill</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>assessment</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Timings</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Status</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>Submitted By</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            "</tr>";
    }

    var strval;
    //var str = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidates' onkeyup=filterFunction('myInputcandidates','ul_Candidates'); />";
    //var str1 = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidatestatus' onkeyup=filterFunction('myInputcandidatestatus','ul_Status'); />";
    //var str2 = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidatesubmittedby' onkeyup=filterFunction('myInputcandidatesubmittedby','ul_Submitted'); />";

    var arry = new Array;
    var arry1 = new Array;
    var i = 1;

    $.each(data, function (key, item) {
        if (item.Jobcode == "") {
        }

        else {
            var obj = {};

            obj.clientname = item.candidatestatus;
            arry.push(obj);

            if (CategoryType == "Added Candidate") {
                if (document.getElementById("div_norecord").style.display == "block") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        " | " + "$" + item.ratePerHr + " / Hr" + " on " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    //str += " <li onclick=searchJob('" + strcandname + "','1')><a class='dropdown-item' href='javascript:;'>" + item.candidatename + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('1') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";

                    //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                    //    "<td class='align-middle text-center text-sm' style='width: 0rem;'><div>" + strImg1 + "</div></td>" +
                    //    "<td onclick=gotojobpage('" + item.candidateid + "');> <div class='d-flex px-2 py-1'>" +
                    //    "<div class='d-flex flex-column justify-content-center'>" +
                    //    "<h6 class='mb-0 text-sm'>" + item.candidatename + "</h6>" +
                    //    "<p class='text-xs text-secondary mb-0'><a >" + item.candidateemailid + " | " + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + " - " + item.type + "</a></p>" +
                    //    "</div ></div ></td> ";

                    //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                    //    "<td>" +
                    //    "<div class='d-flex px-2 py-1'>" +
                    //    "<div>" + strImg1 + "</div>" +
                    //    "<div class='d-flex flex-column justify-content-center'>" +
                    //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
                    //    "<p class='text-xs text-secondary mb-0 pt-2'> " +
                    //    "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "') ></i> &nbsp; " +
                    //    "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "')></i> &nbsp; " +
                    //    "<i class='fa fa-brands fa-linkedin' id='Linkedinicon"+ i +"' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn' href='" + item.linkedinURL + "';></i>  " + "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                    //    "<input type='text' id='hdnemailid_" + i + "' style='border:1px solid white;color:white;display:contents;' value='" + item.candidateemailid + "'>"+
                    //    "</div>" +
                    //    "</div>" +
                    //    "</td >";

                    //SOURCE FROM

                    //strTable += "<td>" +
                    //    "<p class='text-xs font-weight-bold mb-0' > " + item.Sourcefrom + "</p>" +
                    //    "<p class='text-xs text-secondary mb-0' ></p>" +
                    //    "</td>";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/
                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='docs' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                        "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                        "</a>" +
                        "</td>";

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        if (item.VisaEnddate == null) {
                            strTable += "<td>" +
                                "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                                "<p class='text-xs text-secondary mb-0' ></p>" +
                                "</td>";
                        }
                        else {
                            strTable += "<td>" +
                                "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                                "<p class='text-xs text-secondary mb-0' >" +"Valid till "+ item.VisaEnddate + "</p>" +
                                "</td>";
                        }
                    }

                    //strTable += "<td>" +
                    //    "<p class='text-xs font-weight-bold mb-0' > " + item.Citizenship + "</p>" +
                    //    "<p class='text-xs text-secondary mb-0' ></p>" +
                    //    "</td>";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.totYrsExp + " Years</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp+"\n";
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp+"\n";
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + " \n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + " \n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + strPricand + "\n" + "Secondary Skill " + " \n " + strSeccand + " \n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    var lbljobcode = document.getElementById("lblJobid").innerHTML;

                    var strLocation = item.currLocation.replace(regex, replace);

                    var strFeedback = "getcandidateFeedback('" + lbljobcode + "','" + item.candidateid + "','" + strcandname + "','" + item.candidateemailid + "','" + item.visastatus + "','" + item.totYrsExp + "','" + strLocation + "')";

                    strTable += "<td><span class='align-middle text-center text-sm badge badge-dot'>" +
                        "<i class='bg-success'></i>" +
                        "<span class='fixed-plugin-button-nav cursor-pointer text-dark text-xs' onclick=" + strFeedback + ">" + item.candidatestatus + "</span>" +
                        //"<label class='fixed-plugin-button text-dark position-fixed px-3 py-2' onclick='popupfeedbackopen();'>" + item.candidatestatus + "</label>" +
                        "</span></td>";

                    //strTable += "<td>" +
                    //    "<span class='align-middle text-center text-sm badge badge-dot' >" +
                    //    "<i class='bg-success'></i>" +
                    //    "<span class='text-dark text-xs' onclick='getcandidateFeedback('" + item.Jobcode +"')' >" + item.candidatestatus + "</span>" +
                    //    "</span>" +
                    //    "</td>";

                    if (item.submittedby != "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (item.submittedby == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Applied Candidate") {
                //document.getElementById("lblappliedcount").innerHTML = item.length;

                if (document.getElementById("div_norecord").style.display == "block") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        " | " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                    //    "<td>" +
                    //    "<div class='d-flex px-2 py-1'>" +
                    //    "<div>" + strImg1 + "</div>" +
                    //    "<div class='d-flex flex-column justify-content-center'>" +
                    //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
                    //    "<p class='text-xs text-secondary mb-0'>" + item.candidateemailid + "|" + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + "-" + item.type + " </p>" +
                    //    "</div>" +
                    //    "</div>" +
                    //    "</td >";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='docs' data-bs-toggle='docs' aria-expanded='false' >" +
                        "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                        "</a>" +
                        "</td>";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    strTable += "<td>" +
                        "<span class='align-middle text-sm badge badge-dot' >" +
                        "<span class='text-dark text-xs'>" + item.totYrsExp + " Years</span>" +
                        "</span>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md'  id='MailJD' style='display:none' >Mail JD</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='CopyMyText' style='display:none;' >Copy Msg Text</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' id='Submit' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' >Submit</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=NotQualifiedPopup('" + item.candidateid + "','" + strcandname + "','" + item.candidatemobno + "','" + item.candidateemailid + "','AP')>Not Qualified</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Bench Cand") {
                if (document.getElementById("div_norecord").style.display == "none") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);
                    if (item.Resume != "" && item.Resume != null) {
                        strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                            "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                            "</a>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                            "<i class='ni ni-single-copy-04'></i>" +
                            "</a>" +
                            "</td>";
                    }

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.totYrsExp + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.Interviewtime + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md'  id='MailJD' style='display:none' >Mail JD</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='CopyMyText' style='display:none;' >Copy Msg Text</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' id='Submit' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' >Submit</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=NotQualifiedPopup('" + item.candidateid + "','" + strcandname + "','" + item.candidatemobno + "','" + item.candidateemailid + "','BS')>Not Qualified</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Vendor Cand") {
                if (document.getElementById("div_norecord").style.display == "none") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0 ps-3' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);
                    /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                        "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                        "</a>" +
                        "</td>";

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0 ps-3' > " + item.totYrsExp + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 70) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-3' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 70) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-3' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-3' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-3'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-3'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.submittedby != "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-2'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (item.submittedby == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center ps-2'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' id='SendRTR' style='display:none;'>Send RTR</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' id='Submit' style='display:none;' >Submit</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Draft Candidate") {
                if (document.getElementById("div_norecord").style.display == "block") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        " | " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                    //    "<td>" +
                    //    "<div class='d-flex px-2 py-1'>" +
                    //    "<div>" + strImg1 + "</div>" +
                    //    "<div class='d-flex flex-column justify-content-center'>" +
                    //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
                    //    "<p class='text-xs text-secondary mb-0'>" + item.candidateemailid + "|" + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + "-" + item.type + " </p>" +
                    //    "</div>" +
                    //    "</div>" +
                    //    "</td >";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);
                    /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                        "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                        "</a>" +
                        "</td>";

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.totYrsExp + " Years</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.submittedby != "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (item.submittedby == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
                        /* "<li><a class='dropdown-item border-radius-md' id='SendRTR' >Send RTR</a></li>" +*/
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Submit' >Submit</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Rejected") {
                if (document.getElementById("div_norecord").style.display == "block") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    //if (item.linkedinURL == "") {
                    //    strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                    //    strImg1 = "<a>" + strImg + "</a>";
                    //}
                    //else if (item.linkedinURL != "") {
                    //    strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                    //    strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    //}

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        " | " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                    //    "<td>" +
                    //    "<div class='d-flex px-2 py-1'>" +
                    //    "<div>" + strImg1 + "</div>" +
                    //    "<div class='d-flex flex-column justify-content-center'>" +
                    //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
                    //    "<p class='text-xs text-secondary mb-0'>" + item.candidateemailid + "|" + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + "-" + item.type + " </p>" +
                    //    "</div>" +
                    //    "</div>" +
                    //    "</td >";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);
                    /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                        "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                        "</a>" +
                        "</td>";

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.totYrsExp + " Years</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<span class='align-middle text-center text-sm badge badge-dot' >" +
                        "<i class='bg-danger'></i>" +
                        "<span class='text-dark text-xs'>" + item.candidatestatus + "</span>" +
                        "</span>" +
                        "</td>";

                    if (item.submittedby != "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (item.submittedby == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
                        /* "<li><a class='dropdown-item border-radius-md' id='EmailStatus' >Email Status</a></li>" +*/
                        "<li><a class='dropdown-item border-radius-md' id='Undo' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Undo</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Closure") {
                if (document.getElementById("div_norecord").style.display == "block") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        " | " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                        "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                        "</a>" +
                        "</td>";

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.totYrsExp + " Years</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<span class='align-middle text-center text-sm badge badge-dot' >" +
                        "<i class='bg-success'></i>" +
                        "<span class='text-dark text-xs' onclick='getcandidateFeedback('" + item.Jobcode +"')' >" + item.candidatestatus + "</span>" +
                        "</span>" +
                        "</td>";

                    if (item.submittedby != "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (item.submittedby == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' id='ShareDetails' style='display:none;'>Share Details</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;
            }

            else if (CategoryType == "Interview Candidate") {
                if (document.getElementById("div_norecord").style.display == "block") {
                    document.getElementById("div_norecord").style.display = "none";
                    document.getElementById("tblCandlist").style.display = "block";
                }

                var strImg = "";
                var obj = {};
                var obj1 = {};

                obj.clientname = item.candidatestatus;
                arry.push(obj);

                obj1.clientname = item.submittedby;
                arry1.push(obj1);

                var strImg = "";
                var strImg1 = "";
                var strColumn = "";
                var url = window.location.href;
                hashes = url.split("?")[1];

                if (hashes != null) {
                    var hash = hashes.split('&');
                    var params = hash[0].split("=");
                    if (hash.length > 1) {
                        strColumn = "Feedback";
                    }

                    if (item.linkedinURL == "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                        //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a>" + strImg + "</a>";
                    }
                    else if (item.linkedinURL != "") {
                        strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                        //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                        strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strcand = item.candidatename;

                    var strcandname = strcand.replaceAll(regex, replace);

                    strTable += "<tr class='divControl' style='cursor:pointer;cursor:pointer;' id='divControl_" + i + "' >" +
                        "<td>" +
                        "<div class='d-flex px-2 py-1'>" +
                        "<div class='d-flex flex-column justify-content-center'>" +
                        "<h6 class='mb-0 text-xs'><a class='color-change' href='Candidate_View.aspx?id=" + item.candidateid + "' >" + item.candidatename + "</a></h6>" +
                        "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                        "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                        " | " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        "</div>" +
                        "</div>" +
                        "</td >";

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var regex = /\s/g;
                    var replace = "%20";
                    var str = item.Resume;
                    var strClient = str.replace(regex, replace);

                    strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                        "<i class='ni ni-single-copy-04 highlight-blue' ></i>" +
                        "</a>" +
                        "</td>";

                    if (item.visastatus == "US Citizen") {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                            "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<p class='text-xs font-weight-bold mb-0 text-center' > " + item.totYrsExp + " Years</p>" +
                        "<p class='text-xs text-secondary mb-0' ></p>" +
                        "</td>";

                    var strPricand = "";
                    for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                        strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp;
                    }

                    var strSeccand = "";
                    for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                        strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp;
                    }

                    if (parseInt(item.overallmatchingpercentage) >= 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (parseInt(item.overallmatchingpercentage) < 60) {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                            "<span>" + item.overallmatchingpercentage + "%</span>" +
                            "</div>" +
                            "</td>";
                    }

                    if (item.RecruiterRating == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + 0 + " %</span>" +
                            "</div>" +
                            "</td>";
                    }
                    else {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center'>" +
                            "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                            "<span>" + item.RecruiterRating + "</span>" +
                            "</div>" +
                            "</td>";
                    }

                    strTable += "<td>" +
                        "<span class='align-middle text-center text-sm badge badge-dot' >" +
                        "<span class='text-dark text-xs'>" + item.Interviewdate + "| " + item.Interviewtime + " EST</span > " +
                        "</span>" +
                        "</td>";

                    strTable += "<td>" +
                        "<span class='align-middle text-center text-sm badge badge-dot' >" +
                        "<i class='bg-success'></i>" +
                        "<span class='text-dark text-xs'>" + item.candidatestatus + "</span > " +
                        "</span>" +
                        "</td>";

                    if (item.submittedby != "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }
                    else if (item.submittedby == "") {
                        strTable += "<td class='text-xs font-weight-bold'>" +
                            "<div class='d-flex align-items-center' >" +
                            "<div class='d-flex align-items-center'>" +
                            "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
                            "<span>" + item.submittedby + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</td>";
                    }

                    var regex = /\s/g;
                    var replace = "%20";
                    var strClient = Clientnamechecking;
                    var strClientname = strClient.replace(regex, replace);

                    strTable += "<td class='align-middle dropdown pt-2'>" +
                        "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                        "<i class='ni ni-bold-down' ></i>" +
                        "</a>" +
                        "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                        "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
                        "<li>" +
                        "<hr class='dropdown-divider'>" +
                        "</li>" +
                        "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
                        "</ul>" +
                        "</td>";
                }
                i++;

                //var count += i;
            }
        }
    });

    var str = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style='margin:0px 6px;'placeholder ='Search..' id='myInputcandidatestatus' onkeyup=filterFunction('myInputcandidatestatus','ul_CandStatus'); />";
    var taskAssArr = new Array;

    taskAssArr = arry;
    taskAssArr = removeDuplicates(taskAssArr);

    for (var i = 0; i < taskAssArr.length; i++) {
        var regex = /\s/g;
        var replace = "%20";
        var strvalue = taskAssArr[i].clientname;
        var strStatus = strvalue.replace(regex, replace);

        strval += "<li onclick=searchcand('" + strStatus + "','1')><a class='dropdown-item' href='javascript:;'>" + taskAssArr[i].clientname + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancelcand('1') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";
    }

    $("#tblCandlist thead").append(strhead);
    $("#tblCandlist tbody").append(strTable);

    $("#ul_CandStatus").empty();
    $("#ul_CandStatus").append(str + strval);

    getPaging(10);
    //alert(i);
    //document.getElementById("divControl_" + i-1).classList.add("btntr");
}

var MatchingProfile = new Array;
var Matching = 0;
var Bench_Matching = 0;
var Vendor_Matching = 0;

function createCandTableMatching(CategoryType) {
    $("#tblCandlist tbody").empty();
    $("#tblCandlist thead").empty();

    data = MatchingProfile;
    var strTable = "";
    var strhead = "";

    //if (getSession('CandCreation') == "1") {
    //    document.getElementById("btnAdd").style.display = "inline";
    //}
    //else {
    //    document.getElementById("btnAdd").style.display = "none";
    //}

    if (CategoryType == "Matching") {
        strhead += "<tr style='border-bottom: 2px solid black;' >" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>CANDIDATE NAME</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>LOCATION</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>DOCS</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>VISA</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>EXPERIENCE</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>SKILL RATING</th>" +
            "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>ASSESSMENT</th>" +
            "<th class='text-secondary opacity-7'></th>" +
            " </tr>";
    }

    //if (CategoryType == "Bench Matching") {
    //    strhead += "<tr style='border-bottom: 2px solid black;' >" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>CANDIDATE NAME</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>LOCATION</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>DOCS</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>VISA</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>EXPERIENCE</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>SKILL RATING</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>ASSESSMENT</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Availability</th>" +
    //        "<th class='text-secondary opacity-7'></th>" +
    //        " </tr>";
    //}

    //if (CategoryType == "Vendor Matching") {
    //    strhead += "<tr style='border-bottom: 2px solid black;' >" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>CANDIDATE NAME</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>LOCATION</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>DOCS</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>VISA</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>EXPERIENCE</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>SKILL RATING</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>ASSESSMENT</th>" +
    //        "<th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>Submitted By</th>" +
    //        "<th class='text-secondary opacity-7'></th>" +
    //        " </tr>";
    //}
    var str = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidates' onkeyup=filterFunction('myInputcandidates','ul_Candidates'); />";
    var str1 = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidatestatus' onkeyup=filterFunction('myInputcandidatestatus','ul_Status'); />";
    var str2 = "<input type='text' class='dataTable-input dataTable-input2 w-95 text-xxs' style = 'margin:0px 6px;'placeholder = 'Search..' id = 'myInputcandidatesubmittedby' onkeyup=filterFunction('myInputcandidatesubmittedby','ul_Submitted'); />";

    var arry = new Array;
    var arry1 = new Array;
    var i = 1;

    $.each(data, function (key, item) {
        if (item.Jobcode == "") {
        }

        else {
            //if (CategoryType == "Bench Matching") {
            //    if (item.FeedbackStatus == 99) {
            //        //if () {
            //        //    Bench_Matching++;
            //        //}
            //        if (document.getElementById("div_norecord").style.display == "block") {
            //            document.getElementById("div_norecord").style.display = "none";
            //            document.getElementById("tblCandlist").style.display = "block";
            //        }

            //        var strImg = "";
            //        var obj = {};
            //        var obj1 = {};

            //        obj.clientname = item.candidatestatus;
            //        arry.push(obj);

            //        obj1.clientname = item.submittedby;
            //        arry1.push(obj1);

            //        var strImg = "";
            //        var strImg1 = "";
            //        var strColumn = "";
            //        var url = window.location.href;
            //        hashes = url.split("?")[1];

            //        if (hashes != null) {
            //            var hash = hashes.split('&');
            //            var params = hash[0].split("=");
            //            if (hash.length > 1) {
            //                strColumn = "Feedback";
            //            }

            //            if (item.linkedinURL == "") {
            //                strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
            //                //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
            //                strImg1 = "<a>" + strImg + "</a>";
            //            }
            //            else if (item.linkedinURL != "") {
            //                strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
            //                //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
            //                strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
            //            }

            //            var regex = /\s/g;
            //            var replace = "%20";
            //            var strcand = item.candidatename;

            //            var strcandname = strcand.replaceAll(regex, replace);

            //            strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
            //                "<td>" +
            //                "<div class='d-flex px-2 py-1'>" +
            //                "<div class='d-flex flex-column justify-content-center'>" +
            //                "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
            //                "<p class='text-xs text-secondary mb-0 pt-2'> " +
            //                "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
            //                "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
            //                "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
            //                "</div>" +
            //                "</div>" +
            //                "</td >";

            //            //str += " <li onclick=searchJob('" + strcandname + "','1')><a class='dropdown-item' href='javascript:;'>" + item.candidatename + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('1') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";

            //            //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
            //            //    "<td class='align-middle text-center text-sm' style='width: 0rem;'><div>" + strImg1 + "</div></td>" +
            //            //    "<td onclick=gotojobpage('" + item.candidateid + "');> <div class='d-flex px-2 py-1'>" +
            //            //    "<div class='d-flex flex-column justify-content-center'>" +
            //            //    "<h6 class='mb-0 text-sm'>" + item.candidatename + "</h6>" +
            //            //    "<p class='text-xs text-secondary mb-0'><a >" + item.candidateemailid + " | " + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + " - " + item.type + "</a></p>" +
            //            //    "</div ></div ></td> ";

            //            //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
            //            //    "<td>" +
            //            //    "<div class='d-flex px-2 py-1'>" +
            //            //    "<div>" + strImg1 + "</div>" +
            //            //    "<div class='d-flex flex-column justify-content-center'>" +
            //            //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
            //            //    "<p class='text-xs text-secondary mb-0 pt-2'> " +
            //            //    "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "') ></i> &nbsp; " +
            //            //    "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "')></i> &nbsp; " +
            //            //    "<i class='fa fa-brands fa-linkedin' id='Linkedinicon"+ i +"' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn' href='" + item.linkedinURL + "';></i>  " + "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
            //            //    "<input type='text' id='hdnemailid_" + i + "' style='border:1px solid white;color:white;display:contents;' value='" + item.candidateemailid + "'>"+
            //            //    "</div>" +
            //            //    "</div>" +
            //            //    "</td >";

            //            //SOURCE FROM

            //            //strTable += "<td>" +
            //            //    "<p class='text-xs font-weight-bold mb-0' > " + item.Sourcefrom + "</p>" +
            //            //    "<p class='text-xs text-secondary mb-0' ></p>" +
            //            //    "</td>";

            //            strTable += "<td>" +
            //                "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
            //                "<p class='text-xs text-secondary mb-0' ></p>" +
            //                "</td>";

            //            /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/
            //            var regex = /\s/g;
            //            var replace = "%20";
            //            var str = item.Resume;
            //            var strClient = str.replace(regex, replace);

            //            strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='docs' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
            //                "<i class='ni ni-single-copy-04' style='color:blue'></i>" +
            //                "</a>" +
            //                "</td>";

            //            strTable += "<td>" +
            //                "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
            //                "<p class='text-xs text-secondary mb-0' ></p>" +
            //                "</td>";

            //            strTable += "<td>" +
            //                "<p class='text-xs font-weight-bold mb-0 text-center' > " + item.totYrsExp + "</p>" +
            //                "<p class='text-xs text-secondary mb-0' ></p>" +
            //                "</td>";

            //            var strPricand = "";
            //            for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
            //                strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp + "\n";
            //            }

            //            var strSeccand = "";
            //            for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
            //                strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp + "\n";
            //            }

            //            if (parseInt(item.overallmatchingpercentage) >= 80) {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
            //                    "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
            //                    "</div>" +
            //                    "</td>";

            //            }
            //            else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
            //                    "<span>" + item.overallmatchingpercentage + "%</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }
            //            else if (parseInt(item.overallmatchingpercentage) < 60) {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
            //                    "<span>" + item.overallmatchingpercentage + "%</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }

            //            if (item.RecruiterRating == "") {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center'>" +
            //                    "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
            //                    "<span>" + 0 + " %</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }
            //            else {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center'>" +
            //                    "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
            //                    "<span>" + item.RecruiterRating + "</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }

            //            strTable += "<td>" +
            //                "<span class='align-middle text-center text-sm badge badge-dot' >" +
            //                "<i class='bg-success'></i>" +
            //                "<span class='text-dark text-xs'>" + item.submitteddate + "</span>" +
            //                "</span>" +
            //                "</td>";

            //            //if (item.submittedby != "") {
            //            //    strTable += "<td class='text-xs font-weight-bold'>" +
            //            //        "<div class='d-flex align-items-center' >" +
            //            //        "<div class='d-flex align-items-center'>" +
            //            //        "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
            //            //        "<span>" + item.submittedby + "</span>" +
            //            //        "</div>" +
            //            //        "</div>" +
            //            //        "</td>";
            //            //}
            //            //else if (item.submittedby == "") {
            //            //    strTable += "<td class='text-xs font-weight-bold'>" +
            //            //        "<div class='d-flex align-items-center' >" +
            //            //        "<div class='d-flex align-items-center'>" +
            //            //        "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
            //            //        "<span>" + item.submittedby + "</span>" +
            //            //        "</div>" +
            //            //        "</div>" +
            //            //        "</td>";
            //            //}
            //            var regex = /\s/g;
            //            var replace = "%20";
            //            var strClient = Clientnamechecking;
            //            var strClientname = strClient.replace(regex, replace);

            //            strTable += "<td class='align-middle dropdown pt-2'>" +
            //                "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
            //                "<i class='ni ni-bold-down' ></i>" +
            //                "</a>" +
            //                "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
            //                "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
            //                "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
            //                "<li>" +
            //                "<hr class='dropdown-divider'>" +
            //                "</li>" +
            //                "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
            //                "</ul>" +
            //                "</td>";
            //        }
            //        i++;
            //    }
            //    else {
            //        document.getElementById("div_norecord").style.display = "block";
            //        document.getElementById("tblCandlist").style.display = "none";
            //    }
            //}

            if (CategoryType == "Matching") {
                if (data.length>0) {
                    if (document.getElementById("div_norecord").style.display == "block") {
                        document.getElementById("div_norecord").style.display = "none";
                        document.getElementById("tblCandlist").style.display = "block";
                    }

                    Matching++;

                    var strImg = "";
                    var obj = {};
                    var obj1 = {};

                    obj.clientname = item.candidatestatus;
                    arry.push(obj);

                    obj1.clientname = item.submittedby;
                    arry1.push(obj1);

                    var strImg = "";
                    var strImg1 = "";
                    var strColumn = "";
                    var url = window.location.href;
                    hashes = url.split("?")[1];

                    if (hashes != null) {
                        var hash = hashes.split('&');
                        var params = hash[0].split("=");
                        if (hash.length > 1) {
                            strColumn = "Feedback";
                        }

                        if (item.linkedinURL == "") {
                            strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
                            //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                            strImg1 = "<a>" + strImg + "</a>";
                        }
                        else if (item.linkedinURL != "") {
                            strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
                            //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
                            strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
                        }

                        var regex = /\s/g;
                        var replace = "%20";
                        var strcand = item.candidatename;

                        var strcandname = strcand.replaceAll(regex, replace);

                        strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                            "<td>" +
                            "<div class='d-flex px-2 py-1'>" +
                            "<div class='d-flex flex-column justify-content-center'>" +
                            "<h6 class='mb-0 text-xs color-change'>" + item.candidatename + "</h6>" +
                            "<p class='text-xs text-secondary mb-0 pt-2'> " +
                            "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
                            "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
                            "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                            "</div>" +
                            "</div>" +
                            "</td >";

                        //str += " <li onclick=searchJob('" + strcandname + "','1')><a class='dropdown-item' href='javascript:;'>" + item.candidatename + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('1') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";

                        //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                        //    "<td class='align-middle text-center text-sm' style='width: 0rem;'><div>" + strImg1 + "</div></td>" +
                        //    "<td onclick=gotojobpage('" + item.candidateid + "');> <div class='d-flex px-2 py-1'>" +
                        //    "<div class='d-flex flex-column justify-content-center'>" +
                        //    "<h6 class='mb-0 text-sm'>" + item.candidatename + "</h6>" +
                        //    "<p class='text-xs text-secondary mb-0'><a >" + item.candidateemailid + " | " + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + " - " + item.type + "</a></p>" +
                        //    "</div ></div ></td> ";

                        //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
                        //    "<td>" +
                        //    "<div class='d-flex px-2 py-1'>" +
                        //    "<div>" + strImg1 + "</div>" +
                        //    "<div class='d-flex flex-column justify-content-center'>" +
                        //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
                        //    "<p class='text-xs text-secondary mb-0 pt-2'> " +
                        //    "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "') ></i> &nbsp; " +
                        //    "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "')></i> &nbsp; " +
                        //    "<i class='fa fa-brands fa-linkedin' id='Linkedinicon"+ i +"' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn' href='" + item.linkedinURL + "';></i>  " + "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
                        //    "<input type='text' id='hdnemailid_" + i + "' style='border:1px solid white;color:white;display:contents;' value='" + item.candidateemailid + "'>"+
                        //    "</div>" +
                        //    "</div>" +
                        //    "</td >";

                        //SOURCE FROM

                        //strTable += "<td>" +
                        //    "<p class='text-xs font-weight-bold mb-0' > " + item.Sourcefrom + "</p>" +
                        //    "<p class='text-xs text-secondary mb-0' ></p>" +
                        //    "</td>";

                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
                            "<p class='text-xs text-secondary mb-0' ></p>" +
                            "</td>";

                        /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/
                        var regex = /\s/g;
                        var replace = "%20";
                        var str = item.Resume;
                        var strClient = str.replace(regex, replace);

                        strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='docs' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
                            "<i class='ni ni-single-copy-04 highlight-blue'></i>" +
                            "</a>" +
                            "</td>";

                        if (item.visastatus == "US Citizen") {
                            strTable += "<td>" +
                                "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                                "<p class='text-xs text-secondary mb-0'>Permanent Visa</p>" +
                                "</td>";
                        }
                        else {
                            strTable += "<td>" +
                                "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
                                "<p class='text-xs text-secondary mb-0' >" + item.VisaEnddate + "</p>" +
                                "</td>";
                        }

                        strTable += "<td>" +
                            "<p class='text-xs font-weight-bold mb-0' > " + item.totYrsExp + " Years</p>" +
                            "<p class='text-xs text-secondary mb-0' ></p>" +
                            "</td>";

                        var strPricand = "";
                        for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
                            strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp + "\n";
                        }

                        var strSeccand = "";
                        for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
                            strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp + "\n";
                        }

                        if (parseInt(item.overallmatchingpercentage) >= 80) {
                            strTable += "<td class='text-xs font-weight-bold'>" +
                                "<div class='d-flex align-items-center' >" +
                                "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                                "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
                                "</div>" +
                                "</td>";
                        }
                        else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
                            strTable += "<td class='text-xs font-weight-bold'>" +
                                "<div class='d-flex align-items-center' >" +
                                "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                                "<span>" + item.overallmatchingpercentage + "%</span>" +
                                "</div>" +
                                "</td>";
                        }
                        else if (parseInt(item.overallmatchingpercentage) < 60) {
                            strTable += "<td class='text-xs font-weight-bold'>" +
                                "<div class='d-flex align-items-center' >" +
                                "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
                                "<span>" + item.overallmatchingpercentage + "%</span>" +
                                "</div>" +
                                "</td>";
                        }

                        if (item.RecruiterRating == "") {
                            strTable += "<td class='text-xs font-weight-bold'>" +
                                "<div class='d-flex align-items-center'>" +
                                "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                                "<span>" + 0 + " %</span>" +
                                "</div>" +
                                "</td>";
                        }
                        else {
                            strTable += "<td class='text-xs font-weight-bold'>" +
                                "<div class='d-flex align-items-center'>" +
                                "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
                                "<span>" + item.RecruiterRating + "</span>" +
                                "</div>" +
                                "</td>";
                        }

                        var regex = /\s/g;
                        var replace = "%20";
                        var strClient = Clientnamechecking;
                        var strClientname = strClient.replace(regex, replace);

                        strTable += "<td class='align-middle dropdown pt-2'>" +
                            "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
                            "<i class='ni ni-bold-down' ></i>" +
                            "</a>" +
                            "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
                            "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
                            "<li><a class='dropdown-item border-radius-md' id='Mail' style='display:none'>Mail JD</a></li>" +
                            "<li><a class='dropdown-item border-radius-md' id='Copy' style='display:none'>Copy Msg Text</a></li>" +
                            "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "&mode=matching' id='Submit' >Submit</a></li>" +
                            "<li>" +
                            "<hr class='dropdown-divider'>" +
                            "</li>" +
                            "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=NotQualifiedPopup('" + item.candidateid + "','" + strcandname + "','" + item.candidatemobno + "','" + item.candidateemailid + "')>Not Qualified</a></li>" +
                            "</ul>" +
                            "</td>";
                    }
                    i++;
                }
                else {
                    document.getElementById("div_norecord").style.display = "block";
                    document.getElementById("tblCandlist").style.display = "none";
                }
            }

            //if (CategoryType == "Vendor Matching") {
            //    if (item.submittedby.includes("TWVU")) {
            //        if (document.getElementById("div_norecord").style.display == "block") {
            //            document.getElementById("div_norecord").style.display = "none";
            //            document.getElementById("tblCandlist").style.display = "block";
            //        }

            //        Vendor_Matching++;
            //        var strImg = "";
            //        var obj = {};
            //        var obj1 = {};

            //        obj.clientname = item.candidatestatus;
            //        arry.push(obj);

            //        obj1.clientname = item.submittedby;
            //        arry1.push(obj1);

            //        var strImg = "";
            //        var strImg1 = "";
            //        var strColumn = "";
            //        var url = window.location.href;
            //        hashes = url.split("?")[1];

            //        if (hashes != null) {
            //            var hash = hashes.split('&');
            //            var params = hash[0].split("=");
            //            if (hash.length > 1) {
            //                strColumn = "Feedback";
            //            }

            //            if (item.linkedinURL == "") {
            //                strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;display:none' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn'></i>";
            //                //strImg = "<img src='Images/LinkedIn-no.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
            //                strImg1 = "<a>" + strImg + "</a>";
            //            }
            //            else if (item.linkedinURL != "") {
            //                strImg = "<i class='fa fa-brands fa-linkedin' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='" + item.linkedinURL + "' ></i>";
            //                //strImg = "<img src='Images/LinkedIn.png' class='avatar avatar-sm me-3' style='margin-right: 1rem !important; height: 30px !important; width: 30px !important;'>";
            //                strImg1 = "<a href='" + item.linkedinURL + "' target='_blank'>" + strImg + "</a>";
            //            }

            //            var regex = /\s/g;
            //            var replace = "%20";
            //            var strcand = item.candidatename;

            //            var strcandname = strcand.replaceAll(regex, replace);

            //            strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
            //                "<td>" +
            //                "<div class='d-flex px-2 py-1'>" +
            //                "<div class='d-flex flex-column justify-content-center'>" +
            //                "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
            //                "<p class='text-xs text-secondary mb-0 pt-2'> " +
            //                "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "')  ></i> &nbsp; " +
            //                "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "') ></i> &nbsp; " + strImg1 +
            //                "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
            //                "</div>" +
            //                "</div>" +
            //                "</td >";

            //            //str += " <li onclick=searchJob('" + strcandname + "','1')><a class='dropdown-item' href='javascript:;'>" + item.candidatename + "</a></li>" + "<li><i class='fa fa-close' onclick=filtercancel('1') style='float:right;margin-top:-22px;padding-right:10px;display:none;'></i></li>";

            //            //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
            //            //    "<td class='align-middle text-center text-sm' style='width: 0rem;'><div>" + strImg1 + "</div></td>" +
            //            //    "<td onclick=gotojobpage('" + item.candidateid + "');> <div class='d-flex px-2 py-1'>" +
            //            //    "<div class='d-flex flex-column justify-content-center'>" +
            //            //    "<h6 class='mb-0 text-sm'>" + item.candidatename + "</h6>" +
            //            //    "<p class='text-xs text-secondary mb-0'><a >" + item.candidateemailid + " | " + item.candidatemobno + " | " + "$" + item.ratePerHr + "/Hr" + " - " + item.type + "</a></p>" +
            //            //    "</div ></div ></td> ";

            //            //strTable += "<tr class='divControl' style='cursor:pointer;' id='divControl_" + i + "' >" +
            //            //    "<td>" +
            //            //    "<div class='d-flex px-2 py-1'>" +
            //            //    "<div>" + strImg1 + "</div>" +
            //            //    "<div class='d-flex flex-column justify-content-center'>" +
            //            //    "<h6 class='mb-0 text-xs'>" + item.candidatename + "</h6>" +
            //            //    "<p class='text-xs text-secondary mb-0 pt-2'> " +
            //            //    "<i class='fas fa-solid fa-envelope fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidateemailid + "' onclick=copyEmailToClipboard('" + item.candidateemailid + "') ></i> &nbsp; " +
            //            //    "<i class='fas fa-solid fa-phone fa-flip-horizontal' data-bs-toggle='tooltip' data-bs-placement='top' title = '" + item.candidatemobno + "' onclick=copyEmailToClipboard('" + item.candidatemobno + "')></i> &nbsp; " +
            //            //    "<i class='fa fa-brands fa-linkedin' id='Linkedinicon"+ i +"' style='color:#0a66c1;' data-bs-toggle='tooltip' data-bs-placement='top' title='LinkedIn' href='" + item.linkedinURL + "';></i>  " + "| " + "$" + item.ratePerHr + " / Hr" + " - " + item.type + " </p > " +
            //            //    "<input type='text' id='hdnemailid_" + i + "' style='border:1px solid white;color:white;display:contents;' value='" + item.candidateemailid + "'>"+
            //            //    "</div>" +
            //            //    "</div>" +
            //            //    "</td >";

            //            //SOURCE FROM

            //            //strTable += "<td>" +
            //            //    "<p class='text-xs font-weight-bold mb-0' > " + item.Sourcefrom + "</p>" +
            //            //    "<p class='text-xs text-secondary mb-0' ></p>" +
            //            //    "</td>";

            //            strTable += "<td>" +
            //                "<p class='text-xs font-weight-bold mb-0' > " + item.currLocation + "</p>" +
            //                "<p class='text-xs text-secondary mb-0' ></p>" +
            //                "</td>";

            //            /*strTable += "<td onclick=gotojobpage('" + item.candidateid + "');><p class='text-xs font-weight-bold mb-0'>" + item.vendorname + "</p><p class='text-xs text-secondary mb-0'>" + item.vendoremailid + "</p></td>";*/
            //            var regex = /\s/g;
            //            var replace = "%20";
            //            var str = item.Resume;
            //            var strClient = str.replace(regex, replace);

            //            strTable += "<td><a href='javascript:' class='text-secondary ps-4' id='docs' id='lblResume_" + i + "'  data-bs-toggle='docs' aria-expanded='false' value='" + strClient + "' onclick=filedownload('" + strClient + "') >" +
            //                "<i class='ni ni-single-copy-04' style='color:blue'></i>" +
            //                "</a>" +
            //                "</td>";

            //            strTable += "<td>" +
            //                "<p class='text-xs font-weight-bold mb-0' > " + item.visastatus + "</p>" +
            //                "<p class='text-xs text-secondary mb-0' ></p>" +
            //                "</td>";

            //            strTable += "<td>" +
            //                "<p class='text-xs font-weight-bold mb-0 text-center' > " + item.totYrsExp + "</p>" +
            //                "<p class='text-xs text-secondary mb-0' ></p>" +
            //                "</td>";

            //            var strPricand = "";
            //            for (var a = 0; a < item.lstcandPrimarySkill.length; a++) {
            //                strPricand += item.lstcandPrimarySkill[a].CandidateSkillName + "-" + item.lstcandPrimarySkill[a].CandidateYrsofExp + "\n";
            //            }

            //            var strSeccand = "";
            //            for (var b = 0; b < item.lstcandSecondarySkill.length; b++) {
            //                strSeccand += item.lstcandSecondarySkill[b].CandidateSkillName + "-" + item.lstcandSecondarySkill[b].CandidateYrsofExp + "\n";
            //            }

            //            if (parseInt(item.overallmatchingpercentage) >= 80) {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + '<b>Primary Skill</b>' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' data-bs-toggle='tooltip' data-bs-placement='bottom' data-container='body' data-animation='true' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
            //                    "<span id='OverallPers' >" + item.overallmatchingpercentage + "%</span>" +
            //                    "</div>" +
            //                    "</td>";

            //            }
            //            else if (parseInt(item.overallmatchingpercentage) >= 60 && parseInt(item.overallmatchingpercentage) < 80) {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
            //                    "<span>" + item.overallmatchingpercentage + "%</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }
            //            else if (parseInt(item.overallmatchingpercentage) < 60) {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<button id='OverallPers' data-bs-toggle='tooltip' data-bs-placement='bottom' title=' " + 'Primary Skill' + "\n" + strPricand + "\n" + "Secondary Skill " + "\n" + strSeccand + "\n" + "' data-container='body' data-animation='true' class='btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' ><i class='fas fa-check' aria-hidden='true'></i></button>" +
            //                    "<span>" + item.overallmatchingpercentage + "%</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }

            //            if (item.RecruiterRating == "") {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center'>" +
            //                    "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
            //                    "<span>" + 0 + " %</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }
            //            else {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center'>" +
            //                    "<button class='btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center' title=' " + item.candidateRemark + "\n" + "' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-html='true' data-bs-original-title='Candidate had worked in top level tech companies like IBM and Infosys'><i class='fas fa-solid fa-star' aria-hidden='true'></i></button>" +
            //                    "<span>" + item.RecruiterRating + "</span>" +
            //                    "</div>" +
            //                    "</td>";
            //            }

            //            if (item.submittedby != "") {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<div class='d-flex align-items-center'>" +
            //                    "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
            //                    "<span>" + item.vendorname + "</span>" +
            //                    "</div>" +
            //                    "</div>" +
            //                    "</td>";
            //            }
            //            else if (item.submittedby == "") {
            //                strTable += "<td class='text-xs font-weight-bold'>" +
            //                    "<div class='d-flex align-items-center' >" +
            //                    "<div class='d-flex align-items-center'>" +
            //                    "<img src='Images/hunt%20crew%20Fav.png' class='avatar avatar-xs me-2' alt='user image'>" +
            //                    "<span>" + item.vendorname + "</span>" +
            //                    "</div>" +
            //                    "</div>" +
            //                    "</td>";
            //            }

            //            var regex = /\s/g;
            //            var replace = "%20";
            //            var strClient = Clientnamechecking;
            //            var strClientname = strClient.replace(regex, replace);

            //            strTable += "<td class='align-middle dropdown pt-2'>" +
            //                "<a href='javascript:' class='text-secondary ps-4' id='dropdownCam' data-bs-toggle='dropdown' aria-expanded='false' >" +
            //                "<i class='ni ni-bold-down' ></i>" +
            //                "</a>" +
            //                "<ul class='dropdown-menu dropdown-menu-end me-sm-n1 px-2 py-1' aria-labelledby='dropdownCam'>" +
            //                "<li><a class='dropdown-item border-radius-md' href='Candidate_View.aspx?id=" + item.candidateid + "' id='View' >View</a></li>" +
            //                "<li><a class='dropdown-item border-radius-md' href='Candidate.aspx?jobid=" + Jobcode + "&id=" + item.candidateid + "' id='Edit' >Edit</a></li>" +
            //                "<li>" +
            //                "<hr class='dropdown-divider'>" +
            //                "</li>" +
            //                "<li><a class='dropdown-item border-radius-md text-danger' href='javascript:;' onclick=gotocandidatepage('" + item.candidateid + "','" + Jobcode + "','" + strClientname + "'); >Feedback</a></li>" +
            //                "</ul>" +
            //                "</td>";
            //        }
            //        i++;
            //    }
            //    else {
            //        document.getElementById("div_norecord").style.display = "block";
            //        document.getElementById("tblCandlist").style.display = "none";
            //    }
            //}
        }
    });

    $("#tblCandlist thead").append(strhead);
    $("#tblCandlist tbody").append(strTable);

    //if (Bench_Matching > 0) {
    //    document.getElementById("li_Bench").style.display = "block"
    //    document.getElementById("lblbenchcount").innerHTML = Bench_Matching;
    //}
    if (Matching > 0) {
        document.getElementById("lblmatchingprofilescount").innerHTML = Matching;
        //document.getElementById("li_Bench").style.display = "block";
        //document.getElementById("li_Vendor").style.display = "block";
    }
    //if (Vendor_Matching > 0) {
    //    document.getElementById("li_Vendor").style.display = "block"
    //    document.getElementById("lblvendorcount").innerHTML = Vendor_Matching;
    //}
    if (Matching == 0) {
        document.getElementById("div_norecord").style.display = "block";
        document.getElementById("tblCandlist").style.display = "none";
    }

    getPaging(10);
}

var priSkill = new Array;
var secSkill = new Array;

function copyJobdescription() {
    var content0 = "Hi <b>Professional</b>,<br/>";
    var content01 = "This is " + $("#lblEmployeename").text() + " from Techwaukee!<br/>";
    var content1 = "<br/><br/>We do have an Immediate Job Opportunity for <b>" + $("#lblJobtitle").text() + "</b><br/>";
    var content2 = "Location:" + $("#lblCity").text() + $("#lblState").text() + $("#lblCountry").text() + "|" + $("#lblEmptype").text() + "<br/>";
    var content3 = "Duration:" + $("#lblMonth").text() + " " + $("#lblMonthDuration").text() + "<br/>";
    var content4 = $("#lblDescription").html() + "<br/>";
    var content5 = "<b>If interested</b>, kindly Please share your and fill in the skill matrix below " + "<br/>";
    var content6 = "Updated Resume: " + "<br/>";
    var content7 = "DL Copy: " + "<br/>";
    var content8 = "Visa Copy:" + "<br/>";
    var content9 = "DL Copy: " + "<br/>";
    var content10 = "LinkedIn URL:" + "<br/>";
    var content11 = "Current Location:" + "<br/>";
    var content12 = "<b>For Submission." + "</b><br/>";

    var content13 = "<br/><b>Skill matrix</b>" + "<br/><br/><br/>";

    $("#hdnjobdescription0").append(content0);
    $("#hdnjobdescription1").val(content01);
    $("#hdnjobdescription2").val(content2);
    $("#hdnjobdescription3").val(content3);
    $("#hdnjobdescription4").val(content4);

    var content141 = "<table id='tblSkill' class='example1' style='border-collapse :collapse; width :  462pt; ' width='615' cellspacing='0' cellpadding='0' border='1'><colgroup><col style='width :  216pt; ' width='287'><col style='width :  123pt; ' span='2' width='164'></colgroup><tbody><tr style='height :  15.0pt; ' height='20'><td style='height: 15pt; width: 216pt; font-weight: 700; border-width: 1pt 0.5pt 1pt 1pt; border-style: solid; border-color: windowtext; background: transparent;color: black;' width='287' class='x_-730027096xl77' height='20' data-ogsb='yellow'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>Primary" +
        "skills</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-width: 1pt 0.5pt; border-style: solid; border-color: windowtext; width: 123pt; font-weight: 700; background: transparent;color: black;' width='164' class='x_-730027096xl78' data-ogsb='yellow'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>Years of" +
        "experience</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-width: 1pt 1pt 1pt 0.5pt; border-style: solid; border-color: windowtext; width: 123pt; font-weight: 700; background: transparent;color: black;' width='164' class='x_-730027096xl79' data-ogsb='yellow'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>Rate yourself" +
        "from 1 to 10</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td></tr>";

    var content142 = "";
    for (p = 0; p < priSkill.length; p++) {
        content142 += "<tr style='height :15.0pt;' height='20'><td style='height :15pt; border-top :none; border-right :  0.5pt solid windowtext; border-bottom :  1pt solid windowtext; border-left :  1pt solid windowtext; ' class='x_-730027096xl65' height='20'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>" + priSkill[p].JobSkillName + "</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-left :  0.5pt solid windowtext; border-top :  none; border-right :  0.5pt solid windowtext; border-bottom :  1pt solid windowtext; ' class='x_-730027096xl66'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '>&nbsp;</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-left :  0.5pt solid windowtext; border-top :  none; border-right :  1pt solid windowtext; border-bottom :  1pt solid windowtext; ' class='x_-730027096xl67'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '>&nbsp;</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td></tr>";
    }

    var content143 = "<tr style='height :  15.0pt; ' height='20'><td style='height :  15.0pt; ' height='20'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td></tr><tr style='height :  15.0pt; ' height='20'><td style='height: 15pt; font-weight: 700; border-top: 1pt solid windowtext; border-right: 0.5pt solid windowtext; border-bottom: none; border-left: 1pt solid windowtext; background: transparent;color: black;' class='x_-730027096xl80' height='20' data-ogsb='yellow'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>Secondary skills</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-left: 0.5pt solid windowtext; font-weight: 700; border-top: 1pt solid windowtext; border-right: 0.5pt solid windowtext; border-bottom: none; background: transparent;color: black;' class='x_-730027096xl81' data-ogsb='yellow'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>Years of experience</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-left: 0.5pt solid windowtext; font-weight: 700; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: none; background: transparent;color: black;' class='x_-730027096xl82' data-ogsb='yellow'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''>Rate yourself from 1 to 10</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td></tr>";

    var content144 = "";

    for (p = 0; p < secSkill.length; p++) {
        content144 += "<tr style='height :  14.5pt; ' height='19'><td style='height :  14.5pt; border-width :  1pt 0.5pt 0.5pt 1pt; border-style :  solid; border-color :  windowtext; ' class='x_-730027096xl68' height='19'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size: 13.3333px;' data-ogsc=''> " + secSkill[p].JobSkillName + "</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-width :  1pt 0.5pt 0.5pt; border-style :  solid; border-color :  windowtext; ' class='x_-730027096xl69'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '>&nbsp;</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td><td style='border-width :  1pt 1pt 0.5pt 0.5pt; border-style :  solid; border-color :  windowtext; ' class='x_-730027096xl70'><span class='x_-730027096font' style='font-family :  verdana; '><span class='x_-730027096size' style='font-size :  13.333333333333332px; '>&nbsp;</span><span class='x_-730027096size' style='font-size :  13.333333333333332px; '><br></span></span></td></tr>";
    }

    var content145 = "</tbody></table>";

    var contentTable;

    contentTable = content141 + content142 + content143 + content144 + content145;

    $("#hdnjobdescription6").val(contentTable);

    $("#div_skillmatrix").empty();
    $("#div_skillmatrix").append($("#hdnjobdescription6").val());

    var copyText0 = document.getElementById("hdnjobdescription0");
    var copyText1 = document.getElementById("hdnjobdescription1");
    var copyText2 = document.getElementById("hdnjobdescription2");
    var copyText3 = document.getElementById("hdnjobdescription3");
    var copyText4 = document.getElementById("hdnjobdescription4");

    /* Select the text field */
    copyText1.select();
    //copyText1.setSelectionRange(0, 99999); /* For mobile devices */

    //copyText2.select();
    //copyText2.setSelectionRange(0, 99999); /* For mobile devices */

    ///* Copy the text inside the text field */
    navigator.clipboard.writeText(content0 + content01 + content1 + "\n" + copyText2.value + "\n" + copyText3.value + "\n\n" + copyText4.value + "\n\n\n" + content5 + "\n" + content6 + "\n" + content7 +
        "\n" + content8 + "\n" + content9 + "\n" + content10 + "\n" + content11 + "\n" + content12 + "\n\n\n" + content13 + document.getElementById("div_skillmatrix").innerHTML);

    //$("#div_skillmatrix").html()

    //$temp.val($(emailId)).select();

    //document.execCommand("Copy");
    //$temp.remove();
}

var copyBtn = document.querySelector('#anch_copy');
copyBtn.addEventListener('click', function () {
    //copyJobdescription();
    var content1 = "We do have an Immediate Job Opportunity for " + $("#lblJobtitle").text();
    $("#hdnjobdescription1").val(content1);

    var urlField = document.querySelector('.example');

    // create a Range object
    var range = document.createRange();
    // set the Node to select the "range"
    range.selectNode(urlField);
    // add the Range to the set of window selections
    window.getSelection().addRange(range);

    // execute 'copy', can't 'cut' in this case
    document.execCommand('copy');
}, false);

function copyemail(mailid) {
    //var $temp = $('<input>');
    //$('body').append($temp);
    //$("#hdnMailid").val($(emailId));

    var copyText = document.getElementById(mailid);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    /* Copy the text inside the text field */
    //navigator.clipboard.writeText(copyText.value);
    alert(document.execCommand("copy"));
}

function copyEmailToClipboard(emailAddress) {
    // Get the clipboard object
    const clipboard = navigator.clipboard;

    // Write the email address to the clipboard
    clipboard.writeText(emailAddress).then(() => {
        // Success!
        alert("Email address copied to clipboard.");
    }, (error) => {
        // Error!
        alert(error.message);
    });
}

function downloadFile(fileName) {
    // Get the file URL.
    var url = "Files/" + fileName;

    // Create an XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Set the request method to "GET".
    req.open("GET", url, true);

    // Set the response type to "blob".
    req.responseType = "blob";

    // Handle the onload event.
    req.onload = function () {
        // Check the request status.
        if (req.status === 200) {
            // The request was successful.
            // Create a Blob object from the response data.
            var blob = new Blob([req.response]);

            // Download the file.
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } else {
            // The request failed.
            alert("Error downloading file.");
        }
    };

    // Send the request.
    req.send();
}

function gotocandidatepage(candidateid, jobcode, jobname) {
    if (jobname == "Techwaukee") {
        window.location.href = 'CandidateViewInternal.aspx?id=' + candidateid + "&jobid=" + jobcode;
    }
    else {
        window.location.href = "Candidate_View.aspx?id=" + candidateid + "&jobid=" + jobcode;
    }
}

var Candrole = "";
function NotQualifiedPopup(candi, candname, mobno, email, candrole) {
    var regex = "%20";
    var replace = " ";
    var strcand = candname;
    var strcandname = strcand.replaceAll(regex, replace);

    $("#hdnCandid").val(candi);
    $("#lblCandidatename").text(strcandname);
    $("#lblMobileNo").text(mobno);
    $("#lblMailid").text(email);
    Candrole = candrole;
    $("#feedbackpopup").modal('show');
}

function NotQualified(Status) {
    var NotQualifiedRemark = document.getElementById("txtCandidateremark").value;
    var Submittedby = getSession('TWE_ID');
    var candid = document.getElementById("hdnCandid").value;
    var strdata = {
        "Jobid": Jobcode, "Status": Status, "Submittedby": Submittedby,
        "NotQualifiedRemark": NotQualifiedRemark, "Candidateid": candid, "Candrole": Candrole
    }

    common_api_ajax_request("api/CandidateNotQualified", "CandidateNotQual", strdata);
}

function searchcand(filterval, filterrow) {
    tdrowval1.length = 0;

    filterval = filterval.replaceAll("%20", " ");

    var table = document.getElementById("tblCandlist");
    var tr = table.getElementsByTagName("tr");
    var filter = filterval;
    var div;

    div = document.getElementById("ul_CandStatus");
    document.getElementById("btnCandStatusfilter").style.color = "rgb(47 214 254 / 3)";

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
        for (i = 1; i < tr.length; i++) {
            var td1 = tr[i].getElementsByTagName("td")[7];

            txtValue1 = td1.getElementsByTagName("span")[0].innerText;

            if (txtValue1.toUpperCase().trim().indexOf(filter.toUpperCase().trim()) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
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

    div = document.getElementById("ul_CandStatus");
    document.getElementById("btnCandStatusfilter").style.color = "#0c0c0c";

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

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "";
    }
    for (var i = 0; i < a.length; i++) {
        a[i].classList.remove("li_selected");
        a[i].style.display = "";
        icon[i].style.display = "none";
    }

    getSearchPaging("#tblCandlist", 10);
}

function gotoWebsitepage() {
    window.open("https://techwaukee.com/USJobView.php?Jobid=" + $("#lblJobid").text(), '_blank');
    //window.location.href = "https://techwaukee.com/USJobView.php?Jobid=" + $("#lblJobid").text() + " target='_blank'";
}

var candname = "";
var candmail = "";
var candvisa = "";

var candtotyrs = "";
var candloc = "";
var JobID = "";
var candid = "";

function getcandidateFeedback(JobVal, Candid,name,mailid,visa,totyrs,location) {
    //document.getElementById("div-profile").style.display = "none";
    //document.getElementById("Div_profile").style.display = "none";
    JobID = JobVal;
    candid = Candid;

    candname = name;
    candmail = mailid;
    candvisa = visa;

    candtotyrs = totyrs;
    candloc = location;

    var TWE_Id = getSession('TWE_ID');
    var strdata = { "jobId": JobVal, "Candid": Candid };
    if (TWE_Id != "") {
        common_api_ajax_request("api/CandidateComments", "CANDFEEDBACK", strdata);
    }
}