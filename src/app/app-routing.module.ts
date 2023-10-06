import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  {
    path: '', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },
  {
    path: 'collection', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },

  {
    path: 'category/art', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },
  {
    path: 'category/photo', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },
  {
    path: 'category/gaming', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },
  {
    path: 'category/pfps', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },

  {
    path: 'nft', loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  },

  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
