import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./modal/comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./modal/portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  },
  // {
  //   path: 'social',
  //   loadChildren: () => import('./social/social.module').then( m => m.SocialPageModule)
  // },
  // {
  //   path: 'portfolio',
  //   loadChildren: () => import('./portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
