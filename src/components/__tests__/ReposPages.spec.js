import { MockedProvider } from 'react-apollo/test-utils';
import React from 'react';
import Renderer from 'react-test-renderer';
import { getPageGqlQuery } from '../../gqls/helpers';
import ReposPages from '../ReposPages';


describe('ReposPages component test', () => {

    const wait = require('waait');
    
    const QUERY = getPageGqlQuery('first');
    
    const mocks = [
        {
            request: {
                query: QUERY,
                variables: {
                    queryString: 'Buck',
                    count: 10
                    },
            },
            result: {
              data: {
                search: { 
                    edges: [
                        { node: { 
                            id: 7,
                            url: 'https://github.com/Curt/Test_repo_name', 
                            name: "Test_repo_name", 
                            description: "Test_repo_descpirtion", 
                            stargazers: { totalCount: 7}, 
                            createdAt: "10-30-20",
                            owner: {
                                login: "Court",
                                url: "https://github.com/Curt",
                                avatarUrl: "https://github.com/d/f/g/r?d=4"
                            },
                            licenseInfo: {
                                name: "Unlicensed",
                            }
                            }
                        }
                    ], 
                    pageInfo: { hasPreviousPage: false, hasNextPage: false,  endCursor:"dddd",  startCursor:"555r" },
                    repositoryCount: 6,
                },
              },
            }
      }
    ];

    const mocksWithError = [
        {
            request: {
                query: QUERY,
                variables: {
                    queryString: 'Buck',
                    count: 10
                    },
            },
            result: {
              errors: [{ message: "Error!" }],
            }
      }
    ];
    
    const pageVariables = mocks[0].request.variables; 
    
    it('renders ReposPages component without error', () => {
        Renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReposPages pageQuery={QUERY} pageVariables={pageVariables}/>
            </MockedProvider>
        );
    });
    
    it('should render loading state initially', () => {
        const component = Renderer.create(
          <MockedProvider mocks={[]}>
             <ReposPages pageQuery={QUERY} pageVariables={pageVariables}/>
          </MockedProvider>,
        );
        
        const actualValue = component.toJSON().children;
        const expectedValue = 'Loading...';
        expect(actualValue).toContain(expectedValue);
    });

    it('should render an error state', async () => {
        const component = Renderer.create(
          <MockedProvider mocks={mocksWithError} addTypename={false}>
             <ReposPages pageQuery={QUERY} pageVariables={pageVariables}/>
          </MockedProvider>,
        );
        await wait(0);
        const actualValue = component.toJSON().children[0];
        const expectedValue = 'Error';
        expect(actualValue).toContain(expectedValue);
    });
    
    it('should test ReposPage component for fetching repositories info and render correctly', async () => {
        const component = Renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReposPages pageQuery={QUERY} pageVariables={pageVariables}/>
            </MockedProvider>
        );
        
        await wait(0);

        const actualValue = component.toJSON().children[0].children[0].children[0].props;

        expect(actualValue.title).toEqual("Court");
        expect(actualValue.href).toEqual("https://github.com/Curt");
        
    });
    

});