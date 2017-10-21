import React from 'react';
import { connect } from 'react-redux';
import { Marker, Tooltip } from 'react-leaflet';
import { Icon } from '../../helpers';
import { setHighlightedStop, setActiveStop } from '../../actions';

const blueIcon = new Icon({ color: 'blue' });
const yellowIcon = new Icon({ color: 'yellow' });
const redIcon = new Icon({ color: 'red' });

const Stop = (props) => {
  const {
    latitude, longitude, description, active, highlighted, onClick,
    onMouseOver, onMouseOut,
  } = props;

  let icon = blueIcon;
  if (highlighted) icon = yellowIcon;
  if (active) icon = redIcon;

  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      onClick={onClick}
      onMouseover={onMouseOver}
      onMouseout={onMouseOut}
      icon={icon}
    >
      {
        highlighted ?
          <Tooltip direction="right" offset={[10,-35]} permanent>
            <span>{ description }</span>
          </Tooltip>
          : null
      }
    </Marker>
  );
}

const mapStateToProps = (state, ownProps) => ({
  highlighted: state.highlighted === ownProps.id,
  active: state.active === ownProps.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setHighlightedStop: () => dispatch(setHighlightedStop(ownProps.id)),
  onMouseOver: () => dispatch(setHighlightedStop(ownProps.id)),
  onMouseOut: () => dispatch(setHighlightedStop(null)),
  onClick: () => dispatch(setActiveStop(ownProps.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stop);
