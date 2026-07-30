import dotenv from "dotenv"

dotenv.config()

interface Config {
    port: number
    nodeEnv: string
    mongoUri: string
    jwtAccessSecret: string
    jwtAccessExpiresIn: string
    jwtRefreshSecret: string
    jwtRefreshExpiresIn: string
    gmailUser: string
    gmailAppPass: string
    ownerFirstName : string
    ownerLastName : string
    ownerEmail : string
    ownerPassword : string
    ownerMobileNumber : string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || '',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    gmailUser: process.env.GMAIL_USER || '',
    gmailAppPass: process.env.GMAIL_APP_PASS || '',
    ownerFirstName : process.env.OWNER_FIRST_NAME || '',
    ownerLastName : process.env.OWNER_LAST_NAME || '',
    ownerEmail : process.env.OWNER_EMAIL || '',
    ownerPassword : process.env.OWNER_PASSWORD || '',
    ownerMobileNumber : process.env.OWNER_MOBILE_NUMBER || '',

}

// Critical vars ke liye validation — agar missing ho to startup pe hi crash kar do
const requiredVars: (keyof Config)[] = ['mongoUri', 'jwtAccessSecret', 'jwtRefreshSecret']

for (const key of requiredVars) {
    if (!config[key]) {
        throw new Error(`Missing required env variable for: ${key}`)
    }
}

export default config