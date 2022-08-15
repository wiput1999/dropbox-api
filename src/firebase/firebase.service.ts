import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as firebase from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App

  constructor(private configService: ConfigService) {
    if (firebase.apps.length === 0) {
      const serviceAccount = this.configService.get<ServiceAccount>(
        'firebase.serviceAccount',
      )

      this.firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
      })
    }
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth()
  }
}
