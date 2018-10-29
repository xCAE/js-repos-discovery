import gql from "graphql-tag";
import Moment from 'moment';

export const getQueryString = (queryText, selectedLicenses) =>  {
    const dateFilter = ` created:>=${Moment().add(-1, 'months').format('YYYY-MM-DD')}`;
    const licenseFilter = selectedLicenses.reduce((result, key) => `${result} license:${key}`, '');
    const nameFilter = queryText.length 
        ? ` ${queryText} in:name` 
        : '';
    return `language:javascript archived:false sort:stars${dateFilter}${licenseFilter}${nameFilter}`;
}

export const getPageGqlQuery = (position, place = '') => gql`
query Search($queryString: String!, $count: Int!) {
    search(type: REPOSITORY, query: $queryString, ${position}: $count ${place} ) {
        repositoryCount
        pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        edges {
            node {
                ... on Repository {
                    id
                    name
                    createdAt
                    description
                    url
                    owner {
                        login
                        url
                        avatarUrl
                    }
                    licenseInfo {
                        name 
                    }
                    stargazers {
                        totalCount
                    }
                }
            }
        }
    }
}
`