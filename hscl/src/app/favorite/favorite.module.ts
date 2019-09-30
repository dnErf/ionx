import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardFavoritePage } from './favorite.page';
import { FavoriteCardStore } from '../card/shared/card-favorite.store';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: CardFavoritePage }
    ])
  ],
  declarations: [CardFavoritePage]
})
export class FavoritePageModule {}
