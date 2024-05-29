import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { getUsersLikedMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const UserLiked = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movies = useSelector((state) => state.netflix.movies);

    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setEmail(currentUser.email);
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [navigate]);

    useEffect(() => {
        if (email) {
            dispatch(getUsersLikedMovies(email));
        }
    }, [dispatch, email]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset !== 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies.map((movie, index) => {
                        return (
                            <Card
                                movieData={movie}
                                index={index}
                                key={movie.id}
                                isLiked={true}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default UserLiked