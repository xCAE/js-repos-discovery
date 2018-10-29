
import React from 'react';
import { Query } from 'react-apollo';
import { GQL_QUERY_LICENSES_LIST } from '../gqls/constants';

export const FilterLicenses = (props) => {

    return (
        <Query query={GQL_QUERY_LICENSES_LIST} >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading licenses...</p>;
                if (error) return <p>Error</p>;
                return (
                  <div className='card d-flex flex-column px-3 py-2'>
                    <h6 className='text-left pt-2'>Filter by license type: </h6>
                    { data.licenses && data.licenses.length &&
                      data.licenses.map(lic => 
                      <div className='nowrap text-left' key={lic.key}>
                            
                                <input
                                    id={lic.key}
                                    name={lic.key}
                                    value={lic.key}
                                    type='checkbox' 
                                    checked={props.selected.has(lic.key)}  
                                    onChange={props.toggleSelection}
                                    className='mx-3'
                                />
                            <label htmlFor={lic.key} className='checkbox'> {lic.name}</label>
                      </div>)
                    }
                  </div>
                );
            }}
        </Query>
    );
};

export default FilterLicenses;