import admin from 'firebase-admin'
import { serviceAccount } from './serviceAccountKey.js'
import { FirebaseContainer } from '../containers/FirebaseContainer.js'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

class MessagesFirebaseDAO extends FirebaseContainer {
    constructor() { 
        super('Messages')
    }
}

export default MessagesFirebaseDAO