import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NavigationComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NavigationComponent,
  ],
})
export class ComponentsModule {}
