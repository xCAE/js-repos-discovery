import gql from "graphql-tag";


export const GQL_QUERY_LICENSES_LIST = gql`
query { 
    licenses {
      name
      key
    }
  }
`;
