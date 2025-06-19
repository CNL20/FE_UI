using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace SchoolMedicalAPI.Controllers
{
    [ApiController]
    [Route("api/nurse")]
    public class SchoolNurseController : ControllerBase
    {
        private static List<Student> students = new List<Student>
        {
            new Student { Id = 1, Name = "Nguyen Van A" },
            new Student { Id = 2, Name = "Tran Thi B" }
        };

        private static List<HealthRecord> healthRecords = new List<HealthRecord>
        {
            new HealthRecord { StudentId = 1, Allergies = "Peanuts", ChronicDiseases = "Asthma", Immunizations = "MMR" },
            new HealthRecord { StudentId = 2, Allergies = "None", ChronicDiseases = "None", Immunizations = "DTP" }
        };

        private static List<MedicationRequest> medicationRequests = new List<MedicationRequest>();
        private static List<MedicalIncident> medicalIncidents = new List<MedicalIncident>();

        /// <summary>
        /// Get all students
        /// </summary>
        [HttpGet("students")]
        public ActionResult<IEnumerable<Student>> GetStudents() => students;

        /// <summary>
        /// Get a student by id
        /// </summary>
        [HttpGet("students/{id}")]
        public ActionResult<Student> GetStudent(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();
            return student;
        }

        /// <summary>
        /// Add a new student
        /// </summary>
        [HttpPost("students")]
        public ActionResult<Student> AddStudent([FromBody] Student student)
        {
            student.Id = students.Count > 0 ? students.Max(s => s.Id) + 1 : 1;
            students.Add(student);
            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        /// <summary>
        /// Update a student
        /// </summary>
        [HttpPut("students/{id}")]
        public ActionResult<Student> UpdateStudent(int id, [FromBody] Student updated)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();
            student.Name = updated.Name;
            return student;
        }

        /// <summary>
        /// Delete a student
        /// </summary>
        [HttpDelete("students/{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();
            students.Remove(student);
            healthRecords.RemoveAll(r => r.StudentId == id);
            return NoContent();
        }

        /// <summary>
        /// Get health record for a student
        /// </summary>
        [HttpGet("students/{id}/health")]
        public ActionResult<HealthRecord> GetHealthRecord(int id)
        {
            var record = healthRecords.FirstOrDefault(r => r.StudentId == id);
            if (record == null) return NotFound();
            return record;
        }

        /// <summary>
        /// Add or update health record for a student
        /// </summary>
        [HttpPost("students/{id}/health")]
        public ActionResult<HealthRecord> AddOrUpdateHealthRecord(int id, [FromBody] HealthRecord updated)
        {
            var record = healthRecords.FirstOrDefault(r => r.StudentId == id);
            if (record == null)
            {
                updated.StudentId = id;
                healthRecords.Add(updated);
                return CreatedAtAction(nameof(GetHealthRecord), new { id = id }, updated);
            }
            record.Allergies = updated.Allergies;
            record.ChronicDiseases = updated.ChronicDiseases;
            record.Immunizations = updated.Immunizations;
            return record;
        }

        /// <summary>
        /// Delete health record for a student
        /// </summary>
        [HttpDelete("students/{id}/health")]
        public IActionResult DeleteHealthRecord(int id)
        {
            var record = healthRecords.FirstOrDefault(r => r.StudentId == id);
            if (record == null) return NotFound();
            healthRecords.Remove(record);
            return NoContent();
        }

        /// <summary>
        /// Get all medication requests
        /// </summary>
        [HttpGet("medications")]
        public ActionResult<IEnumerable<MedicationRequest>> GetMedicationRequests() => medicationRequests;

        /// <summary>
        /// Add a new medication request
        /// </summary>
        [HttpPost("medications")]
        public ActionResult<MedicationRequest> AddMedicationRequest([FromBody] MedicationRequest request)
        {
            request.Id = medicationRequests.Count > 0 ? medicationRequests.Max(m => m.Id) + 1 : 1;
            medicationRequests.Add(request);
            return CreatedAtAction(nameof(GetMedicationRequest), new { id = request.Id }, request);
        }

        /// <summary>
        /// Get a medication request by id
        /// </summary>
        [HttpGet("medications/{id}")]
        public ActionResult<MedicationRequest> GetMedicationRequest(int id)
        {
            var req = medicationRequests.FirstOrDefault(m => m.Id == id);
            if (req == null) return NotFound();
            return req;
        }

        /// <summary>
        /// Update a medication request
        /// </summary>
        [HttpPut("medications/{id}")]
        public ActionResult<MedicationRequest> UpdateMedicationRequest(int id, [FromBody] MedicationRequest updated)
        {
            var req = medicationRequests.FirstOrDefault(m => m.Id == id);
            if (req == null) return NotFound();
            req.StudentId = updated.StudentId;
            req.MedicineName = updated.MedicineName;
            req.Dosage = updated.Dosage;
            req.TimeOfDay = updated.TimeOfDay;
            req.Status = updated.Status;
            return req;
        }

        /// <summary>
        /// Delete a medication request
        /// </summary>
        [HttpDelete("medications/{id}")]
        public IActionResult DeleteMedicationRequest(int id)
        {
            var req = medicationRequests.FirstOrDefault(m => m.Id == id);
            if (req == null) return NotFound();
            medicationRequests.Remove(req);
            return NoContent();
        }

        /// <summary>
        /// Get all medical incidents
        /// </summary>
        [HttpGet("incidents")]
        public ActionResult<IEnumerable<MedicalIncident>> GetMedicalIncidents() => medicalIncidents;

        /// <summary>
        /// Add a new medical incident
        /// </summary>
        [HttpPost("incidents")]
        public ActionResult<MedicalIncident> AddMedicalIncident([FromBody] MedicalIncident incident)
        {
            incident.Id = medicalIncidents.Count > 0 ? medicalIncidents.Max(i => i.Id) + 1 : 1;
            medicalIncidents.Add(incident);
            return CreatedAtAction(nameof(GetMedicalIncident), new { id = incident.Id }, incident);
        }

        /// <summary>
        /// Get a medical incident by id
        /// </summary>
        [HttpGet("incidents/{id}")]
        public ActionResult<MedicalIncident> GetMedicalIncident(int id)
        {
            var inc = medicalIncidents.FirstOrDefault(i => i.Id == id);
            if (inc == null) return NotFound();
            return inc;
        }

        /// <summary>
        /// Update a medical incident
        /// </summary>
        [HttpPut("incidents/{id}")]
        public ActionResult<MedicalIncident> UpdateMedicalIncident(int id, [FromBody] MedicalIncident updated)
        {
            var inc = medicalIncidents.FirstOrDefault(i => i.Id == id);
            if (inc == null) return NotFound();
            inc.StudentId = updated.StudentId;
            inc.IncidentType = updated.IncidentType;
            inc.Description = updated.Description;
            inc.Date = updated.Date;
            inc.Status = updated.Status;
            inc.Resolution = updated.Resolution;
            return inc;
        }

        /// <summary>
        /// Delete a medical incident
        /// </summary>
        [HttpDelete("incidents/{id}")]
        public IActionResult DeleteMedicalIncident(int id)
        {
            var inc = medicalIncidents.FirstOrDefault(i => i.Id == id);
            if (inc == null) return NotFound();
            medicalIncidents.Remove(inc);
            return NoContent();
        }
    }

    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class HealthRecord
    {
        public int StudentId { get; set; }
        public string Allergies { get; set; } = string.Empty;
        public string ChronicDiseases { get; set; } = string.Empty;
        public string Immunizations { get; set; } = string.Empty;
    }

    public class MedicationRequest
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string MedicineName { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
        public string TimeOfDay { get; set; } = string.Empty; // e.g. "Sáng", "Trưa", "Chiều"
        public string Status { get; set; } = "Chờ xác nhận"; // e.g. "Chờ xác nhận", "Đã phát thuốc", "Đã từ chối"
    }

    public class MedicalIncident
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string IncidentType { get; set; } = string.Empty; // e.g. "Bệnh đột xuất", "Tai nạn"
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty; // ISO date string
        public string Status { get; set; } = "Đang xử lý"; // e.g. "Đang xử lý", "Đã giải quyết"
        public string Resolution { get; set; } = string.Empty;
    }
} 