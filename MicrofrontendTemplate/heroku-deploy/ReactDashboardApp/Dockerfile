FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
LABEL stage=build
WORKDIR /src
COPY ./__tmp__ .

# Install node.js
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
    
RUN dotnet publish ./ReactDashboardApp/ReactDashboardApp.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app .
ARG aspnetenv=Production

ENV ASPNETCORE_ENVIRONMENT ${aspnetenv}
CMD ASPNETCORE_URLS=http://*:$PORT dotnet ReactDashboardApp.dll