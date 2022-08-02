import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin'
import * as serviceAccount from '../../serviceAccount.json'

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App

  constructor() {
    if (firebase.apps.length === 0) {
      this.firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount as ServiceAccount),
      })
    }
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth()
  }
}
