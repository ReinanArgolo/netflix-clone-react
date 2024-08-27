import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import styled from "styled-components";
import MovieModal from './MovieModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesContainer = styled.div`
    margin: 10px;
   
    height: 150px;
    
    @media (max-width: 768px) {
        margin: 5px;
        padding: 0px;
    }
    
`;

const PopularMovie = styled.div`
    background-image: url(${props => `https://image.tmdb.org/t/p/w500${props.backPath}`});
    background-size: cover;
    background-position: center;
    height: 140px;
    width: 250px;
    position: relative;
    
    border-radius: 5px;
    transition: all 0.1s;
    
    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 5px rgb(0, 0, 0);
    }

    @media (max-width: 768px) {
        width: 160px;
        height:100px;
    }
`;

const MovieTitle = styled.h3`
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
    color: #fff;
    text-align: center;
    padding: 10px 0;
    margin: 0;
    border-radius: 5px;
`;

function Carrossel({ genreId }) {
    const [filmes, setFilmes] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_APIKEY,
                        language: 'pt-BR',
                        with_genres: genreId
                    }

                });

                console.log(response.data.results);
                setFilmes(response.data.results);
            } catch (error) {
                console.error(`Error fetching movies for genre ${genreId}:`, error);
            }
        };

        fetchMoviesByGenre();
    }, [genreId]);

    const handleOpenModal = (filme) => {
        setSelectedMovie(filme);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <MoviesContainer>
                <Swiper modules={[Virtual]} spaceBetween={100} slidesPerView={5} virtual breakpoints={{
        768: {
            spaceBetween: 50, // Ajuste o espaço entre os slides para telas de 768px
            slidesPerView: 5, // Exibe 4 slides em telas de 768px
        },
        412: {
            spaceBetween: 10, // Reduz o espaço entre os slides para telas de 412px
            slidesPerView: 2, // Exibe 2 slides em telas de 412px
        },
        320: {
            spaceBetween: 5, // Reduz ainda mais o espaço entre os slides para telas de 320px
            slidesPerView: 1.5, // Exibe 1.5 slides para criar um efeito parcial do segundo slide
        }
    }}>
                    {filmes &&
                        filmes.map((filme, index) => (
                            <SwiperSlide key={filme.id} virtualIndex={index}>
                                <PopularMovie backPath={filme.backdrop_path} onClick={() => handleOpenModal(filme)}>
                                    <MovieTitle>{filme.title}</MovieTitle>
                                </PopularMovie>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </MoviesContainer>
            {selectedMovie && (
                <MovieModal
                    filme={selectedMovie}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default Carrossel;
