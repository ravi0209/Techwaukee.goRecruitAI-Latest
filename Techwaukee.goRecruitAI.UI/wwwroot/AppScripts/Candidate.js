var skillVal = "";
var genuinity = "false";
var genuinityrating = "0";
var btnClicked = "";
var existingcandidate = "false";
var remarkedcomment = "";
var ExistingStatus = "";
var assMode = "";
var Certifi = new Array;
//var priSkillArr = new Array;
//var secSkillArr = new Array;

var assRating = new Array;
var assTable = new Array;
var editMatchMode = "";

$(document).ready(function () {
    $('#lblEmployeename').text(getSession('Name'));
    $('#hdnJobid').val(getSession('Jobid'));
    $('#lblJobtitle1').text(getSession('JobTitle'));
    $('#lblJobtitle2').text(getSession('JobTitle'));
    $('#lblJobname').text(getSession('JobTitle'));
    $('#lblDuration1').text(getSession('JobDuration') + " " + getSession('JobDurationtype'));
    $('#lblDuration2').text(getSession('JobDuration') + " " + getSession('JobDurationtype'));
    $('#lblType1').text(getSession('Type'));
    $('#lblType2').text(getSession('Type'));
    $('#lblWorkingtype1').text(getSession('Location'));
    $('#lblWorkingtype2').text(getSession('Location'));
    $("#imgJob1").attr("src", getSession('Jobimg'));
    $("#imgJob2").attr("src", getSession('Jobimg'));

    localStorage.removeItem("prevvisPage");

    $("#anchDashboard").removeClass("active");
    $("#anchJob").addClass("active");
    $('#lblPagetitle').text("Add Candidate");
    $('#lblPagetitle1').text("Add Candidate");
    $('#lblPagetitle2').text("Candidate");

    $('#dropdownMenuButton').css('display', 'none');
    $('#lblDurationview').css('display', 'none');
    $('#btnSave').css('display', 'none');

    disableControls();
    //disableemplcontrols();
    getSkillData();
    setSession("counter", "1");

    var url = window.location.href;
    hashes = url.split("?")[1];
    if (hashes != null) {
        var hash = hashes.split('&');
        if (hash.length == 1) {
            var params1 = hash[0].split("=");
            if (params1[1] == "NoJob") {
                $("#anchDashboard").removeClass("active");
                $("#anchJob").removeClass("active");
                $("#anchCand").addClass("active");

                localStorage.removeItem("JobTitle");
                localStorage.removeItem("Jobid");
                localStorage.removeItem("JobDuration");
                localStorage.removeItem("Location");
                localStorage.removeItem("Jobimg");
                $('#hdnJobid').val("");
                $('#div_job1').css("display", "none");
                $('#div_job2').css("display", "none");
                $('#btnCheck').prop('disabled', false);
                $('#btnSubmittl').css('display', 'none');
                $('#btnSubmittl').css('display', 'none');
                $('#btnDraft').css('display', 'block');
                $('#btnPipeline').css('display', 'none');
                $('#btnRtr').css('display', 'none');
                AddPrimarySkillTable();
                AddSecondarySkillTable();
            }
            else {
                $("#anchDashboard").removeClass("active");
                $("#anchJob").removeClass("active");
                $("#anchCand").addClass("active");
                document.getElementById("pageheading1").style.display = "block";
                document.getElementById("pageheading2").style.display = "none";
                $("#pageheading1").text("Update Profile");

                getCandidateData(params1[1]);
                $('#btnCheck').prop('disabled', 'disabled');
                $('#btUCheckcontactno').prop('disabled', 'disabled');
            }
        }
        else if (hash.length == 3) {
            var params1 = hash[0].split("=");
            var params2 = hash[1].split("=");
            var params3 = hash[2].split("=");

            if (params3[1] == "matching") {
                editMatchMode = "Matching";
                //if (params1[1] != null) {
                //    var strdata = { "jobid": params1[1], "Region": getSession("RegionValue") };
                //    common_api_ajax_request("api/JobSkillDetails", "JOBSKILLINFO", strdata);
                //}

                getCandidateInfoData(params2[1], params1[1]);
            }
            else {
                getCandidateInfoData(params2[1], params1[1]);
                $('#btnCheck').prop('disabled', 'disabled');
                $('#btUCheckcontactno').prop('disabled', 'disabled');
                document.getElementById("pageheading1").style.display = "block";
                document.getElementById("pageheading2").style.display = "none";
                $("#pageheading1").text("Update Profile");
                enableTLButton();
                if (params3[1] == "BS") {
                    $('#btdelete2').prop('disabled', 'disabled');
                    $('#btdelete3').prop('disabled', 'disabled');
                    document.getElementById("btdelete2").style.color = "#7e7979";
                    document.getElementById("btdelete3").style.color = "#7e7979";
                    document.getElementById("div_Acknowledge").style.display = "none";
                    document.getElementById("btnDraft").style.display = "none";

                    $("#anchBenchsales").addClass("active");
                    $("#anchJob").removeClass("active");
                }
                AddPrimarySkillTable();
                AddSecondarySkillTable();

                if (getSession('Jobid') != null) {
                    var strdata = { "jobid": getSession('Jobid'), "Region": getSession("RegionValue") };
                    common_api_ajax_request("api/JobSkillDetails", "JOBSKILLINFO", strdata);
                }
            }
        }
        else {
            //AddPrimarySkillTable();
            //AddSecondarySkillTable();
            document.getElementById("pageheading1").style.display = "block";
            document.getElementById("pageheading2").style.display = "none";
            $("#pageheading1").text("Update Profile");

            var params1 = hash[0].split("=");
            var params2 = hash[1].split("=");
            getCandidateInfoData(params2[1], params1[1]);

            $('#btnCheck').prop('disabled', 'disabled');
            $('#btUCheckcontactno').prop('disabled', 'disabled');
            enableTLButton();

            if (getSession('TWE_ID').includes("TWVU")) {
                var strdata = { "supplierid": getSession('TWE_ID') };
                common_api_ajax_request("api/getSupplierInfo", "SUPINFO", strdata);
            }
        }
    }
    else {
        if (getSession('TWE_ID').includes("TWVU")) {
            $('#div_RTR').css('display', 'none');
            $('#div_Acknowledge').css('display', 'block');
            $('#btnRtr').css('display', 'none');
            $('#btnDraft').css('display', 'none');
            //$('#btnGenuinity').css('display', 'block');
            //$('#btnGenuinity').css('display', 'block');
            $('#btnSubmit').css('display', 'block');

            var strdata = { "supplierid": getSession('TWE_ID') };
            common_api_ajax_request("api/getSupplierInfo", "SUPINFO", strdata);
        }

        //AddPrimarySkillTable();
        //AddSecondarySkillTable();

        if (getSession('Jobid') != null) {
            var strdata = { "jobid": getSession('Jobid'), "Region": getSession("RegionValue") };
            common_api_ajax_request("api/JobSkillDetails", "JOBSKILLINFO", strdata);
        }
    }

    if (localStorage.getItem("prevPage").includes("Candidate_View.aspx")) {
        var hashes = window.location.href.split("?")[1];

        if (hashes != null) {
            var hash = hashes.split('&');

            if (hash.length > 1) {
                $('#div_job1').css('display', 'flex');
                $('#div_job2').css('display', 'flex');
            }
            else if (hash.length == 1) {
                $('#div_job1').css('display', 'none');
                $('#div_job2').css('display', 'none');
            }
        }
    }
});

function Validatecandidate(strval) {
    var count = 0;
    var emptycount = 0;

    if (strval == "0") {
        if ($('#txtCandidateremark').val() == "") {
            $('#txtCandidateremark').addClass("is-invalid");
            $('#txtCandidateremark').focus();
            emptycount++;
        }
        else {
            $('#txtCandidateremark').removeClass("is-invalid");
            count++;
        }

        if ($('#txtEmailid').val() == "") {
            $("#txtEmailid").addClass("is-invalid");
            $('#txtEmailid').focus();
            emptycount++;
        }
        else {
            $("#txtEmailid").removeClass("is-invalid");

            count++;
        }

        if ($('#txtContactno').val() == "") {
            $('#txtContactno').addClass("is-invalid");
            $('#txtContactno').focus();
            emptycount++;
        }
        else {
            $('#txtContactno').removeClass("is-invalid");
            count++;
        }

        if ($('#txtFirstname').val() == "") {
            $('#txtFirstname').addClass("is-invalid");
            $('#txtFirstname').focus();
            emptycount++;
        }
        else {
            $('#txtFirstname').removeClass("is-invalid");
            count++;
        }

        if ($('#txtLastname').val() == "") {
            $('#txtLastname').addClass("is-invalid");
            $('#txtLastname').focus();
            emptycount++;
        }
        else {
            $('#txtLastname').removeClass("is-invalid");
            count++;
        }

        //if ($('#drpCandidatetitle').val() == "-1") {
        //    $('#drpCandidatetitle').addClass("is-invalid");
        //    $('#drpCandidatetitle').focus();
        //    emptycount++;
        //}
        //else {
        //    $('#drpCandidatetitle').removeClass("is-invalid");
        //    count++;
        //}

        if ($('#drpSourcedfrom').val() == "-1") {
            $('#drpSourcedfrom').addClass("is-invalid");
            $('#drpSourcedfrom').focus();
            emptycount++;
        }
        else {
            $('#drpSourcedfrom').removeClass("is-invalid");
            count++;
        }
        if ($('#drpSourcedfrom').val() == "18002") {
            if ($('#drpPortalname').val() == "-1") {
                $('#drpPortalname').addClass("is-invalid");
                $('#drpPortalname').focus();
                emptycount++;
            }
            else {
                $('#drpPortalname').removeClass("is-invalid");
                count++;
            }
        }
        if ($('#drpSourcedfrom').val() == "18004") {
            if ($('#drpVendorname').val() == "-1") {
                $('#drpVendorname').addClass("is-invalid");
                $('#drpVendorname').focus();
                emptycount++;
            }
            else {
                $('#drpVendorname').removeClass("is-invalid");
                count++;
            }
        }

        if ($('#drpSourcedfrom').val() == "18003") {
            if ($('#txtReferralename').val() == "") {
                $('#txtReferralename').addClass("is-invalid");
                $('#txtReferralename').focus();
                emptycount++;
            }
            else {
                $('#txtReferralename').removeClass("is-invalid");
                count++;
            }
        }

        //if ($('#txtCurrentlocation').val() == "") {
        //    $('#txtCurrentlocation').addClass("is-invalid");
        //    $('#txtCurrentlocation').focus();
        //    emptycount++;
        //}
        //else {
        //    $('#txtCurrentlocation').removeClass("is-invalid");
        //    count++;
        //}
        //if ($('#drpSkill').val() == "-1") {
        //    $('#drpSkill').addClass("is-invalid");
        //    $('#drpSkill').focus();
        //    emptycount++;
        //}
        //else {
        //    $('#drpSkill').removeClass("is-invalid");
        //    count++;
        //}

        //var skicount = 0;
        //$("#drpSkill :selected").each(function () {
        //    skicount++;
        //});

        //if (skicount < 3) {
        //    $('#lblAddatlest').css('display', 'block');
        //    $('#drpSkill').removeClass("form-control");
        //    $('#drpSkill').addClass("is-invalid");
        //    emptycount++;
        //}
        //else {
        //    $('#lblAddatlest').css('display', 'none');
        //    $('#drpSkill').addClass("form-control");
        //    $('#drpSkill').removeClass("is-invalid");
        //    count++;
        //}
    }

    else if (strval == "1") {
        if ($('#txtEmailid').val() == "") {
            $("#txtEmailid").addClass("is-invalid");
            emptycount++;
        }
        else {
            $("#txtEmailid").removeClass("is-invalid");
            count++;
        }

        if ($('#txtContactno').val() == "") {
            $('#txtContactno').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtContactno').removeClass("is-invalid");
            count++;
        }

        if ($('#txtFirstname').val() == "") {
            $('#txtFirstname').addClass("is-invalid");
            $('#txtFirstname').focus();
            emptycount++;
        }
        else {
            $('#txtFirstname').removeClass("is-invalid");
            count++;
        }

        if ($('#txtLastname').val() == "") {
            $('#txtLastname').addClass("is-invalid");
            $('#txtLastname').focus();
            emptycount++;
        }
        else {
            $('#txtLastname').removeClass("is-invalid");
            count++;
        }

        //if ($('#drpCandidatetitle').val() == "-1") {
        //    $('#drpCandidatetitle').addClass("is-invalid");
        //    $('#drpCandidatetitle').focus();
        //    emptycount++;
        //}
        //else {
        //    $('#drpCandidatetitle').removeClass("is-invalid");
        //    count++;
        //}
        if ($('#drpSourcedfrom').val() == "-1") {
            $('#drpSourcedfrom').addClass("is-invalid");
            $('#drpSourcedfrom').focus();
            emptycount++;
        }
        else {
            $('#drpSourcedfrom').removeClass("is-invalid");
            count++;
        }
        if ($('#drpSourcedfrom').val() == "18002") {
            if ($('#drpPortalname').val() == "-1") {
                $('#drpPortalname').addClass("is-invalid");
                $('#drpPortalname').focus();
                emptycount++;
            }
            else {
                $('#drpPortalname').removeClass("is-invalid");
                count++;
            }
        }
        if ($('#drpSourcedfrom').val() == "18004") {
            if ($('#drpVendorname').val() == "-1") {
                $('#drpVendorname').addClass("is-invalid");
                $('#drpVendorname').focus();
                emptycount++;
            }
            else {
                $('#drpVendorname').removeClass("is-invalid");
                count++;
            }
        }

        if ($('#drpSourcedfrom').val() == "18003") {
            if ($('#txtReferralename').val() == "") {
                $('#txtReferralename').addClass("is-invalid");
                $('#txtReferralename').focus();
                emptycount++;
            }
            else {
                $('#txtReferralename').removeClass("is-invalid");
                count++;
            }
        }

        //if ($('#txtCurrentlocation').val() == "") {
        //    $('#txtCurrentlocation').addClass("is-invalid");
        //    emptycount++;
        //}
        //else {
        //    $('#txtCurrentlocation').removeClass("is-invalid");
        //    count++;
        //}

        if ($('#drpVisastatus').val() == "-1") {
            $('#drpVisastatus').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#drpVisastatus').removeClass("is-invalid");
            count++;
        }

        if ($('#txtExperience').val() == "") {
            $('#txtExperience').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtExperience').removeClass("is-invalid");
            count++;
        }

        if ($('#txtDocumenttype').val() == "") {
            $('#txtDocumenttype').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtDocumenttype').removeClass("is-invalid");
            count++;
        }

        if ($('#txtIdno').val() == "") {
            $('#txtIdno').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtIdno').removeClass("is-invalid");
            count++;
        }

        if ($('#txtRate').val() == "") {
            $('#txtRate').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtRate').removeClass("is-invalid");
            count++;
        }

        if ($('#drpType').val() == "-1") {
            $('#drpType').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#drpType').removeClass("is-invalid");
            count++;
        }
        if ($('#drpCountry').val() == "-1") {
            $('#drpCountry').addClass("is-invalid");
            $('#drpCountry').focus();
            emptycount++;
        }
        else {
            $('#drpCountry').removeClass("is-invalid");
            count++;
        }

        if ($('#drpState').val() == "-1") {
            $('#drpState').addClass("is-invalid");
            $('#select2-drpState-container').addClass("dropdown-isvalid mt-n1");
            emptycount++;
        }
        else {
            $('#drpState').removeClass("is-invalid");
            $('#select2-drpState-container').removeClass("dropdown-isvalid mt-n1");
            count++;
        }

        if ($('#drpCity').val() == "-1") {
            $('#drpCity').addClass("is-invalid");
            $('#select2-drpCity-container').addClass("dropdown-isvalid mt-n1");
            emptycount++;
        }
        else {
            $('#drpCity').removeClass("is-invalid");
            $('#select2-drpCity-container').removeClass("dropdown-isvalid mt-n1");
            count++;
        }

        //if ($('#txtSkillsandcertification').val() == "") {
        //    $('#txtSkillsandcertification').addClass("is-invalid");
        //    emptycount++;
        //}
        //else {
        //    $('#txtSkillsandcertification').removeClass("is-invalid");
        //    count++;
        //}

        //if ($('#txtActivelinkedinurl').val() == "") {
        //    $('#txtActivelinkedinurl').addClass("is-invalid");
        //    emptycount++;
        //}
        //else {
        //    $('#txtActivelinkedinurl').removeClass("is-invalid");
        //    count++;
        //}

        if ($('#txtNoticeperiod').val() == "") {
            $('#txtNoticeperiod').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtNoticeperiod').removeClass("is-invalid");
            count++;
        }

        if ($('#txtAvailabelinterview').val() == "") {
            $('#txtAvailabelinterview').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtAvailabelinterview').removeClass("is-invalid");
            count++;
        }

        if ($('#drpNoticeperiod').val() == "") {
            $('#drpNoticeperiod').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#drpNoticeperiod').removeClass("is-invalid");
            count++;
        }

        if (document.getElementById("chkEmployer").checked == true) {
            if ($('#txtEmpmailid').val() == "") {
                $('#txtEmpmailid').addClass("is-invalid");
                emptycount++;
            }
            else {
                $('#txtEmpmailid').removeClass("is-invalid");
                count++;
            }

            if ($('#txtEmpcontname').val() == "") {
                $('#txtEmpcontname').addClass("is-invalid");
                emptycount++;
            }
            else {
                $('#txtEmpcontname').removeClass("is-invalid");
                count++;
            }

            if ($('#txtEmpname').val() == "") {
                $('#txtEmpname').addClass("is-invalid");
                emptycount++;
            }
            else {
                $('#txtEmpname').removeClass("is-invalid");
                count++;
            }

            if ($('#txtCorpationname').val() == "") {
                $('#txtCorpationname').addClass("is-invalid");
                emptycount++;
            }
            else {
                $('#txtCorpationname').removeClass("is-invalid");
                count++;
            }

            //if ($('#txtEmpaddinfo').val() == "") {
            //    $('#txtEmpaddinfo').addClass("is-invalid");
            //    emptycount++;
            //}
            //else {
            //    $('#txtEmpaddinfo').removeClass("is-invalid");
            //    count++;
            //}

            //var specialcount = 0;
            //$("#drpSpecialization :selected").each(function () {
            //    specialcount++;
            //});
            //if (specialcount < 1) {
            //    $('#lblvaliSpecialization').css('display', 'block');
            //    $('#drpSpecialization').removeClass("form-control");
            //    $('#drpSpecialization').addClass("is-invalid");
            //    emptycount++;
            //}
            //else {
            //    $('#lblvaliSpecialization').css('display', 'none');
            //    $('#drpSpecialization').addClass("form-control");
            //    $('#drpSpecialization').removeClass("is-invalid");
            //    count++;
            //}
        }

        if ($('#txtCandidateremark').val() == "") {
            $('#txtCandidateremark').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtCandidateremark').removeClass("is-invalid");
            count++;
        }

        if ($('#starRating').text().trim() == "0") {
            $('#vali_star').css('display', 'initial');
            emptycount++;
        }
        else {
            $('#vali_star').css('display', 'none');
            count++;
        }

        if ($('#lblFilename1').text() == "") {
            $('#divFile').addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#divFile').removeClass("is-invalid");
            count++;
        }
        //var skicount = 0;
        //$("#drpSkill :selected").each(function () {
        //    skicount++;
        //});
        //if (skicount < 3) {
        //    $('#lblAddatlest').css('display', 'block');
        //    $('#drpSkill').removeClass("form-control");
        //    $('#drpSkill').addClass("is-invalid");
        //    emptycount++;
        //}
        //else {
        //    $('#lblAddatlest').css('display', 'none');
        //    $('#drpSkill').addClass("form-control");
        //    $('#drpSkill').removeClass("is-invalid");
        //    count++;
        //}
        if ($('#txtRatingcommentsQ1').val() == "") {
            $('#txtRatingcommentsQ1').addClass("is-invalid");
            $('#txtRatingcommentsQ1').focus();
            emptycount++;
        }
        else {
            $('#txtRatingcommentsQ1').removeClass("is-invalid");
            count++;
        }

        for (var i = 0; i < Pricount.length; i++) {
            if (document.getElementById("drpPrimaryYear_" + i).value == "") {
                $('#drpPrimaryYear_' + i).addClass("is-invalid");
                $('#drpPrimaryYear_' + i).focus();
                $("#btnprimaryskill").removeClass("accordion-button border-bottom collapsed");
                $("#btnprimaryskill").addClass("accordion-button border-bottom");
                $("#btnprimaryskill").attr("aria-expanded", true);

                $("#collapseOne1").removeClass("accordion-collapse collapse");
                $("#collapseOne1").addClass("accordion-collapse collapse show");
                emptycount++;
            }
            else {
                $('#drpPrimaryYear_' + i).removeClass("is-invalid");
                count++;
            }
        }

        for (var i = 0; i < Seccount.length; i++) {
            if (document.getElementById("drpSecondaryYear_" + i).value == "") {
                $('#drpSecondaryYear_' + i).addClass("is-invalid");
                $('#drpSecondaryYear_' + i).focus();
                $("#btnsecondaryskill").removeClass("accordion-button border-bottom collapsed");
                $("#btnsecondaryskill").addClass("accordion-button border-bottom");
                $("#btnsecondaryskill").attr("aria-expanded", true);

                $("#collapseTwo1").removeClass("accordion-collapse collapse");
                $("#collapseTwo1").addClass("accordion-collapse collapse show");
                emptycount++;
            }
            else {
                $('#drpSecondaryYear_' + i).removeClass("is-invalid");
                count++;
            }
        }
    }
    //validateFirstname();
    //validateLastname();
    validatePhone();
    if (counterPhone == 0) {
        $('#txtContactno').removeClass("is-invalid");
        $("#candPhone").css("display", "none");
        count++;
    }
    else {
        $('#txtContactno').addClass("is-invalid");
        $("#candPhone").css("display", "inline");
        emptycount++;
    }

    if (counterFirst == 0) {
        $('#txtFirstname').removeClass("is-invalid");
        $("#candfirstname").css("display", "none");
        count++;
    }
    else {
        $('#txtFirstname').addClass("is-invalid");
        $("#candfirstname").css("display", "inline");
        emptycount++;
    }

    if (counterLast == 0) {
        $('#txtLastname').removeClass("is-invalid");
        $("#candlastname").css("display", "none");
        count++;
    }
    else {
        $('#txtLastname').addClass("is-invalid");
        $("#candlastname").css("display", "inline");
        emptycount++;
    }

    if (parseInt(emptycount) > 0 && parseInt(count) != parseInt(emptycount)) {
        return false;
    }

    else if (parseInt(count) > 0) {
        return true;
    }
}

