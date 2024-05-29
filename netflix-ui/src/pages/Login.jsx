import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log('Error while login user : ' + error.message);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header signup />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input type="text" placeholder="Email" onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} name='email' value={formValues.email} />
              <input type="password" placeholder="Password" onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} name='password' value={formValues.password} />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
  @media (max-width: 996px) {
    .content {
      .form-container {
        .form {
          width: 40vw;
        }
      }
    }
  }

  @media (max-width: 630px) {
    .content {
      width: 100%;
      .form-container {
        .form {
          width: 60vw;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .content {
      .form-container {
        .form {
          width: 80vw;

          .container {
            input {
              padding: 0.5rem;
            }

            button {
              padding: 0.5rem;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
`;

export default Login