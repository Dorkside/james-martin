import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { MobxAngularModule } from 'mobx-angular';
import { GravatarModule } from 'ngx-gravatar';
import { MarkdownModule } from 'ngx-markdown';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { GraphQLModule } from './graphql.module';

import { DisqusModule } from "ngx-disqus";
import { ArticleComponent } from './article/article.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    FlexLayoutModule,
    MatListModule,
    MatExpansionModule,
    GravatarModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    GraphQLModule,
    MobxAngularModule,
    FontAwesomeModule,
    DisqusModule.forRoot('james-martin')
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faTwitter)
  }
}
