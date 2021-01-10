import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Comment } from '../../../../../../Graphql/Graphql';
import CommentTile from './CommentTile';

let container: HTMLDivElement | null = null;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

it('Renders correct comment information', () => {
	const comment: Pick<Comment, 'id' | 'name' | 'body' | 'email'> = {
		id: '111',
		name: 'John Smith',
		body: 'This is a comment',
		email: 'john.smith@gmail.com',
	};

	act(() => {
		container &&
			render(<CommentTile comment={comment} />, {
				container,
			});
	});
	expect(screen.queryByText(comment.name ?? '')).toBeInTheDocument();
	expect(screen.queryByText(comment.body ?? '')).toBeInTheDocument();
	expect(screen.queryByText(comment.email ?? '')).toBeInTheDocument();
});

it('Renders skeletons when loading is true', () => {
	const comment: Pick<Comment, 'id' | 'name' | 'body' | 'email'> = {
		id: '111',
		name: 'John Smith',
		body: 'This is a comment',
		email: 'john.smith@gmail.com',
	};

	act(() => {
		container &&
			render(
				<MemoryRouter initialEntries={['/user/1']}>
					<CommentTile comment={comment} loading={true} />
				</MemoryRouter>,
				{
					container,
				}
			);
	});
	expect(screen.queryByText(comment.name ?? '')).not.toBeInTheDocument();
	expect(screen.queryByText(comment.body ?? '')).not.toBeInTheDocument();
	expect(screen.queryByText(comment.email ?? '')).not.toBeInTheDocument();
});

afterEach(() => {
	container && unmountComponentAtNode(container);
	container && container.remove();
	container = null;
});
