import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'card',
        children: [
          // { path: '', loadChildren: './card/module#CardModule' }
          {
            path: '',
            loadChildren: () => import('../card/card.module').then(m => m.CardModule)
          },
        ]
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: '../favorite/favorite.module#FavoritePageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/card',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
