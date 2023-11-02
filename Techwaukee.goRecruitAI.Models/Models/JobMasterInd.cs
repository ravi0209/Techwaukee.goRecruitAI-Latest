﻿namespace Techwaukee.goRecruitAI.Models;

public partial class JobMasterInd
{
    public string Jobcode { get; set; } = null!;

    public string? JobTitle { get; set; }

    public string? Duration { get; set; }

    public string? EmplType { get; set; }

    public string? Location { get; set; }

    public string? Country { get; set; }

    public string? Startdate { get; set; }

    public string? Noofopening { get; set; }

    public string? ShiftTiming { get; set; }

    public string? TurnAroundtime { get; set; }

    public string? Clientname { get; set; }

    public string? Contactname { get; set; }

    public string? Description { get; set; }

    public string? AssignedTo { get; set; }

    public string? Prioritylevel { get; set; }

    public string? Jobstatus { get; set; }

    public string? Minrate { get; set; }

    public string? Maxrate { get; set; }

    public string? Ratetype { get; set; }

    public string? Currency { get; set; }

    public string? Skill { get; set; }

    public DateTime? Jobopendate { get; set; }

    public DateTime? Jobclosedate { get; set; }

    public string? OpenComments { get; set; }

    public string? CloseComments { get; set; }

    public string? Jobimage { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? LastUpdatedBy { get; set; }

    public DateTime? LastUpdatedOn { get; set; }

    public string? CreatedTime { get; set; }

    public string? UpdatedTime { get; set; }

    public string? PublishWeb { get; set; }

    public int JobMasterId { get; set; }

    public int? ImageFolderpath { get; set; }

    public int? Experience { get; set; }

    public int? State { get; set; }

    public int? Jobcity { get; set; }

    public int? ClosedBy { get; set; }

    public int? Durationtype { get; set; }

    public string? AssignedToVendor { get; set; }

    public string? AssignedToVendorContact { get; set; }

    public string? Primaryrecruitercontact { get; set; }

    public DateTime? VenJobOpendate { get; set; }

    public DateTime? VenJobClosedate { get; set; }

    public int? TotalNoofyrs { get; set; }
}