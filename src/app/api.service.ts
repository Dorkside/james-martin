import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as moment from 'moment';

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
          posts(where:{
            status: PUBLISHED,
            publication_lte: "${moment().endOf('day').format()}"
          }) {
            id
            title
            publication
            content
          }
        }
      `
    }).valueChanges
  }
}
