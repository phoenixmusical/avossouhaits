import React, { PureComponent } from 'react';
import poster from './poster-a-vos-souhaits.png';

export default class Video extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showVideo: false,
        };
        this.openVideo = this.openVideo.bind(this);
        this.closeVideo = this.closeVideo.bind(this);
    }

    openVideo() {
        this.setState({
            showVideo: true,
        });
    }

    closeVideo() {
        this.setState({
            showVideo: false,
        });
    }

    render() {
        const { showVideo } = this.state;
        return (
            <div className="videoWrapper container p-4">
                <div className="poster">
                    <img src={poster} alt="" />
                    <button className="video-button" onClick={this.openVideo}>
                        <span className="video-button-content" />
                    </button>
                </div>
                {showVideo ? (
                    <div className="video">
                        <div className="backdrop" onClick={this.closeVideo} />
                        <div className="video-content">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/pcfAq6kLZcc?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
