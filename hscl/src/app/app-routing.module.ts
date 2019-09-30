import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' },
  // { path: 'card-detail', loadChildren: './card/card-detail/card-detail.module#CardDetailPageModule' },
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
  // { path: 'card-listing', loadChildren: './card/card-listing/card-listing.module#CardListingPageModule' },
  // { path: 'card-deck', loadChildren: './card/card-deck/card-deck.module#CardDeckPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
