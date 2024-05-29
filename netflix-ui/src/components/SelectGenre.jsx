import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchDataByGenre } from '../store';

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const selectedGenreId = e.target.value;
    dispatch(fetchDataByGenre({ genre: selectedGenreId, type }));
  };

  return (
    <Select className="flex" onChange={handleChange}>
      {genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  @media (max-width: 768px) {
    margin-left: 3rem;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    margin-left: 1.5rem;
    font-size: 1rem;
  }
`;

export default SelectGenre;
