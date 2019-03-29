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

  getPages() {
    return this.apollo.watchQuery({
      query: gql`
        {
          pages(where: { status: PUBLISHED })  {
            title
            content
          }
        }
      `
    }).valueChanges
  }

  getProjects() {
    return this.apollo.watchQuery({
      query: gql`
        {
          projects(where: { status: PUBLISHED })  {
            id
            title
            poste
            client
          }
        }
      `
    }).valueChanges
  }

  getEmployers() {
    return this.apollo.watchQuery({
      query: gql`
        {
          employers(where: { status: PUBLISHED })  {
            id
            name
            poste
            description
            startDate
            endDate
            projects {
              id
            }
          }
        }
      `
    }).valueChanges
  }

  getSkillCategories() {
    return this.apollo.watchQuery({
      query: gql`
        {
          skillCategories(where: { status: PUBLISHED })  {
            name
            skills {
              id
            }
          }
        }
      `
    }).valueChanges
  }

  getSkills() {
    return this.apollo.watchQuery({
      query: gql`
        {
          skills(where: { status: PUBLISHED }) {
            id
            name
            type
            skillCategory {
              name
            }
          }
        }
      `
    }).valueChanges
  }
}