function getCandidateData(candId, JobID) {
    getAssessmentQuestionlist(getSession("RegionValue"));
    var strdata = { "Candidateid": candId, "JobID": JobID };
    if (candId != "") {
        common_api_ajax_request("api/CandidateView", "EDITCAND", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        alert("fill");
    }
}

function getCandidateInfoData(candId, Jobid) {
    getAssessmentQuestionlist(getSession("RegionValue"));
    var strdata = { "Candidateid": candId, "Jobid": Jobid };
    if (candId != "") {
        common_api_ajax_request("api/CandidateAssign", "CANDINFO", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        alert("fill");
    }
}

function checkifCandExists() {
    var emailid = $("#txtEmailid").val().trim();
    var number = $("#txtContactno").val().trim();
    if (Validatecheckcandidate() == true) {
        var strdata = { "emailid": emailid, "number": number, "Condition": Checkval };
        //if (emailid != "") {
        common_api_ajax_request("api/CandidateCheck", "CHECK", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
        //}
    }
}
var Citizenship = new Array;
var Prooflist = new Array;
var RTRstatus = "";
var Pricount = "";
var Seccount = "";
function successCallBack(key, value) {
    var response = value.d;
    var resData = response.data;

    if (key == "CHECK") {
        if (resData.candidateemailid != null) {
            setSession("candidatename", resData.candidatename);
            setSession("candidatemobileno", resData.candidatemobileno);
            setSession("candidateemailid", resData.candidateemailid);
            setSession("currentLocation", resData.currentLocation);
            setSession("visastatus", resData.visastatus);
            setSession("yrsofexp", resData.yrsofexp);
            setSession("legalId", resData.legalId);
            setSession("documenttype", resData.documenttype);
            setSession("relocate", resData.relocate);
            setSession("idNo", resData.idNo);
            setSession("ratePerHr", resData.ratePerHr);
            setSession("type", resData.type);
            setSession("skillsandCertif", resData.skillsandCertif);
            setSession("linkedinURL", resData.linkedinURL);
            setSession("noticePeriod", resData.noticePeriod);
            setSession("availableforinterview", resData.availableforinterview);
            setSession("employerid", resData.employerid);
            setSession("employermailid", resData.employermailid);
            setSession("employerContactno", resData.employerContactno);
            setSession("employeename", resData.employeename);
            setSession("corporationname", resData.corporationname);
            setSession("employeradderinformation", resData.employeradderinformation);
            setSession("employerspecialization", resData.employerspecialization);

            setSession("firstname", resData.candFirstname);
            setSession("lastname", resData.candLastname);
            setSession("sourcedfrom", resData.Sourcedfrom);
            setSession("Title", resData.Candidatetitle);
            setSession("candCountry", resData.Country);
            setSession("candState", resData.State);
            setSession("candCity", resData.City);

            var selectObj = "";
            selectObj = document.getElementById("drpCandidatetitle");

            for (var i = 0; i < selectObj.length; i++) {
                if (selectObj[i].value == resData.Candidatetitle) {
                    selectObj[i].selected = true;
                }
            }

            if (resData.Referralname != "") {
                setSession("Referralname", resData.Referralname);
            }
            else {
                setSession("Referralname", "");
            }

            if (resData.Vendorname != "-1") {
                setSession("Vendorname", resData.Vendorname);
            }
            else {
                setSession("Vendorname", "");
            }

            if (resData.Portalname != "-1") {
                setSession("Portalname", resData.Portalname);
            }
            else {
                setSession("Portalname", "");
            }

            //priSkillArr = resData.lstPriSkill;
            //secSkillArr = resData.lstSecSkill;

            assRating = resData.genuinityCheckRating;
            assTable = resData.genuinityChecks;

            genuinity = resData.genuinityStatus;
            existingcandidate = "true";
            if (genuinity == "true") {
                $('input[name="chkgencheck"]').prop("checked", true);
                //document.getElementById("div_genuinity").style.display = "block";
                document.getElementById("btnGenuinity").style.display = "none";
                genuinityrating = resData.recruitergenrating;
                $("#lblgenvalue").text(resData.recruitergenrating);
            }

            else if (genuinity == "false") {
                document.getElementById("div_genuinity").style.display = "none";
                //document.getElementById("btnGenuinity").style.display = "block";
            }

            if (resData.jobcode != "") {
                if (resData.jobcode == $('#hdnJobid').val()) {
                    $("#lblmsg1").text("This Candidate is already assigned to the same job.");
                    $("#lblmsg2").text("");
                    //$('#btnApplydur').css('display', 'none');
                    document.getElementById("div_continue").style.display = "none";
                    disableControls();
                }
                else {
                    $("#lblmsg1").text("This Candidate already exists in the database.");
                    $("#lblmsg2").text("If you wish to use the same candidate.Press Continue");
                    //$('#btnApplydur').css('display', 'block');
                    document.getElementById("div_continue").style.display = "block";
                }
            }

            $("#check").modal('show');
            // $("#btnCheckhid").click();
        }

        else {
            $("#lblmsg1").text("This Candidate does not exists in the database.");
            $("#lblmsg2").text("");
            //$('#btnApplydur').css('display', 'none');
            document.getElementById("div_continue").style.display = "none";
            $("#check").modal('show');
            genuinity = resData.genuinityStatus;

            if (genuinity == "true") {
                $('input[name="chkgencheck"]').prop("checked", true);
                //document.getElementById("div_genuinity").style.display = "block";
                document.getElementById("btnGenuinity").style.display = "none";
                genuinityrating = resData.recruitergenrating;
                $("#lblgenvalue").text(resData.recruitergenrating);
            }

            else if (genuinity == "false") {
                document.getElementById("div_genuinity").style.display = "none";
                //document.getElementById("btnGenuinity").style.display = "block";
            }

            enableControls();
        }

        stopLoader();
    }

    else if (key == "EMPLCHECK") {
        stopLoader();
        if (resData.employerid != null) {
            setSession("employerid", resData.employerid);
            setSession("emplmailid", resData.employeremailid);
            setSession("emplContactno", resData.employermobileno);
            setSession("emplname", resData.employername);
            setSession("corpname", resData.employercorporationname);
            setSession("emplspecialization", resData.employerspecialization);
            setSession("emplinformation", resData.employeradditionalinfo);
            $("#lblmsgEmp1").text("This Employer already exists in the database.");
            $("#lblmsgEmp2").text("If you wish to use the same Employer.Press Continue");
            document.getElementById("div_emplcontinue").style.display = "block";
            $("#checkEmp").modal('show');
        }
        else {
            $("#lblmsgEmp1").text("This Employer does not exists in the database.");
            $("#lblmsgEmp2").text("");
            document.getElementById("div_emplcontinue").style.display = "none";
            $("#checkEmp").modal('show');

            enableemplcontrols();
        }
        stopLoader();
    }

    else if (key == "EDITCAND") {
        $('#hdnscreenmode').val("E");
        if (resData.jobcode == "") {
            $('#hdnJobid').val("");
            $('#div_job1').css("display", "none");
            $('#div_job2').css("display", "none");

            $('#btnSubmittl').css('display', 'none');
            $('#btnDraft').css('display', 'block');
            $('#btnPipeline').css('display', 'none');
            $('#btnSave').css('display', 'none');
        }
        else {
            $('#hdnJobid').val(resData.jobcode);
            $('#div_job1').css("display", "flex");
            $('#div_job2').css("display", "flex");
        }

        $("#txtFirstname").val(resData.candFirstname);
        $("#txtLastname").val(resData.candLastname);
        $("#drpCandidatetitle").val(resData.Candidatetitle).prop("selected", true);

        $("#drpSourcedfrom").val(resData.Sourcedfrom).prop("selected", true);

        if (resData.Portalname != "-1" && resData.Portalname != "") {
            $("#drpPortalname").val(resData.Portalname).prop("selected", true);
            $('#drpPortalname').css("display", "block");
            $("#lblTitlename").text("Portal Name");
        }

        if (resData.Vendorname != "-1" && resData.Vendorname != "" && resData.Vendorname != null) {
            $("#drpVendorname").val(resData.Vendorname).prop("selected", true);
            $('#drpVendorname').css("display", "block");
            $("#lblTitlename").text("Vendor Name");
        }
        if (resData.Referralname != "") {
            $("#txtReferralename").val(resData.Referralname);
            $('#txtReferralename').css("display", "block");
            $("#lblTitlename").text("Referral Name");
        }

        if (resData.Sourcedfrom != "") {
            $('#div_portal').css("display", "block");
        }
        else {
            $('#div_portal').css("display", "none");
        }

        $("#txtEmailid").val(resData.candidateemailid);
        $("#txtContactno").val(resData.candidatemobileno);
        $("#txtCandidatename").val(resData.candidatename);
        $("#txtCurrentlocation").val(resData.currentLocation);

        if (resData.Country == "" || resData.Country == null) {
            $("#drpCountry").val(10751).prop("selected", true);
        }
        else {
            $("#drpCountry").val(resData.Country).prop("selected", true);
        }
        ChangeCountry();

        if (resData.State == "" || resData.State == null) {
            $("#drpState").val(-1).prop("selected", true);
        }
        else {
            $("#drpState").val(resData.State).prop("selected", true);
        }
        ChangeState();
        if (resData.City == "" || resData.City == null) {
            $("#drpCity").val(-1).prop("selected", true);
            $("#drpCity").val(-1).prop("disabled", true);
        }
        else {
            $("#drpCity").val(resData.City).prop("selected", true);
        }

        $("#drpVisastatus").val(resData.visastatus).prop("selected", true);
        $("#txtExperience").val(resData.yrsofexp);
        $('#hdnCandStatus').val(resData.candStatus);
        remarkedcomment = resData.candidateRemark;
        existingcandidate = "true";
        if (resData.legalId == "Yes") {
            $('input[name="chkID"]').prop("checked", true);
        }

        if (resData.documenttype == "Yes") {
            $('input[name="chkRelocate"]').prop("checked", true);
        }
        $("#txtDocumenttype").val(resData.documenttype);
        $("#txtIdno").val(resData.idNo);
        if (resData.ratePerHr != "") {
            $("#txtRate").val(resData.ratePerHr);
        }
        else if (resData.Maxsubmissionrate != "") {
            $("#txtRate").val(resData.Maxsubmissionrate);
        }
        $("#drpType").val(resData.type).prop("selected", true);
        $("#txtActivelinkedinurl").val(resData.linkedinURL);
        $("#drpNoticeperiod").val(resData.noticePeriod).prop("selected", true);
        $("#txtAvailabelinterview").val(resData.availableforinterview);

        if (resData.createdBy == "TWEU0007" && resData.candStatus == "101") {
            document.getElementById("btnNotsub").style.display = "block";
        }

        $("#hdnEmployerid").val(resData.employerid);
        $("#txtEmpmailid").val(resData.employermailid);
        $("#txtEmpcontnumber").val(resData.employerContactno);
        $("#txtEmpname").val(resData.employeename);
        $("#txtCorpationname").val(resData.corporationname);
        $("#txtEmpaddinfo").val(resData.employeradderinformation);
        $("#txtCandidateremark").val(resData.candidateRemark);
        $("#starRating").text(resData.recruiterrating);
        getrateUser("mrat_" + resData.recruiterrating.trim());

        if (resData.PrimarySkill != "") {
            options1 = Array.from(document.querySelectorAll('#drpprimaryskills option'));

            resData.PrimarySkill.split(',').forEach(function (v) {
                if (v != "" && v != null) {
                    options1.find(c => c.value == v).selected = true;
                }
            });
        }

        if (resData.Certification != "") {
            options2 = Array.from(document.querySelectorAll('#drpcertification option'));

            resData.Certification.split(',').forEach(function (v) {
                if (v != "") {
                    options2.find(c => c.value == v).selected = true;
                }
            });
        }

        //var j = 1;
        //for (var i = 0; i < resData.lstCandProof.length; i++) {
        //    $("#proofId" + j).val(resData.lstCandProof[i].candproofid);
        //    $("#drpDocumenttype" + j).val(resData.lstCandProof[i].documenttype).prop("selected", true);
        //    $("#txtIdno" + j).val(resData.lstCandProof[i].idNo);
        //    $("#lblFilename" + j).text(resData.lstCandProof[i].idfilename);
        //    if ($("#lblFilename" + j).text() != "") {
        //        $('#lblFilename' + j).css('display', 'block');
        //        $('#div_Filename' + j).css('display', 'block');
        //        $('#divAttach' + j).css('display', 'block');
        //    }
        //    else if ($("#lblFilename" + j).text() == "") {
        //        $('#lblFilename' + j).css('display', 'none');
        //        $('#divAttach' + j).css('display', 'none');
        //    }

        //    j++;
        //}
        Prooflist = resData.lstCandProof;
        var j = 1;
        for (var i = 0; i < resData.lstCandProof.length; i++) {
            if (resData.lstCandProof[i].documenttype == "Certification" || resData.lstCandProof[i].documenttype == "Visa-Assessment") {
            }
            else {
                $('#div_Filename' + j).css('display', 'block');
                $("#proofId" + j).val(resData.lstCandProof[i].candproofid);
                $("#drpDocumenttype" + j).val(resData.lstCandProof[i].documenttype).prop("selected", true);
                $("#txtIdno" + j).val(resData.lstCandProof[i].idNo);
                $("#lblFilename" + j).text(resData.lstCandProof[i].idfilename);
                $('#lblFilename' + j).css('display', 'block');
                $('#divAttach' + j).css('display', 'block');

                j++;
            }
        }
        if (resData.lstCandProof.length > 0) {
            $('#btnAdd').prop('disabled', false);
        }
        enableControls();
        enableemplcontrols();

        //options = Array.from(document.querySelectorAll('#drpSkill option'));

        //resData.skillsandCertif.split(',').forEach(function (v) {
        //    options.find(c => c.value == v).selected = true;
        //});

        if (parseInt(resData.candStatus) >= 103) {
            $('#btnSubmittl').css('display', 'none');
            $('#btnDraft').css('display', 'none');
            $('#btnPipeline').css('display', 'none');
            $('#btnSave').css('display', 'block');
        }
        else if (resData.candStatus == "101" || resData.candStatus == "102") {
            $('#btnSave').css('display', 'none');

            if (getSession('TWE_ID').includes("TWVU")) {
                $('#btnSubmit').css('display', 'block');
                $('#div_rtr').css('display', 'block');
                $('#div_commrtr').css('display', 'none');
                $('#div_Acknowledge').css('display', 'block');
                $('#div_RTR').css('display', 'none');
                $('#btnPipeline').css('display', 'none');
                $('#btnDraft').css('display', 'none');
            }
            else {
                //$('#btnPipeline').css('display', 'block');
                $('#btnDraft').css('display', 'block');
            }
        }

        if (resData.rtrStatus == "1") {
            $('#btnRtr').css('display', 'none');

            if (resData.candStatus >= 103) {
                $('#chkRTR').prop('disabled', true);
                $('#chkRTR1').prop('disabled', true);
            }

            else {
                $('#chkRTR').prop('disabled', false);
                $('#chkRTR1').prop('disabled', false);
            }
        }

        RTRstatus = resData.rtrStatus;

        if (resData.genuinityStatus == null) {
            genuinity = "false";
        }
        else {
            genuinity = resData.genuinityStatus;
        }
        if (resData.Acknowledgement_content != "") {
            $("#txtAcknowledge").val(resData.Acknowledgement_content);
            $('#chkRTR').prop('checked', true);
            $('#chkRTR1').prop('checked', true);
        }

        if (genuinity == "true") {
            $('input[name="chkgencheck"]').prop("checked", true);
            //document.getElementById("div_genuinity").style.display = "block";
            document.getElementById("btnGenuinity").style.display = "none";
            genuinityrating = resData.recruitergenrating;
            $("#lblgenvalue").text(resData.recruitergenrating);
        }

        else if (genuinity == "false") {
            document.getElementById("div_genuinity").style.display = "none";
            //document.getElementById("btnGenuinity").style.display = "block";
        }
        if (document.getElementById("drpType").value == "10253") {
            if (resData.employerid == "") {
                document.getElementById("chkEmployer").disabled = false;
            }
            else if (resData.employerid != "") {
                document.getElementById("chkEmployer").checked = true;
                document.getElementById("divEmployer").style.display = "block";

                options1 = Array.from(document.querySelectorAll('#drpSpecialization option'));

                if (resData.employerspecialization != "") {
                    resData.employerspecialization.split(',').forEach(function (v) {
                        options1.find(c => c.value == v).selected = true;
                    });
                }
            }
        }
        else {
            if (document.getElementById("drpType").value == "10253" ||
                document.getElementById("drpType").value == "-1") {
                document.getElementById("chkEmployer").disabled = false;
                document.getElementById("divEmployer").style.display = "none";
            }
            else {
                document.getElementById("chkEmployer").disabled = true;
                document.getElementById("divEmployer").style.display = "none";
                document.getElementById("chkEmployer").checked = false;
            }
        }

        //setGenuinityCandidate();
        if (resData.genuinityChecks.length != 0) {
            assMode = "E";
            setCandidateQuestion(resData.genuinityChecks);
            $('input[name="chkGenuinity"]').prop("checked", true);
            document.getElementById("value").innerHTML = resData.genuinityCheckRating.Overallsystemrating;
            document.getElementById("value1").innerHTML = resData.genuinityCheckRating.Overallrecruiterrating;
            document.getElementById("txtRatingcommentsQ1").value = resData.genuinityCheckRating.Remarks;
            var sliderFormat = document.getElementById('slider-format');

            var inputFormat = document.getElementById('value1');

            sliderFormat.noUiSlider.set(inputFormat.innerHTML);
            document.getElementById('slider-format').removeAttribute('disabled');
            //sliderFormat.setAttribute('disabled', true);
        }
        else {
            $('#div-Genuinity').css('display', 'none');
        }
        $('#div_Acknowledge').css('display', 'block');

        if (resData.lstPriSkill != "" && resData.lstPriSkill !=null) {
            Pricount = resData.lstPriSkill;

            //if (resData.lstPriSkill.length == 1) {
            //    document.getElementById("hdnHDNid_0").innerHTML = resData.lstPriSkill[0].JobSkillID;
            //    $("#drpPrimarySkill_0").val(resData.lstPriSkill[0].JobSkillName).prop("selected", true)
            //    $("#drpPrimaryYear_0").val(resData.lstPriSkill[0].JobYrsofExp).prop("selected", true)
            //    document.getElementById("lblmode_0").innerHTML = "U";
            //}
            //else {
            for (var i = 0; i < resData.lstPriSkill.length; i++) {
                var table = document.getElementById("tblCandlist");
                table.style.display = "table";

                var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

                var tableHead = document.getElementById("tblCandlist").getElementsByTagName("THEAD")[0];;

                //Add Row.

                var i = tBody.rows.length;

                row = tBody.insertRow(-1);
                row.className = "divControl";
                row.id = "divControlPri_" + i;

                //CandId = CandidateidBS;

                var VenID = i;

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='hdnHDNid_" + i + "'></label>";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='lblmode_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>U</label>";
                cell.className = "align-middle ps-3";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = " <div class='col-md-6'>" +
                    "<select class='form-control' name='choice-button' id ='drpPrimarySkill_" + i + "' onchange='totSkillCount();'>" +
                    "</select>" +
                    "</div > ";
                //cell.className = "form-controlnew select2 select2-hidden-accessible";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col-md-12'>" +
                    "<select class='form-control' id='drpPrimaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

                    "</select>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col-md-12 text-center' >" +
                    "<button id='btnAddPriskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
                    "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddPrimarySkillTable()' ></i>" +
                    "</button>" +
                    "<button id='btnremovetrPrimary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
                    "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
                    "</button>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label>" + i + "</label>";
                cell.style.display = "none";

                var option1 = new Option("--Select Skill--", "-1");
                $(option1).html("--Select Skill--");
                $("#drpPrimarySkill_" + i).append(option1);

                for (var x = 0; x < SkillArr.length; x++) {
                    var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

                    $(optionpri).html(SkillArr[x].Name);
                    $("#drpPrimarySkill_" + i).append(optionpri);
                }

                //if (document.getElementById("drpPrimarySkill_" + i)) {
                //    var element = document.getElementById("drpPrimarySkill_" + i);
                //    const example = new Choices(element, {});
                //}

                var option1 = new Option("--Select Year--", "-1");
                $(option1).html("--Select Year--");
                $("#drpPrimaryYear_" + i).append(option1);

                for (var y = 0; y < SkillArrY.length; y++) {
                    var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

                    $(optionyrs).html(SkillArrY[y].Name);
                    $("#drpPrimaryYear_" + i).append(optionyrs);
                }
            }
            Pricount = resData.lstPriSkill;

            for (var w = 0; w < resData.lstPriSkill.length; w++) {
                document.getElementById("hdnHDNid_" + w).innerHTML = resData.lstPriSkill[w].JobSkillID;
                $("#drpPrimarySkill_" + w).val(resData.lstPriSkill[w].JobSkillName).prop("selected", true);
                $("#drpPrimaryYear_" + w).val(resData.lstPriSkill[w].JobYrsofExp).prop("selected", true);
                $("#drpPrimarySkill_" + w).prop("disabled", true);
            }

            for (var x = 0; x < tBody.rows.length; x++) {
                var y = x - 1;
                if ((tBody.rows.length - 1) == x) {
                    document.getElementById("btnAddPriskills" + x).style.display = "inline";
                }
            }
            //}
        }

        if (resData.lstSecSkill != "" && resData.lstSecSkill != null) {
            Seccount = resData.lstSecSkill;
            //if (resData.lstSecSkill.length == 1) {
            //    document.getElementById("lblHDNidS_0").innerHTML = resData.lstSecSkill[0].JobSkillID;
            //    $("#drpSecondarySkill_0").val(resData.lstSecSkill[0].JobSkillName).prop("selected", true);
            //    $("#drpSecondaryYear_0").val(resData.lstSecSkill[0].JobYrsofExp).prop("selected", true);
            //    document.getElementById("lblmodeS_0").innerHTML = "U";
            //}
            //else {
            for (var i = 0; i < resData.lstSecSkill.length; i++) {
                var table = document.getElementById("tblSecondarySkill");
                table.style.display = "table";

                var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];

                var tableHead = document.getElementById("tblSecondarySkill").getElementsByTagName("THEAD")[0];;

                //Add Row.

                var i = tBody.rows.length;

                row = tBody.insertRow(-1);
                row.className = "divControl";
                row.id = "divControlSec_" + i;

                var modeBS = document.getElementById("hdnmodeS").value;
                var v = document.getElementById("hdnHDNidS").value;

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='lblHDNidS_" + i + "'>" + document.getElementById("hdnHDNid_0").value + "</label>";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='lblmodeS_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>U</label>";
                cell.className = "align-middle ps-3";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = " <div class='col-md-6'>" +
                    "<select class='form-control' name='choice-button' id ='drpSecondarySkill_" + i + "' onchange='totSkillCount();'>" +
                    "</select>" +
                    "</div > ";
                //cell.className = "form-controlnew select2 select2-hidden-accessible";CandidateAssign
                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col - md - 12'>" +
                    "<select class='form-control' id='drpSecondaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

                    "</select>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col-md-12 text-center' >" +
                    "<button id='btnAddSecskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
                    "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddSecondarySkillTable()' ></i>" +
                    "</button>" +
                    "<button id='btnremovetrSecondary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
                    "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
                    "</button>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label>" + i + "</label>";
                cell.style.display = "none";

                var option1 = new Option("--Select Skill--", "-1");
                $(option1).html("--Select Skill--");
                $("#drpSecondarySkill_" + i).append(option1);

                for (var x = 0; x < SkillArr.length; x++) {
                    var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

                    $(optionpri).html(SkillArr[x].Name);
                    $("#drpSecondarySkill_" + i).append(optionpri);
                }

                //if (document.getElementById("drpSecondarySkill_" + i)) {
                //    var element = document.getElementById("drpSecondarySkill_" + i);
                //    const example = new Choices(element, {});
                //}

                var option1 = new Option("--Select Year--", "-1");
                $(option1).html("--Select Year--");
                $("#drpSecondaryYear_" + i).append(option1);

                for (var y = 0; y < SkillArrY.length; y++) {
                    var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

                    $(optionyrs).html(SkillArrY[y].Name);
                    $("#drpSecondaryYear_" + i).append(optionyrs);
                }
            }

            for (var d = 0; d < resData.lstSecSkill.length; d++) {
                document.getElementById("lblHDNidS_" + d).innerHTML = resData.lstSecSkill[d].JobSkillID;
                $("#drpSecondarySkill_" + d).val(resData.lstSecSkill[d].JobSkillName).prop("selected", true);
                $("#drpSecondaryYear_" + d).val(resData.lstSecSkill[d].JobYrsofExp).prop("selected", true);
                $("#drpSecondarySkill_" + d).prop("disabled", true);
            }

            for (var x = 0; x < tBody.rows.length; x++) {
                var y = x - 1;
                if ((tBody.rows.length - 1) == x) {
                    document.getElementById("btnAddSecskills" + x).style.display = "inline";
                }
            }
            //}
        }

        document.getElementById("div_Contant").style.display = "none";
        document.getElementById("div_candidatehid").style.display = "block";

        if (getSession('sourcedfrom') == "18001") {
            $("#div_sourcedfrom").removeClass("col-md-4");
            $("#div_sourcedfrom").addClass("col-md-6");

            $("#div_LinekedIn").removeClass("col-md-4");
            $("#div_LinekedIn").addClass("col-md-6");
        }
        else {
            $("#div_sourcedfrom").removeClass("col-md-6");
            $("#div_sourcedfrom").addClass("col-md-4");

            $("#div_LinekedIn").removeClass("col-md-6");
            $("#div_LinekedIn").addClass("col-md-4");
        }

        stopLoader();
    }

    else if (key == "CANDINFO") {
        $('#hdnscreenmode').val("E");
        ExistingStatus = resData.ExistingStatus;

        $('#hdnJobid').val(resData.jobcode);
        $('#lblJobtitle1').text(resData.jobtitle);
        $('#lblJobtitle2').text(resData.jobtitle);
        $('#lblDuration1').text(resData.jobduration + "" + resData.jobdurationtype);
        $('#lblDuration2').text(resData.jobduration + "" + resData.jobdurationtype);
        $('#lblType1').text(resData.jobempltype);
        $('#lblType2').text(resData.jobempltype);
        $('#lblWorkingtype1').text(resData.joblocation);
        $('#lblWorkingtype2').text(resData.joblocation);
        $("#imgJob1").attr("src", resData.jobimage);
        $("#imgJob2").attr("src", resData.jobimage);

        $("#txtEmailid").val(resData.candidateemailid);
        $("#txtContactno").val(resData.candidatemobileno);
        $("#txtCandidatename").val(resData.candidatename);
        $("#txtCurrentlocation").val(resData.currentLocation);
        if (resData.Country == "" || resData.Country == null) {
            $("#drpCountry").val(10751).prop("selected", true);
        }
        else {
            $("#drpCountry").val(resData.Country).prop("selected", true);
        }
        ChangeCountry();

        if (resData.State == "" || resData.State == null) {
            $("#drpState").val(-1).prop("selected", true);
        }
        else {
            $("#drpState").val(resData.State).prop("selected", true);
        }
        ChangeState();
        if (resData.City == "" || resData.City == null) {
            $("#drpCity").val(-1).prop("selected", true);
            $("#drpCity").val(-1).prop("disabled", true);
        }
        else {
            $("#drpCity").val(resData.City).prop("selected", true);
        }
        $("#drpVisastatus").val(resData.visastatus).prop("selected", true);
        $('#hdnCandStatus').val(resData.candStatus);
        $("#txtExperience").val(resData.yrsofexp);
        $("#drpNoticeperiod").val(resData.noticePeriod).prop("selected", true);
        remarkedcomment = resData.candidateRemark;

        $("#txtFirstname").val(resData.candFirstname);
        $("#txtLastname").val(resData.candLastname);
        $("#drpCandidatetitle").val(resData.Candidatetitle).prop("selected", true);

        $("#drpSourcedfrom").val(resData.Sourcedfrom).prop("selected", true);

        if (resData.Portalname != "-1") {
            $("#drpPortalname").val(resData.Portalname).prop("selected", true);
            $('#drpPortalname').css("display", "block");
            $("#lblTitlename").text("Portal Name");
        }

        if (resData.Vendorname != "-1" && resData.Vendorname != "") {
            $("#drpVendorname").val(resData.Vendorname).prop("selected", true);
            $('#drpVendorname').css("display", "block");
            $("#lblTitlename").text("Vendor Name");
        }
        if (resData.Referralname != "") {
            $("#txtReferralename").val(resData.Referralname);
            $('#txtReferralename').css("display", "block");
            $("#lblTitlename").text("Referral Name");
        }

        if (resData.Sourcedfrom != "") {
            $('#div_portal').css("display", "block");
        }
        else {
            $('#div_portal').css("display", "none");
        }

        if (resData.createdBy == "TWEU0007" && resData.candStatus == "101") {
            document.getElementById("btnNotsub").style.display = "block";
        }

        if (resData.legalId == "Yes") {
            $('input[name="chkID"]').prop("checked", true);
        }

        if (resData.documenttype == "Yes") {
            $('input[name="chkRelocate"]').prop("checked", true);
        }
        $("#txtDocumenttype").val(resData.documenttype);
        $("#txtIdno").val(resData.idNo);
        if (resData.ratePerHr != "") {
            $("#txtRate").val(resData.ratePerHr);
        }
        else if (resData.Maxsubmissionrate != "") {
            $("#txtRate").val(resData.Maxsubmissionrate);
        }
        $("#drpType").val(resData.type).prop("selected", true);
        options = Array.from(document.querySelectorAll('#drpSkill option'));

        //if (resData.skillsandCertif != "") {
        //    resData.skillsandCertif.split(',').forEach(function (v) {
        //        options.find(c => c.value == v).selected = true;
        //    });
        //}

        if (resData.Candjobcode != "") {
            existingcandidate = "true";
        }
        else {
            existingcandidate = "false";
        }

        $("#txtActivelinkedinurl").val(resData.linkedinURL);
        $("#txtNoticeperiod").val(resData.noticePeriod);
        $("#txtAvailabelinterview").val(resData.availableforinterview);
        $("#hdnEmployerid").val(resData.employerid);
        $("#txtEmpmailid").val(resData.employermailid);
        $("#txtEmpcontnumber").val(resData.employerContactno);
        $("#txtEmpname").val(resData.employeename);
        $("#txtCorpationname").val(resData.corporationname);
        $("#txtEmpaddinfo").val(resData.employeradderinformation);

        if (resData.Acknowledgement_content != "") {
            $("#txtAcknowledge").val(resData.Acknowledgement_content);
            $('#chkRTR1').prop('checked', true);
            $('#chkRTR').prop('checked', true);
        }

        $("#txtCandidateremark").val(resData.candidateRemark);
        $("#starRating").text(resData.recruiterrating);
        getrateUser("mrat_" + resData.recruiterrating.trim());
        enableControls();
        enableemplcontrols();

        if (resData.employerid != "") {
            document.getElementById("chkEmployer").checked = true;
            document.getElementById("divEmployer").style.display = "block";
            options1 = Array.from(document.querySelectorAll('#drpSpecialization option'));
            if (resData.employerspecialization != "") {
                resData.employerspecialization.split(',').forEach(function (v) {
                    options1.find(c => c.value == v).selected = true;
                });
            }
        }
        else {
            document.getElementById("chkEmployer").disabled = true;
            document.getElementById("divEmployer").style.display = "none";
        }

        //if (resData.PrimarySkill != "" && resData.PrimarySkill != null) {
        //    options1 = Array.from(document.querySelectorAll('#drpprimaryskills_0 option'));

        //    resData.PrimarySkill.split(',').forEach(function (v) {
        //        if (v != "" && v != null) {
        //            options1.find(c => c.value == v).selected = true;
        //        }

        //    });
        //}

        if (resData.Certification != "" && resData.Certification != null) {
            options2 = Array.from(document.querySelectorAll('#drpcertification option'));

            resData.Certification.split(',').forEach(function (v) {
                if (v != "") {
                    options2.find(c => c.value == v).selected = true;
                }
            });
        }

        //var j = 1;
        //for (var i = 0; i < resData.lstCandProof.length; i++) {
        //    $("#proofId" + j).val(resData.lstCandProof[i].candproofid);
        //    $("#drpDocumenttype" + j).val(resData.lstCandProof[i].documenttype).prop("selected", true);
        //    $("#txtIdno" + j).val(resData.lstCandProof[i].idNo);
        //    $("#lblFilename" + j).text(resData.lstCandProof[i].idfilename);
        //    if ($("#lblFilename" + j).text() != "") {
        //        $('#lblFilename' + j).css('display', 'block');
        //        $('#divAttach' + j).css('display', 'block');
        //    }
        //    else if ($("#lblFilename" + j).text() == "") {
        //        $('#lblFilename' + j).css('display', 'none');
        //        $('#divAttach' + j).css('display', 'none');
        //    }

        //    j++;
        //}
        Prooflist = resData.lstCandProof;

        var j = 1;
        for (var i = 0; i < resData.lstCandProof.length; i++) {
            if (resData.lstCandProof[i].documenttype == "Certification" || resData.lstCandProof[i].documenttype == "Visa-Assessment") {
            }
            else {
                $('#div_Filename' + j).css('display', 'block');
                $("#proofId" + j).val(resData.lstCandProof[i].candproofid);
                $("#drpDocumenttype" + j).val(resData.lstCandProof[i].documenttype).prop("selected", true);
                $("#txtIdno" + j).val(resData.lstCandProof[i].idNo);
                $("#lblFilename" + j).text(resData.lstCandProof[i].idfilename);
                $('#lblFilename' + j).css('display', 'block');
                $('#divAttach' + j).css('display', 'block');

                j++;
            }
        }

        if (resData.lstCandProof.length > 0) {
            $('#btnAdd').prop('disabled', false);
        }

        if (parseInt(resData.candStatus) >= 103) {
            $('#btnSubmittl').css('display', 'none');
            $('#btnDraft').css('display', 'none');
            $('#btnPipeline').css('display', 'none');
            $('#btnSave').css('display', 'block');
            $('#txtCandidateremark').prop('disabled', 'disabled');
            $('#mrat_5').prop('onclick', null);
            $('#mrat_4').prop('onclick', null);
            $('#mrat_3').prop('onclick', null);
            $('#mrat_2').prop('onclick', null);
            $('#mrat_1').prop('onclick', null);
        }

        else if (resData.candStatus == "101" || resData.candStatus == "102") {
            $('#btnSave').css('display', 'none');
            if (getSession('TWE_ID').includes("TWVU")) {
                $('#btnSubmit').css('display', 'block');
                $('#div_rtr').css('display', 'block');
                $('#div_commrtr').css('display', 'none');
                $('#div_Acknowledge').css('display', 'block');
                $('#div_RTR').css('display', 'none');
                $('#btnPipeline').css('display', 'none');
                $('#btnDraft').css('display', 'none');
            }
            else {
                $('#btnPipeline').css('display', 'none');
                $('#btnDraft').css('display', 'block');
            }
        }

        if (resData.rtrStatus == "1") {
            $('#btnRtr').css('display', 'none');
            //$('#chkRTR').prop('checked', true);
            if (resData.candStatus >= 103) {
                $('#chkRTR').prop('disabled', true);
                $('#chkRTR1').prop('disabled', true);
            }

            else {
                $('#chkRTR').prop('disabled', false);
                $('#chkRTR1').prop('disabled', false);
            }
        }

        RTRstatus = resData.rtrStatus;

        $('#btnCheck').css('display', 'none');
        //

        if (resData.genuinityStatus == null) {
            genuinity = "false";
        }
        else {
            genuinity = resData.genuinityStatus;
        }
        if (document.getElementById("drpType").value == "10253") {
            if (resData.employerid == "") {
                document.getElementById("chkEmployer").disabled = false;
            }
            else if (resData.employerid != "") {
                document.getElementById("chkEmployer").checked = true;
                document.getElementById("divEmployer").style.display = "block";
                $('#btUCheckcontactno').css('display', 'none');

                options1 = Array.from(document.querySelectorAll('#drpSpecialization option'));

                if (resData.employerspecialization != "") {
                    resData.employerspecialization.split(',').forEach(function (v) {
                        options1.find(c => c.value == v).selected = true;
                    });
                }
            }
        }
        else {
            if (document.getElementById("drpType").value == "10253" ||
                document.getElementById("drpType").value == "-1") {
                document.getElementById("chkEmployer").disabled = false;
                document.getElementById("divEmployer").style.display = "none";
            }
            else {
                document.getElementById("chkEmployer").disabled = true;
                document.getElementById("divEmployer").style.display = "none";
                document.getElementById("chkEmployer").checked = false;
            }
        }

        if (genuinity == "true") {
            $('input[name="chkgencheck"]').prop("checked", true);
            //document.getElementById("div_genuinity").style.display = "block";
            document.getElementById("btnGenuinity").style.display = "none";
            genuinityrating = resData.recruitergenrating;
            $("#lblgenvalue").text(resData.recruitergenrating);
        }

        else if (genuinity == "false") {
            $('input[name="chkgencheck"]').prop("checked", false);
            document.getElementById("div_genuinity").style.display = "none";
            //document.getElementById("btnGenuinity").style.display = "block";
        }

        if (resData.genuinityChecks.length != 0) {
            assMode = "E";
            setCandidateQuestion(resData.genuinityChecks);
            $('input[name="chkGenuinity"]').prop("checked", true);
            document.getElementById("value").innerHTML = resData.genuinityCheckRating.Overallsystemrating;
            document.getElementById("value1").innerHTML = resData.genuinityCheckRating.Overallrecruiterrating;
            document.getElementById("txtRatingcommentsQ1").value = resData.genuinityCheckRating.Remarks;
            var sliderFormat = document.getElementById('slider-format');

            var inputFormat = document.getElementById('value1');

            sliderFormat.noUiSlider.set(inputFormat.innerHTML);
            document.getElementById('slider-format').removeAttribute('disabled');
            //sliderFormat.setAttribute('disabled', true);
        }
        else {
            $('#div-Genuinity').css('display', 'none');
        }

        if (editMatchMode == "Matching") {
            $('#div_Acknowledge').css('display', 'none');
            $('#chkRTR').prop('checked', false);
            $('#chkRTR1').prop('checked', false);
        }
        else {
            $('#div_Acknowledge').css('display', 'block');
        }

        if (resData.lstPriSkill != "" && resData.lstPriSkill != null) {
            Pricount = resData.lstPriSkill;

            //if (resData.lstPriSkill.length == 1) {
            //    document.getElementById("hdnHDNid_0").innerHTML = resData.lstPriSkill[0].JobSkillID;
            //    $("#drpPrimarySkill_0").val(resData.lstPriSkill[0].JobSkillName).prop("selected", true)
            //    $("#drpPrimaryYear_0").val(resData.lstPriSkill[0].JobYrsofExp).prop("selected", true)
            //    document.getElementById("lblmode_0").innerHTML = "U";
            //}
            //else {
            for (var i = 0; i < resData.lstPriSkill.length; i++) {
                var table = document.getElementById("tblCandlist");
                table.style.display = "table";

                var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

                var tableHead = document.getElementById("tblCandlist").getElementsByTagName("THEAD")[0];;

                //Add Row.

                var i = tBody.rows.length;

                row = tBody.insertRow(-1);
                row.className = "divControl";
                row.id = "divControlPri_" + i;

                //CandId = CandidateidBS;

                var VenID = i;

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='hdnHDNid_" + i + "'></label>";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='lblmode_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>U</label>";
                cell.className = "align-middle ps-3";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = " <div class='col-md-6'>" +
                    "<select class='form-control' name='choice-button' id ='drpPrimarySkill_" + i + "' onchange='totSkillCount();'>" +
                    "</select>" +
                    "</div > ";
                //cell.className = "form-controlnew select2 select2-hidden-accessible";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col-md-12'>" +
                    "<select class='form-control' id='drpPrimaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

                    "</select>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col-md-12 text-center' >" +
                    "<button id='btnAddPriskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
                    "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddPrimarySkillTable()' ></i>" +
                    "</button>" +
                    "<button id='btnremovetrPrimary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
                    "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
                    "</button>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label>" + i + "</label>";
                cell.style.display = "none";

                var option1 = new Option("--Select Skill--", "-1");
                $(option1).html("--Select Skill--");
                $("#drpPrimarySkill_" + i).append(option1);

                for (var x = 0; x < SkillArr.length; x++) {
                    var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

                    $(optionpri).html(SkillArr[x].Name);
                    $("#drpPrimarySkill_" + i).append(optionpri);
                }

                //if (document.getElementById("drpPrimarySkill_" + i)) {
                //    var element = document.getElementById("drpPrimarySkill_" + i);
                //    const example = new Choices(element, {});
                //}

                var option1 = new Option("--Select Year--", "-1");
                $(option1).html("--Select Year--");
                $("#drpPrimaryYear_" + i).append(option1);

                for (var y = 0; y < SkillArrY.length; y++) {
                    var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

                    $(optionyrs).html(SkillArrY[y].Name);
                    $("#drpPrimaryYear_" + i).append(optionyrs);
                }
            }

            for (var w = 0; w < resData.lstPriSkill.length; w++) {
                document.getElementById("hdnHDNid_" + w).innerHTML = resData.lstPriSkill[w].JobSkillID;
                $("#drpPrimarySkill_" + w).val(resData.lstPriSkill[w].JobSkillName).prop("selected", true);
                $("#drpPrimaryYear_" + w).val(resData.lstPriSkill[w].JobYrsofExp).prop("selected", true);
                $("#drpPrimarySkill_" + w).prop("disabled", true);
            }

            for (var x = 0; x < tBody.rows.length; x++) {
                var y = x - 1;
                if ((tBody.rows.length - 1) == x) {
                    document.getElementById("btnAddPriskills" + x).style.display = "inline";
                }
            }
            //}
        }

        if (resData.lstSecSkill != "" && resData.lstSecSkill != null) {
            Seccount = resData.lstSecSkill;
            //if (resData.lstSecSkill.length == 1) {
            //    document.getElementById("lblHDNidS_0").innerHTML = resData.lstSecSkill[0].JobSkillID;
            //    $("#drpSecondarySkill_0").val(resData.lstSecSkill[0].JobSkillName).prop("selected", true);
            //    $("#drpSecondaryYear_0").val(resData.lstSecSkill[0].JobYrsofExp).prop("selected", true);
            //    document.getElementById("lblmodeS_0").innerHTML = "U";
            //}
            //else {
            for (var i = 0; i < resData.lstSecSkill.length; i++) {
                var table = document.getElementById("tblSecondarySkill");
                table.style.display = "table";

                var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];

                var tableHead = document.getElementById("tblSecondarySkill").getElementsByTagName("THEAD")[0];;

                //Add Row.

                var i = tBody.rows.length;

                row = tBody.insertRow(-1);
                row.className = "divControl";
                row.id = "divControlSec_" + i;

                var modeBS = document.getElementById("hdnmodeS").value;
                var v = document.getElementById("hdnHDNidS").value;

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='lblHDNidS_" + i + "'>" + document.getElementById("hdnHDNid_0").value + "</label>";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label ID='lblmodeS_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>U</label>";
                cell.className = "align-middle ps-3";
                cell.style.display = "none";

                var cell = row.insertCell(-1);
                cell.innerHTML = " <div class='col-md-6'>" +
                    "<select class='form-control' name='choice-button' id ='drpSecondarySkill_" + i + "' onchange='totSkillCount();'>" +
                    "</select>" +
                    "</div > ";
                //cell.className = "form-controlnew select2 select2-hidden-accessible";CandidateAssign
                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col - md - 12'>" +
                    "<select class='form-control' id='drpSecondaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

                    "</select>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<div class='col-md-12 text-center' >" +
                    "<button id='btnAddSecskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
                    "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddSecondarySkillTable()' ></i>" +
                    "</button>" +
                    "<button id='btnremovetrSecondary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
                    "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
                    "</button>" +
                    "</div>";
                //cell.className = "align-middle ps-3";

                var cell = row.insertCell(-1);
                cell.innerHTML = "<label>" + i + "</label>";
                cell.style.display = "none";

                var option1 = new Option("--Select Skill--", "-1");
                $(option1).html("--Select Skill--");
                $("#drpSecondarySkill_" + i).append(option1);

                for (var x = 0; x < SkillArr.length; x++) {
                    var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

                    $(optionpri).html(SkillArr[x].Name);
                    $("#drpSecondarySkill_" + i).append(optionpri);
                }

                //if (document.getElementById("drpSecondarySkill_" + i)) {
                //    var element = document.getElementById("drpSecondarySkill_" + i);
                //    const example = new Choices(element, {});
                //}

                var option1 = new Option("--Select Year--", "-1");
                $(option1).html("--Select Year--");
                $("#drpSecondaryYear_" + i).append(option1);

                for (var y = 0; y < SkillArrY.length; y++) {
                    var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

                    $(optionyrs).html(SkillArrY[y].Name);
                    $("#drpSecondaryYear_" + i).append(optionyrs);
                }
            }

            for (var d = 0; d < resData.lstSecSkill.length; d++) {
                document.getElementById("lblHDNidS_" + d).innerHTML = resData.lstSecSkill[d].JobSkillID;
                $("#drpSecondarySkill_" + d).val(resData.lstSecSkill[d].JobSkillName).prop("selected", true);
                $("#drpSecondaryYear_" + d).val(resData.lstSecSkill[d].JobYrsofExp).prop("selected", true);
                $("#drpSecondarySkill_" + d).prop("disabled", true);
            }

            for (var x = 0; x < tBody.rows.length; x++) {
                var y = x - 1;
                if ((tBody.rows.length - 1) == x) {
                    document.getElementById("btnAddSecskills" + x).style.display = "inline";
                }
            }
            //}
        }

        document.getElementById("div_Contant").style.display = "none";
        document.getElementById("div_candidatehid").style.display = "block";

        if (getSession('sourcedfrom') == "18001") {
            $("#div_sourcedfrom").removeClass("col-md-4");
            $("#div_sourcedfrom").addClass("col-md-6");

            $("#div_LinekedIn").removeClass("col-md-4");
            $("#div_LinekedIn").addClass("col-md-6");
            document.getElementById("div_portal").style.display = "none";
        }
        else {
            $("#div_sourcedfrom").removeClass("col-md-6");
            $("#div_sourcedfrom").addClass("col-md-4");

            $("#div_LinekedIn").removeClass("col-md-6");
            $("#div_LinekedIn").addClass("col-md-4");
            document.getElementById("div_portal").style.display = "block";
        }

        stopLoader();
    }

    else if (key == "MAIL") {
        $("#rtrcontinue").modal('hide');
        if (response.status == 1) {
            $("#div-message").text('RTR Confirmation mail has been sent');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "btnhidden()");
            $('#chkRTR').css('display', 'block');
            $('#chkRTR1').css('display', 'block');
            $('#div_Acknowledge').css('display', 'block');
            $('#chkRTR').prop("disabled", false);
            $('#chkRTR1').prop("disabled", false);
            $('#btnRtr').css('display', 'none');
        }
        stopLoader();
    }
    else if (key == "City") {
        $('#drpCity').empty();
        $('#drpCity').attr("disabled", false);

        var option3 = new Option("--Select City--", "-1");
        $(option3).html("--Select City--");
        $("#drpCity").append(option3);

        for (var i = 0; i < resData.lstCityType.length; i++) {
            var option = new Option(resData.lstCityType[i].Name, resData.lstCityType[i].ID);

            $(option).html(resData.lstCityType[i].Name);
            $("#drpCity").append(option);
        }
        stopLoader();
    }
    else if (key == "State") {
        $('#drpState').empty();
        $('#drpState').attr("disabled", false);

        var option3 = new Option("--Select State--", "-1");
        $(option3).html("--Select State--");
        $("#drpState").append(option3);

        $('#drpCity').empty();
        var option31 = new Option("--Select City--", "-1");
        $(option31).html("--Select City--");
        $("#drpCity").append(option31);

        for (var i = 0; i < resData.lstStateType.length; i++) {
            var option = new Option(resData.lstStateType[i].Name, resData.lstStateType[i].ID);

            $(option).html(resData.lstStateType[i].Name);
            $("#drpState").append(option);
        }
        stopLoader();
    }
    else if (key == "ADDCAND") {
        var url = window.location.href;
        var hashes = url.split("?")[1];

        if (resData != "") {
            $("#div-message").text(resData);
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            disableControls();
            disablebtn();
        }
        else {
            if (hashes != null) {
                var hash = hashes.split('&');
                if (hash.length > 0) {
                    var params1 = hash[0].split("=");
                    if (params1[1] == "NoJob") {
                        $("#btnOk").attr("onclick", "closepopup('2')");
                    }
                    else if (isNaN(params1[1]) == false) {
                        if (localStorage.getItem("prevPage").includes("CandidateOverview.aspx")) {
                            $("#btnOk").attr("onclick", "closepopup('2')");
                        }
                        else if (localStorage.getItem("prevPage").includes("CandidateList.aspx")) {
                            $("#btnOk").attr("onclick", "closepopup('3')");
                        }
                        else if (localStorage.getItem("prevPage").includes("Candidate_View.aspx")) {
                            $("#btnOk").attr("onclick", "closepopup('4')");
                        }
                    }
                    else if (params1[1] == "BS") {
                        $("#btnOk").attr("onclick", "closepopup('5')");
                    }
                    else if (hash.length == 3) {
                        $("#btnOk").attr("onclick", "closepopup('4')");
                    }
                    else {
                        $("#btnOk").attr("onclick", "closepopup('1')");
                    }
                    if (genuinity == "false") {
                        //$("#btnOk").attr("onclick", "closepopup('1')");
                        if (isNaN(params1[1]) == false) {
                            if (localStorage.getItem("prevPage").includes("CandidateOverview.aspx")) {
                                $("#btnOk").attr("onclick", "closepopup('2')");
                            }
                            else if (localStorage.getItem("prevPage").includes("CandidateList.aspx")) {
                                $("#btnOk").attr("onclick", "closepopup('3')");
                            }
                            else if (localStorage.getItem("prevPage").includes("Candidate_View.aspx")) {
                                $("#btnOk").attr("onclick", "closepopup('4')");
                            }
                        }
                    }
                    else if (genuinity == "true" && btnClicked == "btnGenuinity") {
                        $("#btnOk").attr("onclick", "closeGenuinitycheckpop()");
                    }
                }
            }
            else {
                $("#btnOk").attr("onclick", "closepopup('1')");
            }
            $("#div-message").text('Candidate information saved successfully');
            $("#msgpopup").modal('show');
        }
        stopLoader();
    }

    else if (key == "CandidateForm") {
        for (var i = 0; i < resData.lstSkill.length; i++) {
            var option = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

            $(option).html(resData.lstSkill[i].Name);
            $("#drpprimaryskills").append(option);
        }

        for (var i = 0; i < resData.lstSkill.length; i++) {
            var option = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

            $(option).html(resData.lstSkill[i].Name);
            $("#drpSkill").append(option);
        }

        //for (var i = 0; i < resData.lstSkill.length; i++) {
        //    var option = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

        //    $(option).html(resData.lstSkill[i].Name);
        //    $("#drpcertification").append(option);
        //}
        Certifi = resData.lstSkill;

        document.getElementById("drpType").options.length = 0;
        var option1 = new Option("--Select Type--", "-1");
        $(option1).html("--Select Type--");
        $("#drpType").append(option1);

        for (var i = 0; i < resData.lstType.length; i++) {
            var option = new Option(resData.lstType[i].Name, resData.lstType[i].ID);

            $(option).html(resData.lstType[i].Name);
            $("#drpType").append(option);
        }

        document.getElementById("drpVisastatus").options.length = 0;
        var option1 = new Option("--Select Visa Status--", "-1");
        $(option1).html("--Select Visa Status--");
        $("#drpVisastatus").append(option1);

        for (var i = 0; i < resData.lstEmploymentType.length; i++) {
            var option = new Option(resData.lstEmploymentType[i].Name, resData.lstEmploymentType[i].ID);

            $(option).html(resData.lstEmploymentType[i].Name);
            $("#drpVisastatus").append(option);
        }

        //document.getElementById("drpSpecialization").options.length = 0;
        //var option1 = new Option("--Select Visa Status--", "-1");
        //$(option1).html("--Select Visa Status--");
        //$("#drpSpecialization").append(option1);

        for (var i = 0; i < resData.lstPriority.length; i++) {
            var option = new Option(resData.lstPriority[i].Name, resData.lstPriority[i].ID);

            $(option).html(resData.lstPriority[i].Name);
            $("#drpSpecialization").append(option);
        }

        document.getElementById("drpNoticeperiod").options.length = 0;
        var option2 = new Option("--Select Notice period--", "-1");
        $(option2).html("--Select Notice period--");
        $("#drpNoticeperiod").append(option2);

        for (var i = 0; i < resData.lstNoticeperiod.length; i++) {
            var option = new Option(resData.lstNoticeperiod[i].Name, resData.lstNoticeperiod[i].ID);

            $(option).html(resData.lstNoticeperiod[i].Name);
            $("#drpNoticeperiod").append(option);
        }

        document.getElementById("drpCandidatetitle").options.length = 0;
        var option2 = new Option("--Select Candidate Title--", "-1");
        $(option2).html("--Select Candidate Title--");
        $("#drpCandidatetitle").append(option2);

        for (var i = 0; i < resData.lstCandidateTitle.length; i++) {
            var option = new Option(resData.lstCandidateTitle[i].Name, resData.lstCandidateTitle[i].ID);

            $(option).html(resData.lstCandidateTitle[i].Name);
            $("#drpCandidatetitle").append(option);
        }

        document.getElementById("drpSourcedfrom").options.length = 0;
        var option2 = new Option("--Select Sourced From--", "-1");
        $(option2).html("--Select Sourced From--");
        $("#drpSourcedfrom").append(option2);

        for (var i = 0; i < resData.lstSourcedFrom.length; i++) {
            var option = new Option(resData.lstSourcedFrom[i].Name, resData.lstSourcedFrom[i].ID);

            $(option).html(resData.lstSourcedFrom[i].Name);
            $("#drpSourcedfrom").append(option);
        }

        document.getElementById("drpVendorname").options.length = 0;
        var option2 = new Option("--Select Vendor--", "-1");
        $(option2).html("--Select Vendor--");
        $("#drpVendorname").append(option2);

        for (var i = 0; i < resData.lstVendor.length; i++) {
            var option = new Option(resData.lstVendor[i].Name, resData.lstVendor[i].ID);

            $(option).html(resData.lstVendor[i].Name);
            $("#drpVendorname").append(option);
        }

        Citizenship = resData.lstCitizenship;

        document.getElementById("drpPortalname").options.length = 0;
        var option2 = new Option("--Select Portal Name--", "-1");
        $(option2).html("--Select Portal Name--");
        $("#drpPortalname").append(option2);

        for (var i = 0; i < resData.lstJobportal.length; i++) {
            var option = new Option(resData.lstJobportal[i].Name, resData.lstJobportal[i].ID);

            $(option).html(resData.lstJobportal[i].Name);
            $("#drpPortalname").append(option);
        }

        var option2 = new Option("--Select Country--", "-1");
        $(option2).html("--Select Country--");
        $("#drpCountry").append(option2);

        for (var i = 0; i < resData.lstCountryType.length; i++) {
            var option = new Option(resData.lstCountryType[i].Name, resData.lstCountryType[i].ID);

            $(option).html(resData.lstCountryType[i].Name);
            $("#drpCountry").append(option);
        }

        $("#drpCountry").val("10751").prop("selected", true);
        ChangeCountry();

        //Primary Skill

        var option1 = new Option("--Select Skill--", "-1");
        $(option1).html("--Select Skill--");
        $("#drpPrimarySkill_1").append(option1);

        SkillArr = resData.lstSkill;
        for (var i = 0; i < resData.lstSkill.length; i++) {
            var optionpri = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

            $(optionpri).html(resData.lstSkill[i].Name);
            $("#drpPrimarySkill_1").append(optionpri);
        }

        //if (document.getElementById("drpPrimarySkill_0")) {
        //    var element = document.getElementById("drpPrimarySkill_0");
        //    const example = new Choices(element, {});
        //}

        var option1 = new Option("--Select Year--", "-1");
        $(option1).html("--Select Year--");
        $("#drpPrimaryYear_0").append(option1);

        SkillArrY = resData.lstYear;
        for (var i = 0; i < resData.lstYear.length; i++) {
            var optionyrs = new Option(resData.lstYear[i].Name, resData.lstYear[i].ID);

            $(optionyrs).html(resData.lstYear[i].Name);
            $("#drpPrimaryYear_0").append(optionyrs);
        }

        //Secondary Skill

        var option1 = new Option("--Select Skill--", "-1");
        $(option1).html("--Select Skill--");
        $("#drpSecondarySkill_0").append(option1);

        SkillArrS = resData.lstSkill;
        for (var i = 0; i < resData.lstSkill.length; i++) {
            var optionpri = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

            $(optionpri).html(resData.lstSkill[i].Name);
            $("#drpSecondarySkill_0").append(optionpri);
        }

        //if (document.getElementById("drpPrimarySkill_0")) {
        //    var element = document.getElementById("drpPrimarySkill_0");
        //    const example = new Choices(element, {});
        //}

        var option1 = new Option("--Select Year--", "-1");
        $(option1).html("--Select Year--");
        $("#drpSecondaryYear_0").append(option1);

        SkillArrYS = resData.lstYear;
        for (var i = 0; i < resData.lstYear.length; i++) {
            var optionyrs = new Option(resData.lstYear[i].Name, resData.lstYear[i].ID);

            $(optionyrs).html(resData.lstYear[i].Name);
            $("#drpSecondaryYear_0").append(optionyrs);
        }

        stopLoader();
    }

    else if (key == "ADDSKILL") {
        var skiVal = resData.split(",");
        $('#txtSkill').val("");
        if (skiVal[1] == "Old") {
            $("#addskill").modal('hide');
            $("#div-message").text('Skill you have entered already exists');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            if (skillVal != "") {
                skillVal += "," + skiVal[0];
            }
            else {
                skillVal += skiVal[0];
            }
        }
        else if (skiVal[1] == "New") {
            $("#addskill").modal('hide');
            $("#div-message").text('Skill has been added successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            if (skillVal != "") {
                skillVal += "," + skiVal[0];
            }
            else {
                skillVal += skiVal[0];
            }
            getTotalSkillData();
        }

        options = Array.from(document.querySelectorAll('#drpSkill option'));
        if (skillVal.includes(",")) {
            skillVal.split(',').forEach(function (v) {
                options.find(c => c.value == v).selected = true;
            });
        }
        else {
            $("#drpSkill").val(skillVal).prop("selected", true);
        }
        skillVal = "";
        stopLoader();
    }

    else if (key == "Skill") {
        for (var i = 0; i < resData.lstSkill.length; i++) {
            var option = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

            $(option).html(resData.lstSkill[i].Name);
            $("#drpSkill").append(option);
        }

        //primary Skill
        var table = document.getElementById("tblCandlist");
        table.style.display = "table";

        var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

        var tableHead = document.getElementById("tblCandlist").getElementsByTagName("THEAD")[0];;

        //Add Row.

        //var i = tBody.rows.length;

        for (var h = 0; h < tBody.rows.length; h++) {
            var option2 = new Option("--Select Skill--", "-1");
            $(option2).html("--Select Skill--");
            $("#drpPrimarySkill_" + h).append(option2);

            for (var i = 0; i < resData.lstSkill.length; i++) {
                var option = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

                $(option).html(resData.lstSkill[i].Name);
                $("#drpPrimarySkill_" + h).append(option);
            }
        }

        //Secoundary Skill

        var table = document.getElementById("tblSecondarySkill");
        table.style.display = "table";

        var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];

        var tableHead = document.getElementById("tblSecondarySkill").getElementsByTagName("THEAD")[0];

        //Add Row.

        //var p = tBody.rows.length;

        for (var w = 0; w < tBody.rows.length; w++) {
            var option3 = new Option("--Select Skill--", "-1");
            $(option3).html("--Select Skill--");
            $("#drpSecondarySkill_" + w).append(option3);

            for (var i = 0; i < resData.lstSkill.length; i++) {
                var option = new Option(resData.lstSkill[i].Name, resData.lstSkill[i].ID);

                $(option).html(resData.lstSkill[i].Name);
                $("#drpSecondarySkill_" + w).append(option);
            }
        }

        stopLoader();
    }

    else if (key == "SUPINFO") {
        $("#hdnEmployerid").val(resData.supplierid);
        $("#txtEmpcontnumber").val(resData.contactno);
        $("#txtEmpmailid").val(resData.emailid);
        $("#txtEmpname").val(resData.contactname);

        options1 = Array.from(document.querySelectorAll('#drpSpecialization option'));
        if (resData.designation != "") {
            resData.designation.split(',').forEach(function (v) {
                options1.find(c => c.value == v).selected = true;
            });
        }
        $("#drpType").val("10253").prop("selected", true);
        $('#drpType').prop('disabled', 'disabled');

        $("#txtCorpationname").val(resData.jobAccess);
        $("#txtEmpaddinfo").val(resData.remarks);
        //enableemplcontrols();

        $('#btUCheckcontactno').css('display', 'none');
        document.getElementById("chkEmployer").checked = true;
        document.getElementById("divEmployer").style.display = "block";

        $('#txtEmpname').prop('disabled', 'disabled');
        $('#drpSpecialization').prop('disabled', 'disabled');
        $('#txtCorpationname').prop('disabled', 'disabled');
        $('#txtEmpaddinfo').prop('disabled', 'disabled');
    }

    else if (key == "ASSQUESTIONLIST") {
        createLinkedinDiv(resData.question);
        stopLoader();
    }

    else if (key == "JOBSKILLINFO") {
        //if (resData.lstPrimarySkill.length == 1) {
        //    document.getElementById("hdnHDNid_0").innerHTML = resData.lstPrimarySkill[0].JobSkillID;
        //    $("#drpPrimarySkill_0").val(resData.lstPrimarySkill[0].JobSkillName).prop("selected", true)
        //    $("#drpPrimaryYear_0").val(resData.lstPrimarySkill[0].JobYrsofExp).prop("selected", true)
        //    document.getElementById("lblmode_0").innerHTML = "I";
        //}
        //else {
        for (var i = 0; i < resData.lstPrimarySkill.length; i++) {
            var table = document.getElementById("tblCandlist");
            table.style.display = "table";

            var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

            var tableHead = document.getElementById("tblCandlist").getElementsByTagName("THEAD")[0];;

            //Add Row.

            var i = tBody.rows.length;

            row = tBody.insertRow(-1);
            row.className = "divControl";
            row.id = "divControlPri_" + i;

            //CandId = CandidateidBS;

            var VenID = i;

            var cell = row.insertCell(-1);
            cell.innerHTML = "<label ID='hdnHDNid_" + i + "'></label>";
            cell.style.display = "none";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<label ID='lblmode_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>I</label>";
            cell.className = "align-middle ps-3";
            cell.style.display = "none";

            var cell = row.insertCell(-1);
            cell.innerHTML = " <div class='col-md-12'>" +
                "<select class='form-control' name='choice-button' id ='drpPrimarySkill_" + i + "' onchange='totSkillCount();'>" +
                "</select>" +
                "</div > ";
            //cell.className = "form-controlnew select2 select2-hidden-accessible";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<div class='col-md-12'>" +
                "<select class='form-control' id='drpPrimaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

                "</select>" +
                "</div>";
            //cell.className = "align-middle ps-3";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<div class='col-md-12 text-center' >" +
                "<button id='btnAddPriskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;'>" +
                "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddPrimarySkillTable()' ></i>" +
                "</button>" +
                "<button id='btnremovetrPrimary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;>" +
                "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
                "</button>" +
                "</div>";
            //cell.className = "align-middle ps-3";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<label>" + i + "</label>";
            cell.style.display = "none";

            var option1 = new Option("--Select Skill--", "-1");
            $(option1).html("--Select Skill--");
            $("#drpPrimarySkill_" + i).append(option1);

            for (var x = 0; x < SkillArr.length; x++) {
                var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

                $(optionpri).html(SkillArr[x].Name);
                $("#drpPrimarySkill_" + i).append(optionpri);
                $("#drpPrimarySkill_" + i).css("display", "none");
            }

            //if (document.getElementById("drpPrimarySkill_" + i)) {
            //    var element = document.getElementById("drpPrimarySkill_" + i);
            //    const example = new Choices(element, {});
            //}

            var option1 = new Option("--Select Year--", "-1");
            $(option1).html("--Select Year--");
            $("#drpPrimaryYear_" + i).append(option1);

            for (var y = 0; y < SkillArrY.length; y++) {
                var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

                $(optionyrs).html(SkillArrY[y].Name);
                $("#drpPrimaryYear_" + i).append(optionyrs);
            }
        }

        Pricount = resData.lstPrimarySkill;
        for (var w = 0; w < resData.lstPrimarySkill.length; w++) {
            document.getElementById("hdnHDNid_" + w).innerHTML = resData.lstPrimarySkill[w].JobSkillName;
            $("#drpPrimarySkill_" + w).val(resData.lstPrimarySkill[w].JobSkillName).prop("selected", true)
            $("#drpPrimaryYear_" + w).val(resData.lstPrimarySkill[w].JobYrsofExp).prop("selected", true)

            if (w == (resData.lstPrimarySkill.length - 1)) {
                $("#btnAddPriskills" + w).css("display", "inline");
            }
            else {
                $("#btnAddPriskills" + w).css("display", "none");
            }
        }

        editiconDisplay();

        create_custom_dropdowns();

        //if (resData.lstSecondarySkill.length == 1) {
        //    document.getElementById("lblHDNidS_0").innerHTML = resData.lstSecondarySkill[0].JobSkillID;
        //    $("#drpSecondarySkill_0").val(resData.lstSecondarySkill[0].JobSkillName).prop("selected", true);
        //    $("#drpSecondaryYear_0").val(resData.lstSecondarySkill[0].JobYrsofExp).prop("selected", true);
        //    document.getElementById("lblmodeS_0").innerHTML = "I";
        //}
        //else {
        Seccount = resData.lstSecondarySkill;
        for (var i = 0; i < resData.lstSecondarySkill.length; i++) {
            var table = document.getElementById("tblSecondarySkill");
            table.style.display = "table";

            var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];

            var tableHead = document.getElementById("tblSecondarySkill").getElementsByTagName("THEAD")[0];;

            //Add Row.

            var i = tBody.rows.length;

            row = tBody.insertRow(-1);
            row.className = "divControl";
            row.id = "divControlSec_" + i;

            var modeBS = document.getElementById("hdnmodeS").value;
            var v = document.getElementById("hdnHDNidS").value;

            var cell = row.insertCell(-1);
            cell.innerHTML = "<label ID='lblHDNidS_" + i + "'>" + document.getElementById("hdnHDNid_0").value + "</label>";
            cell.style.display = "none";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<label ID='lblmodeS_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>I</label>";
            cell.className = "align-middle ps-3";
            cell.style.display = "none";

            var cell = row.insertCell(-1);
            cell.innerHTML = " <div class='col-md-12'>" +
                "<select class='form-control' name='choice-button' id ='drpSecondarySkill_" + i + "' onchange='totSkillCount();'>" +
                "</select>" +
                "</div > ";
            //cell.className = "form-controlnew select2 select2-hidden-accessible";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<div class='col-md-12'>" +
                "<select class='form-control' id='drpSecondaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

                "</select>" +
                "</div>";
            //cell.className = "align-middle ps-3";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<div class='col-md-12 text-center' >" +
                "<button id='btnAddSecskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;'>" +
                "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddSecondarySkillTable()' ></i>" +
                "</button>" +
                "<button id='btnremovetrSecondary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
                "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
                "</button>" +
                "</div>";
            //cell.className = "align-middle ps-3";

            var cell = row.insertCell(-1);
            cell.innerHTML = "<label>" + i + "</label>";
            cell.style.display = "none";

            var option1 = new Option("--Select Skill--", "-1");
            $(option1).html("--Select Skill--");
            $("#drpSecondarySkill_" + i).append(option1);

            for (var x = 0; x < SkillArr.length; x++) {
                var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

                $(optionpri).html(SkillArr[x].Name);
                $("#drpSecondarySkill_" + i).append(optionpri);
                $("#drpSecondarySkill_" + i).css("display", "none");
            }

            //if (document.getElementById("drpSecondarySkill_" + i)) {
            //    var element = document.getElementById("drpSecondarySkill_" + i);
            //    const example = new Choices(element, {});
            //}

            var option1 = new Option("--Select Year--", "-1");
            $(option1).html("--Select Year--");
            $("#drpSecondaryYear_" + i).append(option1);

            for (var y = 0; y < SkillArrY.length; y++) {
                var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

                $(optionyrs).html(SkillArrY[y].Name);
                $("#drpSecondaryYear_" + i).append(optionyrs);
            }
        }

        for (var p = 0; p < resData.lstSecondarySkill.length; p++) {
            document.getElementById("lblHDNidS_" + p).innerHTML = resData.lstSecondarySkill[p].JobSkillName;
            $("#drpSecondarySkill_" + p).val(resData.lstSecondarySkill[p].JobSkillName).prop("selected", true);
            $("#drpSecondaryYear_" + p).val(resData.lstSecondarySkill[p].JobYrsofExp).prop("selected", true);

            if (p == (resData.lstSecondarySkill.length - 1)) {
                $("#btnAddSecskills" + p).css("display", "inline");
            }
            else {
                $("#btnAddSecskills" + p).css("display", "none");
            }
        }

        create_custom_dropdownssec();

        editiconsecDisplay();
        //}
    }
}

