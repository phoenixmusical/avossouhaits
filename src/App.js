import React, { PureComponent } from 'react';
import Reglements from './components/Reglements';
import Explications from './components/Explications';
import Video from './components/Video';
import PaymentForm from './PaymentForm/PaymentForm';
import './App.css';
import logo from './logo.png';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paid: false,
        };
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess() {
        this.setState({
            paid: true,
        });
    }

    render() {
        return (
            <div>
                <header>
                    <div className="container p-2">
                        <a href="https://phoenixmusical.ca/">
                            <img alt="Phoenix Musical" src={logo} />
                        </a>
                        <h1 className="display-4">
                            À vos souhaits!
                        </h1>
                    </div>
                </header>

                <section id="video">
                    <Video />
                </section>

                <div className="container my-4">
                    {this.state.paid ? (
                        <div className="alert alert-success mt-4">
                            <h4 className="alert-heading">Paiement reçu</h4>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-md-6">
                                <Explications />
                            </div>
                            <div className="col-md-6">
                                <PaymentForm
                                    onSuccess={this.handleSuccess}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <footer className="py-4">
                    <div className="container">
                        <Reglements />
                    </div>
                </footer>
            </div>
        );
    }
}
