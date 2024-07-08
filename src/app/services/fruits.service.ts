import { Injectable } from '@angular/core';
import { Fruit } from '../entities/entities';
import { fruits } from '../mock/fruits-mock';

@Injectable({
  providedIn: 'root'
})
export class FruitsService {

  constructor() { }

  getAllFruits() {
    return fruits;
  }

}
