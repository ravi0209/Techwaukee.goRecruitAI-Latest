//using recruIT_CurrentUI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Serilog;
using Techwaukee.goRecruitAI.CustomMiddleware.ErrorHandling;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Repository;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.UI.Models;

var builder = WebApplication.CreateBuilder(args);
var settings = builder.Configuration.GetSection("Settings").Get<AppSettings>();

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

//SeriLog: Setup SeriLog for Dependency injection
var logger = new LoggerConfiguration()
        .ReadFrom.Configuration(builder.Configuration)
        .Enrich.FromLogContext()
        .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

// Add services to the container.
builder.Services.AddControllersWithViews();

////Api Service
//builder.Services.AddHttpClient<ICandidate, CandidateService>(client =>
//{
//    client.BaseAddress = new Uri(settings?.APIBaseURL + "/Candidate/");
//});
//builder.Services.AddHttpClient<ILookupService, LookupService>(client =>
//{
//    client.BaseAddress = new Uri(settings?.APIBaseURL + "/Lookup/");
//});
//builder.Services.AddHttpClient<IJobMaster, JobmasterService>(client =>
//{
//    client.BaseAddress = new Uri(settings?.APIBaseURL + "/Job/");
//});
//builder.Services.AddHttpClient<IDashboardService, DashboardService>(client =>
//{
//    //ISession session = HttpContext.Session;
//    //client.DefaultRequestHeaders.Authorization =
//    //new AuthenticationHeaderValue("Bearer", Microsoft.AspNetCore.Http.HttpContext("UserData"));

//    client.BaseAddress = new Uri(settings?.APIBaseURL + "/Dashboard/");
//});
//builder.Services.AddHttpClient<IUserService, UserService>(client =>
//{
//    client.BaseAddress = new Uri(settings?.APIBaseURL + "/User/");
//});
//builder.Services.AddHttpClient<ITokenService, TokenService>(client =>
//{
//    client.BaseAddress = new Uri(settings?.APIBaseURL + "/Token/");
//});

//connectionstring
builder.Services.AddDbContext<RecruitContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("RecruitConnection")));

//repositories
builder.Services.AddScoped<ICandidateService, CandidateRepository>();
builder.Services.AddScoped<ILookupService, LookupRepository>();
builder.Services.AddScoped<IJobMaster, JobmasterServiceRepository>();
builder.Services.AddScoped<IDashboardService, DashboardRepository>();
builder.Services.AddScoped<IUserService, UserRepository>();
builder.Services.AddScoped<ITokenService, TokenRepository>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddMemoryCache();
builder.Services.AddSession(options =>
{
    //options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

////Authentication
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
//{
//    options.RequireHttpsMetadata = false;
//    options.SaveToken = true;
//    options.TokenValidationParameters = new TokenValidationParameters()
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidAudience = builder.Configuration["Jwt:Audience"],
//        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//    };
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//Custom Middleware for Errorhandling
app.UseMiddleware(typeof(GlobalErrorHandlingMiddleware));

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseSession();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=user}/{action=login}/{id?}");

app.Run();