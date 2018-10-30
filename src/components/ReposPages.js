
import React from 'react';
import { Query } from 'react-apollo';
import { PagesNavigation } from './PagesNavigation';
import { Repository } from './Repository';

export const ReposPages = (props) =>  {

    return (
        <Query 
            query={props.pageQuery} 
            variables={props.pageVariables} 
            > 
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                if (data.search.edges && !data.search.edges.length) return <p>No Results</p>; 
                return (
                    <div>
                        {data.search.edges.map(p => <Repository key={p.node.id} {...p.node}/>)}
                        <PagesNavigation
                            info={data.search.pageInfo}
                            goToNextPage={props.goToNextPage}
                            goToPreviousPage={props.goToPreviousPage}
                        />
                    </div>
                );
            }}
        </Query>
    );
};

export default ReposPages;