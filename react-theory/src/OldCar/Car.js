import Radium from 'radium';
import React from 'react';
import './Car.scss';

// eslint-disable-next-line import/no-anonymous-default-export
class Car extends React.Component {
    // NOTE: unsafe outdated method
    componentWillReceiveProps(nextProps) {
        console.log('Car componentWillReceiveProps', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Car shouldComponentUpdate', nextProps, nextState);
        return nextProps.name.trim() !== this.props.name.trim();
    }
    // NOTE: unsafe outdated method
    componentWillUpdate(nextProps, nextState) {
        console.log('Car componentWillUpdate', nextProps, nextState);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('Car getDerivedStateFromState', nextProps, prevState);
        return prevState;
    }

    getSnapshotBeforeUpdate() {
        console.log('Car getSnapshotBeforeUpdate');
    }

    componentDidUpdate() {
        console.log('Car componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('Car componentWillUnmount');
    }

    render() {
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

        const style = {
            boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)',
            borderRadius: '5px',
            ':hover': {
                border: '1px solid #aaa',
                boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
            },
        };

        return (
            <div className="Car" style={style}>
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
            </div>
        );
    }
}

export default Radium(Car);
