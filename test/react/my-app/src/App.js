import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Test(props) {
    return (
        <div className="redColor">{props.valueKey}</div>
    )
}

class Life extends Component{
    constructor(props) {
        super(props);
        console.log(props,this);
        this.state = {
            count: 1,
            switch: true,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render(){
        if(!this.props.test){
            return null
        }
        return (
            <div className="redColor">adasdeads</div>
        )
    }
}

class FlavorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'mango'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class ProductCategoryRow extends  Component {
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}

class ProductRow extends  Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends  Component {
    render() {
        var rows = [];
        var lastCategory = null;
        console.log(this.props.inStockOnly)
        this.props.products.forEach((product,index) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        console.log(rows);
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends  Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

function Headtest(props) {
    return <div>{props.name}</div>;
}

function Content(props) {
    return <h1>{props.name}</h1>
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
];


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            switch: true,
            test:true,
        }
    }

    countAdd() {
        // console.log(this.state.count,'this.state.count');
        this.setState(perStatus => {
            // console.log('perStatus',perStatus);
            return {
                count: ++perStatus.count,
            };
        })
    }

    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.countAdd(),
        //     1000
        // );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }



    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React1212</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {
                    this.state.switch ? ( <Test valueKey={this.state.count}/>) : ( <Test valueKey='yes'/>)
                }
                <Life test={false}/>
                <FlavorForm />
                <FilterableProductTable products={PRODUCTS} />
                <div>
                    {this.state.test&& <Headtest name="test"/>}
                    <Content name="content"/>
                </div>
            </div>
        );
    }
}

export default App;
