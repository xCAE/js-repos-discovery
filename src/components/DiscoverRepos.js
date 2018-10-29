import React, { Component } from 'react';
import { getPageGqlQuery, getQueryString } from '../gqls/helpers';
import ReposPages from './ReposPages';
import FilterLicenses from './FilterLicenses';
import FilterNames from './FilterNames';

class DiscoverRepos extends Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    componentDidUpdate () {
        const { queryText, position, count, place, selectedLicenses } = this.state;
        localStorage.setItem('state', JSON.stringify({
            queryText, 
            position, 
            count, 
            place, 
            selectedLicenses: [...selectedLicenses.keys()]
        }));
    }

    initState = () => {
        const initialState = {
            queryText: '',
            position: 'first',
            count: 10,
            place: '',
            selectedLicenses: new Set(),
        } 
        const persistedState = JSON.parse(localStorage.getItem('state'));
        if (persistedState) {
            return Object.assign ({}, 
                initialState, 
                persistedState, 
                {
                    selectedLicenses: persistedState.selectedLicenses 
                        ? new Set(persistedState.selectedLicenses)
                        : new Set() 
                },
            );
        }        
        return initialState;
    }

    onSelectLicense = ({target:{value}}) => {
        const selectedLicenses = new Set(this.state.selectedLicenses);
        if (selectedLicenses.has(value)) {
            selectedLicenses.delete(value);
        } else {
            selectedLicenses.add(value);
        }
        this.setState({
            selectedLicenses,
            place: '',
            position: 'first',
        });
    }

    onChangeQueryText = ({target:{value}}) => {
        this.setState({
            queryText: value,
            place: '',
            position: 'first',
        });
    }

    goToNextPage = (hasNextPage, endCursor) => {
        if (hasNextPage) {
            this.setState({
                position: 'first',
                place: `after: ${endCursor}`,
            });
        }
    }

    goToPreviousPage = (hasPreviousPage, startCursor) => {
        if (hasPreviousPage) {
            this.setState({
                position: 'last',
                place: `before: ${startCursor}`,
            });
        }
    }

    render () {
        const pagesGqlProps = {
            pageQuery: getPageGqlQuery(this.state.position, this.state.place),
            pageVariables: {
                queryString: getQueryString(this.state.queryText, [...this.state.selectedLicenses.keys()]),
                count: this.state.count,
            },
        }
        return (
            <div className="container responsive">
                <div class="border-bottom mb-3 card">
                    <div class="container responsive text-center py-6">
                        <h1 class="f0-light">Discover JavaScript repositories</h1>
                        <p class="f4 text-gray col-md-6 mx-auto">
                            Results delivery are based on popularity and filters you set
                        </p>
                    </div>
                </div>
                <div className="d-felx flex-row">
                    <FilterNames 
                        queryText={this.state.queryText}
                        onChangeQueryText={this.onChangeQueryText}
                    />
                    <FilterLicenses 
                        selected={this.state.selectedLicenses} 
                        toggleSelection={this.onSelectLicense}
                    />
                </div>
                <ReposPages
                    goToNextPage={this.goToNextPage}
                    goToPreviousPage={this.goToPreviousPage}
                    {...pagesGqlProps}
                />
              </div>
        );
    }
}

export default DiscoverRepos;