function setGenuinityCandidate() {
    if ($("#txtContactno").val() != "") {
        validatePhone();
    }

    if (localStorage.getItem("prevPage").includes("Candidate_View.aspx")) {
        setSession("CName", $("#txtCandidatename").val());
        setSession("CMail", $("#txtEmailid").val());
        setSession("CPhone", $("#txtContactno").val());

        setSession("CJobid", $("#hdnJobid").val());
        setSession("CJobName", "");
        setSession("CJobDuration", "");
        setSession("CJobType", "");
        setSession("CJobWorkType", "");
        setSession("CJobImg", "");
        setSession("CURL", window.location.href);
    }

    else {
        setSession("CName", $("#txtCandidatename").val());
        setSession("CMail", $("#txtEmailid").val());
        setSession("CPhone", $("#txtContactno").val());

        setSession("CJobid", $("#hdnJobid").val());
        setSession("CJobName", $("#lblJobtitle1").text());
        setSession("CJobDuration", $("#lblDuration1").text());
        setSession("CJobType", $("#lblType1").text());
        setSession("CJobWorkType", $("#lblWorkingtype1").text());
        setSession("CJobImg", $('#imgJob1').prop('src'));
        setSession("CURL", window.location.href);
    }

    //checkifCandExists();
}

function getSkillData() {
    var strdata = { RegionID: getSession("RegionValue") }
    common_api_ajax_request("api/CandidateForm", "CandidateForm", strdata);
}

function getTotalSkillData() {
    common_api_ajax_request("api/Skill", "Skill", "");
}

function saveCandidate(value, btnname) {
    if ($('input[name="chkGenuinity"]:checked').val() == "on" && validateemptyradiobtn() == false) {
        document.getElementById("div-Genuinity").style.border = "1px solid red";
        document.getElementById("div-Genuinity").focus();
    }
    else {
        document.getElementById("div-Genuinity").style.border = "none";

        btnClicked = btnname;
        var strval = "";
        if (btnname == "btnNotsub") {
            strval = 0;
        }
        else {
            strval = 1;
        }

        if (Validatecandidate(strval) == true) {
            var values1 = "";
            $("#drpSkill :selected").each(function () {
                values1 += this.value + ",";
            });

            var values2 = "";
            $("#drpSpecialization :selected").each(function () {
                values2 += this.value + ",";
            });

            var values3 = "";
            $("#drpprimaryskills :selected").each(function () {
                values3 += this.value + ",";
            });
            var values4 = "";
            $("#drpcertification :selected").each(function () {
                values4 += this.value + ",";
            });

            var jobcode = $("#hdnJobid").val();
            var jobtitle = $("#lblJobtitle1").text();
            var candidatename = $("#txtCandidatename").val();
            var currentLocation = $("#txtCurrentlocation").val();
            var candidateemailid = $("#txtEmailid").val();
            var candidatemobileno = $("#txtContactno").val();
            var currentLocation = $("#txtCurrentlocation").val();
            var visastatus = $('select#drpVisastatus option:selected').val();
            var yrsofexp = $("#txtExperience").val();
            var ratecoverage = "";
            var relocate = "";
            var Country = $('select#drpCountry option:selected').val();
            var State = $('select#drpState option:selected').val();
            var City = $('select#drpCity option:selected').val();

            if ($('#txtCandidateremark').val() != remarkedcomment) {
                var Remarkupdby = getSession('TWE_ID');
            }

            if ($('input[name="chkID"]:checked').val() == "on") {
                ratecoverage = "Yes";
            }
            else {
                ratecoverage = "No";
            }
            if ($('input[name="chkRelocate"]:checked').val() == "on") {
                relocate = "Yes";
            }
            else {
                relocate = "No";
            }

            var ratePerHr = $("#txtRate").val();
            var type = $('select#drpType option:selected').val();
            var skillsandCertif = values1.substring(0, values1.length - 1);
            var linkedinURL = $("#txtActivelinkedinurl").val();
            var noticePeriod = $('select#drpNoticeperiod option:selected').val();
            var availableforinterview = $("#txtAvailabelinterview").val();
            var employerid = $("#hdnEmployerid").val();
            var employermailid = $("#txtEmpmailid").val();
            var employerContactno = $("#txtEmpcontnumber").val();
            var employeename = $("#txtEmpname").val();
            var corporationname = $("#txtCorpationname").val();
            var employeradderinformation = replaceAll(document.getElementById("txtEmpaddinfo").value, "'", "''");
            var employerspecialization = values2.substring(0, values2.length - 1);
            var candidateRemark = replaceAll(document.getElementById("txtCandidateremark").value, "'", "''");
            var Acknowledgement_content = replaceAll(document.getElementById("txtAcknowledge").value, "'", "''");
            var candidatefirstname = $("#txtFirstname").val();
            var candidatelastname = $("#txtLastname").val();
            var candidatetitle = $('select#drpCandidatetitle option:selected').val();
            var Sourcedfrom = $('select#drpSourcedfrom option:selected').val();
            var Referralname = $("#txtReferralename").val();
            var Portalname = $('select#drpPortalname option:selected').val();
            var Vendorname = $('select#drpVendorname option:selected').val();
            var PrimarySkill = values3.substring(0, values3.length - 1);
            var Certification = values4.substring(0, values4.length - 1);

            var candStatus;
            if (value == "Submit") {
                candStatus = "103";
            }
            else if (value == "Draft") {
                candStatus = "101";
                if (genuinity == null || genuinity == "") {
                    genuinity = "false";
                }
            }
            else if (value == "NotSubmitted") {
                candStatus = "100";
            }
            else if (value == "RecSubmit") {
                candStatus = "97";
            }
            else if (value == "Pipeline") {
                candStatus = "102";
                if (genuinity == null || genuinity == "") {
                    genuinity = "false";
                }
            }
            else if (value == "Save") {
                candStatus = $("#hdnCandStatus").val();
            }

            var recruiterrating = $("#starRating").text();
            var docArr = new Array;

            var docObj = {};

            docObj.candproofid = $("#proofId1").val();
            if ($("#proofId1").val() == "") {
                docObj.mode = "insert";
            }
            else if ($("#proofId1").val() != "") {
                docObj.mode = "update";
            }
            docObj.docType = $('select#drpDocumenttype1 option:selected').val();
            docObj.docNo = $("#txtIdno1").val();
            docObj.filename = $("#lblFilename1").text();
            docArr.push(docObj);

            if ($('select#drpDocumenttype2 option:selected').val() != "-1" && $("#txtIdno2").val() != "") {
                var docObj = {};
                docObj.candproofid = $("#proofId2").val();
                if ($("#proofId2").val() == "") {
                    docObj.mode = "insert";
                }
                else {
                    docObj.mode = "update";
                }
                docObj.docType = $('select#drpDocumenttype2 option:selected').val();
                docObj.docNo = $("#txtIdno2").val();
                docObj.filename = $("#lblFilename2").text();
                docArr.push(docObj);
            }

            if ($('select#drpDocumenttype3 option:selected').val() != "-1" && $("#txtIdno3").val() != "") {
                var docObj = {};
                docObj.candproofid = $("#proofId3").val();
                if ($("#proofId3").val() == "") {
                    docObj.mode = "insert";
                }
                else {
                    docObj.mode = "update";
                }
                docObj.docType = $('select#drpDocumenttype3 option:selected').val();
                docObj.docNo = $("#txtIdno3").val();
                docObj.filename = $("#lblFilename3").text();
                docArr.push(docObj);
            }

            if ($('select#drpDocumenttype4 option:selected').val() != "-1" && $("#txtIdno4").val() != "") {
                var docObj = {};
                docObj.candproofid = $("#proofId4").val();
                if ($("#proofId4").val() == "") {
                    docObj.mode = "insert";
                }
                else {
                    docObj.mode = "update";
                }
                docObj.docType = $('select#drpDocumenttype4 option:selected').val();
                docObj.docNo = $("#txtIdno4").val();
                docObj.filename = $("#lblFilename4").text();
                docArr.push(docObj);
            }

            if (document.getElementById("radlinkedIn2YesQNo14").checked == true) {
                if ($('select#drpDocumenttype5 option:selected').val() != "-1" && $("#txtIdno5").val() != "") {
                    var docObj = {};
                    docObj.candproofid = $("#proofId5").val();
                    if ($("#proofId5").val() == "") {
                        docObj.mode = "insert";
                    }
                    else {
                        docObj.mode = "update";
                    }
                    docObj.docType = $('select#drpDocumenttype5 option:selected').val();
                    docObj.docNo = $("#txtIdno5").val();
                    docObj.filename = $("#lblFilename5").text();
                    docArr.push(docObj);
                }
            }

            if ($('select#drpVisa18 option:selected').val() != "-1" && $('select#drpCitizen17 option:selected').val() == "19004") {
                if ($("#txtIdno6").val() != "" && $("#txtIdno7").val() != "") {
                    var docObj = {};
                    docObj.candproofid = $("#proofId6").val();
                    if ($("#proofId6").val() == "") {
                        docObj.mode = "insert";
                    }
                    else {
                        docObj.mode = "update";
                    }
                    docObj.docType = "Visa-Assessment";
                    docObj.docNo = $("#txtIdno6").val() + "," + $("#txtIdno7").val();
                    docObj.filename = $("#lblFilename6").text();
                    docArr.push(docObj);
                }
            }

            if (document.getElementById("radlinkedIn3YesQNo16").checked == true) {
                if ($('select#drpGovt16 option:selected').val() != "-1" && $("#txtIdno8").val() != "" && $("#txtIdno9").val() != "") {
                    var docObj = {};
                    docObj.candproofid = $('select#drpGovt16 option:selected').val();
                    if ($("#proofId7").val() == "") {
                        docObj.mode = "insert";
                    }
                    else {
                        docObj.mode = "update";
                    }
                    docObj.docType = $('select#drpGovt16 option:selected').val() + "-Assessment";
                    docObj.docNo = $("#txtIdno8").val() + "," + $("#txtIdno9").val();
                    docObj.filename = $("#lblFilename7").text();
                    docArr.push(docObj);
                }
            }

            var jobPriSkillArr = new Array;
            var jobSecSkillArr = new Array;

            var table = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];
            var rowCount = table.rows.length;

            for (i = 0; i < rowCount; i++) {
                var obj = {};
                obj.JobSkillID = table.rows[i].cells[0].getElementsByTagName("label")[0].innerHTML;
                obj.Mode = table.rows[i].cells[1].getElementsByTagName("label")[0].innerHTML;
                obj.Jobcode = $("#hdnJobid").val();
                obj.JobSkillName = table.rows[i].cells[2].getElementsByTagName("select")[0].value;
                obj.JobYrsofExp = table.rows[i].cells[3].getElementsByTagName("select")[0].value;

                jobPriSkillArr.push(obj);
            }

            var table1 = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];
            var rowCount1 = table1.rows.length;

            for (i = 0; i < rowCount1; i++) {
                var obj = {};
                obj.JobSkillID = table1.rows[i].cells[0].getElementsByTagName("label")[0].innerHTML;
                obj.Mode = table1.rows[i].cells[1].getElementsByTagName("label")[0].innerHTML;
                obj.Jobcode = $("#hdnJobid").val();
                obj.JobSkillName = table1.rows[i].cells[2].getElementsByTagName("select")[0].value;
                obj.JobYrsofExp = table1.rows[i].cells[3].getElementsByTagName("select")[0].value;

                jobSecSkillArr.push(obj);
            }

            var Created_By = getSession('TWE_ID');
            var lastupdatedBy = getSession('TWE_ID');

            var url = window.location.href;
            var hashes = url.split("?")[1];
            if (hashes != null) {
                var hash = hashes.split('&');
                var params1 = hash[0].split("=");
            }
            var Mode;
            var candid = "";

            if (hashes != null) {
                var hash = hashes.split('&');
                var params1 = hash[0].split("=");

                if (hash.length == 2) {
                    var params1 = hash[0].split("=");
                    var params2 = hash[1].split("=");
                    Mode = "update";
                    candid = params2[1];
                }
                else if (hash.length == 3) {
                    var params1 = hash[0].split("=");
                    var params2 = hash[1].split("=");
                    if (existingcandidate == "false") {
                        Mode = "insert";
                        candid = params2[1];
                    }
                    else if (existingcandidate == "true") {
                        Mode = "update";
                        candid = params2[1];
                    }
                }

                else if (params1[1] == "NoJob") {
                    Mode = "insert";
                    candid = "";
                }
                else {
                    Mode = "update";
                    candid = params1[1];
                }
            }

            else {
                Mode = "insert";
                candid = "";
            }

            var GenuinityArr = new Array;
            var objRating = {};
            //if ($('input[name="chkGenuinity"]:checked').val() == "on") {
            var j = 1;
            var k = 10;

            for (q = 1; q < 5; q++) {
                if (q == 1) {
                    tabname = "linkedIn1";
                }
                else if (q == 2) {
                    tabname = "linkedIn2";
                }
                else if (q == 3) {
                    tabname = "linkedIn3";
                }
                else if (q == 4) {
                    tabname = "linkedIn4";
                }

                var radbtnYes = "rad" + tabname + "ANo";
                //var txtname = "txt" + tabname + "commentsQ";

                if (tabname == "linkedIn1") {
                    for (i = 0; i < 9; i++) {
                        var obj = {};
                        obj.QuestionHeadingId = document.getElementById("hdnheadingid1").value;
                        obj.Questionid = document.getElementById("lbllinkedIn1QuestionId" + j).innerHTML;

                        if (document.getElementsByName(radbtnYes + j)[0].checked) {
                            obj.Answer = document.getElementsByName(radbtnYes + j)[0].value;
                        }
                        else if (document.getElementsByName(radbtnYes + j)[1].checked) {
                            obj.Answer = document.getElementsByName(radbtnYes + j)[1].value;
                        }

                        GenuinityArr.push(obj);
                        j++;
                    }
                }

                if (tabname == "linkedIn2") {
                    for (n = 0; n < 6; n++) {
                        var obj = {};
                        obj.QuestionHeadingId = document.getElementById("hdnheadingid2").value;
                        obj.Questionid = document.getElementById("lbllinkedIn2QuestionId" + k).innerHTML;

                        if (k != 11) {
                            if (document.getElementsByName(radbtnYes + k)[0].checked) {
                                obj.Answer = document.getElementsByName(radbtnYes + k)[0].value;
                            }
                            else if (document.getElementsByName(radbtnYes + k)[1].checked) {
                                obj.Answer = document.getElementsByName(radbtnYes + k)[1].value;
                            }
                        }
                        else {
                            obj.Answer = document.getElementById("assstarRating").innerHTML;
                        }

                        GenuinityArr.push(obj);
                        k++;
                    }
                }

                if (tabname == "linkedIn3") {
                    for (n = 0; n < 4; n++) {
                        var obj = {};
                        obj.QuestionHeadingId = document.getElementById("hdnheadingid3").value;
                        obj.Questionid = document.getElementById("lbllinkedIn3QuestionId" + k).innerHTML;

                        if (n == 0) {
                            if (document.getElementsByName(radbtnYes + k)[0].checked) {
                                obj.Answer = document.getElementsByName(radbtnYes + k)[0].value;
                            }
                            else if (document.getElementsByName(radbtnYes + k)[1].checked) {
                                obj.Answer = document.getElementsByName(radbtnYes + k)[1].value;
                            }
                        }
                        else if (n == 1) {
                            obj.Answer = $('select#drpCitizen17 option:selected').val();
                        }
                        else if (n == 2) {
                            obj.Answer = $('select#drpVisa18 option:selected').val();
                        }
                        else if (n == 3) {
                            obj.Answer = $('select#drpYears19 option:selected').val();
                        }

                        GenuinityArr.push(obj);
                        k++;
                    }
                }

                if (tabname == "linkedIn4") {
                    for (n = 0; n < 3; n++) {
                        var obj = {};
                        obj.QuestionHeadingId = document.getElementById("hdnheadingid4").value;
                        obj.Questionid = document.getElementById("lbllinkedIn4QuestionId" + k).innerHTML;

                        if (n == 0 || n == 2) {
                            if (document.getElementsByName(radbtnYes + k)[0].checked) {
                                obj.Answer = document.getElementsByName(radbtnYes + k)[0].value;
                            }
                            else if (document.getElementsByName(radbtnYes + k)[1].checked) {
                                obj.Answer = document.getElementsByName(radbtnYes + k)[1].value;
                            }
                        }
                        else if (n == 1) {
                            if ($("#txtlinkedIn4college21").val() == "" && $("#txtlinkedIn4duration21").val() == "") {
                                obj.Answer = "N/A";
                            }
                            else {
                                obj.Answer = $("#txtlinkedIn4college21").val() + "," + $("#txtlinkedIn4duration21").val();
                            }
                        }

                        GenuinityArr.push(obj);
                        k++;
                    }
                }
            }

            objRating.Screeningrating1 = $("#lbllinkedIn1percentage").text();
            objRating.Screeningrating2 = $("#lbllinkedIn2percentage").text();
            objRating.Screeningrating3 = $("#lbllinkedIn3percentage").text();
            objRating.Screeningrating4 = $("#lbllinkedIn4percentage").text();
            objRating.Overallsystemrating = $("#value").text();
            objRating.Overallrecruiterrating = $("#value1").text();
            objRating.Remarks = replaceAll(document.getElementById("txtRatingcommentsQ1").value, "'", "''");
            //}

            var strdata = {
                "jobcode": jobcode, "candidatename": candidatename, "currentLocation": currentLocation, "candidateemailid": candidateemailid,
                "candidatemobileno": candidatemobileno, "visastatus": visastatus, "yrsofexp": yrsofexp, "ratecoverage": ratecoverage, "relocate": relocate,
                "ratePerHr": ratePerHr, "type": type, "skillsandCertif": skillsandCertif, "linkedinURL": linkedinURL,
                "noticePeriod": noticePeriod, "availableforinterview": availableforinterview, "employerid": employerid, "employermailid": employermailid,
                "employerContactno": employerContactno, "employeename": employeename, "corporationname": corporationname, "recruiterrating": recruiterrating,
                "employeradderinformation": employeradderinformation, "employerspecialization": employerspecialization, "candidateRemark": candidateRemark, "candStatus": candStatus,
                "createdBy": Created_By, "mode": Mode, "candidateid": candid, "documents": docArr, "jobtitle": jobtitle, "lastupdatedBy": lastupdatedBy, "Remarkupdby": Remarkupdby,
                "Acknowledgement_content": Acknowledgement_content, "candidatefirstname": candidatefirstname, "candidatelastname": candidatelastname, "candidatetitle": candidatetitle,
                "Sourcedfrom": Sourcedfrom, "Referralname": Referralname, "Portalname": Portalname, "Vendorname": Vendorname, "PrimarySkill": PrimarySkill, "Certification": Certification,
                "City": City, "State": State, "Country": Country,
                "GenuinityArr": GenuinityArr, "objRating": objRating, "jobPriSkillArr": jobPriSkillArr, "jobSecSkillArr": jobSecSkillArr
            };
            common_api_ajax_request("api/CandidateCreation", "ADDCAND", strdata);
        }
    }
}

