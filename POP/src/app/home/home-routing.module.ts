import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';



const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'discover',
        loadChildren: () => import('../home/discover/discover.module').then(m => m.DiscoverPageModule)
      },
      {
        path: 'social',
        loadChildren: () => import('../home/social/social.module').then(m => m.SocialPageModule)
      },
      {
        path: 'portfolio',
        loadChildren: () => import('../home/portfolio/portfolio.module').then(m => m.PortfolioPageModule)
      },
      {
        path: '',
        redirectTo: '/home/discover',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
