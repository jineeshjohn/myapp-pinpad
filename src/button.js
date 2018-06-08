import React from 'react';
import PropTypes from 'prop-types';

var Button = props => {

    return (
        <button onClick={() => props.onButtonClicked(props.label)}>{props.label}</button>
     );
};
Button.propTypes = {
    label: PropTypes.number.isRequired,
    onButtonClicked: PropTypes.func.isRequired,
}
export default Button;
