import React from 'react';
import PlayersList from './PlayersList';
import NewGameBtn from './NewGameBtn';
import PageHeader from '../PageHeader.jsx';
import './Home.scss';
import AuthService from '../../services/auth.service';

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <>
            <PageHeader user={currentUser}>
                <div className='contentWrapper'>
                    {currentUser
                        ? (
                            <NewGameBtn />
                        )
                        : <p>You need to log in to see the content</p>}
                </div>
            </PageHeader>
            <PlayersList loggedInPlayerId={currentUser?.id} />
        </>
    );
};

export default Home;
