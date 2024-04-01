import { Component } from "react";

class Button extends Component {
    render() {
        const { onClick, text } = this.props;
        return (
            <button
                className="button"
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
}

export default Button;