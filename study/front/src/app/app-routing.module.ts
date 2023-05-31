import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'view-user/:id',
    loadChildren: () => import('./view-user/view-user.module').then( m => m.ViewUserPageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'list-themes',
    loadChildren: () => import('./list-themes/list-themes.module').then( m => m.ListThemesPageModule)
  },
  {
    path: 'list-topics',
    loadChildren: () => import('./list-topics/list-topics.module').then( m => m.ListTopicsPageModule)
  },
  {
    path: 'edit-topic/:id',
    loadChildren: () => import('./edit-topic/edit-topic.module').then( m => m.EditTopicPageModule)
  },
  {
    path: 'view-topic/:id',
    loadChildren: () => import('./view-topic/view-topic.module').then( m => m.ViewTopicPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }