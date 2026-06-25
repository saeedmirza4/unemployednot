namespace UnemployedNotAPI.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Company { get; set; } = "";
        public string Location { get; set; } = "";
        public string Category { get; set; } = "";
        public string Description { get; set; } = "";
        public string Salary { get; set; } = "";
        public DateTime PostedAt { get; set; } = DateTime.UtcNow;
        public int PostedByUserId { get; set; }
    }
}