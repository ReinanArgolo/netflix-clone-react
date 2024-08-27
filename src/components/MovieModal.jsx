import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarRating from './StarsRating';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 50px 0px 0px ;
    
  }
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 80%;
  max-width: 900px;
  height: 80%;
  max-height: 90%;
  border-radius: 10px;
  overflow: hidden;
  position: relative; 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
  }
`;

const ImageContainer = styled.div`
  height: 40%;
  background-size: cover;
  background-position: center;
  position: relative;

  @media (max-width: 768px) {
    height: 25%;
    
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
`;

const InfoContainer = styled.div`
  background-color: #222;
  color: #fff;
  padding: 20px;
  flex: 1;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: -45%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  z-index: 10;

  &:hover {
    color: #ccc;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0 0 10px;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const Overview = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ActorList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
`;

const ActorItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 15px 10px 0;
  width: 45%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ActorName = styled.p`
  font-size: 16px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CharacterName = styled.p`
  font-size: 14px;
  color: #ccc;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MovieModal = ({ filme, isOpen, onClose }) => {
  const [credits, setCredits] = useState(null);
  const [actual, setActual] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_APIKEY,
            language: 'pt-BR',
            query: filme.title || filme.name
          }
        });
        const results = response.data.results;
        const credit = results.find((result) => result.id === filme.id);
        setActual(credit);
        console.log(credit);
      } catch (error) {
        console.error('Erro ao buscar os créditos do filme:', error);
      }
      setLoading(false);
    };
  
    if (filme.id) {
      fetchItem();
    }
  
  }, [filme.id]);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${actual.media_type}/${actual.id}/credits`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_APIKEY,
            language: 'pt-BR'
          }
        });
        setCredits(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao buscar os créditos do filme em Fetch:', error);
      }
      setLoading(false)
    };
  
    if (filme.id) {
      fetchCredits();
    }
  }, [actual]);


  



  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ImageContainer style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${filme.backdrop_path})` }}>
          <GradientOverlay />
        </ImageContainer>
        <InfoContainer>
          <Title>{filme.title || filme.name} ({filme.release_date?.slice(0, 4) || filme.first_air_date?.slice(0, 4)})</Title>
          <p>{filme.media_type && (filme.media_type)}</p>
          <StarRating rating={filme.vote_average} />
          
          <Overview>{filme.overview}</Overview>

          {isLoading && <p>Loading...</p>}

          {credits && (
            <>
              <h3>Elenco:</h3>
              <ActorList>
                
                {credits.cast.length === 0 && <p>Não há atores no momento.</p>}
                {credits.cast.slice(0, 5).map((actor) => (
                  <ActorItem key={actor.id}>
                    <ActorImage src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
                    <div>
                      <ActorName>{actor.name}</ActorName>
                      <CharacterName>como {actor.character}</CharacterName>
                    </div>
                  </ActorItem>
                ))}
              </ActorList>
            </>
          )}
        </InfoContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default MovieModal;
