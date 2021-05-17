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
        path: 'camera',
        loadChildren: () => import('../home/camera/camera.module').then(m => m.CameraPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../home/profile/profile.module').then(m => m.ProfilePageModule)
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
