import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { darken, lighten } from 'polished';
import {
	primaryColor,
	primaryText,
	textOnPrimaryColor,
	secondaryText,
	successColor,
} from '../theme.js';

const deleteListMutation = gql`
	mutation DeleteList($id: ID!) {
		deleteList(id: $id) {
			id
		}
	}
`;

const Account = ({ user }) => {
	if (!user) return <div>Please log in to view account page.</div>;
	return (
		<Container>
			<PageTitle>Account</PageTitle>
			<Section>
				<SectionTitle>
					Your Lists <CreateLink to="/create">Create List</CreateLink>
				</SectionTitle>
				<Mutation mutation={deleteListMutation}>
					{(deleteList, res) => {
						const onDelete = (id) => deleteList({ variables: { id } });
						return (
							<Lists>
								{user.lists.length > 0 ? (
									user.lists.map((list) => {
										if (
											res.data &&
											res.data.deleteList &&
											res.data.deleteList.id === list.id
										)
											return null;
										return (
											<ListContainer key={list.id}>
												<ListLink to={`/${list.id}`}>{list.title}</ListLink>
												<Spacer />
												<EditButton to={`/edit/${list.id}`}>
													<i className="fas fa-edit" />
												</EditButton>
												<DeleteButton onClick={() => onDelete(list.id)}>
													<i className="fas fa-trash" />
												</DeleteButton>
											</ListContainer>
										);
									})
								) : (
									<EmptyText>You haven't made any lists yet!</EmptyText>
								)}
							</Lists>
						);
					}}
				</Mutation>
			</Section>
			<Section>
				<SectionTitle>Your Favorites</SectionTitle>
				<Lists>
					{user.favorites.length > 0 ? (
						user.favorites.map((list) => (
							<ListContainer key={list.id}>
								<ListLink to={`/${list.id}`}>{list.title}</ListLink>
							</ListContainer>
						))
					) : (
						<EmptyText>You haven't favorited any lists yet!</EmptyText>
					)}
				</Lists>
			</Section>

			<LogoutButton href="http://localhost:4000/auth/logout">Logout</LogoutButton>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 800px;
	margin-top: 1.5rem;
	padding: 1rem 2rem;
`;
const PageTitle = styled.h2`
	font-size: 2rem;
	font-weight: bold;
	color: ${primaryText};
	text-align: center;
`;
const Section = styled.div`
	margin: 1rem 0;
`;
const Spacer = styled.div`
	flex-grow: 1;
`;
const SectionTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.2rem;
	margin-bottom: 1.5rem;
`;
const CreateLink = styled(Link)`
	font-size: 0.9rem;
	text-decoration: none;
	margin-left: auto;
	color: ${successColor};
	&:hover {
		color: ${darken(0.1, successColor)};
	}
`;
const ListLink = styled(Link)`
	text-decoration: none;
	color: ${primaryColor};
	opacity: 0.8;
	&:hover {
		opacity: 1;
		// color: ${lighten(0.2, primaryColor)};
	}
`;
const EditButton = styled(Link)`
	text-decoration: none;
	font-size: 1rem;
	color: ${secondaryText};
	margin-right: 0.5rem;
	&:hover {
		color: ${lighten(0.2, primaryColor)};
	}
`;
const DeleteButton = styled.button`
	border: none;
	font-size: 1rem;
	background: none;
	cursor: pointer;
	color: ${secondaryText};
	&:hover {
		color: ${lighten(0.2, primaryColor)};
	}
`;
const ListContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
`;
const Lists = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 1rem;
`;
const EmptyText = styled.div`
	text-align: center;
	font-size: 0.9rem;
	padding: 1rem;
	color: ${secondaryText};
`;
const LogoutButton = styled.a`
	text-decoration: none;
	align-self: flex-end;
	padding: 0.5rem 1rem;
	outline: none;
	color: ${primaryColor};
	border-radius: 5px;
	border: 1px solid ${primaryColor};
	cursor: pointer;
	font-size: 0.8rem;
	background: ${textOnPrimaryColor};
	&:hover {
		background: ${primaryColor}
		color: ${textOnPrimaryColor};
	}
`;

export default Account;
