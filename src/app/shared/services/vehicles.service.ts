import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Vehicle } from '../models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  collectionName = 'Bus';

  constructor(private afs: AngularFirestore) { }

  getAllBuses() {
    return this.afs.collection<Vehicle>(this.collectionName, ref => ref.orderBy('schedule', 'asc')).valueChanges();
  }

  getLinesByLineId(lineId: string) {
    return this.afs.collection<Vehicle>(this.collectionName, ref => ref.where('line_id', '==', lineId || '')).valueChanges();
  }

  addVehicle(vehicle: Vehicle) {
    return this.afs.collection<Vehicle>(this.collectionName).doc(vehicle.line_id).set(vehicle);
  }
}
