import { registerAs } from '@nestjs/config'

export default registerAs('firebase', () => ({
  serviceAccount:
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string) || {},
}))
