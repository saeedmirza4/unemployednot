namespace UnemployedNotAPI.Models
{
    public class Application
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public string JobTitle { get; set; } = "";
        public string Company { get; set; } = "";
        public int UserId { get; set; }
        public string CoverLetter { get; set; } = "";
        public string Status { get; set; } = "pending";
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
    }
}