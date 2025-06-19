using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace SchoolMedicalAPI.Controllers
{
    [ApiController]
    [Route("api/vaccination")]
    public class VaccinationController : ControllerBase
    {
        // In-memory storage
        private static List<VaccinationCampaign> campaigns = new List<VaccinationCampaign>();
        private static List<VaccinationConfirmation> confirmations = new List<VaccinationConfirmation>();
        private static List<VaccinationAssignment> assignments = new List<VaccinationAssignment>();
        private static List<VaccinationAttendance> attendances = new List<VaccinationAttendance>();
        private static List<VaccinationResult> results = new List<VaccinationResult>();

        // --- MANAGER ---
        /// <summary>
        /// Manager: Create a vaccination campaign
        /// </summary>
        [HttpPost("campaigns")]
        public ActionResult<VaccinationCampaign> CreateCampaign([FromBody] VaccinationCampaign campaign)
        {
            campaign.Id = campaigns.Count > 0 ? campaigns.Max(c => c.Id) + 1 : 1;
            campaigns.Add(campaign);
            return CreatedAtAction(nameof(GetCampaign), new { id = campaign.Id }, campaign);
        }

        /// <summary>
        /// Manager: Get all campaigns
        /// </summary>
        [HttpGet("campaigns")]
        public ActionResult<IEnumerable<VaccinationCampaign>> GetCampaigns() => campaigns;

        /// <summary>
        /// Manager: Get a campaign by id
        /// </summary>
        [HttpGet("campaigns/{id}")]
        public ActionResult<VaccinationCampaign> GetCampaign(int id)
        {
            var campaign = campaigns.FirstOrDefault(c => c.Id == id);
            if (campaign == null) return NotFound();
            return campaign;
        }

        /// <summary>
        /// Manager: Get all confirmations for a campaign
        /// </summary>
        [HttpGet("campaigns/{id}/confirmations")]
        public ActionResult<IEnumerable<VaccinationConfirmation>> GetConfirmations(int id)
        {
            return confirmations.Where(c => c.CampaignId == id).ToList();
        }

        /// <summary>
        /// Manager: Assign nurse to campaign
        /// </summary>
        [HttpPost("campaigns/{id}/assign-nurse")]
        public ActionResult<VaccinationAssignment> AssignNurse(int id, [FromBody] VaccinationAssignment assignment)
        {
            assignment.CampaignId = id;
            assignments.Add(assignment);
            return assignment;
        }

        /// <summary>
        /// Manager: Get students who agreed to vaccinate in a campaign
        /// </summary>
        [HttpGet("campaigns/{id}/agreed-students")]
        public ActionResult<IEnumerable<VaccinationConfirmation>> GetAgreedStudents(int id)
        {
            return confirmations.Where(c => c.CampaignId == id && c.ParentDecision == "Đồng ý").ToList();
        }

        /// <summary>
        /// Manager: Get results for a campaign
        /// </summary>
        [HttpGet("campaigns/{id}/results")]
        public ActionResult<IEnumerable<VaccinationResult>> GetResults(int id)
        {
            return results.Where(r => r.CampaignId == id).ToList();
        }

        // --- PARENT ---
        /// <summary>
        /// Parent: Submit vaccination confirmation
        /// </summary>
        [HttpPost("confirmations")]
        public ActionResult<VaccinationConfirmation> SubmitConfirmation([FromBody] VaccinationConfirmation confirmation)
        {
            confirmation.Id = confirmations.Count > 0 ? confirmations.Max(c => c.Id) + 1 : 1;
            confirmations.Add(confirmation);
            return confirmation;
        }

        // --- NURSE ---
        /// <summary>
        /// Nurse: Mark attendance for a campaign
        /// </summary>
        [HttpPost("campaigns/{id}/attendance")]
        public ActionResult<VaccinationAttendance> MarkAttendance(int id, [FromBody] VaccinationAttendance attendance)
        {
            attendance.CampaignId = id;
            attendances.Add(attendance);
            return attendance;
        }

        /// <summary>
        /// Nurse: Update vaccination result for a student
        /// </summary>
        [HttpPost("campaigns/{id}/result")]
        public ActionResult<VaccinationResult> AddResult(int id, [FromBody] VaccinationResult result)
        {
            result.CampaignId = id;
            results.Add(result);
            return result;
        }
    }

    // --- Models ---
    public class VaccinationCampaign
    {
        public int Id { get; set; }
        public string VaccineName { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty; // e.g. "2024-07-01"
        public string Description { get; set; } = string.Empty;
    }

    public class VaccinationConfirmation
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty;
        public string ParentDecision { get; set; } = string.Empty; // "Đồng ý" hoặc "Không đồng ý"
        public string ParentNote { get; set; } = string.Empty;
    }

    public class VaccinationAssignment
    {
        public int CampaignId { get; set; }
        public string NurseName { get; set; } = string.Empty;
    }

    public class VaccinationAttendance
    {
        public int CampaignId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty; // ngày điểm danh
        public bool Present { get; set; }
    }

    public class VaccinationResult
    {
        public int CampaignId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public string Schedule { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // "Đã tiêm", "Chưa tiêm"
        public string Note { get; set; } = string.Empty;
    }
} 