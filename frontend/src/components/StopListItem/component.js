import React from 'react';
import './styles.css';

const StopListItemComponent = (props) => {
  const {
    id, description, isHighlighted, onMouseEnter, onMouseLeave, onClick
  } = props;
  const className = isHighlighted ? 'StopListItem--highlighted' : '';

  return (
    <li className={className}>
      <a
        href={`#${id}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={evt => { evt.preventDefault(); onClick(); }}
      >{ description }</a>
    </li>
  );
};

export default StopListItemComponent;
