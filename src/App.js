import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import DiscoverRepos from './components/DiscoverRepos';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

class App extends Component {
  state = {
    client: null,
    loaded: false,
  };

  async componentDidMount() {
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      uri: 'https://api.github.com/graphql',
      cache,
      headers: {
        Authorization: 'Bearer 84d50b5f6bea9671c15be94c6585117e9cc9635d'
      }
    });

    try {
      await persistCache({
        cache,
        storage: window.localStorage,
      });
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }

    this.setState({
      client,
      loaded: true,
    });
  }

  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <ApolloProvider client={client}>
         <div className='App'>
          <DiscoverRepos/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
