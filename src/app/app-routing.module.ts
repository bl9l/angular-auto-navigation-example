import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { NavigationLayoutComponent } from './navigation-layout/navigation-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactsPageComponent } from './pages/contants-page/contacts-page.component';

// TypeSafe наше всё
export interface RouteWithData extends Route {
  data?: {
    title: string,
  }
}

const routes: RouteWithData[] = [
  {
    path: '',
    data: {
      title: 'layout'
    },
    component: NavigationLayoutComponent,
    children: [
      {
        path: 'home',
        data: {
          title: 'Home',
        },
        component: HomePageComponent,
      },
      {
        path: 'contacts',
        data: {
          title: 'Contacts',
        },
        component: ContactsPageComponent,
      },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
