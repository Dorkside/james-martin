import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) {

  }

  getPosts() {
    return this.apollo.watchQuery({
      query: gql`
        {
          allPost {
            edges {
              node {
                id
                title
                content
              }
            }
          }
        }
      `
    }).valueChanges
  }
}
