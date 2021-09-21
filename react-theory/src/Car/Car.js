import React from 'react';
import classes from './Car.module.css';
import withClass from '../hoc/withClass';

// eslint-disable-next-line import/no-anonymous-default-export
class Car extends React.Component {
    render() {
        console.log('classes', classes);
        console.log('Car render');

        // if (Math.random() > 0.7) {
        //     throw new Error('Car random failed');
        // }
        const inputClasses = ['input'];
        if (this.props.name !== '') {
            inputClasses.push('green');
        } else {
            inputClasses.push('red');
        }

        if (this.props.name.length > 4) {
            inputClasses.push('bold');
        }

        return (
            <React.Fragment>
                <h3>Сar name: {this.props.name}</h3>
                <p>
                    Year: <strong>{this.props.year}</strong>
                </p>
                {this.props.children}
                <input
                    className={inputClasses.join(' ')}
                    type="text"
                    onChange={this.props.onChangeName}
                    value={this.props.name}
                />
                <button onClick={this.props.onDelete}>Delete</button>
            </React.Fragment>
        );
    }
}

export default withClass(Car, classes.Car);
