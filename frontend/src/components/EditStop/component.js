import _ from 'lodash';
import React, { Component } from 'react';

import './styles.css';

class EditStopComponent extends Component {
  constructor(props){
    super(props);
    this.state = { ...props.stop };
    _.bindAll(this, ['onCancel', 'onDelete', 'onSubmit']);
  }

  componentWillReceiveProps(props) {
    this.setState({ ...props.stop });
  }

  onCancel(evt) {
    evt.preventDefault();
    this.props.onCancel();
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  }

  onDelete(evt) {
    evt.preventDefault();
    const { id } = this.state;
    if (window.confirm('Seguro deseas eliminar la parada?')) {
      this.props.onDelete(id);
    }
  }

  render() {
    const { isNew } = this.props;
    const { id, latitude, longitude, description } = this.state;
    return (
      <div className="EditStop">
        <div className="EditStop__close">
          <a href="#close" onClick={this.onCancel}>X</a>
        </div>
        <h2>{ isNew ? 'Create' : 'Edit' } Stop</h2>
        <form onSubmit={this.onSubmit} >
          <label>
            <span>Id:</span>
            <input disabled={true} value={id} />
          </label>
          <label>
            <span>Latitud:</span>
            <input
              type="text"
              value={latitude}
              onChange={evt => this.setState({latitude: evt.target.value})}
            />
          </label>
          <label>
            <span>Longitud:</span>
            <input
              type="text"
              value={longitude}
              onChange={evt => this.setState({longitude: evt.target.value})}
            />
          </label>
          <label>
            <span>Descripción:</span>
            <textarea
              value={description || ''}
              onChange={evt => this.setState({description: evt.target.value})}
            />
          </label>
          <div className="EditStop__actions">
            <button type="submit">{ isNew ? 'Crear' : 'Actualizar' }</button>
            <button onClick={this.onCancel}>Cancelar</button>
          </div>
          { isNew ? null :
            <a
              className="EditStop__delete"
              href="#delete"
              onClick={this.onDelete}
            >Eliminar parada</a>
          }
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank">Obtener direcciones</a>
        </form>
      </div>
    );
  }
};

export default EditStopComponent;
