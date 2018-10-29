
import React from 'react';

export const FilterNames  = (props) => {
    // debounce
    return (

        <div class='input-group mb-3'>
            <div class='input-group-prepend'>
                <label 
                    for='FilterNames' 
                    className='input-group-text font-weight-bold' 
                    id='inputGroup-sizing-default'
                >
                    Search:
                </label>
            </div>
            <input
                id='FilterNames'
                name='FilterNames'
                value={props.queryText}
                type='text'
                onChange={props.onChangeQueryText}
                className='form-control' 
                aria-label='Sizing example input' 
                aria-describedby='inputGroup-sizing-default'
            />
       </div>
    );
};

export default FilterNames;