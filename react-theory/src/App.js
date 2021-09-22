import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car';
import Counter from './Counter/Counter';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

export const ClickedContext = React.createContext(false);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [
                { name: 'Ford', year: '2018' },
                { name: 'Audi', year: '2016' },
                { name: 'Mazda', year: '2010' },
            ],

            pageTitle: 'React components',
            showCars: false,
            clicked: false,
        };
    }

    // changeTitleHandler = pageTitle => {
    //     // const oldTitle = this.state.pageTitle;
    //     // const newTitle = oldTitle + ' (changed)';

    //     this.setState({
    //         pageTitle,
    //     });
    // };

    onChangeName(name, index) {
        // console.log(name, index);

        const car = this.state.cars[index];
        car.name = name;
        const cars = [...this.state.cars];
        cars[index] = car;

        this.setState({
            cars,
        });
    }

    toggleCarsHandler = () => {
        this.setState({
            showCars: !this.state.showCars,
        });
    };

    handleInput = event => {
        this.setState({
            pageTitle: event.target.value,
        });
    };

    deleteHandler(index) {
        const cars = this.state.cars.concat();
        cars.splice(index, 1);

        this.setState({
            cars,
        });
    }

    componentWillMount() {
        console.log('app componentWillMount');
    }

    componentDidMount() {
        console.log('app componentDidMount');
    }

    render() {
        console.log('app render');
        const divStyle = {
            textAlign: 'center',
        };

        let cars = null;

        if (this.state.showCars) {
            cars = this.state.cars.map((car, index) => {
                return (
                    <ErrorBoundary key={index}>
                        <Car
                            name={car.name}
                            year={car.year}
                            index={index}
                            onDelete={this.deleteHandler.bind(this, index)}
                            onChangeName={event => this.onChangeName(event.target.value, index)}
                        />
                    </ErrorBoundary>
                );
            });
        }

        return (
            <div style={divStyle}>
                {/* <h1>{this.state.pageTitle}</h1> */}
                <ClickedContext.Provider value={this.state.clicked}>
                    <Counter />
                </ClickedContext.Provider>
                <h1>{this.props.title}</h1>
                <input type="text" onChange={this.handleInput} />
                <button onClick={this.toggleCarsHandler}>Toggle Cars</button>
                <button onClick={() => this.setState({ clicked: true })}>Change clicked</button>
                <div
                    style={{
                        width: 400,
                        margin: 'auto',
                        paddingTop: '20px',
                    }}
                >
                    {cars}
                </div>
            </div>
        );
    }
}

export default App;
