import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add2 } from './redux/actions/actions';

class Counter extends Component {
    render() {
        console.log('Counter: ', this.props);
        return (
            <div style={{ padding: 20, border: '1px solid #ccc' }}>
                <h1>Counter {this.props.counter}</h1>
                <hr />
                <div>
                    <button onClick={() => this.props.onChange(1)}>Add</button>
                    <button onClick={() => this.props.onChange(-1)}>Sub</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        counter: state.counter2.counter2,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        onChange: number => dispatch(add2(number)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
