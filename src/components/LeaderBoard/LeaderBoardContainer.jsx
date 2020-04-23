import React from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import LeaderBoard from './LeaderBoard';
import { setWinners } from '../../redux/leaders-reducer';

class LeaderBoardContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://starnavi-frontend-test-task.herokuapp.com/winners`).then(response => {
            for (let index = response.data.length-8; index < response.data.length; index++) {
                if(index>=0) {
                    this.props.setWinners(response.data[index]);
                }
            }
        })
    }

    render() {
        return (
            <LeaderBoard winners={this.props.winners}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        winners: state.leadersState.winners,
    }
}

export default connect(mapStateToProps, { setWinners })(LeaderBoardContainer);