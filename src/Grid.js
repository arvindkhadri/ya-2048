import React, { Component } from 'react';
import _ from 'lodash';

class Grid extends Component {
    constructor (props) {
        super(props);
        let board = this.createGrid(props);
        board = this.randomizeBoard(board);
        this.state = {"size": props.size,
              "sArray": _.range(0, props.size),
              "board": board};
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.rightShift = this.rightShift.bind(this);

    }

    componentWillUnmount() {
        this.removeEventListener('onKeyDown', this.handleKeyPress);
    }

    createGrid(props) {
        // Input size of board, out put dictionary
        var data_set = {},
            i;

        for (i=0; i< props.size * props.size; i++) {
            data_set[i] = {"position": i,
                           "value": 0};
        }
        return data_set;

    }

    checkZero (o, k, c) {
        if (o !== 0) {
            return k;
        }
    }

    randomizeBoard (board) {
        let keys = _.filter(board, function(item){
            if(item.value === 0) {
                return item;
            }
        });
        keys = _.keys(keys);
        console.log(keys);
        const randomKey = _.random(_.min(_.map(keys, Number)), _.max(_.map(keys, Number)));
        const values = [2, 4]
        const randomValue = _.random(0, 1);
        const obj = {};

        obj[randomKey] = {"value": values[randomValue]};
        let foo = _.extend(board[randomKey], obj[randomKey]); // {9: {p:9, v:2}}
        return board;
    }

    handleKeyPress(event) {
        // based on the key pressed decide what to do with values of the board.
        switch(event.key) {
            case "ArrowDown":
                this.updateBoard([[0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]]);
                break;
            case "ArrowUp":
                this.updateBoard([[12,8,4,0], [13,9,5,1], [14,10,6,2], [15,11,7,3]]);
                break;
            case "ArrowRight":
                this.updateBoard([[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]]);
                break;
            case "ArrowLeft":
                this.updateBoard([[3,2,1,0], [7,6,5,4], [11,10,9,8], [15,14,13,12]]);
                break;

            default:
                break;
        }
    }

    rightShift (obj) {
        //let barf = _.cloneDeep(this.state.board);
        obj.forEach(function (o,k,c) {
            if (k === c.length - 1) {
                return;
            }
            if (this.barf[c[k+1]].value === 0){
                this.barf[c[k+1]] = {"position": c[k+1],
                                "value": this.barf[o].value};
                this.barf[o] = {"position": o,
                           "value": 0};
                return;
            }            
            if ((this.barf[o].value === this.barf[c[k+1]].value)) {
                this.barf[c[k+1]] = {"position": c[k+1],
                           "value": this.barf[o].value + this.barf[c[k+1]].value};
                this.barf[o] = {"position": o,
                                "value": 0};

                return;
            }
        }, this);
        return this.barf;
        // return out;
    }

    updateBoard(inputState) {
        // an sorted array of numbers is the input.
        // shift right numbers in array, add adjacent nodes, shift till end
        this.barf = _.cloneDeep(this.state.board);
        const fx = inputState.map(this.rightShift);
        // console.log(fx);
        const temp1 = _.merge({}, fx);
        let temp2 = {};
        _.map(temp1, function (item) {
                           _.merge(temp2, item);
                       });
        temp2 = _.merge({}, this.state.board, temp2);
        this.setState(state => ({
            board: this.randomizeBoard(temp2)
        }));
    }


    render() {
        console.log(this.state);
        return (<div onKeyDown={this.handleKeyPress} tabIndex="0">
        {this.state.sArray.map(parent => (
            <div className="row" key={parent}>
            {this.state.sArray.map(item => (
                <div className="col-md-3 tile" key={item}>
                <div className="content">
                    <p> {this.state.board[parent * this.state.size + item].value} </p>
                </div>
                </div>
                )
            )}
            </div>)
        )}
        </div>);

    }
}

export default Grid;