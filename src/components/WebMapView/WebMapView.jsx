import React from 'react';
import { loadModules } from 'esri-loader';
import {fetchData} from '../../api/index';

import sytles from './WebMapView.module.css';

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  async componentDidMount() {
    const data = await fetchData();
    console.log(data)
    
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map',"esri/views/SceneView", 'esri/views/MapView', "esri/Graphic", "esri/widgets/Legend"], { css: true })
      .then(([ArcGISMap, SceneView, MapView, Graphic, Legend]) => {
        const map = new ArcGISMap({
          basemap: 'streets-night-vector'
        });

        this.view = new SceneView({
          container: this.mapRef.current,
          map: map,
          center: [-101.435523, 24.113777],
          zoom: 5.5
        });


        for (var i=0;i<data.latitude.length;i++){
          var point = {
            type: "point", // autocasts as new Point()
            longitude: data.longitude[i],
            latitude: data.latitude[i],
          };
  
          var markerSymbol = {
            type: "point-3d", // autocasts as new PointSymbol3D()
            symbolLayers: [
              {
                type: "object", // autocasts as new ObjectSymbol3DLayer()
                width: 30000,
                height: (data.tempc[i])*10000,
                resource: {
                  primitive: "cone",
                },
                material: {
                  color: "#26528c",
                },
              },
            ],
            verticalOffset: {
              screenLength: 40,
              maxWorldLength: 100,
              minWorldLength: 20,
            },
          };

          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            popupTemplate: {
              title: `Codiciones atmosfericas ${data.name[i]} en el estado de ${data.state[i]}`,
              content: [
                {
                  type: "text",
                  text: `Estado de ${data.state[i]} municipio de ${data.name[i]} con una probabilidad de precipitacion del
                         ${data.probabilityofprecip[i]}% con un cielo ${data.skydescriptionlong[i]} y una temperatura  ${data.tempc[i]} °C`,
                },
              ],
            },
          });
          this.view.graphics.add(pointGraphic);
        }

        // this.view.ui.add(Legend_LogisticHubs, "bottom-right");
        // this.view.ui.add(Legend_Arctic_Research_Stations, "bottom-right");


      });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return (
      <div className={sytles.webmap} ref={this.mapRef} />
    );
  }
}