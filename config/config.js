const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || 
        process.env.MONGO_HOST || 
        'mongodb+srv://db_2510:helloWorld2020@cluster0-eyvbu.mongodb.net/local_library?retryWrites=true&w=majority' 
}

export default config