import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FruitsService } from '../services/fruits.service';
import { Fruit } from '../entities/entities';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fruits: Fruit[] = [];
  cart: { fruit: Fruit, quantity: number }[] = [];

  constructor(private fruitsService: FruitsService) {}

  ngOnInit(): void {
    this.fruits = this.fruitsService.getAllFruits();
  }

  increment(fruit: Fruit): void {
    fruit.quantite++;
  }

  decrement(fruit: Fruit): void {
    if (fruit.quantite > 0) {
      fruit.quantite--;
    }
  }

  addToCart(fruit: Fruit): void {
    if (fruit.quantite > 0) {
      const existingItem = this.cart.find(item => item.fruit.nom === fruit.nom);
      if (existingItem) {
        existingItem.quantity += fruit.quantite;
      } else {
        this.cart.push({ fruit: { ...fruit }, quantity: fruit.quantite });
      }
      fruit.quantite = 0; 
    }
  }

  removeFromCart(index: number): void {
    this.cart = this.cart.filter((item, i) => i !== index);
  }

  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total += item.quantity, 0);
  }

  getTotalHT(): number {
    return this.cart.reduce((total, item) => total += item.fruit.prixHT * item.quantity, 0);
  }

  getTotalTTC(): string {
    const tva = 0.2; 
    const totalHT = this.getTotalHT();
    const totalTTC = totalHT * (1 + tva);
    return totalTTC.toFixed(2);
  }
}
