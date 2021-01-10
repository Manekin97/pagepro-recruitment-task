import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => {
	return new ApolloClient({
		link: new HttpLink({
			uri: 'https://graphqlzero.almansi.me/api',
		}),
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;
