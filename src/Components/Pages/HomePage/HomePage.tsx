import { useQuery } from '@apollo/client';
import React from 'react';
import { GetUsersQuery } from '../../../Graphql/Graphql';
import { GET_USERS } from '../../../Graphql/Queries';
import Users from './Users/Users';
const HomePage = () => {
	const { data, loading } = useQuery<GetUsersQuery>(GET_USERS);

	return <Users usersData={data?.users} loading={loading} />;
};

export default HomePage;
