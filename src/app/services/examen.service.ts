import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  constructor(private firestore: AngularFirestore) {}
  agregarInfo(createInfo: any): Promise<any> {
    return this.firestore.collection('informacion').add(createInfo);
  }
}
