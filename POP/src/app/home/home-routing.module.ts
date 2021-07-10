import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ResolverService } from '../resolver/resolver.service';


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
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: '',
        redirectTo: '/home/discover',
        pathMatch: 'full'
      },
      {
        path: 'profiles/:id',
        resolve: {
          user: ResolverService,
        },
        loadChildren: () => import('../home/profiles/profiles.module').then(m => m.ProfilesPageModule)
      },
      {
        path: 'forum',
        loadChildren: () => import('../home/forum/forum.module').then(m => m.ForumPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
