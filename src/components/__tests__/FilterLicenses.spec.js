import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import FilterLicenses from '../FilterLicenses';
import Renderer from 'react-test-renderer';
import {GQL_QUERY_LICENSES_LIST } from '../../gqls/constants';


describe('FilterLicenses component testing suite', () => {

    const wait = require('waait');
    
    const QUERY = GQL_QUERY_LICENSES_LIST
    
    const mocks = [
        {
            request: {
                query: QUERY,
            },
            result: {
              data: {
                licenses: [
                    {key: "3344", name: "text_name_0"},
                    {key: "33434", name: "text_name_1"},
                    {key: "34344", name: "text_name_2"},
                    ]
                },
            },
        }
    ];

    const mocksWithError = [
        {
            request: {
                query: QUERY,
            },
            result: {
              errors: [{ message: "Error!" }],
            }
      }
    ];
    
    it('renders LicensesFilter component without error', () => {
        Renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FilterLicenses selected={new Set()} toggleSelection={()=>{}}/>
            </MockedProvider>
        );
    });
    
    it('should render loading state initially', () => {
        const component = Renderer.create(
          <MockedProvider mocks={[]}>
             <FilterLicenses selected={new Set()} toggleSelection={()=>{}}/>
          </MockedProvider>,
        );
        
        const actualValue = component.toJSON().children;
        const expectedValue = 'Loading licenses...';
        expect(actualValue).toContain(expectedValue);
    });

    it('should render an error state', async () => {
        const component = Renderer.create(
          <MockedProvider mocks={mocksWithError} addTypename={false}>
             <FilterLicenses selected={new Set()} toggleSelection={()=>{}}/>
          </MockedProvider>,
        );
        await wait(0);
        const actualValue = component.toJSON().children[0];
        const expectedValue = 'Error';
        expect(actualValue).toContain(expectedValue);
    });
    
     it('should fetching licenses and render correct', async () => {
        const component = Renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <FilterLicenses selected={new Set()} toggleSelection={()=>{}}/>
            </MockedProvider>
        );
        
        await wait(0);

        const actualValue = component.toJSON().children
        expect(actualValue.length).toEqual(mocks[0].result.data.licenses.length + 1);
        expect(actualValue[1].children[0].type).toEqual("input");
        expect(actualValue[1].children[0].props.id).toEqual(mocks[0].result.data.licenses[0].key);
        expect(actualValue[1].children[1].children[0]).toEqual(mocks[0].result.data.licenses[0].name);
        expect(actualValue[2].children[0].type).toEqual("input");
        expect(actualValue[2].children[0].props.id).toEqual(mocks[0].result.data.licenses[1].key);
        expect(actualValue[2].children[1].children[0]).toEqual(mocks[0].result.data.licenses[1].name);
        expect(actualValue[3].children[0].type).toEqual("input");
    }); 
    

});