import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LayoutsModule } from './layouts/layouts.module';

const apiConfig = {
  api: 'http://localhost:3000'
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    LayoutsModule
  ],
  providers: [
    { provide: 'apiConfig', useValue: apiConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
