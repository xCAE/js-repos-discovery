import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import DiscoverRepos from '../DiscoverRepos';
import Renderer from 'react-test-renderer';

it('Should render DiscoverRepos component without crashes', () => {
    Renderer.create(
        <MockedProvider mocks={[]} addTypename={false}>
            <DiscoverRepos/>
        </MockedProvider>
    );
});
