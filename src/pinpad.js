import React from 'react';
import Button from './button';

class Pinpad extends React.Component {
    constructor(props){
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.keypadNumber = [];
        this.state = {
            randomNumber: Math.floor(1000 + Math.random() * 9000),
            hasFourDigits: false,
            isNumberMatched: false,
            failedAttempts: 0,
            pinNumber: [],
        }
    }
    onButtonClicked(buttonValue){
        this.keypadNumber.push(buttonValue);
        const pin = Number(this.keypadNumber.join(""));
        if(this.keypadNumber.length === 4){
            const isPinMatched = pin === this.state.randomNumber;

            const newRandomNumber = (this.state.failedAttempts === 2 && !isPinMatched) ? 
                Math.floor(1000 + Math.random() * 9000) : this.state.randomNumber;

            const failedAttempts = isPinMatched || this.state.failedAttempts === 3 ? 0 : this.state.failedAttempts + 1;

            this.setState({
                failedAttempts,
                isNumberMatched: isPinMatched,
                randomNumber: newRandomNumber,  
                pinNumber: this.keypadNumber,              
            });
            this.keypadNumber =  []; // reset the pin
        } else {
            this.setState({
                pinNumber: this.keypadNumber,
            });
        }
        
    }
    render() {
        const buttonLabels = [...Array(10)];

        const passwordCharacters = [];
        this.state.pinNumber.forEach((value, index, arr) => {
            arr.length - 1 === index ?
                passwordCharacters.push(this.state.pinNumber[index]) : passwordCharacters.push("*");            
        });

    
        return (
            <div> 
                <div>Random Number: {this.state.randomNumber}</div>
                <div>Entered digit: <input type="text" value={passwordCharacters.join("")} readOnly/></div>
                <div>Is number matched? {this.state.isNumberMatched ? 'Yes': 'No'}</div> 
                <div>Failed Attempts: {this.state.failedAttempts}</div>
                <div className="buttonWrap">
                    {buttonLabels.map((value, i) => {
                        return <Button key={i} label={i} onButtonClicked={this.onButtonClicked} /> 
                    })}
                </div>
            </div>
        );
    }
};

export default Pinpad;
