import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MovieModal from './MovieModal';


const Resultados = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    padding: 100px 30px 100px ;

`

const Container = styled.div`
    background: linear-gradient(to bottom right, #090a0f, #1b1e27);
`

const Movie = styled.div`
    background-image: url(${props => `https://image.tmdb.org/t/p/w500${props.backPath}`});
    background-size: cover;
    background-position: center;
    height: 150px;
    width: 270px;
    position: relative;
    margin-inline: 10px;
    border-radius: 5px; 
    transition: ease 0.5s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 5px rgb(0, 0, 0);
    }
`

const NameData = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    color: #fff;
    text-align: center;
    padding: 10px 0;
    border-radius: 5px;
    
    
    

    h3 {
        margin: 0;
        text-align: center;
    }

    p{
        margin: 0;
    }
`





const Resultado = () => {
    const [filmes, setFilmes] = useState([]);
    const [error, setError] = useState(null);
    const params = useParams();
    const API_KEY = import.meta.env.VITE_TMDB_APIKEY;

    useEffect(() => {
        const fetchFilmes = async () => {
            try {
                const resposta = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${params.id}&language=pt-BR&include_adult=false`);
                const filmesWithGenres = await Promise.all(resposta.data.results.map(async (filme) => {
                    const detalhesFilme = await axios.get(`https://api.themoviedb.org/3/movie/${filme.id}?api_key=${API_KEY}&language=pt-BR`);
                    return { ...filme, genres: detalhesFilme.data.genres };
                }));
                setFilmes(filmesWithGenres);
            } catch (err) {
                console.error('Erro ao buscar filmes:', err);
                setError('Erro ao buscar filmes');
            }
        };
        fetchFilmes();
    }, [params.id]);

    if (error) {
        return <div>{error}</div>;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleOpenModal = (filme) => {
        setSelectedMovie(filme);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    return (
        <Container>
            <Resultados>
                {filmes &&
                    filmes.map((filme) => {
                        const path = filme.backdrop_path || filme.poster_path;
                        if (!path) {
                            return null;
                        }
                        return (
                            <Movie key={filme.imdbID} backPath={path} onClick={() => handleOpenModal(filme)}>
                                <NameData>
                                    <h3>{filme.title}</h3>
                                    <p>
                                        {filme.genres.map((genre) => genre.name).join(', ')} | {filme.release_date.slice(0, 4)}
                                    </p>
                                </NameData>
                            </Movie>
                        );
                    })}
            </Resultados>
            {isModalOpen && (
                <MovieModal filme={selectedMovie} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </Container>





    );
};

export default Resultado;