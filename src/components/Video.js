import React, { PureComponent } from 'react';

export default class Video extends PureComponent {
    render() {
        return (
            <div className="videoWrapper container p-4">
                <div className="video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/pcfAq6kLZcc?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
        );
    }
}
