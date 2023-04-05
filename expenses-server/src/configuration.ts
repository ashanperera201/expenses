export const configuration = () => ({
    env: process.env.NODE_ENV,
    port: process.env.API_PORT,
    databaseConfig: {
        connection: process.env.APP_DATABASE_CONNECTION,
        connectionName: process.env.APP_CONNECTION_NAME,
    },
    applicationConfig: {
        serverTitle: process.env.APP_SERVER_TITLE,
        applicationServerDescription: process.env.APPLICATION_SERVER_DESCRIPTION,
        apiVersion: process.env.API_VERSION,
        swaggerUri: process.env.API_SWAGGER_URI,
    },
});
