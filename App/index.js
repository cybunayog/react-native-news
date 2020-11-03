import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { client } from 'news/App/graphql/client';
import { TopHeadlines } from 'news/App/graphql/queries';
import { ArticleRow } from 'news/App/components/ArticleRow';

const styles = StyleSheet.create({
  headerText: {
    color: '#ff8d01',
    fontWeight: 'bold',
    fontSize: 40,
    paddingHorizontal: 10,
    marginBottom: 30,
    marginTop: 10,
  },
});

class App extends React.Component {
  state = {
    articles: [],
    loading: true,
  };

    componentDidMount() {
    this.requestTopHeadlines();
  }

  requestTopHeadlines = () => {
    client
      .query({
        query: TopHeadlines,
        variables: { category: 'technology '}
      })
      .then(res => {
        console.log('response', res);
        this.setState({
          loading: res.loading,
          articles: res.data.headlines.articles
        })
      })
      .catch(e => {
        console.log('error', e);
      });
  };

  renderFooter = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return null;
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.articles}
          ListHeaderComponent={
            <Text style={styles.headerText}>Top Headlines</Text>
          }
          renderItem={({ item, index }) => <ArticleRow index={index} {...item} />}
          keyExtractor={item => `${item.publishedAt}-${item.title}`}
          ListFooterComponent={this.renderFooter()}
        />
      </SafeAreaView>
    );
  }
}

export default App;