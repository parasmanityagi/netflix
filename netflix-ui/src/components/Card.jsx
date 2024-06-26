import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import video from '../assets/video.mp4';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeMovieFromLiked } from '../store';
import { PORT } from '../utils/constants';


const Card = React.memo(({index, movieData, isLiked = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login")
  });

  const addToList = async() => {
    try {
      await axios.post(`${PORT}/api/user/add`, { email, data: movieData})
    } catch (error) {
      console.log(`error while adding movie to My List : ${error.message}`);
    }
  }

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")} />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove From List" onClick={()=> dispatch(removeMovieFromLiked({movieId: movieData.id, email}))} />
                ) : (
                  <AiOutlinePlus title="Add to my List" onClick={addToList}/>
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        li {
          padding-right: 0.7rem;
          list-style-type: none;
        }
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 180px;
    width: 180px;

    .hover {
      width: 16rem;
      top: -15vh;

      .image-video-container {
        height: 120px;

        img, video {
          height: 120px;
        }
      }

      .info-container {
        padding: 0.8rem;
      }

      .icons {
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    max-width: 150px;
    width: 150px;

    .hover {
      width: 14rem;
      top: -12vh;

      .image-video-container {
        height: 100px;

        img, video {
          height: 100px;
        }
      }

      .info-container {
        padding: 0.6rem;
      }

      .icons {
        svg {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default Card;