function disableControls() {
    //$('#txtContactno').prop('disabled', 'disabled');
    $('#txtFirstname').prop('disabled', 'disabled');
    $('#txtLastname').prop('disabled', 'disabled');
    $('#drpCandidatetitle').prop('disabled', 'disabled');
    $('#txtCurrentlocation').prop('disabled', 'disabled');
    $('#drpVisastatus').prop('disabled', 'disabled');
    $('#drpSkill').prop('disabled', 'disabled');
    $('#txtExperience').prop('disabled', 'disabled');
    $('#txtDocumenttype').prop('disabled', 'disabled');
    $('#txtIdno').prop('disabled', 'disabled');
    $('#txtRate').prop('disabled', 'disabled');
    $('#drpType').prop('disabled', 'disabled');
    $('#drpprimaryskills').prop('disabled', 'disabled');
    $('#drpSkill').prop('disabled', 'disabled');
    $('#drpcertification').prop('disabled', 'disabled');
    $('#txtActivelinkedinurl').prop('disabled', 'disabled');
    $('#txtNoticeperiod').prop('disabled', 'disabled');
    $('#txtAvailabelinterview').prop('disabled', 'disabled');
    $('#txtEmpmailid').prop('disabled', 'disabled');
    $('#txtEmpcontnumber').prop('disabled', 'disabled');
    $('#txtCandidateremark').prop('disabled', 'disabled');
    $('#btnRtr').prop('disabled', 'disabled');
    $('#btUpload').prop('disabled', 'disabled');
    $('#btnSubmittl').prop('disabled', 'disabled');
    $('#btnDraft').prop('disabled', 'disabled');
    $('#btnPipeline').prop('disabled', 'disabled');
    $('#drpNoticeperiod').prop('disabled', 'disabled');
    $('#chkGenuinity').prop('disabled', 'disabled');
    $('#drpSourcedfrom').prop('disabled', 'disabled');
}

function enableControls() {
    //$('#txtContactno').prop('disabled', false);
    $('#txtFirstname').prop('disabled', false);
    $('#txtLastname').prop('disabled', false);
    $('#drpCandidatetitle').prop('disabled', false);
    $('#txtCurrentlocation').prop('disabled', false);
    $('#drpVisastatus').prop('disabled', false);
    $('#drpSkill').prop('disabled', false);
    $('#txtExperience').prop('disabled', false);
    $('#txtDocumenttype').prop('disabled', false);
    $('#txtIdno').prop('disabled', false);
    $('#drpType').prop('disabled', false);
    $('#txtRate').prop('disabled', false);
    $('#drpprimaryskills').prop('disabled', false);
    $('#drpSkill').prop('disabled', false);
    $('#drpcertification').prop('disabled', false);
    $('#txtActivelinkedinurl').prop('disabled', false);
    $('#txtNoticeperiod').prop('disabled', false);
    $('#txtAvailabelinterview').prop('disabled', false);
    $('#txtEmpmailid').prop('disabled', false);
    $('#txtEmpcontnumber').prop('disabled', false);
    $('#txtCandidateremark').prop('disabled', false);
    $('#btnRtr').prop('disabled', false);
    $('#btUpload').prop('disabled', false);
    $('#btnDraft').prop('disabled', false);
    $('#btnPipeline').prop('disabled', false);
    $('#drpNoticeperiod').prop('disabled', false);
    $('#chkGenuinity').prop('disabled', false);
    $('#drpSourcedfrom').prop('disabled', false);
}

function fillEmpData() {
    $("#hdnEmployerid").val(getSession('employerid'));
    $("#txtEmpcontnumber").val(getSession('emplContactno'));
    $("#txtEmpmailid").val(getSession('emplmailid'));
    $("#txtEmpname").val(getSession('emplname'));
    options1 = Array.from(document.querySelectorAll('#drpSpecialization option'));
    if (getSession('emplspecialization') != "") {
        getSession('emplspecialization').split(',').forEach(function (v) {
            options1.find(c => c.value == v).selected = true;
        });
    }

    $("#txtCorpationname").val(getSession('corpname'));
    $("#txtEmpaddinfo").val(getSession('emplinformation'));
    enableemplcontrols();
    $("#checkEmp").modal('hide');
}

function enableemplcontrols() {
    $('#txtEmpname').prop('disabled', false);
    $('#txtCorpationname').prop('disabled', false);
    $('#txtEmpaddinfo').prop('disabled', false);
    $('#drpSpecialization').prop('disabled', false);
    $('#txtDocument').prop('disabled', false);
}

function disableemplcontrols() {
    $('#txtEmpname').prop('disabled', 'disabled');
    $('#drpSpecialization').prop('disabled', 'disabled');
    $('#txtCorpationname').prop('disabled', 'disabled');
    $('#txtEmpaddinfo').prop('disabled', 'disabled');
    $('#txtDocument').prop('disabled', 'disabled');
}

function fillData() {
    $("#check").modal('hide');
    document.getElementById("div_candidatehid").style.display = "block";
    document.getElementById("div_Contant").style.display = "none";

    $("#txtCandidatename").val(getSession('candidatename'));
    $("#txtContactno").val(getSession('candidatemobileno'));
    $("#txtEmailid").val(getSession('candidateemailid'));
    $("#txtCurrentlocation").val(getSession('currentLocation'));
    $("#drpVisastatus").val(getSession('visastatus')).prop("selected", true);

    $("#txtExperience").val(getSession('yrsofexp'));
    if (getSession('legalId') == "Yes") {
        $('input[name="chkID"]').prop("checked", true);
    }

    if (getSession('relocate') == "Yes") {
        $('input[name="chkRelocate"]').prop("checked", true);
    }
    $("#txtDocumenttype").val(getSession('documenttype'));
    $("#txtIdno").val(getSession('idNo'));
    $("#txtRate").val(getSession('ratePerHr'));
    $("#drpType").val(getSession('type')).prop("selected", true);
    $("#txtSkillsandcertification").val(getSession('skillsandCertif'));
    $("#txtActivelinkedinurl").val(getSession('linkedinURL'));
    $("#txtNoticeperiod").val(getSession('noticePeriod'));
    $("#txtAvailabelinterview").val(getSession('availableforinterview'));
    $("#txtEmpmailid").val(getSession('employermailid'));
    $("#txtEmpcontnumber").val(getSession('employerContactno'));
    $("#txtEmpname").val(getSession('employeename'));
    $("#txtCorpationname").val(getSession('corporationname'));
    $("#txtEmpaddinfo").val(getSession('employeradderinformation'));
    $("#drpNoticeperiod").val(getSession('noticePeriod'));

    $("#txtFirstname").val(getSession('firstname'));
    $("#txtLastname").val(getSession('lastname'));

    $("#drpCandidatetitle").val(getSession('Title')).prop("selected", true);

    $("#drpSourcedfrom").val(getSession('sourcedfrom')).prop("selected", true);

    //if (resData.Portalname != "-1" && resData.Portalname != "") {
    //    $("#drpPortalname").val(resData.Portalname).prop("selected", true);
    //    $('#drpPortalname').css("display", "block");
    //    $("#lblTitlename").text("Portal Name");
    //}

    //if (resData.Vendorname != "-1" && resData.Vendorname != "" && resData.Vendorname != null) {
    //    $("#drpVendorname").val(resData.Vendorname).prop("selected", true);
    //    $('#drpVendorname').css("display", "block");
    //    $("#lblTitlename").text("Vendor Name");
    //}
    //if (resData.Referralname != "") {
    //    $("#txtReferralename").val(resData.Referralname);
    //    $('#txtReferralename').css("display", "block");
    //    $("#lblTitlename").text("Referral Name");
    //}

    //if (resData.Sourcedfrom != "") {
    //    $('#div_portal').css("display", "block");
    //}
    //else {
    //    $('#div_portal').css("display", "none");
    //}
    if (getSession('candCountry') == "" || getSession('candCountry') == null) {
        $("#drpCountry").val(10751).prop("selected", true);
    }
    else {
        $("#drpCountry").val(getSession('candCountry')).prop("selected", true);
    }
    ChangeCountry();
    if (getSession('candState') == "" || getSession('candState') == null) {
        $("#drpState").val(-1).prop("selected", true);
    }
    else {
        $("#drpState").val(getSession('candState')).prop("selected", true);
    }
    ChangeState();
    if (getSession('candCity') == "" || getSession('candCity') == null) {
        $("#drpCity").val(-1).prop("selected", true);
        $("#drpCity").val(-1).prop("disabled", true);
    }
    else {
        $("#drpCity").val(getSession('candCity')).prop("selected", true);
    }

    //options = Array.from(document.querySelectorAll('#drpSkill option'));

    //getSession('skillsandCertif').split(',').forEach(function (v) {
    //    options.find(c => c.value == v).selected = true;
    //});

    options1 = Array.from(document.querySelectorAll('#drpSpecialization option'));
    if (getSession('employerspecialization') != "") {
        getSession('employerspecialization').split(',').forEach(function (v) {
            options1.find(c => c.value == v).selected = true;
        });
    }
    if (getSession('candidateRemark') != "null") {
        $("#txtCandidateremark").val(getSession('candidateRemark'));
    }

    if (getSession('Portalname') != "-1" && getSession('Portalname') != "") {
        $("#drpPortalname").val(getSession('Portalname')).prop("selected", true);
        $('#drpPortalname').css("display", "block");
        $("#lblTitlename").text("Portal Name");
    }

    if (getSession('Vendorname') != "-1" && getSession('Vendorname') != "" && getSession('Vendorname') != null) {
        $("#drpVendorname").val(getSession('Vendorname')).prop("selected", true);
        $('#drpVendorname').css("display", "block");
        $("#lblTitlename").text("Vendor Name");
    }

    if (getSession('Referralname') != "") {
        $("#txtReferralename").val(getSession('Referralname'));
        $('#txtReferralename').css("display", "block");
        $("#lblTitlename").text("Referral Name");
    }

    if (getSession('sourcedfrom') != "-1") {
        $('#div_portal').css("display", "block");
    }
    else {
        $('#div_portal').css("display", "none");
    }

    enableControls();
    enableemplcontrols();

    if (assTable.length != 0) {
        $('#div-Genuinity').css('display', 'block');
        getAssessmentQuestionlist(getSession("RegionValue"));

        assMode = "E";
        setCandidateQuestion(assTable);
        $('input[name="chkGenuinity"]').prop("checked", true);
        document.getElementById("value").innerHTML = assRating.Overallsystemrating;
        document.getElementById("value1").innerHTML = assRating.Overallrecruiterrating;
        document.getElementById("txtRatingcommentsQ1").value = assRating.Remarks;
        var sliderFormat = document.getElementById('slider-format');

        var inputFormat = document.getElementById('value1');

        sliderFormat.noUiSlider.set(inputFormat.innerHTML);
        document.getElementById('slider-format').removeAttribute('disabled');
        //sliderFormat.setAttribute('disabled', true);
    }
    else {
        $('#div-Genuinity').css('display', 'none');
    }

    //if (priSkillArr.length != 0) {
    //    $("#tblCandlist tbody").empty();

    //    for (var i = 0; i < priSkillArr.length; i++) {
    //        var table = document.getElementById("tblCandlist");
    //        table.style.display = "table";

    //        var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

    //        var tableHead = document.getElementById("tblCandlist").getElementsByTagName("THEAD")[0];;

    //        //Add Row.

    //        var i = tBody.rows.length;

    //        row = tBody.insertRow(-1);
    //        row.className = "divControl";
    //        row.id = "divControlPri_" + i;

    //        var VenID = i;

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<label ID='hdnHDNid_" + i + "'></label>";
    //        cell.style.display = "none";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<label ID='lblmode_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>U</label>";
    //        cell.className = "align-middle ps-3";
    //        cell.style.display = "none";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = " <div class='col-md-6'>" +
    //            "<select class='form-control' name='choice-button' id ='drpPrimarySkill_" + i + "' onchange='totSkillCount();'>" +
    //            "</select>" +
    //            "</div > ";
    //        //cell.className = "form-controlnew select2 select2-hidden-accessible";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<div class='col-md-12'>" +
    //            "<select class='form-control' id='drpPrimaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

    //            "</select>" +
    //            "</div>";
    //        //cell.className = "align-middle ps-3";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<div class='col-md-12 text-center' >" +
    //            "<button id='btnAddPriskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
    //            "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddPrimarySkillTable()' ></i>" +
    //            "</button>" +
    //            "<button id='btnremovetrPrimary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
    //            "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
    //            "</button>" +
    //            "</div>";
    //        //cell.className = "align-middle ps-3";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<label>" + i + "</label>";
    //        cell.style.display = "none";

    //        var option1 = new Option("--Select Skill--", "-1");
    //        $(option1).html("--Select Skill--");
    //        $("#drpPrimarySkill_" + i).append(option1);

    //        for (var x = 0; x < SkillArr.length; x++) {
    //            var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

    //            $(optionpri).html(SkillArr[x].Name);
    //            $("#drpPrimarySkill_" + i).append(optionpri);
    //        }

    //        var option1 = new Option("--Select Year--", "-1");
    //        $(option1).html("--Select Year--");
    //        $("#drpPrimaryYear_" + i).append(option1);

    //        for (var y = 0; y < SkillArrY.length; y++) {
    //            var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

    //            $(optionyrs).html(SkillArrY[y].Name);
    //            $("#drpPrimaryYear_" + i).append(optionyrs);
    //        }

    //    }

    //    for (var w = 0; w < priSkillArr.length; w++) {
    //        document.getElementById("hdnHDNid_" + w).innerHTML = priSkillArr[w].JobSkillID;
    //        $("#drpPrimarySkill_" + w).val(priSkillArr[w].JobSkillName).prop("selected", true);
    //        $("#drpPrimaryYear_" + w).val(priSkillArr[w].JobYrsofExp).prop("selected", true);
    //        $("#drpPrimarySkill_" + w).prop("disabled", true);
    //    }

    //    for (var x = 0; x < tBody.rows.length; x++) {
    //        var y = x - 1;
    //        if ((tBody.rows.length - 1) == x) {
    //            document.getElementById("btnAddPriskills" + x).style.display = "inline";

    //        }

    //    }
    //    //}
    //}

    //if (secSkillArr.length != 0) {
    //    $("#tblSecondarySkill tbody").empty();
    //    //if (resData.lstSecSkill.length == 1) {
    //    //    document.getElementById("lblHDNidS_0").innerHTML = resData.lstSecSkill[0].JobSkillID;
    //    //    $("#drpSecondarySkill_0").val(resData.lstSecSkill[0].JobSkillName).prop("selected", true);
    //    //    $("#drpSecondaryYear_0").val(resData.lstSecSkill[0].JobYrsofExp).prop("selected", true);
    //    //    document.getElementById("lblmodeS_0").innerHTML = "U";
    //    //}
    //    //else {
    //    for (var i = 0; i < secSkillArr.length; i++) {
    //        var table = document.getElementById("tblSecondarySkill");
    //        table.style.display = "table";

    //        var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];

    //        var tableHead = document.getElementById("tblSecondarySkill").getElementsByTagName("THEAD")[0];;

    //        //Add Row.

    //        var i = tBody.rows.length;

    //        row = tBody.insertRow(-1);
    //        row.className = "divControl";
    //        row.id = "divControlSec_" + i;

    //        var modeBS = document.getElementById("hdnmodeS").value;
    //        var v = document.getElementById("hdnHDNidS").value;

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<label ID='lblHDNidS_" + i + "'>" + document.getElementById("hdnHDNid_0").value + "</label>";
    //        cell.style.display = "none";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<label ID='lblmodeS_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>U</label>";
    //        cell.className = "align-middle ps-3";
    //        cell.style.display = "none";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = " <div class='col-md-6'>" +
    //            "<select class='form-control' name='choice-button' id ='drpSecondarySkill_" + i + "' onchange='totSkillCount();'>" +
    //            "</select>" +
    //            "</div > ";
    //        //cell.className = "form-controlnew select2 select2-hidden-accessible";CandidateAssign
    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<div class='col - md - 12'>" +
    //            "<select class='form-control' id='drpSecondaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

    //            "</select>" +
    //            "</div>";
    //        //cell.className = "align-middle ps-3";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<div class='col-md-12 text-center' >" +
    //            "<button id='btnAddSecskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
    //            "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddSecondarySkillTable()' ></i>" +
    //            "</button>" +
    //            "<button id='btnremovetrSecondary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
    //            "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
    //            "</button>" +
    //            "</div>";
    //        //cell.className = "align-middle ps-3";

    //        var cell = row.insertCell(-1);
    //        cell.innerHTML = "<label>" + i + "</label>";
    //        cell.style.display = "none";

    //        var option1 = new Option("--Select Skill--", "-1");
    //        $(option1).html("--Select Skill--");
    //        $("#drpSecondarySkill_" + i).append(option1);

    //        for (var x = 0; x < SkillArr.length; x++) {
    //            var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

    //            $(optionpri).html(SkillArr[x].Name);
    //            $("#drpSecondarySkill_" + i).append(optionpri);
    //        }

    //        //if (document.getElementById("drpSecondarySkill_" + i)) {
    //        //    var element = document.getElementById("drpSecondarySkill_" + i);
    //        //    const example = new Choices(element, {});
    //        //}

    //        var option1 = new Option("--Select Year--", "-1");
    //        $(option1).html("--Select Year--");
    //        $("#drpSecondaryYear_" + i).append(option1);

    //        for (var y = 0; y < SkillArrY.length; y++) {
    //            var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

    //            $(optionyrs).html(SkillArrY[y].Name);
    //            $("#drpSecondaryYear_" + i).append(optionyrs);
    //        }
    //    }

    //    for (var d = 0; d < secSkillArr.length; d++) {
    //        document.getElementById("lblHDNidS_" + d).innerHTML = secSkillArr[d].JobSkillID;
    //        $("#drpSecondarySkill_" + d).val(secSkillArr[d].JobSkillName).prop("selected", true);
    //        $("#drpSecondaryYear_" + d).val(secSkillArr[d].JobYrsofExp).prop("selected", true);
    //        $("#drpSecondarySkill_" + d).prop("disabled", true);
    //    }

    //    for (var x = 0; x < tBody.rows.length; x++) {
    //        var y = x - 1;
    //        if ((tBody.rows.length - 1) == x) {
    //            document.getElementById("btnAddSecskills" + x).style.display = "inline";

    //        }

    //    }
    //    //}
    //}

    if (getSession('sourcedfrom') == "18001") {
        $("#div_sourcedfrom").removeClass("col-md-4");
        $("#div_sourcedfrom").addClass("col-md-6");

        $("#div_LinekedIn").removeClass("col-md-4");
        $("#div_LinekedIn").addClass("col-md-6");
        document.getElementById("div_portal").style.display = "none";
    }
    else {
        $("#div_sourcedfrom").removeClass("col-md-6");
        $("#div_sourcedfrom").addClass("col-md-4");

        $("#div_LinekedIn").removeClass("col-md-6");
        $("#div_LinekedIn").addClass("col-md-4");
        document.getElementById("div_portal").style.display = "block";
    }

    $("#check").modal('hide');
}
function enableData() {
    enableControls();
}

$('#fileupload1').on('change', function () {
    var fileupload = document.getElementById("fileupload1");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload1", "1");
        //$('#btnAttach1').css('display', 'none');
    }
});

$('#fileupload2').on('change', function () {
    var fileupload = document.getElementById("fileupload2");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload2", "2");
        //$('#btnAttach2').css('display', 'none');
    }
});

$('#fileupload3').on('change', function () {
    var fileupload = document.getElementById("fileupload3");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload3", "3");
        //$('#btnAttach3').css('display', 'none');
    }
});

$('#fileupload4').on('change', function () {
    var fileupload = document.getElementById("fileupload4");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload4", "4");
        //$('#btnAttach4').css('display', 'none');
    }
});

function certificationupload() {
    var fileupload = document.getElementById("fileupload5");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload5", "5");
        //$('#btnAttach4').css('display', 'none');
    }
    //});
}

function visaupload() {
    var fileupload = document.getElementById("fileupload6");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload6", "6");
        //$('#btnAttach4').css('display', 'none');
    }
    //});
}

function Govtidupload() {
    var fileupload = document.getElementById("fileupload7");
    if (fileupload.value != "") {
        var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
        checkFileExtension(fileName, "fileupload7", "7");
        //$('#btnAttach4').css('display', 'none');
    }
    //});
}

function checkFileExtension(fileName, ctrlName, counter) {
    var fileExt = fileName.split('.');
    if (fileExt[1] == "doc" || fileExt[1] == "docx" || fileExt[1] == "pdf" || fileExt[1] == "DOC" || fileExt[1] == "DOCX" || fileExt[1] == "PDF") {
        // filePath.innerHTML = "<b>Document Attached: </b>" + fileName;
        // document.getElementById("ContentPlaceHolder1_txtFilename").value = fileName;
        checkFileSize(ctrlName, counter);
        //return true;
    }
    else {
        // alert("Upload only doc or pdf files");

        $("#div-message").text('Upload only doc or pdf files');
        $("#msgpopup").modal('show');
        if (ctrlName == "fileupload1") {
            $('#btnAttach1').css('display', 'block');
        }
        else if (ctrlName == "fileupload2") {
            $('#btnAttach2').css('display', 'block');
        }
        else if (ctrlName == "fileupload3") {
            $('#btnAttach3').css('display', 'block');
        }
        else if (ctrlName == "fileupload4") {
            $('#btnAttach4').css('display', 'block');
        }
    }
}

function checkFileSize(ctrlName, counter) {
    var fi = document.getElementById(ctrlName);
    // Check if any file is selected.
    if (fi.files.length > 0) {
        //for (var i = 0; i <= fi.files.length - 1; i++) {
        const fsize = fi.files.item(0).size;
        const file = Math.round((fsize / 1024));

        // The size of the file.
        //if (file >= 4096) {
        //    alert(
        //      "File too Big, please select a file less than 4mb");
        //}
        if (file >= 2048) {
            //alert("File too Big, please select a file less than 2MB");
            $("#div-message").text('File too Big, please select a file less than 2MB');
            $("#msgpopup").modal('show');

            if (ctrlName == "fileupload1") {
                $('#btnAttach1').css('display', 'block');
            }
            else if (ctrlName == "fileupload2") {
                $('#btnAttach2').css('display', 'block');
            }
            else if (ctrlName == "fileupload3") {
                $('#btnAttach3').css('display', 'block');
            }
            else if (ctrlName == "fileupload4") {
                $('#btnAttach4').css('display', 'block');
            }
            //document.getElementById('lblimgError').style.display = "block";
            //document.getElementById('lblimgError').innerHTML = "File too Big, please select a file less than 2MB";
            //document.getElementById('ContentPlaceHolder1_btnFileUpload').disabled = true;
            return false;
            // alert("File too Big, please select a file less than 2mb");
        }

        else {
            //document.getElementById('lblimgError').style.display = "none";
            //document.getElementById('ContentPlaceHolder1_btnFileUpload').disabled = false;
            var fileupload = document.getElementById(ctrlName);
            var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];

            $('#lblFilename' + counter).text(fileName);
            $('#div_Filename' + counter).css('display', 'block');
            //$('#btUpload' + counter).css('display', 'block');
            $('#btUpload' + counter).click();
            return true;
        }
        //}
    }
}

function uploadFile(i) {
    var count = 0;
    var emptycount = 0;
    //if ($('#txtCandidatename').val() == "") {
    //    $('#txtCandidatename').addClass("is-invalid");
    //    $('#txtCandidatename').focus();
    //    return false;
    //}
    if ($('#txtFirstname').val() == "" && $('#txtLastname').val() == "") {
        $('#txtFirstname').addClass("is-invalid");
        $('#txtLastname').addClass("is-invalid");
        $('#txtFirstname').focus();

        return false;
    }
    else {
        $('#txtFirstname').removeClass("is-invalid");
        $('#txtLastname').removeClass("is-invalid");

        if (i > 1 && i < 6) {
            if ($('#drpDocumenttype' + i).val() == "-1") {
                $('#drpDocumenttype' + i).addClass("is-invalid");
                $('#drpDocumenttype' + i).focus();
                emptycount++;
            }

            else {
                $('#drpDocumenttype' + i).removeClass("is-invalid");
                count++;
            }

            //if ($('#txtIdno' + i).val() == "") {
            //    $('#txtIdno' + i).addClass("is-invalid");
            //    $('#txtIdno' + i).focus();
            //    emptycount++;
            //}
            //else {
            //    $('#txtIdno' + i).removeClass("is-invalid");
            //    count++;
            //}

            if (parseInt(emptycount) > 0) {
                return false;
            }

            else if (parseInt(count) > 0) {
                if (i == 5) {
                    document.getElementById('fileupload5').click();
                }
                else if (i == 6) {
                    document.getElementById('fileupload6').click();
                }
                else {
                    document.getElementById('fileupload' + i).click();
                }
            }
        }
        else if (i == 6) {
            //if ($('#txtIdno6').val() == "") {
            //    $('#txtIdno6').addClass("is-invalid");
            //    $('#txtIdno6').focus();
            //    emptycount++;
            //}
            //else {
            //    $('#txtIdno6').removeClass("is-invalid");
            //    count++;
            //}

            //if ($('#txtIdno7').val() == "") {
            //    $('#txtIdno7').addClass("is-invalid");
            //    $('#txtIdno7' + i).focus();
            //    emptycount++;
            //}
            //else {
            //    $('#txtIdno7').removeClass("is-invalid");
            //    count++;
            //}

            //if (parseInt(emptycount) > 0) {
            //    return false;
            //}

            //else if (parseInt(count) > 0) {
                if (i == 6) {
                    document.getElementById('fileupload6').click();
                }

            //}
        }
        else if (i == 7) {
            //if ($('#drpGovt16').val() == "-1") {
            //    $('#drpGovt16').addClass("is-invalid");
            //    $('#drpGovt16').focus();
            //    emptycount++;
            //}
            //else {
            //    $('#drpGovt16').removeClass("is-invalid");
            //    count++;
            //}

            //if ($('#txtIdno8').val() == "") {
            //    $('#txtIdno8').addClass("is-invalid");
            //    $('#txtIdno8' + i).focus();
            //    emptycount++;
            //}
            //else {
            //    $('#txtIdno8').removeClass("is-invalid");
            //    count++;
            //}
            //if ($('#txtIdno9').val() == "") {
            //    $('#txtIdno9').addClass("is-invalid");
            //    $('#txtIdno9' + i).focus();
            //    emptycount++;
            //}
            //else {
            //    $('#txtIdno9').removeClass("is-invalid");
            //    count++;
            //}

            //if (parseInt(emptycount) > 0) {
            //    return false;
            //}

            //else if (parseInt(count) > 0) {
                if (i == 7) {
                    document.getElementById('fileupload7').click();
                }

            //}
        }

        else {
            document.getElementById('fileupload' + i).click();
        }
    }
}

function AddMore() {
    var counter = parseInt(getSession('counter')) + 1;
    setSession("counter", counter);
    if (counter == 2) {
        $('#divAttach2').css('display', 'block');
    }
    else if (counter == 3) {
        $('#divAttach3').css('display', 'block');
    }
    else if (counter == 4) {
        $('#divAttach4').css('display', 'block');
    }
    //var strDiv = "";
    //strDiv += "<div class='col- md-12' style='height: 70px;' id='divAttach_" + counter +"'>"+
    //            "<div class='row'>" +
    //            "<div class='col-md-3'><label class='form-label'>Document Type</label>"+
    //            "<input class='form-control' type='text' placeholder='Document Type' id='txtDocumenttype_" + counter+"'>"+
    //            "</div><div class='col-md-3'><label class='form-label'>ID No.</label>"+
    //            "<input class='form-control' type='text' placeholder='Id Number' id='txtIdno_'" + counter+">"+
    //            "</div><div class='col-md-6'><div class='row' style='margin-top: 36px;'>"+
    //            "<div class='col-md-8'><form action='' id='dropBasic_" + counter+"' style='min-height: 117px !important;'>"+
    //            "<button id='btnAttach_"+counter+"' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background:none !important; box-shadow: none !important; color: #21dcfc;' onclick='uploadFile();'>"+
    //            "<span class='btn-inner--icon'><i class='fa fa-paperclip' aria-hidden='true' style='font-size:20px;'></i></span>"+
    //            "</button><span id='lblFilename_" + counter + "'></span><input name='file' id='fileupload_" + counter+"' type='file' style='display:none;' />"+
    //            "</form></div><div class='col-md-2'>"+
    //            "<button id='btUpload_" + counter+"' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color:#21dcfc; display:none;'>"+
    //            "<span class='btn-inner--icon'><i class='fas fa-upload' style='font-size: 20px;'></i></span>"+
    //            "</button></div></div></div></div></div>";

    //$('#divFile').append(strDiv);
}

function checkifEmplExists() {
    var emailid = $("#txtEmpmailid").val();
    var number = $("#txtEmpcontnumber").val();
    var strdata = { "emailid": emailid, "number": number };
    if (emailid != "") {
        common_api_ajax_request("api/EmployerCheck", "EMPLCHECK", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        alert("fill");
    }
}

$("#btUpload1").click(function () {
    var f1 = $("#txtCandidatename").val();
    var data = new FormData($('#dropBasic1')[0]);
    data.append("Resume", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename1').text(data.data.fileName);
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove1').css('display', 'block');
            $('#btnAdd').prop('disabled', false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
            alert(data);
        }
    });
});

$("#btUpload2").click(function () {
    var f1 = $("#txtCandidatename").val();
    var data = new FormData($('#dropBasic2')[0]);
    if ($('select#drpDocumenttype2 option:selected').text() == "Driving Licence") {
        data.append("Driving Licence", "1");
    }
    else if ($('select#drpDocumenttype2 option:selected').text() == "Visa") {
        data.append("Visa", "1");
    }

    else if ($('select#drpDocumenttype2 option:selected').text() == "Others") {
        data.append("Other Documents", "1");
    }

    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename2').text(data.data.fileName);
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove2').css('display', 'block');
            $('#btdelete2').css('display', 'none');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
            alert(data.data.fileName);
        }
    });
});

$("#btUpload3").click(function () {
    var f1 = $("#txtCandidatename").val();
    var data = new FormData($('#dropBasic3')[0]);
    if ($('select#drpDocumenttype3 option:selected').text() == "Driving Licence") {
        data.append("Driving Licence", "1");
    }
    else if ($('select#drpDocumenttype3 option:selected').text() == "Visa") {
        data.append("Visa", "1");
    }
    else if ($('select#drpDocumenttype3 option:selected').text() == "Others") {
        data.append("Other Documents", "1");
    }
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename3').text(data.data.fileName);
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove3').css('display', 'block');
            $('#btdelete3').css('display', 'none');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
});

$("#btUpload4").click(function () {
    var f1 = $("#txtCandidatename").val();
    var data = new FormData($('#dropBasic4')[0]);

    if ($('select#drpDocumenttype4 option:selected').text() == "Driving Licence") {
        data.append("Driving Licence", "1");
    }
    else if ($('select#drpDocumenttype4 option:selected').text() == "Visa") {
        data.append("Visa", "1");
    }
    else if ($('select#drpDocumenttype4 option:selected').text() == "Others") {
        data.append("Other Documents", "1");
    }

    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename4').text(data.data.fileName);
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove4').css('display', 'block');
            $('#btdelete4').css('display', 'none');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
});

