import React, { Component } from "react";
import axios from 'axios';

class AlbumShow extends Component{
    constructor(props){
        super(props);
        const albumId = this.props.match.params.id;
        this.state = {
           album: {},
           params: albumId,
           artist: {},
           tracks: []
        }
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/api/albums/${this.state.params}`).then(res => {
            this.setState({
              album: res.data
            });
            axios.get(`http://127.0.0.1:8000/api/artists/${this.state.album.artistId}`).then(res => {
                this.setState({
                artist: res.data
                });
            });
        });
        axios.get(`http://127.0.0.1:8000/api/tracks/?albumId=${this.state.params}`).then(res => {
            this.setState({
                tracks: res.data["hydra:member"]
            });
        });
        
    }

    renderTracks(){
        return this.state.tracks.map((track) => {
            return (
               <div key={track.id}>
                    <h3>{track.name}</h3>
                    <audio controls /*onPlay={this.audioPause.bind(this)}*/>
                        <source src={track.mp3} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
               </div>
            )
         })
    }

    audioPause(e){
        console.log(e)
        const audios = document.querySelectorAll("audio");
        audios.forEach(element => element.pause());
        console.log(e.target.play())
        
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h3>{this.state.album.name} - {this.state.artist.name}</h3>
                <img src={this.state.album.coverSmall} alt="img cover" />
                <p>{this.state.album.description}</p>
                <div>{this.renderTracks()}</div>
            </div>
        )
   }
}

export default AlbumShow;