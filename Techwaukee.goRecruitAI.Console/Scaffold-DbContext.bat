﻿dotnet ef dbcontext scaffold "Server=.\SQLEXPRESS;database=recruIT;TrustServerCertificate=True;Integrated Security=True;Pooling=False;Connection Timeout=300;command timeout=300;" Microsoft.EntityFrameworkCore.SqlServer -o Models