import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";
import firebase from "firebase/app";
import Signin from './Signin'

class App extends React.Component {

  static propTypes = {
    match: PropTypes.object
  };
  
  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.restaurantId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)});
    }

    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: "burgers",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBurger = (burger) => {
    // 1. Робимо копію обєкта state
    const burgers = { ...this.state.burgers };
    // 2. Додаємо новий бургер в змінну burgers
    burgers[`burger${Date.now()}`] = burger;
    // 3. Записуємо наш новий обєкт burgers в state
    this.setState({ burgers });
  };

  updateBurger = (key, updatedBurger) => {
     // 1. Робимо копію обєкта state
     const burgers = { ...this.state.burgers };
     // 2. Обновимо потрібний burger
     burgers[key] = updatedBurger;
     // 3. Записуємо наш новий обєкт burgers в state
     this.setState({ burgers });
  }

  deleteBurger = key => {
     // 1. Робимо копію обєкта state
     const burgers = { ...this.state.burgers };
     // 2. Видаляємо burger
     burgers[key] = null;
     //3. Записуємо наш новий обєкт burgers в state
     this.setState({ burgers });
     

  }

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers });
  };

  addToOrder = (key) => {
    // 1. Робимо копію обєкта state
    const order = { ...this.state.order };
    // 2. Додаємо ключ до замовлення зі значенням 1 або обновити значення
    order[key] = order[key] + 1 || 1;
    // 3. Записуємо нове значення order в state
    this.setState({ order });
  };

  deleteFromOrder =  (key) => {
    // 1. Робимо копію обєкта state
    const order = { ...this.state.order };
    // 2. Видаляєм burger
    delete order[key];
    // 3. Записуємо нове значення order в state
    this.setState({ order });

  }

  handleLogout = async () => {
    await firebase.auth().signOut ();
    window.location.reload();
  }

  render() {
    return (
      <Signin>
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Very Hot Burgers" amount={10} hot={true} />
          <ul className="burgers">
            {Object.keys(this.state.burgers).map((key) => {
              return (
                <Burger
                  key={key}
                  index={key}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[key]}
                />
              );
            })}
          </ul>
        </div>
        <Order 
        deleteFromOrder={this.deleteFromOrder}
        burgers={this.state.burgers} order={this.state.order} />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers}
          burgers={this.state.burgers}
          updateBurger={this.updateBurger}
          deleteBurger={this.deleteBurger}
          handleLogout={this.handleLogout}
        />
      </div>
      </Signin>
    );
  }
}

export default App;
