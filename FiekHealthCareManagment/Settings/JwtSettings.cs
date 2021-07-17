namespace FiekHealthCareManagment.Settings
{
    public class JwtSettings
    {
        public static readonly string SectionName  = "JwtSettings";
        public string Secret { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}