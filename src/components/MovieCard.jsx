import React from 'react';

const MovieCard = ({ movie: { title, vote_average, poster_path, original_language, release_date }, onClick }) => {
    return (
        <div className="movie-card cursor-pointer hover:scale-105 transition" onClick={onClick}>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/No-Poster.png`}
                alt={title}
            />
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">
                        {typeof release_date === 'string' && release_date.includes('-')
                            ? release_date.split('-')[0]
                            : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