function certificationfileupload() {
    var data = new FormData($('#dropBasic5')[0]);
    var f1 = $("#txtFirstname").val().trim() + " " + $("#txtLastname").val().trim();

    data.append("Other Documents", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename5').text(data.data.fileName);
            $('#div_Fileuploadname5').css('display', 'block');
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove5').css('display', 'block');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
    //});
}

function visafileupload() {
    var data = new FormData($('#dropBasic6')[0]);
    var f1 = $("#txtFirstname").val().trim() + " " + $("#txtLastname").val().trim();

    data.append("Visa", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename6').text(data.data.fileName);
            $('#div_Fileuploadname6').css('display', 'block');
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove6').css('display', 'block');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
    //});
}

function Govtidfileupload() {
    var data = new FormData($('#dropBasic7')[0]);
    var f1 = $("#txtFirstname").val().trim() + " " + $("#txtLastname").val().trim();

    if ($('select#drpGovt16 option:selected').val() == "20001") {
        data.append("Driving Licence", "1");
    }

    else {
        data.append("Other Documents", "1");
    }

    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileUpload/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            //$('p').text(data);
            $('#lblFilename7').text(data.data.fileName);
            $('#div_Fileuploadname7').css('display', 'block');
            $("#div-message").text('File Uploaded Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            $('#btremove7').css('display', 'none');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
    //});
}

$("#btremove1").click(function () {
    var f1 = $('#lblFilename1').text();

    var data = new FormData($('#dropBasic1')[0]);
    data.append("Resume", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileDelete/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            $('#lblFilename1').text("");
            $('#btnAttach1').css('display', 'block');
            $('#btremove1').css('display', 'none');
            $('#div_Filename1').css('display', 'none');
            $("#div-message").text('Resume Deleted Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            //$('p').text(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
});

$("#btremove2").click(function () {
    var f1 = $('#lblFilename2').text();

    var data = new FormData($('#dropBasic2')[0]);
    data.append("DLCopy", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileDelete/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            $('#lblFilename2').text("");
            $('#txtIdno2').val("");
            $("#drpDocumenttype2").val("-1").prop("selected", true);
            $('#btnAttach2').css('display', 'block');
            $('#btremove2').css('display', 'none');
            $('#btdelete2').css('display', 'block');
            $('#div_Filename2').css('display', 'none');
            $("#div-message").text('Resume Deleted Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            //$('p').text(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
});

$("#btremove3").click(function () {
    var f1 = $('#lblFilename3').text();

    var data = new FormData($('#dropBasic3')[0]);
    data.append("Visa", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileDelete/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            $('#lblFilename3').text("");
            $('#btnAttach3').css('display', 'block');
            $('#btremove3').css('display', 'none');
            $('#btdelete3').css('display', 'block');
            $('#div_Filename3').css('display', 'none');
            $("#div-message").text('Resume Deleted Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            //$('p').text(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
});

$("#btremove4").click(function () {
    var f1 = $('#lblFilename4').text();

    var data = new FormData($('#dropBasic4')[0]);
    data.append("Other Documents", "1");
    data.append(f1, "file_name");
    $.ajax({
        type: "POST",
        url: '/api/FileDelete/',    // CALL WEB API TO SAVE THE FILES.
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,         // PREVENT AUTOMATIC DATA PROCESSING.
        cache: false,
        data: data, 		        // DATA OR FILES IN THIS CONTEXT.
        success: function (data, textStatus, xhr) {
            $('#lblFilename4').text("");
            $('#btnAttach4').css('display', 'block');
            $('#btremove4').css('display', 'none');
            $('#btdelete4').css('display', 'block');
            $('#div_Filename4').css('display', 'none');
            $("#div-message").text('Resume Deleted Successfully');
            $("#msgpopup").modal('show');
            $("#btnOk").attr("onclick", "closepopup('0')");
            //$('p').text(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + ': ' + errorThrown);
        }
    });
});

function getRTRdata() {
    $("#txtMailFrom").val(getSession('Mailid'));
    if ($("#txtEmpmailid").val() != "") {
        $("#txtMailto").val($("#txtEmpmailid").val());
    }
    else {
        $("#txtMailto").val($("#txtEmailid").val());
    }
    $("#txtSubject").val($("#lblJobtitle1").text() + "-" + $("#txtCandidatename").val() + "-RTR Confirmation Request");
    //var strData = "Hi " + $("#txtEmpname").val() + ",<br/>" +
    //    "I _________ residing in _______ hereby confirm for <b>" + "$" + $("#txtRate").val() + "/ Hr on " + $("#txtType").val() + "</b> and <br/>authorize Techwaukee Private Ltd as an exclusive representative of my <br/> candidature for the position of <b>" + $("#lblJobtitle1").text() + "</b> at <b>" + getSession('City') + ", " + getSession('State') +"("+ $("#lblWorkingtype1").text() +")</b>" +
    //    ".<br/>I will not approach the client directly or indirectly and I ______ confirm that <br/>I haven’t submitted my resume for this specific position to any other client/staffing vendor.<br/><br/>" +
    //    "Techwaukee:<br/><br/>" +
    //    "We are into Product Development, IT Consulting Services & Offshore staff <br/> Augmentation.Our Mission is to develop outstanding products with highly skilled<br/> IT professionals, providing quality service and customer management to <br/> determine long term relationship.We also provide skilled and experienced <br/>consultants in various technologies, they handle critical problem in an excellent way.<br/>";

    var strData = "Hi " + $("#txtEmpname").val() + "," +
        "<p>I <b>" + $("#txtCandidatename").val() + "</b> hereby confirm for <b>" + "$" + $("#txtRate").val() + "/ Hr on " + $('select#drpType option:selected').text() + "</b> and authorize Techwaukee Private Ltd as an exclusive representative of my candidature for the position of <b>" + $("#lblJobtitle1").text() + "</b> at <b>" + getSession('City') + ", " + getSession('State') + "(" + $("#lblWorkingtype1").text() + ")</b>" +
        ".I will not approach the client directly or indirectly and I <b>" + $("#txtCandidatename").val() + "</b> confirm that I haven’t submitted my resume for this specific position to any other client/staffing vendor." +
        "<br/>Techwaukee:<br/>" +
        "We are into Product Development, IT Consulting Services & Offshore staff  Augmentation.Our Mission is to develop outstanding products with highly skilled IT professionals, providing quality service and customer management to determine long term relationship.We also provide skilled and experienced consultants in various technologies, they handle critical problem in an excellent way.</p>";
    $("#txtMailcont").val(strData);

    var strData1 = "<br/><br/><u>Details Required for Submission:</u><br/>" +
        "<br/>Kindly Share the below details along with Visa & DL Copy for submission.<br/><br/>" +
        "<table style='width  :  228pt; border-collapse  :  collapse; ' class=' mt-4' border='0'>" +
        "<tbody>" +
        "<tr style='height  :  15.75pt; '>" +
        "<td style='background: rgb(255, 220, 190); border-style  : solid; border-width  :  1pt;  padding  :  0in 5.4pt; height  :  15.75pt; text-align:center;' colspan='2'>Submission</td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background: rgb(195, 243, 253); padding  :  0in 5.4pt; height  :  15pt; ''><p style='margin  :  0px; text-align  :  center; line-height  :  normal; ' class='' align='center'><b><span class='x_298235941size' style='font-size :  10pt; '>Details</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background: rgb(195, 243, 253); padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; text-align  :  center; line-height  :  normal; ' class='' align='center'><b><span class='x_298235941size' style='font-size :  10pt; '>Input</span></b><br></p></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Full Legal Name</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Email ID</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Contact Number</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Current Location</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Visa Status</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Willing to relocate (Yes/No)</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Total years of experience</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  24pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  24pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Relevant experience</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  24pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  24pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  24pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>LinkedIn URL</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  24pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Notice Period</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid windowtext; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height:15pt;'>" +
        "<td style='font-family:inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid black; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Available for the interview</span></b><br></p></td>" +
        "<td style='font-family:inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid black; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><br></td>" +
        "</tr>" +
        "<tr style='height  :  15pt; '>" +
        "<td style='font-family  :  inherit; width  :  112pt; border-top  :  none; border-left  :  1pt solid black; border-bottom  :  1pt solid black; border-right  :  1pt solid windowtext; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><b><span class='x_298235941size' style='font-size :  9pt; '>Employer Details</span></b><br></p></td>" +
        "<td style='font-family  :  inherit; width  :  116pt; border-top  :  none; border-left  :  none; border-bottom  :  1pt solid black; border-right  :  1pt solid black; background  :  white; padding  :  0in 5.4pt; height  :  15pt; '><p style='margin  :  0px; line-height  :  normal; ' class=''><span class='x_298235941size' style='font-size :  9pt; '>&nbsp;</span><br></p></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
    $("#txtMaildescriptioncont").append(strData1);

    //$("#txtMailcont").text(strData);
}

function sendRTRMail() {
    var fromAddr = $("#txtMailFrom").val();
    var toAddr = $("#txtMailto").val();
    var ccAddr = $("#txtCC").val();
    var subject = $("#txtsubject").val();
    var Description = document.getElementById("txtMaildescription").innerHTML;
    var jobcode = $("#hdnJobid").val();
    var candidateemailid = $("#txtEmailid").val();
    var employeremaildid = $("#txtEmpmailid").val();

    var strdata = {
        "fromAddr": fromAddr, "toAddr": toAddr, "ccAddr": ccAddr, "subject": subject
        , "Description": Description, "jobcode": jobcode, "candidateemailid": candidateemailid
        , "employeremaildid": employeremaildid
    };
    if (toAddr != "") {
        common_api_ajax_request("api/SendMail", "MAIL", strdata);
        //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    } else {
        alert("fill");
    }
}

function sendSubmissionMail() {
    var toAddr = "prasanna.m@techwaukee.com";
    var ccAddr = "";
    var subject = "Submission-" + $("#txtCandidatename").val() + "-" + $("#lblJobtitle1").text();

    //var Description = "\n\n<u>Details Required for Submission:</u><br/>" +
    //    "<br/>Kindly Share the below details and your Visa & DL Copy for submission.<br/>" +
    //    "<table style='font-family: Verdana,    Arial,    Helvetica,    sans-serif; font-size: 13.3333px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); border-collapse: collapse; width: 506pt;' class='' border='1' cellpadding='0' cellspacing='0' width='675'>" +
    //    "<colgroup class=''>" +
    //    "<col style='width: 177pt;' class='' width='236'>" +
    //    "<col style='width: 329pt;' class='' width='439'>" +
    //    "</colgroup>" +
    //    "<tbody class=''>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; width: 177pt; color: windowtext; text-align: left; vertical-align: middle; border: 0.5pt solid windowtext; background: white; white-space: normal;' height='20' class='x_2012675028xl67' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>&nbsp;</span></span><br>"+
    //"</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; width: 329pt; color: windowtext; text-align: left; background: white;' class='x_2012675028xl69' width='439'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>&nbsp;</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 28px; width: 506pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; border: 0.5pt solid windowtext; background: rgb(237, 125, 49); white-space: normal;' colspan='2' height='20' class='x_2012675028xl73' width='675'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Submission</span></span><br>" +
    //    "</td>" +
    //    "</tr>"+
    //"<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: rgb(141, 179, 226); white-space: normal;' height='20' class='x_2012675028xl70' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Details</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; width: 329pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: rgb(141, 179, 226); white-space: normal;' class='x_2012675028xl70' width='439'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Input</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Candidate Full Name</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; font-weight: 700; text-align: left;' class='x_2012675028xl72'><span class='x_1276292371colour' style='color: rgb(37, 49, 60);'><span class='x_1276292371font' style='font-family: Calibri,  sans-serif;'><span class='x_1276292371size' style='font-size: 16pt;'><span class='x_1276292371size' style='font-size: 13.3333px;'><span class='x_1276292371font' style='font-family: verdana,  sans-serif;'><b><span class='x_1276292371font' style='font-family: Calibri,  sans-serif;'><span class='x_1276292371size' style='font-size: 11pt; line-height: 15.6933px;'>" + $("#txtCandidatename").val()+"</span></span></b></span></span></span></span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 25px; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Email ID</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; color: rgb(5, 99, 193); text-decoration: underline;' class='x_2012675028xl74'>"+
    //"<div style='margin: 0px;' class=''><span><a style='color: rgb(89, 143, 222); cursor: pointer;' href='mailto:bhavani9910@gmail.com' target='_blank'><b><span class='x_1276292371colour' style='color: windowtext;'><span class='x_1276292371size' style='font-size: 11pt; text-decoration: none;'><span class='x_1276292371size' style='font-size: 13.3333px;'>" + $("#txtEmailid").val() +"</span></span></span></b></a></span><br>" +
    //    "</div>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Contact Number</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext;' class='x_2012675028xl75'>"+
    //"<div style='text-align: justify; margin: 0px;' class=''><span class='x_1276292371font' style='font-family: Calibri,  sans-serif;'><span class='x_1276292371size' style='font-size: 11pt;'><b><span class='x_1276292371font' style='font-family: Calibri,  sans-serif;'><span class='x_1276292371size' style='font-size: 11pt; line-height: 15.6933px;'>(510) 556- 9910</span></span></b></span></span><br>" +
    //    "</div>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Current Location</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; text-align: left;' class='x_2012675028xl71'><span class='x_1276292371highlight' style='background-color: rgb(255, 255, 255);'><span class='x_1276292371font' style='font-family: &quot; lato 2&quot; ,  sans-serif;'><span class='x_1276292371size' style='font-size: 14px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; float: none; display: inline;'><span class='x_1276292371highlight' style='background-color: rgb(255, 255, 255);'><span class='x_1276292371font' style='font-family: -apple-system,  system-ui,  BlinkMacSystemFont,  &quot; segoe ui&quot; ,  roboto,  &quot; helvetica neue&quot; ,  &quot; fira sans&quot; ,  ubuntu,  oxygen,  &quot; oxygen sans&quot; ,  cantarell,  &quot; droid sans&quot; ,  &quot; apple color emoji&quot; ,  &quot; segoe ui emoji&quot; ,  &quot; segoe ui symbol&quot; ,  &quot; lucida grande&quot; ,  helvetica,  arial,  sans-serif;'><span class='x_1276292371size' style='font-size: 10.5px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; float: none; display: inline;'><span class='x_1276292371colour' style='color: rgb(0, 0, 0);'><span class='x_1276292371font' style='font-family: verdana,  sans-serif;'><span class='x_1276292371size' style='font-size: 13.3333px;'>Palm Beach Gardens, Florida,</span></span></span></span></span></span></span></span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Visa Status</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; width: 329pt; color: windowtext; text-align: left; vertical-align: middle; background: white; white-space: normal;' class='x_2012675028xl67' width='439'>H1B<br>
    //"</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Rate/Salary</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; color: windowtext; text-align: left;' class='x_2012675028xl66'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>$62/hr all inclusive on Corp to Corp (Employer Rate)</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Willing to relocate (Yes/No)</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; width: 329pt; color: windowtext; text-align: left; vertical-align: middle; background: white; white-space: normal;' class='x_2012675028xl67' width='439'>" +
    //    "<br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Total years of experience</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; color: windowtext; text-align: left;' class='x_2012675028xl66'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>7 Years</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Relevant experience</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; color: windowtext; text-align: left;' class='x_2012675028xl66'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>7 Years as a Talend developer</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>LinkedIn</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; color: windowtext; text-decoration: underline; text-align: left;' class='x_2012675028xl68'><a style='color: rgb(89, 143, 222); cursor: pointer;' href='https://www.linkedin.com/in/bhavani-venishetti-a76763158/' target='_blank'>(8) Bhavani Venishetti | LinkedIn</a><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Notice Period</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; width: 329pt; color: windowtext; text-align: left; vertical-align: middle; background: white; white-space: normal;' class='x_2012675028xl67' width='439'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>1 Week</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "<tr style='height: 15pt;' class='' height='20'>" +
    //    "<td style='font-family: inherit; height: 15pt; border: 0.5pt solid windowtext; width: 177pt; color: windowtext; font-weight: 700; text-align: left; vertical-align: middle; background: white; white-space: normal;' height='20' class='x_2012675028xl65' width='236'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>Available for the interview</span></span><br>" +
    //    "</td>" +
    //    "<td style='font-family: inherit; border: 0.5pt solid windowtext; width: 329pt; color: windowtext; text-align: left; vertical-align: middle; background: white; white-space: normal;' class='x_2012675028xl67' width='439'><span class='x_1276292371font' style='font-family: Calibri,  Verdana,  Arial,  sans-serif,  sans-serif;'><span class='x_1276292371size' style='font-size: 16px;'>One Day Prior Notice</span></span><br>" +
    //    "</td>" +
    //    "</tr>" +
    //    "</tbody>" +
    //    "</table>";

    //var strdata = {
    //    "fromAddr": fromAddr, "toAddr": toAddr, "ccAddr": ccAddr, "subject": subject
    //    , "Description": Description
    //};

    //if (toAddr != "") {
    //    common_api_ajax_request("api/SendSubmissionMail", "SUBMAIL", strdata);
    //    //common_api_ajax_request("RecruitingAPI/api/Dashboard", "DASHBOARD", strdata);
    //} else {
    //    alert("fill");
    //}
}

//function enableTLButton() {
//    if ($("#chkRTR").prop("checked") == true) {
//        //if ($('input[name="chkRTR"]:checked').val() == "on") {
//        if ($('#hdnJobid').val() != "") {
//            var genvalue = genuinityrating.split("%");
//            if (parseInt(genvalue[0]) >= 70) {
//                if (getSession('TWE_ID').includes("TWVU")) {
//                    $('#btnSubmit').css('display', 'block');
//                    $('#btnPipeline').css('display', 'none');
//                    $('#btnDraft').css('display', 'none');
//                }
//                else {
//                    $('#btnSubmittl').prop('disabled', false);
//                    $('#btnSubmittl').css('display', 'block');
//                    $('#btnPipeline').css('display', 'none');
//                    $('#btnDraft').css('display', 'none');
//                }
//            }
//            else {
//                $('#btnSubmittl').prop('disabled', true);
//                $('#btnSubmittl').css('display', 'none');
//                $('#btnPipeline').css('display', 'none');
//                $('#btnDraft').css('display', 'block');
//                $('#btnGenuinity').prop('disabled', false);
//            }
//        }

//    }

//    else if ($("#chkRTR").prop("checked") == false) {
//        if ($('#hdnJobid').val() != "") {
//            var genvalue = genuinityrating.split("%");
//            if (parseInt(genvalue[0]) >= 70) {
//                if (getSession('TWE_ID').includes("TWVU")) {
//                    $('#btnSubmit').css('display', 'block');
//                    $('#btnPipeline').css('display', 'none');
//                    $('#btnDraft').css('display', 'none');
//                    $('#div_commrtr').css('display', 'block');

//                }
//                else {
//                    $('#btnSubmittl').css('display', 'none');
//                    $('#btnPipeline').css('display', 'block');
//                    $('#btnDraft').css('display', 'block');
//                }
//            }
//            else {
//                $('#btnSubmittl').css('display', 'none');
//                $('#btnPipeline').css('display', 'none');
//                $('#btnDraft').css('display', 'block');
//            }
//        }
//    }
//}

function enableTLButton() {
    if ($("#chkRTR").prop("checked") == true && $("#chkRTR1").prop("checked") == true) {
        var genvalue = $("#value1").text().split("%");
        if (parseInt(genvalue[0]) >= 70) {
            if (parseInt($("#hdnCandStatus").val()) >= 103) {
                $('#btnSubmittl').css('display', 'none');
            }
            else {
                $('#btnSubmittl').css('display', 'block');
                $('#btnSubmittl').prop("disabled", false);
            }
            $('#btnDraft').css('display', 'none');
        }
        else {
            $('#btnSubmittl').css('display', 'none');
            $('#btnDraft').css('display', 'block');
            $('#btnPipeline').css('display', 'none');
        }
    }
    else {
        $('#btnSubmittl').css('display', 'none');
        $('#btnDraft').css('display', 'block');
    }
}

function getrateUser(id) {
    //document.getElementById("rat1").classList.remove("inputlayout");
    //document.getElementById("txtEnddate").classList.remove("font_size");

    var count = id.split('_');
    for (var k = 1; k <= 5; k++) {
        document.getElementById(count[0] + "_" + k).classList.remove("ratechecked");
    }

    for (var i = 1; i <= count[1]; i++) {
        if (document.getElementById(count[0] + "_" + i).classList.contains('ratechecked')) {
            document.getElementById(count[0] + "_" + i).classList.remove("ratechecked");
        }
        else {
            document.getElementById(count[0] + "_" + i).classList.add("ratechecked");
        }
    }

    var ratings = document.getElementsByClassName("ratechecked");
    var rateCount = 0;
    for (var i = 0; i < ratings.length; i++) {
        rateCount++;
    }
    document.getElementById("starRating").innerHTML = rateCount;
    //document.getElementById("ContentPlaceHolder1_hdnStarrating").innerHTML = rateCount;
}

function SaveSkill() {
    $("#drpSkill :selected").each(function () {
        skillVal += this.value + ",";
    });
    skillVal = skillVal.substring(0, skillVal.length - 1);

    var strdata = {
        "Skill": $("#txtSkill").val()
    };
    common_api_ajax_request("api/AddSkill", "ADDSKILL", strdata);
}

function closepopup(val) {
    if (val == 0) {
        $("#msgpopup").modal('hide');
    }
    else if (val == 1) {
        $("#msgpopup").modal('hide');
        window.location.href = "FollowupPage.aspx?id=" + $('#hdnJobid').val();
    }

    else if (val == 2) {
        $("#msgpopup").modal('hide');
        window.location.href = "CandidateOverview.aspx";
    }

    else if (val == 3) {
        $("#msgpopup").modal('hide');
        window.location.href = "CandidateList.aspx";
    }

    else if (val == 4) {
        $("#msgpopup").modal('hide');
        window.location.href = localStorage.getItem("prevPage");
    }

    else if (val == 5) {
        $("#msgpopup").modal('hide');
        window.location.href = localStorage.getItem("prevPage");
    }
}

function btnhidden() {
    $("#msgpopup").modal('hide');
    $('#btnRtr').css('display', 'none');

    var url = window.location.href;
    hashes = url.split("?")[1];
    if (hashes != null) {
        var hash = hashes.split('&');
        if (hash.length == 3) {
            var params1 = hash[0].split("=");
            var params2 = hash[1].split("=");
            var params3 = hash[2].split("=");

            if (params3[1] == "BS") {
                $('#btnDraft').css('display', 'none');
            }
            else {
                $('#btnDraft').css('display', 'block');
            }
        }
    }

    var genvalue = genuinityrating.split("%");
    if (parseInt(genvalue[0]) >= 70) {
        $('#btnPipeline').css('display', 'block');
    }
    else {
        $('#btnPipeline').css('display', 'none');
    }
}

function removeDocuments() {
    var counter = getSession('counter');
    if (counter == 2) {
        $('#txtIdno2').val("");
        $("#drpDocumenttype2").val("-1").prop("selected", true);
        $('#divAttach2').css('display', 'none');
    }
    else if (counter == 3) {
        $('#txtIdno3').val("");
        $("#drpDocumenttype3").val("-1").prop("selected", true);
        $('#divAttach3').css('display', 'none');
    }
    else if (counter == 4) {
        $('#txtIdno4').val("");
        $("#drpDocumenttype4").val("-1").prop("selected", true);
        $('#divAttach4').css('display', 'none');
    }

    var counter = parseInt(getSession('counter')) - 1;
    setSession("counter", counter);
}

function Validatecheckcandidate() {
    var count = 0;
    var emptycount = 0;

    if (Checkval == "AND") {
        if ($('#txtEmailid').val() == "") {
            $("#txtEmailid").addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtEmailid').removeClass("is-invalid");
            count++;
        }

        if ($('#txtContactno').val() == "") {
            $("#txtContactno").addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtContactno').removeClass("is-invalid");
            count++;
        }
    }
    else if (Checkval == "OR") {
        if ($('#txtEmailid').val() == "" && $('#txtContactno').val() == "") {
            $("#txtEmailid").addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtEmailid').removeClass("is-invalid");
            $('#txtContactno').removeClass("is-invalid");
            count++;
        }
    }
    else {
        if ($('#txtEmailid').val() == "") {
            $("#txtEmailid").addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtEmailid').removeClass("is-invalid");
            count++;
        }

        if ($('#txtContactno').val() == "") {
            $("#txtContactno").addClass("is-invalid");
            emptycount++;
        }
        else {
            $('#txtContactno').removeClass("is-invalid");
            count++;
        }
    }

    //if ($('#txtEmailid').val() == "") {
    //    $("#txtEmailid").addClass("is-invalid");

    //    if ($('#txtContactno').val() == "") {
    //        $('#txtContactno').addClass("is-invalid");
    //        emptycount++;
    //    }
    //    else {
    //        $('#txtContactno').removeClass("is-invalid");
    //        count++;
    //    }
    //    emptycount++;
    //}
    //else {
    //    $("#txtEmailid").removeClass("is-invalid");
    //    $('#txtContactno').removeClass("is-invalid");
    //    count++;

    //}
    //if ($('#txtContactno').val() == "") {
    //    $("#txtContactno").addClass("is-invalid");

    //    if ($('#txtEmailid').val() == "") {
    //        $('#txtEmailid').addClass("is-invalid");
    //        emptycount++;
    //    }
    //    else {
    //        $('#txtEmailid').removeClass("is-invalid");
    //        count++;
    //    }
    //    emptycount++;
    //}

    //else {
    //    $("#txtEmailid").removeClass("is-invalid");
    //    $('#txtContactno').removeClass("is-invalid");
    //    count++;
    //}

    //alert(emptycount);
    //alert(count);

    if (parseInt(emptycount) > 0) {
        return false;
    }

    else if (parseInt(count) > 0 && parseInt(emptycount) == 0) {
        return true;
    }
}

function openGenuinity() {
    if (existingcandidate == "false") {
        if (Validatecandidate("1") == true) {
            genuinity = "true";

            setSession("CName", $("#txtCandidatename").val());
            setSession("CMail", $("#txtEmailid").val());
            setSession("CPhone", $("#txtContactno").val());

            setSession("CJobid", $("#hdnJobid").val());
            setSession("CJobName", $("#lblJobtitle1").text());
            setSession("CJobDuration", $("#lblDuration1").text());
            setSession("CJobType", $("#lblType1").text());
            setSession("CJobWorkType", $("#lblWorkingtype1").text());
            setSession("CJobImg", $('#imgJob1').prop('src'));
            setSession("CURL", window.location.href);

            if ($("#hdnCandStatus").val() != "") {
                saveCandidate('Save', 'btnGenuinity');
            }
            else if ($("#hdnCandStatus").val() == "") {
                saveCandidate('Draft', 'btnGenuinity');
            }

            //setSession("CJobImg", $("#imgJob1").attr(src));
        }
    }
    else if (existingcandidate == "true") {
        if (ExistingStatus == "") {
            setSession("CName", $("#txtCandidatename").val());
            setSession("CMail", $("#txtEmailid").val());
            setSession("CPhone", $("#txtContactno").val());
            setSession("CJobid", $("#hdnJobid").val());
            setSession("CJobName", $("#lblJobtitle1").text());
            setSession("CJobDuration", $("#lblDuration1").text());
            setSession("CJobType", $("#lblType1").text());
            setSession("CJobWorkType", $("#lblWorkingtype1").text());
            setSession("CJobImg", $('#imgJob1').prop('src'));
            setSession("CURL", window.location.href);
            if ($("#hdnCandStatus").val() != "") {
                saveCandidate('Save', 'btnGenuinity');
            }
            else if ($("#hdnCandStatus").val() == "") {
                saveCandidate('Draft', 'btnGenuinity');
            }
        }
        else if (Validatecandidate("1") == true) {
            window.location.href = 'GenuinityCheck.aspx';
        }
    }
}

function closeGenuinitycheckpop() {
    $("#msgpopup").modal('hide');
    window.location.href = 'GenuinityCheck.aspx';
}

function gotoGenuinity() {
    var url = window.location.href;
    hashes = url.split("?")[1];
    if (hashes != null) {
        var hash = hashes.split('&');
        if (hash.length == 1) {
            var params1 = hash[0].split("=");
            window.location.href = 'GenuinityCheck.aspx?id=' + params1[1];
        }

        else if (hash.length > 1) {
            var params1 = hash[1].split("=");
            window.location.href = 'GenuinityCheck.aspx?id=' + params1[1];
        }
    }
}

function openEmployer() {
    var c = document.getElementById("drpType").value;
    if (document.getElementById("chkEmployer").checked == true) {
        document.getElementById("divEmployer").style.display = "block";
        $('#btUCheckcontactno').prop('disabled', false);
        disableemplcontrols();
    }
    else {
        document.getElementById("divEmployer").style.display = "none";
    }
}

function selectoptionvalidate() {
    if (document.getElementById("drpType").value == "10251" || document.getElementById("drpType").value == "10252" || document.getElementById("drpType").value == "-1") {
        document.getElementById("chkEmployer").disabled = true;
        document.getElementById("chkEmployer").checked = false;
        document.getElementById("divEmployer").style.display = "none";
        $('#txtCandidateremark').prop('disabled', false);
    }

    else {
        document.getElementById("chkEmployer").disabled = false;
        document.getElementById("chkEmployer").checked = false;
    }
}

function backfinction() {
    history.back();
}

function getVendorRTRContent() {
    $('#txtAcknowledge').val("I hereby confirm the rate of " + $('#txtRate').val() + "$ Daily on C2C for the candidate " + $('#txtCandidatename').val() + " for the role " + $('#lblJobtitle1').text());
    $('#txtAcknowledge').prop("disabled", false);
    $('#chkRTR1').prop("disabled", false);
}

//Assessment
function openAssessment() {
    if ($('input[name="chkGenuinity"]:checked').val() == "on") {
        $('#div-Genuinity').css('display', 'block');
        //tabList1('LinkedIn');
        enableemplcontrols();
        getAssessmentQuestionlist(getSession("RegionValue"));

        if ($('#txtActivelinkedinurl').val() == "") {
            $("#radlinkedIn1NoQNo1").attr("disabled", true);
            $("#radlinkedIn1NoQNo1").attr("checked", true);
            closelinkedInSubtype();
        }
        else {
            $("#radlinkedIn1YesQNo1").attr("disabled", true);
            $("#radlinkedIn1YesQNo1").attr("checked", true);
            openlinkedInSubtype(2);
        }

        getVisastatus();
    }
    else {
        $('#div-Genuinity').css('display', 'none');
    }
}

function setLinkedInstatus() {
    var genuinityVal = "";
    if (document.getElementById("div-Genuinity").style.display == 'block') {
        genuinityVal = "true";
    }
    else {
        genuinityVal = "false";
    }

    if ($('#txtActivelinkedinurl').val() == "" && genuinityVal == "true") {
        //$("#radlinkedIn1NoQNo1").attr("checked", true);
        //$("#radlinkedIn1NoQNo1").attr("disabled", true);
        document.getElementById("radlinkedIn1NoQNo1").checked = true;
        document.getElementById("radlinkedIn1NoQNo1").disabled = true;

        //$("#radlinkedIn1YesQNo1").attr("checked", false);
        //$("#radlinkedIn1YesQNo1").attr("disabled", true);

        document.getElementById("radlinkedIn1YesQNo1").checked = false;
        document.getElementById("radlinkedIn1YesQNo1").disabled = true;
        closelinkedInSubtype();
    }

    else {
        //$("#radlinkedIn1NoQNo1").attr("checked", false);
        //$("#radlinkedIn1NoQNo1").attr("disabled", true);

        document.getElementById("radlinkedIn1NoQNo1").checked = false;
        document.getElementById("radlinkedIn1NoQNo1").disabled = true;

        //$("#radlinkedIn1YesQNo1").attr("checked", true);
        //$("#radlinkedIn1YesQNo1").attr("disabled", true);

        document.getElementById("radlinkedIn1YesQNo1").checked = true;
        document.getElementById("radlinkedIn1YesQNo1").disabled = true;

        openlinkedInSubtype(2);
    }

    var linkedin = document.getElementById("txtActivelinkedinurl").value;
    document.getElementById("lbllinkedinUrl").innerHTML = linkedin;
}

function getVisastatus() {
    var genuinityVal = "";
    if (document.getElementById("div-Genuinity").style.display == 'block') {
        genuinityVal = "true";
    }
    else {
        genuinityVal = "false";
    }

    if ($('#drpVisastatus').val() != "-1" && genuinityVal == "true") {
        if ($('#drpVisastatus').val() == "12002") {
            $("#drpCitizen17").val("19002").prop("selected", true);
            $("#drpCitizen17").attr("disabled", true);
            $('#divVisa_18').css('display', 'none');
            $('#divAttach6').css('display', 'none');
        }
        else if ($('#drpVisastatus').val() == "12001") {
            $("#drpCitizen17").val("19003").prop("selected", true);
            $("#drpCitizen17").attr("disabled", true);
            $('#divVisa_18').css('display', 'none');
            $('#divAttach6').css('display', 'none');
        }
        else {
            $("#drpCitizen17").val("19004").prop("selected", true);
            $("#drpCitizen17").attr("disabled", true);
            openVisatype();

            if ($('#drpVisastatus').val() == "12000") {
                $("#drpVisa18").val("18001").prop("selected", true);
                $("#drpVisa18").attr("disabled", true);
            }

            else if ($('#drpVisastatus').val() == "12003") {
                $("#drpVisa18").val("18004").prop("selected", true);
                $("#drpVisa18").attr("disabled", true);
            }
            else if ($('#drpVisastatus').val() == "12004") {
                $("#drpVisa18").val("18003").prop("selected", true);
                $("#drpVisa18").attr("disabled", true);
            }
            openCertification1();
        }
    }
}

function getAssessmentQuestionlist(val) {
    var strdata = { "regionid": val };

    common_api_ajax_request("api/AssessmentQuestiondetails", "ASSQUESTIONLIST", strdata);
}

function createLinkedinDiv(data) {
    var str = "";
    var str1 = "";
    var str2 = "";
    var str3 = "";
    var p = 11;
    var j = 1;
    var k = 1;
    var newjvalue = 1;
    var rowval = 0;

    $.each(data, function (key, item) {
        if (j <= 9) {
            $("#hdnheadingid1").val(item.QuestionHeadingid);
            if (j >= 2 && j <= 7) {
                str += "<div class='col-12' style='display:none;' id='divlinkedIn_" + j + "'>" +
                    "<div class='row'>" +

                    "</div>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    "<span class='form-label ms-0' id='lbllinkedIn1questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn1question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn1QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn1answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn1mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-3'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn1QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn1ANo" + j + "' id='radlinkedIn1YesQNo" + j + "' onclick=validateQNo('linkedIn1','" + j + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10001' name='radlinkedIn1ANo" + j + "' id='radlinkedIn1NoQNo" + j + "' onclick=validateQNo('linkedIn1','" + j + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>No</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' style='margin:0px' id='IconlinkedIn1QNo" + j + "' onclick=IconvalidateQNo('linkedIn1','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1 ps-0' style= 'display:none;' id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen' onclick=iconLinkedin('linkedIn1','" + j + "')>" + "</i > " +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn1Q" + j + "' style='display:none;'>" +
                    //"<div class='form-control col-md-12 text-right' style='background-color:#e9ecef;padding: 0px;'>" +
                    //"<i style='display:none;'class='fa fa-pen top-0'></i>" +
                    //"<textarea class='form-control' style='border: none;' id='txtlinkedIn1commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn1" + j + "','div_linkedIn1" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn1" + j + "'>" +
                    "<span style='color:#d9d9d9;display:block'><span id='lbllinkedIn1" + j + "' style='color:#9e9d9d'>  </span></span>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else {
                //newjvalue = 1;
                var net = "";
                if (document.getElementById("lbllinkedinUrl") != "") {
                    net = "</br><span class='form-label' id='lbllinkedinUrl'></span>";
                }
                else {
                    net = "";
                }

                if (assMode == "") {
                    str += "<div class='col-12' id='divlinkedIn_" + j + "'>" +
                        "<div class='row'>" +

                        "</div>" +
                        "<div class='row'>" +
                        "<div class='col-8'>" +
                        "<span class='form-label ms-0' id='lbllinkedIn1questionNo" + j + "'>" + newjvalue + "." + " </span>" +
                        "<span class='form-label' id='lbllinkedIn1question" + j + "'>" +
                        item.Question +
                        "</span>" +

                        net +
                        "<span class='form-label' style='display:none;' id='lbllinkedIn1QuestionId" + j + "'>" +
                        item.Questionid + "</span>" +
                        "<span class='form-label' style='display:none;' id='lbllinkedIn1answer" + j + "'>" +
                        item.Answer +
                        "</span>" +
                        "<span class='form-label' style='display:none;' id='lbllinkedIn1mark" + j + "'>" +
                        item.Mark1 +
                        "</span>" +
                        "</div>" +
                        "<div class='col-3'>" +
                        "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn1QNo" + j + "'>" +
                        "<div class='col-6'>" +
                        "<div class='form-check mb-0 mt-1'>" +
                        "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn1ANo" + j + "' id='radlinkedIn1YesQNo" + j + "' onclick=validateQNo('linkedIn1','" + j + "')>" +
                        "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-6'>" +
                        "<div class='form-check mb-0 mt-1'>" +
                        "<input class='form-check-input' type='radio' value='10001' name='radlinkedIn1ANo" + j + "' id='radlinkedIn1NoQNo" + j + "' onclick=validateQNo('linkedIn1','" + j + "')>" +
                        "<label class='custom-control-label' for='customRadio1'>No</label>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-2 mt-1' style='display:none;'>" +

                        "<i class='fas fa-comment' title='Write comments' style='margin:0px' id='IconlinkedIn1QNo" + j + "' onclick=IconvalidateQNo('linkedIn1','" + j + "')></i>" +

                        "</div>" +
                        "<div class='col-2 mt-1 ps-0' style= 'display:none;' id='iconlinkedIn" + j + "'>" +

                        "<i class='fa fa-pen' onclick=iconLinkedin('linkedIn1','" + j + "')>" + "</i > " +

                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        //"<div class='row'>" +
                        //"<div class='col-12'>" +
                        //"<div class='form-group' id='txtlinkedIn1Q" + j + "' style='display:none;'>" +
                        //"<div class='form-control col-md-12 text-right' style='background-color:#e9ecef;padding: 0px;'>" +
                        //"<i style='display:none;'class='fa fa-pen top-0'></i>" +
                        //"<textarea class='form-control' style='border: none;' id='txtlinkedIn1commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn1" + j + "','div_linkedIn1" + j + "')  rows='3' disabled></textarea>" +
                        //"</div>" +
                        //"</div>" +
                        //"</div>" +
                        //"</div>" +
                        "<div class='row'>" +
                        "<div class='col-12' style='display:block' id='div_linkedIn1" + j + "'>" +
                        "<label style='color:#d9d9d9;display:block'><span id='lbllinkedIn1" + j + "' style='color:#9e9d9d'>  </span></label>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    newjvalue++;
                }
                else {
                    str += "<div class='col-12' id='divlinkedIn_" + j + "'>" +
                        "<div class='row'>" +

                        "</div>" +
                        "<div class='row'>" +
                        "<div class='col-8'>" +
                        "<span class='form-label ms-0' id='lbllinkedIn1questionNo" + j + "'>" + j + "." + " </span>" +
                        "<span class='form-label' id='lbllinkedIn1question" + j + "'>" +
                        item.Question +
                        "</span>" +
                        "<span class='form-label' style='display:none;' id='lbllinkedIn1QuestionId" + j + "'>" +
                        item.Questionid + "</span>" +
                        "<span class='form-label' style='display:none;' id='lbllinkedIn1answer" + j + "'>" +
                        item.Answer +
                        "</span>" +
                        "<span class='form-label' style='display:none;' id='lbllinkedIn1mark" + j + "'>" +
                        item.Mark1 +
                        "</span>" +
                        "</div>" +
                        "<div class='col-3'>" +
                        "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn1QNo" + j + "'>" +
                        "<div class='col-6'>" +
                        "<div class='form-check mb-0 mt-1'>" +
                        "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn1ANo" + j + "' id='radlinkedIn1YesQNo" + j + "' onclick=validateQNo('linkedIn1','" + j + "')>" +
                        "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-6'>" +
                        "<div class='form-check mb-0 mt-1'>" +
                        "<input class='form-check-input' type='radio' value='10001' name='radlinkedIn1ANo" + j + "' id='radlinkedIn1NoQNo" + j + "' onclick=validateQNo('linkedIn1','" + j + "')>" +
                        "<label class='custom-control-label' for='customRadio1'>No</label>" +
                        "</div>" +
                        "</div>" +
                        "<div class='col-2 mt-1' style='display:none;'>" +

                        "<i class='fas fa-comment' title='Write comments' style='margin:0px' id='IconlinkedIn1QNo" + j + "' onclick=IconvalidateQNo('linkedIn1','" + j + "')></i>" +

                        "</div>" +
                        "<div class='col-2 mt-1 ps-0' style= 'display:none;' id='iconlinkedIn" + j + "'>" +

                        "<i class='fa fa-pen' onclick=iconLinkedin('linkedIn1','" + j + "')>" + "</i > " +

                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        //"<div class='row'>" +
                        //"<div class='col-12'>" +
                        //"<div class='form-group' id='txtlinkedIn1Q" + j + "' style='display:none;'>" +
                        //"<div class='form-control col-md-12 text-right' style='background-color:#e9ecef;padding: 0px;'>" +
                        //"<i style='display:none;'class='fa fa-pen top-0'></i>" +
                        //"<textarea class='form-control' style='border: none;' id='txtlinkedIn1commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn1" + j + "','div_linkedIn1" + j + "')  rows='3' disabled></textarea>" +
                        //"</div>" +
                        //"</div>" +
                        //"</div>" +
                        //"</div>" +
                        "<div class='row'>" +
                        "<div class='col-12' style='display:block' id='div_linkedIn1" + j + "'>" +
                        "<label style='color:#d9d9d9;display:block'><span id='lbllinkedIn1" + j + "' style='color:#9e9d9d'>  </span></label>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    newjvalue++;
                }
            }
            j++;
        }
        else if (j >= 10 && j <= 15) {
            $("#hdnheadingid2").val(item.QuestionHeadingid);
            if (newjvalue == "4" && rowval == 0) {
                rowval = parseInt(newjvalue);
            }

            if (rowval == 5) {
                str1 += "<div class='col-12' id='divAssessment_" + j + "'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn2questionNo" + j + "'>" + rowval + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn2question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2mark" + j + "'>0</span>" +
                    "</div>" +
                    //"<div class='col-4'>" +
                    "<div class='col-4'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorassessment1QNo2'>" +
                    "<div class='col-12 pl-0 border-1' id='mgrRatingDiv'>" +
                    "<span id='massrat_1' class='fa fa-star pe-1' onclick='assrateUser(this);' aria-hidden='true' style='font-size: 18px;'></span>" +
                    "<span id='massrat_2' class='fa fa-star pe-1' onclick='assrateUser(this);' aria-hidden='true' style='font-size: 18px;'></span>" +
                    "<span id='massrat_3' class='fa fa-star pe-1' onclick='assrateUser(this);' aria-hidden='true' style='font-size: 18px;'></span>" +
                    "<span id='massrat_4' class='fa fa-star pe-1' onclick='assrateUser(this);' aria-hidden='true' style='font-size: 18px;'></span>" +
                    "<span id='massrat_5' class='fa fa-star pe-1' onclick='assrateUser(this);' aria-hidden='true' style='font-size: 18px;'></span>" +
                    "<span id='assstarRating'>0</span><br/>" +
                    "&nbsp;<label class='mb-0' style='color: red; display: none; margin-left: 5px;' id='vali_star'>Please Rate the Candidate</label>" +
                    "</div>" +
                    "<div class='col-2 mt-1 ps-0' style='display: none;' id='iconlinkedIn2'>" +
                    "<i class='fa fa-pen' onclick='iconLinkedin('assessment1','2')' aria-hidden='true'></i>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn2QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn2','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn2','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn2" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn2" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else if (rowval == 8) {
                str1 += "<div class='col-12' id='divAssessment_" + j + "'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn2questionNo" + j + "'>" + rowval + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn2question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-3'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn2QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn2ANo" + j + "' id='radlinkedIn2YesQNo" + j + "' onclick=openCertification()>" +
                    "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10001' name='radlinkedIn2ANo" + j + "' id='radlinkedIn2NoQNo" + j + "' onclick=closeCertification()>" +
                    "<label class='custom-control-label' for='customRadio1'>No</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn2QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn2','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn2','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn2" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn2" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row p-3 ms-3 mb-2' style='background-color: #e9ecef;opacity: 1;width: 550px;border-radius: 12px;display:none;' id='divAttach5'>" +
                    "<div class='col-md-12' style='height: 70px;' id='div_Filename5'>" +
                    "<div class='row'>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Document Type</label>" +
                    "<input type='hidden' id='proofId5'>" +
                    "<select class='form-control form-controlnew' id='drpDocumenttype5'>" +
                    "<option selected=''>Certification</option>" +
                    "</select>" +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Certification No.</label>" +
                    "<input class='form-control form-controlnew' type='text' placeholder='Certification No.' id='txtIdno5'>" +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Add Certifi</label>" +
                    "<select class='form-control form-controlnew' name='choices-sizes' id='drpcertification'>" +
                    "</select> " +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<div class='row'>" +
                    "<div class='col-md-8'>" +
                    "<div class='row'>" +
                    "<div class='col-md-10' id='div_Fileuploadname5' style='display: none;'>" +
                    "<span id='lblFilename5'></span>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<form action='' id='dropBasic5' style='min-height: 117px !important;'>" +
                    "<button id='btnAttach5' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: #21dcfc;' onclick=uploadFile('5');>" +
                    "<span class='btn-inner--icon'><i class='fa fa-paperclip' aria-hidden='true' style='font-size: 20px;'></i></span>" +
                    "</button>" +
                    "<input name='file' id='fileupload5' type='file' style='display: none;' onchange='certificationupload();'>" +
                    "</form>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<button id='btUpload5' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: #21dcfc; display: none;' onclick='certificationfileupload();'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-upload' style='font-size: 20px;' aria-hidden='true'></i></span>" +
                    "</button>" +
                    "<button id='btremove5' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: red; display: none;'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-times-circle' style='font-size: 20px;' title='Delete Uploaded File' aria-hidden='true'></i><span class='sr-only'>Delete Uploaded File</span></span>" +
                    "</button>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<button id='btdelete5' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: red; display: none;'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-trash-alt' style='font-size: 20px;' aria-hidden='true'></i></span>" +
                    "</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }

            else {
                str1 += "<div class='col-12' id='divAssessment_" + j + "'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn2questionNo" + j + "'>" + rowval + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn2question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn2mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-3'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn2QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn2ANo" + j + "' id='radlinkedIn2YesQNo" + j + "' onclick=validateQNo('linkedIn2','" + j + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10001' name='radlinkedIn2ANo" + j + "' id='radlinkedIn2NoQNo" + j + "' onclick=validateQNo('linkedIn2','" + j + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>No</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn2QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn2','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn2','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn2" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn2" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            j++;
            rowval++;
        }
        else if (j >= 16 && j <= 19) {
            $("#hdnheadingid3").val(item.QuestionHeadingid);
            //if (newjvalue == "4" && rowval == 0) {
            //    rowval = parseInt(newjvalue);
            //}

            if (j == 16) {
                str2 += "<div class='col-12' id='divVisa_" + j + "'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn3questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn3question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-3'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn3QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn3ANo" + j + "' id='radlinkedIn3YesQNo" + j + "' onclick=openCertification2()>" +
                    "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10001' name='radlinkedIn3ANo" + j + "' id='radlinkedIn3NoQNo" + j + "' onclick=closeCertification2()>" +
                    "<label class='custom-control-label' for='customRadio1'>No</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn3QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn3','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn3','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn3" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn3" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row p-3 ms-3 mb-3 me-3' style='background-color: #e9ecef;opacity: 1;border-radius: 12px;display:none;' id='divAttach7'>" +
                    "<div class='col-md-12' style='height: 70px;' id='div_Filename7'>" +
                    "<div class='row'>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Document Type</label>" +
                    "<input type='hidden' id='proofId7'>" +
                    "<select class='form-control' name='choices-emptype' id='drpGovt" + j + "' style='background-color:white !important'>" +
                    "<option value='-1'>--Select Document type--</option>" +
                    "<option value='20001'>Driving License</option>" +
                    "<option value='20002'>State ID</option>" +
                    "<option value='20003'>Passport</option>" +
                    "<option value='20004'>Green card</option>" +
                    "<option value='20005'>PR</option>" +
                    "</select> " +
                    "</div>" +
                    "<div class='col-md-2'>" +
                    "<label class='form-label'>ID No.</label>" +
                    "<input class='form-control' type='text' placeholder='ID No.' id='txtIdno8'>" +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Expiration Date</label>" +
                    "<input class='form-control' type='text' placeholder='Expiration date (dd-MM-yyyy)' id='txtIdno9'>" +
                    "</div>" +
                    "<div class='col-md-4'>" +
                    "<div class='row' style='margin-top: 23px;'>" +
                    "<div class='col-md-12'>" +
                    "<div class='row'>" +
                    "<div class='col-md-10' id='div_Fileuploadname7' style='display: none;'>" +
                    "<span id='lblFilename7'></span>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<form action='' id='dropBasic7' style='min-height: 117px !important;'>" +
                    "<button id='btnAttach7' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: #21dcfc;' onclick=uploadFile('7');>" +
                    "<span class='btn-inner--icon'><i class='fa fa-paperclip' aria-hidden='true' style='font-size: 20px;'></i></span>" +
                    "</button>" +
                    "<input name='file' id='fileupload7' type='file' style='display: none;' onchange='Govtidupload();'>" +
                    "</form>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<button id='btUpload7' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: #21dcfc; display: none;' onclick='Govtidfileupload();'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-upload' style='font-size: 20px;' aria-hidden='true'></i></span>" +
                    "</button>" +
                    "<button id='btremove7' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: red; display: none;'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-times-circle' style='font-size: 20px;' title='Delete Uploaded File' aria-hidden='true'></i><span class='sr-only'>Delete Uploaded File</span></span>" +
                    "</button>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<button id='btdelete7' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: red; display: none;'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-trash-alt' style='font-size: 20px;' aria-hidden='true'></i></span>" +
                    "</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else if (j == 17) {
                str2 += "<div class='col-12' id='divVisa_" + j + "'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn3questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn3question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-4'>" +
                    "<div class='row' style='border-radius: 10px;margin: 0px 39px 7px 0px;' id='div_errorlinkedIn3QNo" + j + "'>" +
                    "<select class='form-control' name='choices-emptype' id='drpCitizen" + j + "' onclick='openVisatype();'>" +
                    "</select>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn3QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn3','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn3','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn3" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn3" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else if (j == 18) {
                str2 += "<div class='col-12' id='divVisa_" + j + "' style='display:none;'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn3questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn3question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-4'>" +
                    "<div class='row' style='border-radius: 10px;margin: 0px 39px 7px 0px;' id='div_errorlinkedIn3QNo" + j + "'>" +
                    "<select class='form-control' name='choices-emptype' id='drpVisa" + j + "' onchange=openCertification1();>" +
                    "<option value='-1'>--Select Visa Type--</option>" +
                    "<option value='18001'>H1B</option>" +
                    "<option value='18002'>EAD</option>" +
                    "<option value='18003'>H4EAD</option>" +
                    "<option value='18004'>OPT</option>" +
                    "<option value='18005'>CPT</option>" +
                    "</select> " +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn3QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn3','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn3','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn3" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn3" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='row p-3 ms-3 mb-3' style='background-color: #e9ecef;opacity: 1;width: 560px;border-radius: 12px;display:none;' id='divAttach6'>" +
                    "<div class='col-md-12' style='height: 70px;' id='div_Filename6'>" +
                    "<div class='row'>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Visa Valid From</label>" +
                    "<input type='hidden' id='proofId6'>" +
                    "<input class='form-control datepicker' type='text' placeholder='Visa Valid Date (dd-MM-yyyy)' id='txtIdno6'>" +
                    "</div>" +
                    "<div class='col-md-3'>" +
                    "<label class='form-label'>Visa Valid Till</label>" +
                    "<input class='form-control datepicker' type='text' placeholder='Visa Expiration date (dd-MM-yyyy)' id='txtIdno7'>" +
                    "</div>" +
                    "<div class='col-md-6'>" +
                    "<div class='row' style='margin-top: 24px;'>" +
                    "<div class='col-md-8'>" +
                    "<div class='row'>" +
                    "<div class='col-md-10' id='div_Fileuploadname6' style='display: none;'>" +
                    "<span id='lblFilename6'></span>" +
                    "</div>" +
                    "<div class='col-md-2 mt-2'>" +
                    "<form action='' id='dropBasic6' style='min-height: 117px !important;'>" +
                    "<button id='btnAttach6' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: #21dcfc;' onclick=uploadFile('6');>" +
                    "<span class='btn-inner--icon'><i class='fa fa-paperclip' aria-hidden='true' style='font-size: 20px;'></i></span>" +
                    "</button>" +
                    "<input name='file' id='fileupload6' type='file' style='display: none;' onchange='visaupload();'>" +
                    "</form>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-md-2'>" +
                    "<button id='btUpload6' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: #21dcfc; display: none;' onclick='visafileupload();'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-upload' style='font-size: 20px;' aria-hidden='true'></i></span>" +
                    "</button>" +
                    "<button id='btremove6' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: red; display: none;'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-times-circle' style='font-size: 20px;' title='Delete Uploaded File' aria-hidden='true'></i><span class='sr-only'>Delete Uploaded File</span></span>" +
                    "</button>" +
                    "</div>" +
                    "<div class='col-md-2'>" +
                    "<button id='btdelete6' class='btn bg-gradient-primary mb-0 ps-0 pt-0' type='button' style='background: none !important; box-shadow: none !important; color: red; display: none;'>" +
                    "<span class='btn-inner--icon'><i class='fas fa-trash-alt' style='font-size: 20px;' aria-hidden='true'></i></span>" +
                    "</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else if (j == 19) {
                str2 += "<div class='col-12' id='divVisa_" + j + "'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn3questionNo" + j + "'>" + (j - 1) + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn3question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn3mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-4'>" +
                    "<div class='row' style='border-radius: 10px;margin: 0px 39px 7px 0px;' id='div_errorlinkedIn3QNo" + j + "'>" +
                    "<select class='form-control' name='choices-emptype' id='drpYears" + j + "' onclick='setYearsLivedMarks();'>" +
                    "<option value='-1'>--Select Years Lived--</option>" +
                    "<option value='18001'>Less than 1 year</option>" +
                    "<option value='18002'>1 year to 3 years</option>" +
                    "<option value='18003'>3 year to 5 years</option>" +
                    "<option value='18004'>Above 5 years</option>" +
                    "</select> " +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn3QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn3','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn3','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn3" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn3" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            j++;
        }

        else if (j >= 20 && j <= 22) {
            $("#hdnheadingid4").val(item.QuestionHeadingid);
            if (j == 20) {
                str3 += "<div class='col-12' id='divEducation_" + j + "' onclick='openCollegedetails();' style='display:none;'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn4questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn4question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-3'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn4QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn4ANo" + j + "' id='radlinkedIn4YesQNo" + j + "' onclick=validateQNo('linkedIn4','" + "3" + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10001' checked='checked' name='radlinkedIn4ANo" + j + "' id='radlinkedIn4NoQNo" + j + "' onclick=validateQNo('linkedIn4','" + "3" + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>No</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +
                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn4QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn4','" + "3" + "')></i>" +
                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +
                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn4','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn4" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn4" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else if (j == 21) {
                str3 += "<div class='col-12' id='divEducation_" + j + "' style='display:none;'>" +
                    "<div class='row'>" +
                    "<div class='col-7'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn4questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn4question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-5 pe-4'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn4QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<input class='form-control' placeholder='College Name' type='text' id='txtlinkedIn4college" + j + "' onclick=validateQNo('linkedIn4','" + j + "')>" +

                    "</div>" +
                    "<div class='col-6'>" +
                    "<input class='form-control' placeholder='Duration' type='text' id='txtlinkedIn4duration" + j + "' onclick=validateQNo('linkedIn4','" + j + "')>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +

                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn4QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn4','" + j + "')></i>" +

                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +

                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn4','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn4" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn4" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            else if (j == 22) {
                str3 += "<div class='col-12' id='divEducation_" + j + "' style='display:none;'>" +
                    "<div class='row'>" +
                    "<div class='col-8'>" +
                    //"<label>" + k + "</label>" +
                    "<span class='form-label ms-0' id='lbllinkedIn4questionNo" + j + "'>" + j + "." + " </span>" +
                    "<span class='form-label' id='lbllinkedIn4question" + j + "'>" +
                    item.Question +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4QuestionId" + j + "'>" +
                    item.Questionid + "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4answer" + j + "'>" +
                    item.Answer +
                    "</span>" +
                    "<span class='form-label' style='display:none;' id='lbllinkedIn4mark" + j + "'>" +
                    item.Mark1 +
                    "</span>" +
                    "</div>" +
                    "<div class='col-3'>" +
                    "<div class='row' style='border-radius: 10px;' id='div_errorlinkedIn4QNo" + j + "'>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10000' name='radlinkedIn4ANo" + j + "' id='radlinkedIn4YesQNo" + j + "' onclick=validateQNo('linkedIn4','" + j + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>Yes</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-6'>" +
                    "<div class='form-check mb-0 mt-1'>" +
                    "<input class='form-check-input' type='radio' value='10001' checked='checked' name='radlinkedIn4ANo" + j + "' id='radlinkedIn4NoQNo" + j + "' onclick=validateQNo('linkedIn4','" + j + "')>" +
                    "<label class='custom-control-label' for='customRadio1'>No</label>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-2 mt-1' style='display:none;'>" +
                    "<i class='fas fa-comment' title='Write comments' id='IconlinkedIn4QNo" + j + "' value='1' onclick=IconvalidateQNo('linkedIn4','" + j + "')></i>" +
                    "</div>" +
                    "<div class='col-2 mt-1'  id='iconlinkedIn" + j + "'>" +
                    "<i class='fa fa-pen top-0' style='display:none;' onclick=iconLinkedin('linkedIn4','" + j + "')>" + "</i > " +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    //"<div class='row'>" +
                    //"<div class='col-12'>" +
                    //"<div class='form-group' id='txtlinkedIn2Q" + j + "' style='display:none;' >" +
                    //"<textarea class='form-control' id='txtlinkedIn2commentsQ" + j + "'  onkeyup=txtvalidation(this,'lbllinkedIn2" + j + "','div_linkedIn2" + j + "')  rows='3' disabled></textarea>" +
                    //"</div>" +
                    //"</div>" +
                    //"</div>" +
                    "<div class='row'>" +
                    "<div class='col-12' style='display:block' id='div_linkedIn4" + j + "'>" +
                    "<label style='color:#d9d9d9;display:block'> <span id='lbllinkedIn4" + j + "' style='color:#9e9d9d'> </span></label>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }
            j++;
        }
    });

    $("#div_linkedin1_question").empty();
    $("#div_linkedin1_question").append(str);
    //$("#div_linkedin1_question").append(strfooter);

    $("#div_assessment1_question1").empty();
    $("#div_assessment1_question1").append(str1);

    $("#div_visa1_question1").empty();
    $("#div_visa1_question1").append(str2);

    $("#div_education1_question1").empty();
    $("#div_education1_question1").append(str3);

    //if (true) {
    $("#radlinkedIn1YesQNo1").attr("onclick", "openlinkedInSubtype(" + (document.getElementById('lbllinkedIn1mark1').innerHTML) + ")");
    $("#radlinkedIn1NoQNo1").attr("onclick", "closelinkedInSubtype()");

    $("#radlinkedIn1YesQNo8").attr("disabled", true);
    $("#radlinkedIn1NoQNo8").attr("disabled", true);
    $("#radlinkedIn1YesQNo9").attr("disabled", true);
    $("#radlinkedIn1NoQNo9").attr("disabled", true);
    //}

    //$("#div_linkedin2_question").append(str1);

    document.getElementById("drpCitizen17").options.length = 0;
    var option2 = new Option("--Select Citizenship--", "-1");
    $(option2).html("--Select Citizenship--");
    $("#drpCitizen17").append(option2);

    for (var i = 0; i < Citizenship.length; i++) {
        var option = new Option(Citizenship[i].Name, Citizenship[i].ID);

        $(option).html(Citizenship[i].Name);
        $("#drpCitizen17").append(option);
    }

    var option4 = new Option("--Select Cert--", "-1");
    $(option4).html("--Select Cert--");
    $("#drpcertification").append(option4);

    for (var i = 0; i < Certifi.length; i++) {
        var option = new Option(Certifi[i].Name, Certifi[i].ID);

        $(option).html(Certifi[i].Name);
        $("#drpcertification").append(option);
    }
}

function openlinkedInSubtype(markval) {
    for (var x = 2; x < 8; x++) {
        if (x >= 4 && x <= 7) {
        }
        else {
            document.getElementById("divlinkedIn_" + x).style.display = "block";
        }
    }

    var newcount = 4;
    for (var y = 8; y < 10; y++) {
        document.getElementById("lbllinkedIn1questionNo" + y).innerHTML = newcount + ". ";
        newcount++;
    }
    document.getElementById("lbllinkedIn1ovrallrating").innerHTML = parseFloat(markval);

    var per = Math.round((parseInt(markval) / parseInt(12)) * 100);
    document.getElementById("lbllinkedIn1percentage").innerHTML = parseInt(per);

    $("#radlinkedIn1YesQNo8").attr("disabled", false);
    $("#radlinkedIn1NoQNo8").attr("disabled", false);
    $("#radlinkedIn1YesQNo9").attr("disabled", false);
    $("#radlinkedIn1NoQNo9").attr("disabled", false);

    for (var z = 10; z < 16; z++) {
        document.getElementById("lbllinkedIn2questionNo" + z).innerHTML = z + ". ";
    }
}

function closelinkedInSubtype() {
    for (var x = 2; x < 8; x++) {
        document.getElementById("divlinkedIn_" + x).style.display = "none";
    }
    var newvalue = 2;

    for (var y = 8; y < 10; y++) {
        document.getElementById("lbllinkedIn1questionNo" + y).innerHTML = newvalue + ". ";
        newvalue++;
    }

    document.getElementById("lbllinkedIn1ovrallrating").innerHTML = parseInt(0);
    document.getElementById("lbllinkedIn1percentage").innerHTML = parseInt(0);

    $("#radlinkedIn1YesQNo8").attr("disabled", false);
    $("#radlinkedIn1NoQNo8").attr("disabled", false);
    $("#radlinkedIn1YesQNo9").attr("disabled", false);
    $("#radlinkedIn1NoQNo9").attr("disabled", false);
}

function validateQNo(tabname, j) {
    var radbtnYes = "rad" + tabname + "YesQNo";
    var radbtnNo = "rad" + tabname + "NoQNo";
    //var txtarea = "txt" + tabname + "commentsQ";
    //var diverror = "div_error" + tabname + "QNo";

    if (document.getElementById(radbtnYes + j).checked == true || document.getElementById(radbtnNo + j).checked == true) {
        //document.getElementById(txtarea + j).disabled = false;
        //document.getElementById(diverror + j).style.border = "";
        CalculateOvrallRatinglinkedin(tabname);

        if (j == 3) {
            if (document.getElementById(radbtnYes + j).checked == true) {
                disableLinkedprofile();
            }

            else if (document.getElementById(radbtnNo + j).checked == true) {
                enableLinkedprofile();
            }
        }
    }
}

function CalculateOvrallRatinglinkedin(tabname) {
    var markarr = new Array;

    var radbtnYes = "rad" + tabname + "YesQNo";
    var radbtnNo = "rad" + tabname + "NoQNo";
    var ans = "lbl" + tabname + "answer";
    var mark = "lbl" + tabname + "mark";
    var overalllinkedin = "lbl" + tabname + "ovrallrating";
    var counter = 0;
    //var overallvisa = "lbl" + tabname + "ovrallrating";

    var j;
    if (tabname == "linkedIn1") {
        j = 1;
        counter = 10;
    }
    else if (tabname == "linkedIn2") {
        j = 10;
        counter = 7;
    }
    else if (tabname == "linkedIn3") {
        j = 16;
        counter = 3;
    }
    //else if (tabname == "linkedIn4") {
    //    j = 20;
    //    counter = 3;
    //}

    for (var k = 1; k < counter; k++) {
        if (tabname == "linkedIn1") {
            if (j != 10) {
                var Ans = document.getElementById(ans + j).innerHTML;
            }
        }
        else {
            var Ans = document.getElementById(ans + j).innerHTML;
        }
        if (tabname == "linkedIn1") {
            if (document.getElementById(radbtnYes + j).checked == true) {
                if (Ans == "Yes") {
                    markarr.push(document.getElementById(mark + j).innerHTML);
                }
            }
            else if (document.getElementById(radbtnNo + j).checked == true) {
                if (Ans == "No") {
                    markarr.push(document.getElementById(mark + j).innerHTML);
                }
            }
        }

        if (j != 11 && j != 13 && tabname == "linkedIn2") {
            if (document.getElementById(radbtnYes + j).checked == true) {
                if (Ans == "Yes") {
                    markarr.push(document.getElementById(mark + j).innerHTML);
                }
            }
            else if (document.getElementById(radbtnNo + j).checked == true) {
                if (Ans == "No") {
                    markarr.push(document.getElementById(mark + j).innerHTML);
                }
            }
        }
        if (tabname == "linkedIn3") {
            if (j == 16) {
                if (document.getElementById(radbtnYes + j).checked == true) {
                    if (Ans == "Yes") {
                        markarr.push(document.getElementById(mark + j).innerHTML);
                    }
                }
                else if (document.getElementById(radbtnNo + j).checked == true) {
                    if (Ans == "No") {
                        markarr.push(document.getElementById(mark + j).innerHTML);
                    }
                }
                j = j + 2;
            }
            else if (j == 19) {
                if ($('select#drpYears19 option:selected').val() != "-1") {
                    markarr.push(document.getElementById(mark + j).innerHTML);
                }
            }
        }
        //if (tabname == "linkedIn4") {
        //    if (j == 20 || j == 22) {
        //        if (document.getElementById(radbtnYes + j).checked == true) {
        //            if (Ans == "Yes") {
        //                markarr.push(document.getElementById(mark + j).innerHTML);

        //            }

        //        }
        //        else if (document.getElementById(radbtnNo + j).checked == true) {
        //            if (Ans == "No") {
        //                markarr.push(document.getElementById(mark + j).innerHTML);

        //            }

        //        }
        //    }
        //    j++;
        //}

        j++;
    }

    var totMar = "0";
    for (var i = 0; i < markarr.length; i++) {
        totMar = parseFloat(totMar) + parseFloat(markarr[i]);
    }
    if (overalllinkedin == "lbllinkedIn1ovrallrating") {
        document.getElementById("lbllinkedIn1ovrallrating").innerHTML = (totMar);
        document.getElementById("lbllinkedIn1percentage").innerHTML = Math.round((totMar / parseInt(document.getElementById("lbllinkedIn1overallvalue").innerHTML)) * 100);
    }
    else if (overalllinkedin == "lbllinkedIn2ovrallrating") {
        if (document.getElementById("assstarRating").innerHTML != "0") {
            document.getElementById("lbllinkedIn2ovrallrating").innerHTML = totMar + parseFloat(document.getElementById("lbllinkedIn2mark11").innerHTML);
            document.getElementById("lbllinkedIn2percentage").innerHTML = (parseFloat(document.getElementById("lbllinkedIn2ovrallrating").innerHTML) / parseFloat(document.getElementById("lbllinkedIn2overallvalue").innerHTML)) * 100;
        }
        else {
            document.getElementById("lbllinkedIn2ovrallrating").innerHTML = totMar;
            document.getElementById("lbllinkedIn2percentage").innerHTML = (parseFloat(totMar) / parseFloat(document.getElementById("lbllinkedIn2overallvalue").innerHTML)) * 100;
        }
    }
    else if (overalllinkedin == "lbllinkedIn3ovrallrating") {
        document.getElementById("lbllinkedIn3ovrallrating").innerHTML = (totMar);
        document.getElementById("lbllinkedIn3percentage").innerHTML = Math.round((totMar / parseInt(document.getElementById("lbllinkedIn3overallvalue").innerHTML)) * 100);
    }

    //else if (overalllinkedin == "lbllinkedIn4ovrallrating") {
    //    document.getElementById("lbllinkedIn4ovrallrating").innerHTML = (totMar);
    //    document.getElementById("lbllinkedIn4percentage").innerHTML = Math.round((totMar / parseInt(document.getElementById("lbllinkedIn4overallvalue").innerHTML)) * 100);
    //}
    var quesarr = new Array;
    var chkcounter = 0;

    for (var i = 1; i < 23; i++) {
        var tabname = "";
        if (i >= 1 && i <= 9) {
            tabname = "linkedIn1";
        }

        else if (i >= 10 && i <= 15) {
            tabname = "linkedIn2";
        }
        else if (i >= 16 && i <= 19) {
            tabname = "linkedIn3";
        }
        //else if (i >= 20 && i <= 22) {
        //    tabname = "linkedIn4";

        //}
        var radbtnYes = "rad" + tabname + "YesQNo";
        var radbtnNo = "rad" + tabname + "NoQNo";

        if ((i >= 1 && i <= 9) && tabname == "linkedIn1") {
            if (document.getElementById(radbtnYes + i).checked == true || document.getElementById(radbtnNo + i).checked == true) {
                quesarr.push(i);
                chkcounter++;
            }
        }
        else if ((i >= 10 && i <= 15) && tabname == "linkedIn2") {
            if (i != 11) {
                if (document.getElementById(radbtnYes + i).checked == true || document.getElementById(radbtnNo + i).checked == true) {
                    quesarr.push(i);
                    chkcounter++;
                }
            }
        }
        else if ((i == 16) && tabname == "linkedIn3") {
            if (document.getElementById(radbtnYes + i).checked == true || document.getElementById(radbtnNo + i).checked == true) {
                quesarr.push(i);
                chkcounter++;
            }
        }
        //else if ((i == 20 || i == 22) && tabname == "linkedIn4") {
        //    if (document.getElementById(radbtnYes + i).checked == true || document.getElementById(radbtnNo + i).checked == true) {
        //        quesarr.push(i);
        //        chkcounter++;
        //    }
        //}
    }

    if ((chkcounter >= 8) && $("#assstarRating").text() != "0") {
        //$("#value").text(Math.round((parseFloat(document.getElementById("lbllinkedIn1percentage").innerHTML) +
        //    parseFloat(document.getElementById("lbllinkedIn2percentage").innerHTML) +
        //    parseFloat(document.getElementById("lbllinkedIn3percentage").innerHTML)
        //    + parseFloat(document.getElementById("lbllinkedIn4percentage").innerHTML)
        //) / 4) + " %");
        //$("#value1").text(Math.round((parseFloat(document.getElementById("lbllinkedIn1percentage").innerHTML) +
        //    parseFloat(document.getElementById("lbllinkedIn2percentage").innerHTML) +
        //    parseFloat(document.getElementById("lbllinkedIn3percentage").innerHTML) +
        //    parseFloat(document.getElementById("lbllinkedIn4percentage").innerHTML)
        //) / 4) + " %");

        $("#value").text(Math.round((parseFloat(document.getElementById("lbllinkedIn1percentage").innerHTML) +
            parseFloat(document.getElementById("lbllinkedIn2percentage").innerHTML) +
            parseFloat(document.getElementById("lbllinkedIn3percentage").innerHTML)
        ) / 3) + " %");
        $("#value1").text(Math.round((parseFloat(document.getElementById("lbllinkedIn1percentage").innerHTML) +
            parseFloat(document.getElementById("lbllinkedIn2percentage").innerHTML) +
            parseFloat(document.getElementById("lbllinkedIn3percentage").innerHTML)
        ) / 3) + " %");

        document.getElementById('slider-format').noUiSlider.set($("#value").text());
        document.getElementById('slider-format').removeAttribute('disabled');
        localStorage.setItem("ratecounter", parseInt("0"));
        stoprateslider();
    }
}

function disableLinkedprofile() {
    for (var y = 4; y < 8; y++) {
        document.getElementById("radlinkedIn1YesQNo" + y).checked = true;
        document.getElementById("radlinkedIn1YesQNo" + y).disabled = true;
        document.getElementById("radlinkedIn1NoQNo" + y).disabled = true;
        document.getElementById("lbllinkedIn1mark" + y).innerHTML = "0";
        document.getElementById("divlinkedIn_" + y).style.display = "none";
    }
    document.getElementById("lbllinkedIn1questionNo8").innerHTML = "4.";
    document.getElementById("lbllinkedIn1questionNo9").innerHTML = "5.";
}

function enableLinkedprofile() {
    for (var y = 4; y < 8; y++) {
        document.getElementById("radlinkedIn1YesQNo" + y).checked = false;
        document.getElementById("radlinkedIn1YesQNo" + y).disabled = false;
        document.getElementById("radlinkedIn1NoQNo" + y).disabled = false;
        document.getElementById("lbllinkedIn1mark" + y).innerHTML = "0.25";
        document.getElementById("divlinkedIn_" + y).style.display = "inline";
    }
    document.getElementById("lbllinkedIn1questionNo8").innerHTML = "8.";
    document.getElementById("lbllinkedIn1questionNo9").innerHTML = "9.";
    CalculateOvrallRatinglinkedin('linkedIn1');
}

function validateradiobtn(tabname, tablecount) {
    var emptyarr = new Array;
    var radbtnYes = "rad" + tabname + "YesQNo";
    var radbtnNo = "rad" + tabname + "NoQNo";
    var diverror = "div_error" + tabname + "QNo";

    var j;
    if (tabname == "linkedIn1") {
        j = 1;
    }
    else if (tabname == "linkedIn2") {
        j = 10;
    }
    else if (tabname == "linkedIn3") {
        j = 16;
    }
    else if (tabname == "linkedIn4") {
        j = 20;
    }
    for (var k = 0; k < tablecount; k++) {
        if ((j >= 1 && j <= 9) && tabname == "linkedIn1") {
            if ($('#divlinkedIn_' + j).css('display') == 'block' || $('#divlinkedIn_' + j).attr('style') == "undefined") {
                if (document.getElementById(radbtnYes + j).checked == true || document.getElementById(radbtnNo + j).checked == true) {
                    var index = emptyarr.indexOf(radbtnYes + j);
                    document.getElementById(diverror + j).style.border = "";

                    if (index != -1)
                        emptyarr.splice(index, 1);
                }

                else {
                    emptyarr.push(radbtnYes + j);
                    document.getElementById(diverror + j).style.border = "1px solid red";
                }
            }
        }

        if ((j >= 10 && j <= 15) && tabname == "linkedIn2") {
            if (j != 11) {
                if ($('#divAssessment_' + j).css('display') == 'block' || $('#divAssessment_' + j).attr('style') == "undefined") {
                    if (document.getElementById(radbtnYes + j).checked == true || document.getElementById(radbtnNo + j).checked == true) {
                        var index = emptyarr.indexOf(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "";

                        if (index != -1)
                            emptyarr.splice(index, 1);
                    }

                    else {
                        emptyarr.push(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "1px solid red";
                    }
                }
            }
            else if (j == 11) {
                if ($('#assstarRating').text() == "0") {
                    $("#vali_star").css("display", "inline");
                }
                else {
                    $("#vali_star").css("display", "none");
                }
            }
        }
        if ((j >= 16 && j <= 19) && tabname == "linkedIn3") {
            if (j == 16) {
                if ($('#divVisa_' + j).css('display') == 'block' || $('#divVisa_' + j).attr('style') == "undefined") {
                    if (document.getElementById(radbtnYes + j).checked == true || document.getElementById(radbtnNo + j).checked == true) {
                        var index = emptyarr.indexOf(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "";

                        if (index != -1)
                            emptyarr.splice(index, 1);
                    }

                    else {
                        emptyarr.push(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "1px solid red";
                    }
                }
            }
            else if (j == 17) {
                if ($('#drpCitizen17').val() == "-1") {
                    $('#drpCitizen17').addClass("is-invalid");
                    $('#drpCitizen17').focus();
                    emptyarr.push("drpCitizen17");
                }
                else {
                    var index = emptyarr.indexOf("drpCitizen17");
                    $('#drpCitizen17').removeClass("is-invalid");

                    if (index != -1)
                        emptyarr.splice(index, 1);
                }
            }

            else if (j == 18) {
                if ($('#drpCitizen17').val() == "19004") {
                    if ($('#drpVisa18').val() == "-1") {
                        $('#drpVisa18').addClass("is-invalid");
                        $('#drpVisa18').focus();
                        emptyarr.push("drpVisa18");
                    }
                }
                else {
                    var index = emptyarr.indexOf("drpVisa18");
                    $('#drpVisa18').removeClass("is-invalid");

                    if (index != -1)
                        emptyarr.splice(index, 1);
                }
            }
            else if (j == 19) {
                if ($('#drpYears19').val() == "-1") {
                    $('#drpYears19').addClass("is-invalid");
                    $('#drpYears19').focus();
                    emptyarr.push("drpYears19");
                }
                else {
                    var index = emptyarr.indexOf("drpYears19");
                    $('#drpYears19').removeClass("is-invalid");

                    if (index != -1)
                        emptyarr.splice(index, 1);
                }
            }
        }
        if ((j >= 20 && j <= 22) && tabname == "linkedIn4") {
            if (j == 20) {
                if ($('#divEducation_' + j).css('display') == 'block' || $('#divEducation_' + j).attr('style') == "undefined") {
                    if (document.getElementById(radbtnYes + j).checked == true || document.getElementById(radbtnNo + j).checked == true) {
                        var index = emptyarr.indexOf(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "";

                        if (index != -1)
                            emptyarr.splice(index, 1);
                    }

                    else {
                        emptyarr.push(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "1px solid red";
                    }
                }
            }
            else if (j == 21) {
                var x = 20;
                if (document.getElementById(radbtnYes + x).checked == true) {
                    if ($("#txtlinkedIn4college21").val() == "" && $("#txtlinkedIn4duration21").val() == "") {
                        $('#txtlinkedIn4college21').addClass("is-invalid");
                        $('#txtlinkedIn4duration21').addClass("is-invalid");
                        emptyarr.push("txtlinkedIn4college21");
                        //emptyarr.push("txtlinkedIn4duration21");
                    }
                    else {
                        var index = emptyarr.indexOf("txtlinkedIn4college21");
                        $('#txtlinkedIn4college21').removeClass("is-invalid");
                        if (index != -1)
                            emptyarr.splice(index, 1);
                    }
                }
            }
            else if (j == 22) {
                var x = 20;
                if (document.getElementById(radbtnYes + x).checked == true) {
                    if (document.getElementById(radbtnYes + j).checked == true || document.getElementById(radbtnNo + j).checked == true) {
                        var index = emptyarr.indexOf(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "";

                        if (index != -1)
                            emptyarr.splice(index, 1);
                    }

                    else {
                        emptyarr.push(radbtnYes + j);
                        document.getElementById(diverror + j).style.border = "1px solid red";
                    }
                }
            }
        }
        j++;
    }
    if (emptyarr.length > 0) {
        return false;
    }
    else if (tabname == "linkedIn1") {
        if (emptyarr.length == "0") {
            //document.getElementById("tail2").style.display = "block";
            //document.getElementById("LinkedIn").style.display = "none";
            //document.getElementById("lbllinkedIn2ovrallrating").innerHTML = document.getElementById("lbllinkedIn1ovrallrating").innerHTML;

            $("#btnopenFollowup").addClass("collapsed");
            $("#collapseOne").removeClass("show");

            $("#btnopenFollowup").removeClass("collapsed");
            $("#collapseTwo").addClass("show");
        }
    }
    else if (tabname == "linkedIn2") {
        if (emptyarr.length == "0") {
            $("#collapseTwo").removeClass("show");
            $("#collapseThree").addClass("show");
        }
    }
    else if (tabname == "linkedIn3") {
        if (emptyarr.length == "0") {
            $("#collapseThree").removeClass("show");
            $("#collapseFour").addClass("show");
        }
    }
    else if (tabname == "linkedIn4") {
        if (emptyarr.length == "0") {
            //document.getElementById("tail2").style.display = "none";
            //document.getElementById("Rating").style.display = "block";
            //document.getElementById("lblerrormsgRating").style.display = "none";
            //document.getElementById("linkedIn1").style.display = "none";
            //document.getElementById("linkedIn2").style.display = "none";

            document.getElementById("value").innerHTML = Math.round((parseInt(document.getElementById("lbllinkedIn1percentage").innerHTML) +
                parseInt(document.getElementById("lbllinkedIn2percentage").innerHTML) +
                parseInt(document.getElementById("lbllinkedIn3percentage").innerHTML) +
                parseInt(document.getElementById("lbllinkedIn4percentage").innerHTML))) + " %";

            var url = window.location.href;
            hashes = url.split("?")[1];
            if (hashes == null) {
                document.getElementById('slider-format').noUiSlider.set(Math.round((parseInt(document.getElementById("lbllinkedIn1percentage").innerHTML) +
                    parseInt(document.getElementById("lbllinkedIn2percentage").innerHTML) +
                    parseInt(document.getElementById("lbllinkedIn3percentage").innerHTML) +
                    parseInt(document.getElementById("lbllinkedIn4percentage").innerHTML))));

                localStorage.setItem("ratecounter", parseInt("0"));
            }
        }

        return true;

        /*Validationtxtarea(tabname, tablecount);*/
    }
}

function openCertification() {
    document.getElementById("divAttach5").style.display = "block";
    CalculateOvrallRatinglinkedin('linkedIn2');
}

function closeCertification() {
    document.getElementById("divAttach5").style.display = "none";
    CalculateOvrallRatinglinkedin('linkedIn2');
}

function openCertification1() {
    document.getElementById("divAttach6").style.display = "block";
    CalculateOvrallRatinglinkedin('linkedIn3');
}

function closeCertification1() {
    document.getElementById("divAttach6").style.display = "none";
    CalculateOvrallRatinglinkedin('linkedIn3');
}

function openCertification2() {
    document.getElementById("divAttach7").style.display = "block";
    CalculateOvrallRatinglinkedin('linkedIn3');
}

function closeCertification2() {
    document.getElementById("divAttach7").style.display = "none";
    CalculateOvrallRatinglinkedin('linkedIn3');
}

function disableSecondarySkill() {
    var strprimaryskills = "";
    $("#drpprimaryskills :selected").each(function () {
        strprimaryskills += this.value + ",";
    });

    options = Array.from(document.querySelectorAll('#drpSkill option'));

    strprimaryskills = strprimaryskills.substring(0, strprimaryskills.length - 1);

    strprimaryskills.split(',').forEach(function (v) {
        if (v != "" && v != null) {
            options.find(c => c.value == v).disabled = true;
        }
    });

    //options1 = Array.from(document.querySelectorAll('#drpcertification option'));
    //strprimaryskills.split(',').forEach(function (v) {
    //    if (v != "") {
    //        options1.find(c => c.value == v).disabled = true;
    //    }
    //});
}

function disabletxtarea() {
    var url = window.location.href;
    hashes = url.split("?")[1];
    if (hashes != null) {
        btnEdit();
    }
    else {
        var str = (document.getElementById("value").innerHTML).split('%');
        var str1 = (document.getElementById("value1").innerHTML).split('%');

        if (str1[0].trim() > str[0].trim()) {
            if (parseInt(localStorage.getItem("ratecounter")) == 1) {
                $("#msgpopupass").modal('show');
                $("#div-message1").text("Do you wish to overwrite system rating?");
                $("#div_Success").css('display', 'none');
                $("#div_Confirm").css('display', 'block');
                document.getElementById("txtRatingcommentsQ1").disabled = false;
            }

            else {
                document.getElementById("txtRatingcommentsQ1").disabled = false;
            }
        }
        else if (str1[0].trim() < str[0].trim()) {
            var str = (document.getElementById("value").innerHTML).split('%');
            document.getElementById('slider-format').noUiSlider.set(str[0].trim());
        }
    }
}

function btnEdit() {
    var url = window.location.href;
    hashes = url.split("?")[1];

    if (hashes != null) {
        $("#msgpopupass").modal('hide');
        document.getElementById("txtRatingcommentsQ1").disabled = false;
        //document.getElementById("txtRatingcommentsQ1").value = "";
        document.getElementById("editicon").style.display = "none";
        document.getElementById('slider-format').removeAttribute('disabled');
    }

    else {
        $("#msgpopupass").modal('hide');
        document.getElementById("txtRatingcommentsQ1").disabled = false;
        document.getElementById("txtRatingcommentsQ1").value = "";
        document.getElementById("editicon").style.display = "none";
        document.getElementById('slider-format').removeAttribute('disabled');
    }
}

function stoprateslider() {
    var str = (document.getElementById("value").innerHTML).split('%');
    var str1 = (document.getElementById("value1").innerHTML).split('%');

    if (str1[0].trim() < str[0].trim()) {
        var str = (document.getElementById("value").innerHTML).split('%');
        document.getElementById('slider-format').noUiSlider.set(str[0].trim());
    }
    document.getElementById("txtRatingcommentsQ1").disabled = false;

    if (RTRstatus == "1" && parseInt(str1[0]) >= 70 && $("#hdnCandStatus").val() == "101") {
        $('#btnSubmittl').css('display', 'block');
        $('#btnDraft').css('display', 'none');
    }
    else if ($("#chkRTR").prop("checked") == true && $("#chkRTR1").prop("checked") == true) {
        $('#btnSubmittl').css('display', 'block');
        $('#btnDraft').css('display', 'none');
    }
}

function validateemptyradiobtn() {
    var emptyarr1 = new Array;
    var emptyarr2 = new Array;
    var emptyarr3 = new Array;
    var emptyarr4 = new Array;

    var tablecount1 = 10;
    var tablecount2 = 6;
    var tablecount3 = 4;
    var tablecount4 = 3;

    var j;

    var tabname1 = "linkedIn1";
    var tabname2 = "linkedIn2";
    var tabname3 = "linkedIn3";
    var tabname4 = "linkedIn4";

    var radbtnYes1 = "rad" + tabname1 + "YesQNo";
    var radbtnNo1 = "rad" + tabname1 + "NoQNo";
    var diverror1 = "div_error" + tabname1 + "QNo";

    var radbtnYes2 = "rad" + tabname2 + "YesQNo";
    var radbtnNo2 = "rad" + tabname2 + "NoQNo";
    var diverror2 = "div_error" + tabname2 + "QNo";

    var radbtnYes3 = "rad" + tabname3 + "YesQNo";
    var radbtnNo3 = "rad" + tabname3 + "NoQNo";
    var diverror3 = "div_error" + tabname3 + "QNo";

    var radbtnYes4 = "rad" + tabname4 + "YesQNo";
    var radbtnNo4 = "rad" + tabname4 + "NoQNo";
    var diverror4 = "div_error" + tabname4 + "QNo";

    var j = 1;
    var z = 10;
    var x = 16;
    var y = 20;

    for (var k = 0; k < tablecount1; k++) {
        if ($('#divlinkedIn_' + j).css('display') == 'block' || $('#divlinkedIn_' + j).attr('style') == "undefined") {
            if (document.getElementById(radbtnYes1 + j).checked == true || document.getElementById(radbtnNo1 + j).checked == true) {
                var index = emptyarr1.indexOf(radbtnYes1 + j);
                document.getElementById(diverror1 + j).style.border = "";

                if (index != -1)
                    emptyarr1.splice(index, 1);
            }

            else {
                emptyarr1.push(radbtnYes1 + j);
                document.getElementById(diverror1 + j).style.border = "1px solid red";
            }
        }
        j++;
    }

    for (var k = 0; k < tablecount2; k++) {
        if (z != 11) {
            //if ($('#divAssessment_' + z).css('display') == 'block' || $('#divAssessment_' + z).attr('style') == "undefined") {
            if (document.getElementById(radbtnYes2 + z).checked == true || document.getElementById(radbtnNo2 + z).checked == true) {
                var index = emptyarr2.indexOf(radbtnYes2 + z);
                document.getElementById(diverror2 + z).style.border = "";

                if (index != -1)
                    emptyarr2.splice(index, 1);
            }

            else {
                emptyarr2.push(radbtnYes2 + z);
                document.getElementById(diverror2 + z).style.border = "1px solid red";
            }

            // }
        }
        z++;
    }

    for (var k = 0; k < tablecount3; k++) {
        if (x == 16) {
            if (document.getElementById(radbtnYes3 + x).checked == true || document.getElementById(radbtnNo3 + x).checked == true) {
                var index = emptyarr3.indexOf(radbtnYes3 + x);
                document.getElementById(diverror3 + x).style.border = "";

                if (index != -1)
                    emptyarr3.splice(index, 1);
            }

            else {
                emptyarr3.push(radbtnYes3 + x);
                document.getElementById(diverror3 + x).style.border = "1px solid red";
            }
        }
        else if (x == 17) {
            if ($('#drpCitizen17').val() == "-1") {
                $('#drpCitizen17').addClass("is-invalid");
                $('#drpCitizen17').focus();
                emptyarr3.push("drpCitizen17");
            }
            else {
                var index = emptyarr3.indexOf("drpCitizen17");
                $('#drpCitizen17').removeClass("is-invalid");

                if (index != -1)
                    emptyarr3.splice(index, 1);
            }
        }

        else if (x == 18) {
            if ($('#drpCitizen17').val() == "19004") {
                if ($('#drpVisa18').val() == "-1") {
                    $('#drpVisa18').addClass("is-invalid");
                    $('#drpVisa18').focus();
                    emptyarr3.push("drpVisa18");
                }
            }
            else {
                var index = emptyarr3.indexOf("drpVisa18");
                $('#drpVisa18').removeClass("is-invalid");

                if (index != -1)
                    emptyarr3.splice(index, 1);
            }
        }
        else if (j == 19) {
            if ($('#drpYears19').val() == "-1") {
                $('#drpYears19').addClass("is-invalid");
                $('#drpYears19').focus();
                emptyarr3.push("drpYears19");
            }
            else {
                var index = emptyarr3.indexOf("drpYears19");
                $('#drpYears19').removeClass("is-invalid");

                if (index != -1)
                    emptyarr3.splice(index, 1);
            }
        }

        x++;
    }

    for (var k = 0; k < tablecount4; k++) {
        if (y == 20) {
            if ($('#divEducation_' + y).css('display') == 'block' || $('#divEducation_' + y).attr('style') == "undefined") {
                if (document.getElementById(radbtnYes4 + y).checked == true || document.getElementById(radbtnNo4 + y).checked == true) {
                    var index = emptyarr4.indexOf(radbtnYes4 + y);
                    document.getElementById(diverror4 + y).style.border = "";

                    if (index != -1)
                        emptyarr4.splice(index, 1);
                }

                else {
                    emptyarr4.push(radbtnYes4 + y);
                    document.getElementById(diverror4 + y).style.border = "1px solid red";
                }
            }
        }
        else if (y == 21) {
            var x = 20;
            if (document.getElementById(radbtnYes4 + x).checked == true) {
                if ($("#txtlinkedIn4college21").val() == "" && $("#txtlinkedIn4duration21").val() == "") {
                    $('#txtlinkedIn4college21').addClass("is-invalid");
                    $('#txtlinkedIn4duration21').addClass("is-invalid");
                    emptyarr4.push("txtlinkedIn4college21");
                    //emptyarr.push("txtlinkedIn4duration21");
                }
                else {
                    var index = emptyarr4.indexOf("txtlinkedIn4college21");
                    $('#txtlinkedIn4college21').removeClass("is-invalid");
                    if (index != -1)
                        emptyarr4.splice(index, 1);
                }
            }
        }
        else if (y == 22) {
            var x = 20;
            if (document.getElementById(radbtnYes4 + x).checked == true) {
                if (document.getElementById(radbtnYes4 + y).checked == true || document.getElementById(radbtnNo4 + y).checked == true) {
                    var index = emptyarr4.indexOf(radbtnYes4 + y);
                    document.getElementById(diverror4 + y).style.border = "";

                    if (index != -1)
                        emptyarr4.splice(index, 1);
                }

                else {
                    emptyarr4.push(radbtnYes4 + y);
                    document.getElementById(diverror4 + y).style.border = "1px solid red";
                }
            }
        }
        y++;
    }

    var isEmpty = new Array;

    for (var i = 0; i < 4; i++) {
        if (i == 0) {
            if (parseInt(emptyarr1.length) > parseInt(0)) {
                isEmpty.push("true");
            }
        }
        if (i == 1) {
            if (parseInt(emptyarr2.length) > parseInt(0)) {
                isEmpty.push("true");
            }
        }
        if (i == 2) {
            if (parseInt(emptyarr3.length) > parseInt(0)) {
                isEmpty.push("true");
            }
        }
        if (i == 3) {
            if (parseInt(emptyarr4.length) > parseInt(0)) {
                isEmpty.push("true");
            }
        }
    }
    var emptycounter = 0;
    for (var i = 0; i < isEmpty.length; i++) {
        if (isEmpty[i] == "true") {
            emptycounter++;
        }
    }

    if (emptycounter > 0 && emptycounter <= 4) {
        return false;
    }

    else {
        return true;
    }
}

function openassessement() {
    if (validateradiobtn('linkedIn1', '10') == true) {
        $("#btnopenFollowup").addClass("collapsed");
        $("#collapseOne").removeClass("show");

        $("#btnopenFollowup").removeClass("collapsed");
        $("#collapseTwo").addClass("show");
    }
}

function closeassessement() {
    $("#btnopenFollowup").addClass("collapsed");
    $("#collapseTwo").removeClass("show");

    $("#btnopenFollowup").removeClass("collapsed");
    $("#collapseOne").addClass("show");
}

function mergeName() {
    //if (hasWhiteSpace($("#txtLastname").val().trim())) {
    //    $('#txtLastname').addClass("is-invalid");
    //    $("#candlastname").css("display", "inline");
    //}
    //else {
    //    $('#txtLastname').removeClass("is-invalid");
    //    $("#candlastname").css("display", "none");
    const word = $("#txtFirstname").val().trim();

    const firstLetter = word.charAt(0);
    const remainingLetters = word.substring(1);
    const firstLetterCap = firstLetter.toUpperCase();
    const Letter2 = remainingLetters.toLowerCase();
    $("#txtFirstname").val(firstLetterCap + Letter2);

    const word1 = $("#txtLastname").val().trim();

    const firstLetter1 = word1.charAt(0);
    const remainingLetters1 = word1.substring(1);
    const firstLetterCap1 = firstLetter1.toUpperCase();
    const Letter21 = remainingLetters1.toLowerCase();
    $("#txtLastname").val(firstLetterCap1 + Letter21);

    $("#txtCandidatename").val($("#txtFirstname").val() + " " + $("#txtLastname").val());
    //}
}

function getassrateUser(id) {
    //document.getElementById("rat1").classList.remove("inputlayout");
    //document.getElementById("txtEnddate").classList.remove("font_size");

    var count = id.split('_');
    for (var k = 1; k <= 5; k++) {
        document.getElementById(count[0] + "_" + k).classList.remove("ratechecked1");
    }

    for (var i = 1; i <= count[1]; i++) {
        if (document.getElementById(count[0] + "_" + i).classList.contains('ratechecked1')) {
            document.getElementById(count[0] + "_" + i).classList.remove("ratechecked1");
        }
        else {
            document.getElementById(count[0] + "_" + i).classList.add("ratechecked1");
        }
    }

    var ratings = document.getElementsByClassName("ratechecked1");
    var rateCount = 0;
    for (var i = 0; i < ratings.length; i++) {
        rateCount++;
    }
    document.getElementById("assstarRating").innerHTML = rateCount;
    //document.getElementById("ContentPlaceHolder1_hdnStarrating").innerHTML = rateCount;
}

function assrateUser(a) {
    //document.getElementById("rat1").classList.remove("inputlayout");
    //document.getElementById("txtEnddate").classList.remove("font_size");
    var id = a.id;
    var count = id.split('_');
    for (var k = 1; k <= 5; k++) {
        document.getElementById(count[0] + "_" + k).classList.remove("ratechecked1");
    }

    for (var i = 1; i <= count[1]; i++) {
        if (document.getElementById(count[0] + "_" + i).classList.contains('ratechecked1')) {
            document.getElementById(count[0] + "_" + i).classList.remove("ratechecked1");
        }
        else {
            document.getElementById(count[0] + "_" + i).classList.add("ratechecked1");
        }
    }

    var ratings = document.getElementsByClassName("ratechecked1");
    var rateCount = 0;
    for (var i = 0; i < ratings.length; i++) {
        rateCount++;
    }
    document.getElementById("assstarRating").innerHTML = rateCount;

    if (rateCount <= 3) {
        document.getElementById("lbllinkedIn2mark11").innerHTML = "0.5";
    }
    else {
        document.getElementById("lbllinkedIn2mark11").innerHTML = "1";
    }

    CalculateOvrallRatinglinkedin('linkedIn2');
    //document.getElementById("ContentPlaceHolder1_hdnStarrating").innerHTML = rateCount;
}

function openSpecifiedDiv() {
    if ($('select#drpSourcedfrom option:selected').val() == 18002) {
        $("#div_portal").css('display', 'block');
        $("#txtReferralename").css('display', 'none');
        $("#drpVendorname").css('display', 'none');
        $("#drpPortalname").css('display', 'block');
        $("#lblTitlename").text("Portal Name");
        $("#div_sourcedfrom").removeClass("col-md-6");
        $("#div_sourcedfrom").addClass("col-md-4");
        $("#div_LinekedIn").removeClass("col-md-6");
        $("#div_LinekedIn").addClass("col-md-4");
    }
    else if ($('select#drpSourcedfrom option:selected').val() == 18003) {
        $("#div_portal").css('display', 'block');
        $("#lblTitlename").text("Referral Name");
        $("#drpVendorname").css('display', 'none');
        $("#drpPortalname").css('display', 'none');
        $("#txtReferralename").css('display', 'block');
        $("#div_sourcedfrom").removeClass("col-md-6");
        $("#div_sourcedfrom").addClass("col-md-4");
        $("#div_LinekedIn").removeClass("col-md-6");
        $("#div_LinekedIn").addClass("col-md-4");
    }
    else if ($('select#drpSourcedfrom option:selected').val() == 18004) {
        $("#div_portal").css('display', 'block');
        $("#lblTitlename").text("Vendor Name");
        $("#txtReferralename").css('display', 'none');
        $("#drpPortalname").css('display', 'none');
        $("#drpVendorname").css('display', 'block');
        $("#div_sourcedfrom").removeClass("col-md-6");
        $("#div_sourcedfrom").addClass("col-md-4");
        $("#div_LinekedIn").removeClass("col-md-6");
        $("#div_LinekedIn").addClass("col-md-4");
    }
    else if ($('select#drpSourcedfrom option:selected').val() == 18001) {
        $("#div_portal").css('display', 'none');
        $("#drpPortalname").css('display', 'none');
        $("#txtReferralename").css('display', 'none');
        $("#drpVendorname").css('display', 'none');

        $("#div_sourcedfrom").removeClass("col-md-4");
        $("#div_sourcedfrom").addClass("col-md-6");
        $("#div_LinekedIn").removeClass("col-md-4");
        $("#div_LinekedIn").addClass("col-md-6");
    }
}

function openVisatype() {
    if ($('select#drpCitizen17 option:selected').val() == "19004") {
        $('#divVisa_18').css('display', 'block');
        $("#lbllinkedIn4questionNo19").text("19.");
    }
    else {
        $('#divVisa_18').css('display', 'none');
        $("#lbllinkedIn4questionNo19").text("18.");
    }
}

function setYearsLivedMarks() {
    if ($('select#drpYears19 option:selected').val() == "18001" || $('select#drpYears19 option:selected').val() == "-1") {
        $("#lbllinkedIn3mark19").text("0");
    }
    else if ($('select#drpYears19 option:selected').val() == "18002") {
        $("#lbllinkedIn3mark19").text("0.5");
    }
    else if ($('select#drpYears19 option:selected').val() == "18003") {
        $("#lbllinkedIn3mark19").text("1");
    }
    else if ($('select#drpYears19 option:selected').val() == "18004") {
        $("#lbllinkedIn3mark19").text("2");
    }

    CalculateOvrallRatinglinkedin('linkedIn3');
}

function openCollegedetails() {
    if (document.getElementById("radlinkedIn4YesQNo20").checked == true) {
        $('#divEducation_21').css('display', 'block');
        $('#divEducation_22').css('display', 'block');
    }
    else if (document.getElementById("radlinkedIn4NoQNo20").checked == true) {
        $('#divEducation_21').css('display', 'none');
        $('#divEducation_22').css('display', 'none');
    }
    CalculateOvrallRatinglinkedin('linkedIn4');
}

function setCandidateQuestion(data) {
    var tabname;
    var j = 1;
    var k = 10;

    var markarr = new Array;
    var markarr1 = new Array;
    var markarr2 = new Array;
    var markarr3 = new Array;

    $.each(data, function (key, item) {
        if ((parseInt(item.Questionid) >= 17016 || parseInt(item.Questionid) <= 17024) && parseInt(item.QuestionHeadingid) == 18002) {
            tabname = "linkedIn1";
        }
        if ((parseInt(item.Questionid) >= 17025 || parseInt(item.Questionid) <= 17030) && parseInt(item.QuestionHeadingid) == 18003) {
            tabname = "linkedIn2";
        }
        if ((parseInt(item.Questionid) >= 17031 || parseInt(item.Questionid) <= 17034) && parseInt(item.QuestionHeadingid) == 18004) {
            tabname = "linkedIn3";
        }
        if ((parseInt(item.Questionid) >= 17035 || parseInt(item.Questionid) <= 17037) && parseInt(item.QuestionHeadingid) == 18005) {
            tabname = "linkedIn4";
        }

        var radbtn = "rad" + tabname + "ANo";
        var mark = "lbl" + tabname + "mark";
        var QuestionID = "lbl" + tabname + "QuestionId";
        var ans = "lbl" + tabname + "answer";
        var div_show = "div_" + tabname;

        if ((parseInt(item.Questionid) >= 17016 || parseInt(item.Questionid) <= 17024) && parseInt(item.QuestionHeadingid) == 18002) {
            // for (i = 0; i < 10; i++) {
            var Ans = document.getElementById(ans + j).innerHTML;
            if (item.Questionid == parseInt(document.getElementById(QuestionID + j).innerHTML)) {
                //document.getElementsByName(radbtn + j)[0].disabled = true;
                //document.getElementsByName(radbtn + j)[1].disabled = true;
                if (item.Answer == "10000") {
                    if (Ans == "Yes") {
                        markarr.push(document.getElementById(mark + j).innerHTML);
                    }
                    // document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                    document.getElementsByName(radbtn + j)[0].checked = true;
                }
                else if (item.Answer == "10001") {
                    if (Ans == "No") {
                        markarr.push(document.getElementById(mark + j).innerHTML);
                    }
                    document.getElementsByName(radbtn + j)[1].checked = true;
                    //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                }

                //document.getElementById("iconlinkedIn" + j).style.display = "block";
                document.getElementById(div_show + j).style.display = "none";

                document.getElementById("IconlinkedIn1QNo" + j).style.color = "#00e7ff";
            }

            j++;
            // }
        }
        var totMar = "0";

        for (var p = 0; p < markarr.length; p++) {
            totMar = parseInt(totMar) + parseInt(markarr[p]);
        }
        if (tabname == "linkedIn1") {
            document.getElementById("lbllinkedIn1ovrallrating").innerHTML = totMar;
            document.getElementById("lbllinkedIn1percentage").innerHTML = Math.round((totMar / parseInt(document.getElementById("lbllinkedIn1overallvalue").innerHTML)) * 100);
        }

        if ((parseInt(item.Questionid) >= 17025 || parseInt(item.Questionid) <= 17030) && parseInt(item.QuestionHeadingid) == 18003) {
            //for (i = 0; i < 8; i++) {
            if (k != 11) {
                var Ans = document.getElementById(ans + k).innerHTML;

                if (item.Questionid == parseInt(document.getElementById(QuestionID + k).innerHTML)) {
                    //document.getElementsByName(radbtn + k)[0].disabled = true;
                    //document.getElementsByName(radbtn + k)[1].disabled = true;
                    if (item.Answer == "10000") {
                        if (Ans == "Yes") {
                            markarr1.push(document.getElementById(mark + k).innerHTML);
                        }
                        //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                        document.getElementsByName(radbtn + k)[0].checked = true;
                    }
                    else if (item.Answer == "10001") {
                        if (Ans == "No") {
                            markarr1.push(document.getElementById(mark + k).innerHTML);
                        }
                        document.getElementsByName(radbtn + k)[1].checked = true;
                        //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                    }

                    document.getElementById("iconlinkedIn" + k).style.display = "block";
                    //document.getElementById("editicon").style.display = "block";
                    document.getElementById(div_show + k).style.display = "none";
                }
            }
            else {
                document.getElementById("assstarRating").innerHTML = item.Answer;
                getassrateUser("massrat_" + item.Answer.trim());
                if (item.Answer >= 4) {
                    document.getElementById("lbllinkedIn2mark11").innerHTML = "1";
                }
                else {
                    document.getElementById("lbllinkedIn2mark11").innerHTML = "0.5";
                }
            }

            k++;
        }

        var totMar1 = "0";

        for (var q = 0; q < markarr1.length; q++) {
            totMar1 = parseFloat(totMar1) + parseFloat(markarr1[q]);
        }

        totMar1 = parseFloat(totMar1) + parseFloat(document.getElementById("lbllinkedIn2mark11").innerHTML);

        if (tabname == "linkedIn2") {
            document.getElementById("lbllinkedIn2ovrallrating").innerHTML = totMar1;
            document.getElementById("lbllinkedIn2percentage").innerHTML = Math.round((totMar1 / parseInt(document.getElementById("lbllinkedIn2overallvalue").innerHTML)) * 100);
        }

        if ((parseInt(item.Questionid) >= 17031 || parseInt(item.Questionid) <= 17034) && parseInt(item.QuestionHeadingid) == 18004) {
            //for (i = 0; i < 8; i++) {
            if (k == 16) {
                var Ans = document.getElementById(ans + k).innerHTML;

                if (item.Questionid == parseInt(document.getElementById(QuestionID + k).innerHTML)) {
                    //document.getElementsByName(radbtn + k)[0].disabled = true;
                    //document.getElementsByName(radbtn + k)[1].disabled = true;
                    if (item.Answer == "10000") {
                        if (Ans == "Yes") {
                            markarr2.push(document.getElementById(mark + k).innerHTML);
                        }
                        //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                        document.getElementsByName(radbtn + k)[0].checked = true;
                    }
                    else if (item.Answer == "10001") {
                        if (Ans == "No") {
                            markarr2.push(document.getElementById(mark + k).innerHTML);
                        }
                        document.getElementsByName(radbtn + k)[1].checked = true;
                        //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                    }

                    //document.getElementById("iconlinkedIn" + k).style.display = "block";
                    //document.getElementById("editicon").style.display = "block";
                    document.getElementById(div_show + k).style.display = "none";
                }
            }
            else if (k == 17) {
                $("#drpCitizen17").val(item.Answer).prop("selected", true);
            }
            else if (k == 18) {
                $("#drpVisa18").val(item.Answer).prop("selected", true);
                if (item.Answer == "-1") {
                    $("#divVisa_18").css("display", "none");
                }
                else {
                    $("#divVisa_18").css("display", "block");
                }
            }
            else if (k == 19) {
                $("#drpYears19").val(item.Answer).prop("selected", true);
                setYearsLivedMarks();
                markarr2.push(document.getElementById(mark + k).innerHTML);
            }

            k++;
        }

        var totMar2 = "0";

        for (var q = 0; q < markarr2.length; q++) {
            totMar2 = parseFloat(totMar2) + parseFloat(markarr2[q]);
        }

        if (tabname == "linkedIn3") {
            document.getElementById("lbllinkedIn3ovrallrating").innerHTML = totMar2;
            document.getElementById("lbllinkedIn3percentage").innerHTML = Math.round((totMar2 / parseInt(document.getElementById("lbllinkedIn3overallvalue").innerHTML)) * 100);
        }

        if ((parseInt(item.Questionid) >= 17035 || parseInt(item.Questionid) <= 17037) && parseInt(item.QuestionHeadingid) == 18005) {
            //for (i = 0; i < 8; i++) {
            if (k == 20 || k == 22) {
                var Ans = document.getElementById(ans + k).innerHTML;

                if (item.Questionid == parseInt(document.getElementById(QuestionID + k).innerHTML)) {
                    //document.getElementsByName(radbtn + k)[0].disabled = true;
                    //document.getElementsByName(radbtn + k)[1].disabled = true;
                    if (item.Answer == "10000") {
                        if (Ans == "Yes") {
                            markarr3.push(document.getElementById(mark + k).innerHTML);
                        }
                        //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                        document.getElementsByName(radbtn + k)[0].checked = true;
                    }
                    else if (item.Answer == "10001") {
                        if (Ans == "No") {
                            markarr3.push(document.getElementById(mark + k).innerHTML);
                        }
                        document.getElementsByName(radbtn + k)[1].checked = true;
                        //document.getElementById("lbllinkedInovrallrating").innerHTML = parseInt(document.getElementById(mark + j).innerHTML);
                    }

                    //document.getElementById("iconlinkedIn" + k).style.display = "block";
                    //document.getElementById("editicon").style.display = "block";
                    document.getElementById(div_show + k).style.display = "none";
                }
            }
            else if (k == 21) {
                var collegename = item.Answer.split(',');
                $("#txtlinkedIn4college21").val(collegename[0]);
                $("#txtlinkedIn4duration21").val(collegename[1]);
            }

            k++;
        }

        var totMar3 = "0";

        for (var q = 0; q < markarr3.length; q++) {
            totMar3 = parseFloat(totMar3) + parseFloat(markarr3[q]);
        }

        if (tabname == "linkedIn4") {
            document.getElementById("lbllinkedIn4ovrallrating").innerHTML = totMar3;
            document.getElementById("lbllinkedIn4percentage").innerHTML = Math.round((totMar3 / parseInt(document.getElementById("lbllinkedIn4overallvalue").innerHTML)) * 100);
        }
    });

    if (document.getElementById("radlinkedIn2YesQNo14").checked == true) {
        openCertification();

        var c = 5;
        for (var i = 0; i < Prooflist.length; i++) {
            if (Prooflist[i].documenttype == "Certification") {
                $('#div_Filename' + c).css('display', 'block');
                $("#proofId" + c).val(Prooflist[i].candproofid);
                $("#txtIdno" + c).val(Prooflist[i].idNo);
                $("#lblFilename" + c).text(Prooflist[i].idfilename);
                $('#lblFilename' + c).css('display', 'block');
                $('#divAttach' + c).css('display', 'block');
                $('#div_Fileuploadname' + c).css('display', 'block');
            }
        }
    }

    if ($("#drpVisa18").val() != "-1") {
        openCertification1();

        var c = 6;
        for (var i = 0; i < Prooflist.length; i++) {
            if (Prooflist[i].documenttype == "Visa-Assessment") {
                $('#div_Filename' + c).css('display', 'block');
                $("#proofId" + c).val(Prooflist[i].candproofid);

                var strVisadate = Prooflist[i].idNo.split(',');
                $("#txtIdno" + c).val(strVisadate[0]);
                $("#txtIdno7").val(strVisadate[1]);
                $("#lblFilename" + c).text(Prooflist[i].idfilename);
                $('#lblFilename' + c).css('display', 'block');
                $('#divAttach' + c).css('display', 'block');
                $('#div_Fileuploadname' + c).css('display', 'block');
            }
        }
    }

    if (document.getElementById("radlinkedIn3YesQNo16").checked == true) {
        openCertification2();
        var c = 7;
        for (var i = 0; i < Prooflist.length; i++) {
            //if (Prooflist[i].documenttype == "Driving Licence-Assessment" || Prooflist[i].documenttype == "Other Documents - Assessment") {
            if (Prooflist[i].documenttype.includes("Assessment")) {
                $('#div_Filename' + c).css('display', 'block');
                $("#proofId" + c).val(Prooflist[i].candproofid);
                var govtDoc = Prooflist[i].documenttype.split('-');
                var strVisadate = Prooflist[i].idNo.split(',');
                $("#txtIdno8").val(strVisadate[0]);
                $("#txtIdno9").val(strVisadate[1]);
                $("#lblFilename" + c).text(Prooflist[i].idfilename);
                $("#drpGovt16").val(govtDoc[0]).prop("selected", true);
                $('#lblFilename' + c).css('display', 'block');
                $('#divAttach' + c).css('display', 'block');
                $('#div_Fileuploadname' + c).css('display', 'block');
            }
        }
    }

    if (document.getElementById("radlinkedIn4YesQNo20").checked == true) {
        openCollegedetails();
    }

    for (var i = 1; i < 16; i++) {
        var tabname = "";
        if (i >= 1 && i <= 9) {
            tabname = "divlinkedIn_";
        }
        else if (i >= 10) {
            tabname = "divAssessment_";
        }

        if (document.getElementById(tabname + i).style.display == "none") {
            document.getElementById(tabname + i).style.display = "block";
        }
    }

    for (var m = 4; m < 8; m++) {
        if (document.getElementsByName("radlinkedIn1ANo3")[0].checked == true) {
            document.getElementById("divlinkedIn_" + m).style.display = "none";
            document.getElementById("lbllinkedIn1questionNo8").innerHTML = "4.";
            document.getElementById("lbllinkedIn1questionNo9").innerHTML = "5.";
        }
        else if (document.getElementsByName("radlinkedIn1ANo3")[1].checked == true) {
            document.getElementById("divlinkedIn_" + m).style.display = "block";
        }
    }

    var counter = parseInt(document.getElementById("lbllinkedIn1questionNo9").innerHTML) + parseInt(1);
    for (var n = 10; n < 16; n++) {
        document.getElementById("lbllinkedIn2questionNo" + n).innerHTML = counter + ".";
        counter++;
    }

    document.getElementsByName("radlinkedIn1ANo8")[0].disabled = false;
    document.getElementsByName("radlinkedIn1ANo8")[1].disabled = false;
    document.getElementsByName("radlinkedIn1ANo9")[0].disabled = false;
    document.getElementsByName("radlinkedIn1ANo9")[1].disabled = false;

    document.getElementById("div-Genuinity").style.display = "block";

    if (document.getElementsByName("radlinkedIn1ANo1")[1].checked == true) {
        closelinkedInSubtype();
    }
}

function openassessement1() {
    if (validateradiobtn('linkedIn1', '10') == true) {
        $("#btnopenFollowup").addClass("collapsed");
        $("#collapseOne").removeClass("show");

        $("#btnopenFollowup").removeClass("collapsed");
        $("#collapseTwo").addClass("show");
    }
}

function openassessement2() {
    if (validateradiobtn('linkedIn2', '6') == true) {
        $("#btnopenFollowup").addClass("collapsed");
        $("#collapseTwo").removeClass("show");

        $("#btnopenFollowup").removeClass("collapsed");
        $("#collapseThree").addClass("show");
    }
}

function openassessement3() {
    if (validateradiobtn('linkedIn3', '4') == true) {
        $("#btnopenFollowup").addClass("collapsed");
        $("#collapseThree").removeClass("show");

        $("#btnopenFollowup").removeClass("collapsed");
        $("#collapseFour").addClass("show");
    }
}

function closeassessement2() {
    $("#btnopenFollowup").addClass("collapsed");
    $("#collapseTwo").removeClass("show");

    $("#btnopenFollowup").removeClass("collapsed");
    $("#collapseOne").addClass("show");
}

function closeassessement3() {
    $("#btnopenFollowup").addClass("collapsed");
    $("#collapseThree").removeClass("show");

    $("#btnopenFollowup").removeClass("collapsed");
    $("#collapseTwo").addClass("show");
}

function closeassessement4() {
    $("#btnopenFollowup").addClass("collapsed");
    $("#collapseFour").removeClass("show");

    $("#btnopenFollowup").removeClass("collapsed");
    $("#collapseThree").addClass("show");
}

function closemessagepopup() {
    $("#check").modal('hide');
    document.getElementById("div_candidatehid").style.display = "block";
    document.getElementById("div_Contant").style.display = "none";
}

//primary skill table add

function AddPrimarySkillTable() {
    var table = document.getElementById("tblCandlist");
    table.style.display = "table";

    var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

    var tableHead = document.getElementById("tblCandlist").getElementsByTagName("THEAD")[0];;

    //Add Row.

    var i = tBody.rows.length;

    row = tBody.insertRow(-1);
    row.className = "divControl";
    row.id = "divControlPri_" + i;

    var VenID = i;

    var cell = row.insertCell(-1);
    cell.innerHTML = "<label ID='hdnHDNid_" + i + "'></label>";
    cell.style.display = "none";

    var cell = row.insertCell(-1);
    cell.innerHTML = "<label ID='lblmode_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>I</label>";
    cell.className = "align-middle ps-3";
    cell.style.display = "none";

    var cell = row.insertCell(-1);
    cell.innerHTML = " <div class='col-md-12'>" +
        "<select class='form-control select3' name='choice-button' id ='drpPrimarySkill_" + i + "' onchange='totSkillCount();'>" +
        "</select>" +
        "</div > ";
    //cell.className = "form-controlnew select2 select2-hidden-accessible";

    var cell = row.insertCell(-1);
    cell.innerHTML = "<div class='col-md-12'>" +
        "<select class='form-control' id='drpPrimaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

        "</select>" +
        "</div>";
    //cell.className = "align-middle ps-3";

    if (i == 0) {
        var cell = row.insertCell(-1);
        cell.innerHTML = "<div class='col-md-12 text-center' style='display:;' >" +
            "<button id='btnAddPriskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none'>" +
            "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddPrimarySkillTable()' ></i>" +
            "</button>" +
            "<button id='btnremovetrPrimary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
            "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
            "</button>" +
            "</div>";
    }
    else {
        var cell = row.insertCell(-1);

        cell.innerHTML = "<div class='col-md-12 text-center' >" +
            "<button id='btnAddPriskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;'>" +
            "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddPrimarySkillTable()' ></i>" +
            "</button>" +
            "<button id='btnremovetrPrimary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;>" +
            "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
            "</button>" +
            "</div>";
    }
    //cell.className = "align-middle ps-3";

    var cell = row.insertCell(-1);
    cell.innerHTML = "<label>" + i + "</label>";
    cell.style.display = "none";

    var option1 = new Option("--Select Skill--", "-1");
    $(option1).html("--Select Skill--");
    $("#drpPrimarySkill_" + i).append(option1);

    for (var x = 0; x < SkillArr.length; x++) {
        var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

        $(optionpri).html(SkillArr[x].Name);
        $("#drpPrimarySkill_" + i).append(optionpri);
        $("#drpPrimarySkill_" + i).css("display", "none");
    }

    var option1 = new Option("--Select Year--", "-1");
    $(option1).html("--Select Year--");
    $("#drpPrimaryYear_" + i).append(option1);

    for (var y = 0; y < SkillArrY.length; y++) {
        var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

        $(optionyrs).html(SkillArrY[y].Name);
        $("#drpPrimaryYear_" + i).append(optionyrs);
    }

    for (var p = 0; p <= i; p++) {
        $("#drpPrimarySkill_" + p).css("display", "none");
    }

    if (tBody.rows.length > 1) {
        iconDisplay();
    }
    create_custom_dropdowns();
}

//Secondary skill table add

function AddSecondarySkillTable() {
    var table = document.getElementById("tblSecondarySkill");
    table.style.display = "table";

    var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];

    var tableHead = document.getElementById("tblSecondarySkill").getElementsByTagName("THEAD")[0];

    //Add Row.

    var i = tBody.rows.length;

    row = tBody.insertRow(-1);
    row.className = "divControl";
    row.id = "divControlSec_" + i;

    var VenID = i;

    var cell = row.insertCell(-1);
    cell.innerHTML = "<label ID='lblHDNidS_" + i + "'></label>";
    cell.style.display = "none";

    var cell = row.insertCell(-1);
    cell.innerHTML = "<label ID='lblmodeS_" + i + "' class='text-secondary text-xs font-weight-bold mb-0 ps-0' style='font-size:12px;'>I</label>";
    cell.className = "align-middle ps-3";
    cell.style.display = "none";

    var cell = row.insertCell(-1);
    cell.innerHTML = " <div class='col-md-12'>" +
        "<select class='form-control select3' name='choice-button' id ='drpSecondarySkill_" + i + "' onchange='totSkillCount();'>" +
        "</select>" +
        "</div > ";
    //cell.className = "form-controlnew select2 select2-hidden-accessible";

    var cell = row.insertCell(-1);
    cell.innerHTML = "<div class='col-md-12'>" +
        "<select class='form-control' id='drpSecondaryYear_" + i + "' onchange='totSkillCount();' style='background-color:white;'>" +

        "</select>" +
        "</div>";
    //cell.className = "align-middle ps-3";

    if (i == 0) {
        var cell = row.insertCell(-1);
        cell.innerHTML = "<div class='col-md-12 text-center' style='display:;' >" +
            "<button id='btnAddSecskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;display:none;'>" +
            "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddSecondarySkillTable()' ></i>" +
            "</button>" +
            "<button id='btnremovetrSecondary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;display:none;'>" +
            "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
            "</button>" +
            "</div>";
    }
    else {
        var cell = row.insertCell(-1);
        cell.innerHTML = "<div class='col-md-12 text-center' >" +
            "<button id='btnAddSecskills" + i + "' class='btn bg-gradient-warning p-0 m-0 pe-2' type='button' style='background:none!important;box-shadow:none!important;color:#00abec;'>" +
            "<i class='fas fa fa-plus' style='font-size:20px;' title='Add another Skill' aria-hidden='true' onclick='AddSecondarySkillTable()' ></i>" +
            "</button>" +
            "<button id='btnremovetrSecondary" + i + "' class='btn bg-gradient-warning p-0 m-0' type='button' style='background:none!important;box-shadow:none!important;color:red;'>" +
            "<i class='fas fa fa-trash' style='font-size:20px;' title='Delete Uploaded File' aria-hidden='true' onclick='return editContactRow(this);' ></i>" +
            "</button>" +
            "</div>";
    }
    //cell.className = "align-middle ps-3";

    var cell = row.insertCell(-1);
    cell.innerHTML = "<label>" + i + "</label>";
    cell.style.display = "none";

    var option1 = new Option("--Select Skill--", "-1");
    $(option1).html("--Select Skill--");
    $("#drpSecondarySkill_" + i).append(option1);

    for (var x = 0; x < SkillArr.length; x++) {
        var optionpri = new Option(SkillArr[x].Name, SkillArr[x].ID);

        $(optionpri).html(SkillArr[x].Name);
        $("#drpSecondarySkill_" + i).append(optionpri);
    }

    //if (document.getElementById("drpSecondarySkill_" + i)) {
    //    var element = document.getElementById("drpSecondarySkill_" + i);
    //    const example = new Choices(element, {});
    //}

    var option1 = new Option("--Select Year--", "-1");
    $(option1).html("--Select Year--");
    $("#drpSecondaryYear_" + i).append(option1);

    for (var y = 0; y < SkillArrY.length; y++) {
        var optionyrs = new Option(SkillArrY[y].Name, SkillArrY[y].ID);

        $(optionyrs).html(SkillArrY[y].Name);
        $("#drpSecondaryYear_" + i).append(optionyrs);
    }

    for (var p = 0; p <= i; p++) {
        $("#drpSecondarySkill_" + p).css("display", "none");
    }

    if (tBody.rows.length > 1) {
        iconsecDisplay();
    }
    create_custom_dropdownssec();
}

function editContactRow(button) {
    var row = $(button).closest("TR");

    document.getElementById("div-messageCand").innerHTML = "Are you Sure? Do you want to Remove this table ?";

    alert(row[0].rowIndex);
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Yes";
    button.id = "btnYes";
    button.className = "btn btn-success btn-resize mb-0";
    button.style = "float:left";
    button.setAttribute("onclick", "return confirmTaskEdit(" + row[0].rowIndex + ");");

    document.getElementById("btn_Div1").innerHTML = "";
    document.getElementById("btn_Div1").appendChild(button);
    btnOkCand.style.display = "none";
    var button1 = document.createElement("input");
    button1.type = "button";
    button1.value = "No";
    button1.id = "btnNo";
    button1.className = "btn btn-danger btn-resize mb-0";
    button1.style = "float:right";
    button1.setAttribute("onclick", "$('#msgpopupCand').modal('hide');");

    document.getElementById("btn_Div2").innerHTML = "";
    document.getElementById("btn_Div2").appendChild(button1);

    $("#msgpopupCand").modal('show');

    return false;
};

function confirmTaskEdit(rowid) {
    //var row = $(button).closest("TR");
    var candidaterow = rowid;

    var table = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];
    var rowCount = table.rows.length;

    //for (var i = 0; i < rowCount; i++) {
    //    if (table.rows[i].cells[5].getElementsByTagName("label")[0].innerHTML == rowid) {
    //        document.getElementById("lblHDNid_" + i).value = table.rows[i].cells[0].getElementsByTagName("label")[0].innerHTML;
    //        document.getElementById("lblmode_" + i).value = table.rows[i].cells[1].getElementsByTagName("label")[0].innerHTML;
    //        document.getElementById("drpPrimarySkill_"+i).value = table.rows[i].cells[2].getElementsByTagName("select")[0].value;
    //        document.getElementById("drpPrimaryYear_"+i).value = table.rows[i].cells[3].getElementsByTagName("select")[0].value;

    //    }
    //}

    //rowMode = "E";
    //deleteRow(button);
    var table = $("#tblCandlist")[0];
    table.deleteRow(rowid);
    var table1 = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];
    var rowCount = table1.rows.length;
    for (var i = 1; i <= rowCount; i++) {
        table.rows[i].cells[5].getElementsByTagName("label")[0].innerHTML = i;

        var c1 = (table.rows[i].cells[0].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[0].getElementsByTagName("label")[0].id = c1[0] + '_' + table.rows[i].cells[5].getElementsByTagName("label")[0].innerHTML;

        var c2 = (table.rows[i].cells[1].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[1].getElementsByTagName("label")[0].id = c2[0] + '_' + table.rows[i].cells[5].getElementsByTagName("label")[0].innerHTML;

        var c3 = (table.rows[i].cells[2].getElementsByTagName("select")[0].id).split('_');
        table.rows[i].cells[2].getElementsByTagName("select")[0].id = c3[0] + '_' + table.rows[i].cells[5].getElementsByTagName("label")[0].innerHTML;

        var c4 = (table.rows[i].cells[3].getElementsByTagName("select")[0].id).split('_');
        table.rows[i].cells[3].getElementsByTagName("select")[0].id = c4[0] + '_' + table.rows[i].cells[5].getElementsByTagName("label")[0].innerHTML;
    }

    //setUserAccess(rowid);

    //Changecandidate(document.getElementById("hdnCandid").value, "U");

    $("#msgpopupCand").modal('hide');
    return false;
}

function editContactRowS(button) {
    var row = $(button).closest("TR");

    document.getElementById("div-messageCand").innerHTML = "Are you Sure? Do you want to Remove this table ?";

    var button = document.createElement("input");
    button.type = "button";
    button.value = "Yes";
    button.id = "btnYes";
    button.className = "btn btn-success btn-resize mb-0";
    button.style = "float:left";
    button.setAttribute("onclick", "return confirmTaskEditS(" + row[0].rowIndex + ");");

    document.getElementById("btn_Div1").innerHTML = "";
    document.getElementById("btn_Div1").appendChild(button);
    btnOkCand.style.display = "none";
    var button1 = document.createElement("input");
    button1.type = "button";
    button1.value = "No";
    button1.id = "btnNo";
    button1.className = "btn btn-danger btn-resize mb-0";
    button1.style = "float:right";
    button1.setAttribute("onclick", "$('#msgpopupCand').modal('hide');");

    document.getElementById("btn_Div2").innerHTML = "";
    document.getElementById("btn_Div2").appendChild(button1);

    $("#msgpopupCand").modal('show');

    return false;
};

function confirmTaskEditS(rowid) {
    //var row = $(button).closest("TR");
    var candidaterow = rowid;

    var table = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];
    var rowCount = table.rows.length;

    //for (var i = 0; i < rowCount; i++) {
    //    alert(table.rows[i].cells[3].getElementsByTagName("label")[0].innerHTML);
    //    if (table.rows[i].cells[3].getElementsByTagName("label")[0].innerHTML == rowid) {
    //        document.getElementById("hdnCandid").value = table.rows[i].cells[0].getElementsByTagName("label")[0].innerHTML;
    //        document.getElementById("hdnmode").value = table.rows[i].cells[1].getElementsByTagName("label")[0].innerHTML;
    //        document.getElementById("txtcansubmissionrate").value = table.rows[i].cells[8].getElementsByTagName("label")[0].innerHTML;
    //        if (table.rows[i].cells[9].getElementsByTagName("label")[0].innerHTML == "Yes") {
    //            document.getElementById("radYes").checked = table.rows[i].cells[9].getElementsByTagName("label")[0].innerHTML;
    //        }
    //        else if (table.rows[i].cells[9].getElementsByTagName("label")[0].innerHTML == "No") {
    //            document.getElementById("radNo").checked = table.rows[i].cells[9].getElementsByTagName("label")[0].innerHTML;
    //        }
    //    }
    //}

    //rowMode = "E";
    deleteRow(button);
    var table = $("#tblSecondarySkill")[0];
    table.deleteRow(rowid);
    var table1 = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];
    var rowCount = table1.rows.length;
    for (var i = 1; i <= rowCount; i++) {
        table.rows[i].cells[6].getElementsByTagName("label")[0].innerHTML = i;

        var c1 = (table.rows[i].cells[0].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[0].getElementsByTagName("label")[0].id = c1[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c2 = (table.rows[i].cells[1].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[1].getElementsByTagName("label")[0].id = c2[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c3 = (table.rows[i].cells[2].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[2].getElementsByTagName("label")[0].id = c3[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c4 = (table.rows[i].cells[3].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[3].getElementsByTagName("label")[0].id = c4[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c5 = (table.rows[i].cells[4].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[4].getElementsByTagName("label")[0].id = c5[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c6 = (table.rows[i].cells[5].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[5].getElementsByTagName("label")[0].id = c6[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c7 = (table.rows[i].cells[6].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[6].getElementsByTagName("label")[0].id = c7[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c8 = (table.rows[i].cells[7].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[7].getElementsByTagName("label")[0].id = c8[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c9 = (table.rows[i].cells[8].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[8].getElementsByTagName("label")[0].id = c9[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;

        var c10 = (table.rows[i].cells[9].getElementsByTagName("label")[0].id).split('_');
        table.rows[i].cells[9].getElementsByTagName("label")[0].id = c10[0] + '_' + table.rows[i].cells[11].getElementsByTagName("label")[0].innerHTML;
    }

    //setUserAccess(rowid);

    //Changecandidate(document.getElementById("hdnCandid").value, "U");

    $("#msgpopupCand").modal('hide');
    return false;
}

function totSkillCount() {
    var counter = 0;
    $("#drpSkill :selected").each(function () {
        counter++;
    });
    $("#lblSkillsno").text(counter);
}

function openskilltab() {
    $("#collapseTwo1").removeClass("show");
}
function openskilltab2() {
    $("#collapseOne1").removeClass("show");
}

function iconDisplay() {
    var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];
    var table = document.getElementById("tblCandlist");

    for (var x = 0; x < tBody.rows.length; x++) {
        var y = x - 1;
        if ((tBody.rows.length - 1) == x) {
            document.getElementById("btnAddPriskills" + y).style.display = "none";
        }
    }
}

function iconsecDisplay() {
    var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];
    var table = document.getElementById("tblSecondarySkill");

    for (var x = 0; x < tBody.rows.length; x++) {
        var y = x - 1;
        if ((tBody.rows.length - 1) == x) {
            document.getElementById("btnAddSecskills" + y).style.display = "none";
        }
    }
}

function editiconsecDisplay() {
    var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];
    var table = document.getElementById("tblSecondarySkill");

    for (var x = 0; x < tBody.rows.length; x++) {
        var y = x - 1;
        if ((tBody.rows.length - 1) == x) {
            document.getElementById("btnAddSecskills" + x).style.display = "inline";
            if (x == 0) {
            }
            else {
                //document.getElementById("btnremovetrSecondary" + x).style.display = "inline";
            }
        }
    }
}

function create_custom_dropdowns() {
    var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];
    var i = tBody.rows.length;

    //for (var x = 0; x < tBody.rows.length; x++) {
    //   alert($("#divselect_"+x).html());
    //}
    //$('.select3').each(function (i, select) {
    for (var x = 0; x < tBody.rows.length; x++) {
        if (x == 0) {
            if ($("#divControlPri_" + x).html().includes("divselect_")) {
            }
            else {
                if (!$("#drpPrimarySkill_" + x).next().hasClass('dropdown-select')) {
                    $("#drpPrimarySkill_" + x).after('<div class="dropdown-select wide ' + ($("#drpPrimarySkill_" + x).attr('class') || '') + '" tabindex="0" id="divselect_' + x + '"><span class="current"></span><div class="list"><ul></ul></div></div>');
                    var dropdown = $("#drpPrimarySkill_" + x).next();
                    var options = $("#drpPrimarySkill_" + x).find('option');
                    var selected = $("#drpPrimarySkill_" + x).find('option:selected');

                    dropdown.find('.current').html(selected.data('display-text') || selected.text());
                    options.each(function (j, o) {
                        var display = $(o).data('display-text') || '';
                        dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                    });

                    $('dd-search mt-3').empty();
                    $('#divselect_' + x + " ul").before('<div class="dd-search mt-3"><input autocomplete="off"  class="dd-searchbox" type="text" id="txtsearch_' + x + '"></div>');
                }
            }
        }
        else {
            if ($("#divControlPri_" + x).html().includes("divselect_")) {
                //});
            }
            else {
                if (!$("#drpPrimarySkill_" + x).next().hasClass('dropdown-select')) {
                    //$(this).empty();

                    $("#drpPrimarySkill_" + x).after('<div class="dropdown-select wide ' + ($("#drpPrimarySkill_" + x).attr('class') || '') + '" tabindex="0" id="divselect_' + x + '"><span class="current"></span><div class="list"><ul></ul></div></div>');
                    var dropdown = $("#drpPrimarySkill_" + x).next();
                    var options = $("#drpPrimarySkill_" + x).find('option');
                    var selected = $("#drpPrimarySkill_" + x).find('option:selected');

                    dropdown.find('.current').html(selected.data('display-text') || selected.text());
                    options.each(function (j, o) {
                        var display = $(o).data('display-text') || '';
                        dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                    });

                    $('dd-search mt-3').empty();
                    $('#divselect_' + x + " ul").before('<div class="dd-search mt-3"><input autocomplete="off"  class="dd-searchbox" type="text" id="txtsearch_' + x + '"></div>');
                }
            }
        }
    }

    bindkeyup();
}

function create_custom_dropdownssec() {
    var tBody = document.getElementById("tblSecondarySkill").getElementsByTagName("TBODY")[0];
    var i = tBody.rows.length;

    //for (var x = 0; x < tBody.rows.length; x++) {
    //   alert($("#divselect_"+x).html());
    //}

    //$('.select3').each(function (i, select) {
    for (var x = 0; x < tBody.rows.length; x++) {
        if (x == 0) {
            if ($("#divControlSec_" + x).html().includes("divselectsec_")) {
            }
            else {
                if (!$("#drpSecondarySkill_" + x).next().hasClass('dropdown-select')) {
                    $("#drpSecondarySkill_" + x).after('<div class="dropdown-select wide ' + ($("#drpSecondarySkill_" + x).attr('class') || '') + '" tabindex="0" id="divselectsec_' + x + '"><span class="current"></span><div class="list"><ul></ul></div></div>');
                    var dropdown = $("#drpSecondarySkill_" + x).next();
                    var options = $("#drpSecondarySkill_" + x).find('option');
                    var selected = $("#drpSecondarySkill_" + x).find('option:selected');

                    dropdown.find('.current').html(selected.data('display-text') || selected.text());
                    options.each(function (j, o) {
                        var display = $(o).data('display-text') || '';
                        dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                    });

                    $('dd-search mt-3').empty();
                    $('#divselectsec_' + x + " ul").before('<div class="dd-search mt-3"><input autocomplete="off"  class="dd-searchbox" type="text"></div>');
                }
            }
        }
        else {
            if ($("#drpSecondarySkill_" + x).html().includes("divselectsec_")) {
                //});
            }
            else {
                if (!$("#drpSecondarySkill_" + x).next().hasClass('dropdown-select')) {
                    //$(this).empty();

                    $("#drpSecondarySkill_" + x).after('<div class="dropdown-select wide ' + ($("#drpSecondarySkill_" + x).attr('class') || '') + '" tabindex="0" id="divselectsec_' + x + '"><span class="current"></span><div class="list"><ul></ul></div></div>');
                    var dropdown = $("#drpSecondarySkill_" + x).next();
                    var options = $("#drpSecondarySkill_" + x).find('option');
                    var selected = $("#drpSecondarySkill_" + x).find('option:selected');

                    dropdown.find('.current').html(selected.data('display-text') || selected.text());
                    options.each(function (j, o) {
                        var display = $(o).data('display-text') || '';
                        dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
                    });
                    $('dd-search mt-3').empty();
                    $('#divselectsec_' + x + " ul").before('<div class="dd-search mt-3"><input autocomplete="off"  class="dd-searchbox" type="text"></div>');
                }
            }
        }
    }

    bindkeyupsec();
}

function editiconDisplay() {
    var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];
    var table = document.getElementById("tblCandlist");

    for (var x = 0; x < tBody.rows.length; x++) {
        var y = x - 1;
        if ((tBody.rows.length - 1) == x) {
            document.getElementById("btnAddPriskills" + x).style.display = "inline";
            if (x == 0) {
            }
            else {
                document.getElementById("btnremovetrPrimary" + x).style.display = "inline";
            }
        }
    }
}

function validatePhone() {
    let phoneNumber = document.getElementById("txtContactno").value;

    var counter = 0;

    if (hasWhiteSpace(phoneNumber)) {
        counter++;
    }

    var length = phoneNumber.length;

    if (length < 10) {
        counter++;
    }

    //let pattern = /^\+?\d{10,15}$|^\+?\d{1,2}\s\d{3}\-\d{3}\-\d{4}$/;
    //let pattern = /^\d+( \d+)*$/;
    let pattern = /^[0-9-+()]*$/;

    if (pattern.test(phoneNumber)) {
        $('#txtContactno').removeClass("is-invalid");

        //$("#candPhone").css("display", "none");
        //count++;
    }
    else {
        counter++;
    }

    if (counter == 0) {
        $('#txtContactno').removeClass("is-invalid");
        $("#candPhone").css("display", "none");
        counterPhone = 0;
    }
    else {
        $('#txtContactno').addClass("is-invalid");
        $("#candPhone").css("display", "inline");
        counterPhone++;
    }
}

function hasWhiteSpace(s) {
    return (/\s/).test(s);
}

var counterFirst = 0;
var counterLast = 0;
var counterPhone = 0;

function validateFirstname() {
    if (hasWhiteSpace($("#txtFirstname").val().trim())) {
        $('#txtFirstname').addClass("is-invalid");
        $("#candfirstname").css("display", "inline");
        counterFirst++;
    }
    else {
        $('#txtFirstname').removeClass("is-invalid");
        $("#candfirstname").css("display", "none");
        counterFirst = 0;
    }
}

function validateLastname() {
    if (hasWhiteSpace($("#txtLastname").val().trim())) {
        $('#txtLastname').addClass("is-invalid");
        $("#candlastname").text("Please remove space character");
        $("#candlastname").css("display", "inline");
        counterLast++;
    }
    else {
        $('#txtLastname').removeClass("is-invalid");
        $("#candlastname").css("display", "none");
        counterLast = 0;
    }

    if ($("#txtLastname").val().trim().length == 1) {
        $('#txtLastname').addClass("is-invalid");
        $("#candlastname").text("Last name should have more than one character");
        $("#candlastname").css("display", "inline");
        counterLast++;
    }
    else {
        $('#txtLastname').removeClass("is-invalid");
        $("#candlastname").css("display", "none");
        counterLast = 0;
    }
}

function ChangeCountry() {
    var strdata = { "CountryID": document.getElementById('drpCountry').value }

    common_api_ajax_request("api/SelectState", "State", strdata);
}

function ChangeState() {
    var strdata = { "StateID": document.getElementById('drpState').value }

    common_api_ajax_request("api/Selectcity", "City", strdata);
}

function bindkeyup() {
    var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

    for (var i = 0; i < tBody.rows.length; i++) {
        $(".dd-searchbox").keyup(function () {
            var valThis = $(this).val();
            console.log(valThis)
            $(this).parents(".dropdown-select").find(' ul > li').each(function () {
                var text = $(this).text();
                (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();
            });
        })
    }
}

function bindkeyupsec() {
    var tBody = document.getElementById("tblCandlist").getElementsByTagName("TBODY")[0];

    for (var i = 0; i < tBody.rows.length; i++) {
        $(".dd-searchbox").keyup(function () {
            var valThis = $(this).val();
            console.log(valThis)
            $(this).parents(".dropdown-select").find(' ul > li').each(function () {
                var text = $(this).text();
                (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();
            });
        })
    }
}

var Checkval = "AND";
function ConditionChecker(strval) {
    if (strval == "AND") {
        Checkval = "AND";
    }
    else if (strval == "OR") {
        Checkval = "OR";
    }
}