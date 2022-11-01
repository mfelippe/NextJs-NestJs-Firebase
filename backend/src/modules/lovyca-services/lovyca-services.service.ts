import { Injectable } from '@nestjs/common';
import { db } from 'src/db/firebase';
import { servicesDTO } from './lovycaServices.dto';

@Injectable()
export class LovycaServicesService {
  async create(data: servicesDTO) {
    try {
      const newService = await db.collection('services').add(data);
      return newService.id;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async findAll(uid: string) {
    try {
      const services = db.collection('services');
      var query = await services.where('uid', '==', uid).get();
      if (query.empty) {
        throw 'nenhum serviço encontrado';
      }
      let res = [];
      query.forEach((doc) => {
        res.push(doc.data());
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id: string) {
    try {
      const service = db.collection('services').doc(id);
      const snapshot = await service.get();
      return snapshot.data();
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async update(id: string, data: servicesDTO) {
    try {
      const service = await db.collection('services').doc(id).update(data);
      return service;
    } catch (err) {
      console.log(err);
      return;
    }
  }
  async delete(id: string) {
    try {
      const service = await db.collection('services').doc(id).delete();
      return service;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
