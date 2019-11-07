import React from 'react';
import axios from 'axios';
import {endpoints, getImageUrl} from "../config";
import Card from "./Card";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            genresList: [],
            list: []
        };
    }

    componentDidMount() {
        axios
            .get(endpoints.genres())
            .then((data) => {
                this.setState({
                    genresList: data.data.genres,
                });
                console.log(data.data.genres)
            });
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
            });

    }

    pickGenre(id) {
        axios
            .get(endpoints.genreMovies(id))
            .then(response => {
                this.setState({
                    list: response.data.results
            });
        });
    }

    render() {
        return (
            <>
                <div>
                    { this.state.genresList.map((genre) => (
                        <div className="genre"
                            key={genre.id}
                            name={genre.name}
                            onClick={() => {this.pickGenre(genre.id)}}
                        > {genre.name} </div>
                    ))}
                </div>
                <div>
                    {this.state.list.map((card) => (
                        <Card
                            getTitle={this.getTitle}
                            key={card.original_title}
                            backgroundImage={getImageUrl(card.backdrop_path)}
                            date={card.release_date}
                            rating={card.vote_average}
                            votes={card.vote_count}
                            description={card.overview}
                            title={card.original_title}
                        />
                    ))}
                </div>
            </>


        );
    }

}

export default App;
