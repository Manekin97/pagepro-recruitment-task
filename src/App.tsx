import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserDetailsLayout } from './Components/Layouts';
import { HomePage, PostDetailsPage, UserDetailsPage } from './Components/Pages';
import createApolloClient from './Graphql/client';
import { routes } from './Helpers';
import BaseLayout from './Components/Layouts/BaseLayout/BaseLayout';
import { SkeletonTheme } from 'react-loading-skeleton';

const client = createApolloClient();

function App() {
	return (
		<ApolloProvider client={client}>
			<SkeletonTheme color='#294e87' highlightColor='#becbe8'>
				<BrowserRouter>
					<Switch>
						<Route path={routes.users}>
							<UserDetailsLayout>
								<Switch>
									<Route exact path={routes.userDetails}>
										<UserDetailsPage />
									</Route>

									<Route exact path={routes.postDetails}>
										<PostDetailsPage />
									</Route>

									<Redirect from={routes.users} to={routes.homepage} />
								</Switch>
							</UserDetailsLayout>
						</Route>

						<Route exact path={routes.homepage}>
							<BaseLayout>
								<HomePage />
							</BaseLayout>
						</Route>

						<Redirect to={routes.homepage} />
					</Switch>
				</BrowserRouter>
			</SkeletonTheme>
		</ApolloProvider>
	);
}

export default App;
