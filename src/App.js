import React from 'react';
import styles from './App.module.css';
import { WebMapView } from './components/WebMapView/WebMapView';

import { fetchData } from  './api';
import Cards from './components/Cards/Cards';
import CityPicker from './components/CityPicker/CityPicker'

class App extends React.Component {

  state = {
    data: {}
  }

  async componentDidMount() {
    const data = await fetchData();
    
    this.setState({data})
  }
  render() {

    const {data} = this.state;
    return (
      <div className={styles.App}>
        <WebMapView/>
        <CityPicker className={styles.CityPicker} data={data}/>
        {/* <Cards data={data}/> */}
      </div>
    );
  }

  ///https://www.iconfinder.com/iconsets/isometric-farm-people
  
}

export default App;
