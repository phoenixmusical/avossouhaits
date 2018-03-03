import React, { PureComponent } from 'react';
import PaymentForm from './PaymentForm/PaymentForm';
import './App.css';
import logo from './logo.png';

export default class App extends PureComponent {
    render() {
        return (
            <div className="container my-4">
                <img src={logo} />
                <div className="jumbotron">
                    <h1 className="display-4">À vos souhaits</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                </div>

                <PaymentForm />
            </div>
        );
    }
}
