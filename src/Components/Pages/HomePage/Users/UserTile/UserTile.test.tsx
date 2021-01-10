import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import UserTile from './UserTile';
import { User } from '../../../../../Graphql/Graphql';
import { MemoryRouter } from 'react-router-dom';

let container: HTMLDivElement | null = null;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

it('Renders correct user information', () => {
	const user: Pick<User, 'id' | 'name' | 'company'> = {
		id: '1',
		name: 'John Smith',
		company: {
			name: 'Microsoft',
			catchPhrase: 'We force windows updates when you have something important to do',
			bs: 'Software development',
		},
	};

	act(() => {
		container &&
			render(
				<MemoryRouter initialEntries={['/user/1']}>
					<UserTile user={user} />
				</MemoryRouter>,
				{
					container,
				}
			);
	});
	expect(screen.queryByText(user.name as string)).toBeInTheDocument();
	expect(screen.queryByText(user.company?.name as string)).toBeInTheDocument();
	expect(screen.queryByText(user.company?.catchPhrase as string)).toBeInTheDocument();
	expect(screen.queryByText(user.company?.bs as string)).toBeInTheDocument();
});

it('Renders skeletons when loading is true', () => {
	const user: Pick<User, 'id' | 'name' | 'company'> = {
		id: '1',
		name: 'John Smith',
		company: {
			name: 'Microsoft',
			catchPhrase: 'We force windows updates when you have something important to do',
			bs: 'Software development',
		},
	};

	act(() => {
		container &&
			render(
				<MemoryRouter initialEntries={['/user/1']}>
					<UserTile user={user} loading={true} />
				</MemoryRouter>,
				{
					container,
				}
			);
	});
	expect(screen.queryByText(user.name as string)).not.toBeInTheDocument();
	expect(screen.queryByText(user.company?.name as string)).not.toBeInTheDocument();
	expect(screen.queryByText(user.company?.catchPhrase as string)).not.toBeInTheDocument();
	expect(screen.queryByText(user.company?.bs as string)).not.toBeInTheDocument();
});

afterEach(() => {
	container && unmountComponentAtNode(container);
	container && container.remove();
	container = null;
});
