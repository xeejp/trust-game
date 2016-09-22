import React from 'react'
import { connect } from 'react-redux'

import {
  Step,
  Stepper,
  StepButton,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider'

import { getPageName, game_pages } from 'util/index'

import {
  changePage,
  intoLoading,
  exitLoading,
} from './actions'


const mapStateToProps = ({ game_page, game_round, game_progress, pairs, loading }) => ({
  game_page,
  game_round,
  game_progress,
  pairs,
  loading,
})

class PageSteps extends React.Component {
  Async = (cb) => {
    const { dispatch } = this.props
    dispatch(intoLoading())
    this.asyncTimer = setTimeout(cb, 100)
  }

  handleChangePage = (game_page) => {
    const { dispatch, loading } = this.props
    dispatch(changePage(game_page))
    if (!loading) {
      this.Async(() => {
        dispatch(exitLoading())
      })
    }
  }

  handleNext = () => {
    const { dispatch, game_page, loading } = this.props
    var next = game_pages[0]
    for(let i = 0; i < game_pages.length - 1; i++){
      if(game_page == game_pages[i]) {
        next = game_pages[(i + 1) % game_pages.length]
        break
      }
    }
    dispatch(changePage(next))
    if (!loading) {
      this.Async(() => {
        dispatch(exitLoading())
      })
    }
  };

  handlePrev = () => {
    const { dispatch, game_page, loading} = this.props
    let prev = game_pages[0]
    for(let i = 1; i < game_pages.length; i++){
      if(game_page == game_pages[i]) {
        prev = game_pages[(i - 1) % game_pages.length]
        break
      }
    }
    dispatch(changePage(prev))
    if (!loading) {
      this.Async(() => {
        dispatch(exitLoading())
      })
    }
  }

  getStepContent(game_page) {
    const {game_round, pairs, game_progress } = this.props
    switch (game_page) {
      case 0:
        return (
          <div>
            <p>参加者側に待機画面を表示しています。</p>
          </div>
        );
      case 1:
        return <p>参加者側に説明を表示しています。</p>
      case 2:
        return (
          <div>
            <p>参加者側に実験画面を表示しています。</p>
            <p>現在の進捗: {game_progress} %</p>
          </div>
        )
      case 3:
        return <p>参加者側に結果を表示しています。</p>
    }
  }

  renderButtons() {
    const { game_page } = this.props
    return (
      <div style={{margin: '16px 18px'}}>
        <FlatButton
          label="戻る"
          disabled={game_pages[0] == game_page}
          onTouchTap={this.handlePrev}
          style={{marginRight: "12px"}}
        />
        <RaisedButton
          label={game_pages[3] === game_page ? '実験を続ける' : '次へ'}
          primary={true}
          onTouchTap={this.handleNext}
        />
      </div>
    );
  }

  render() {
    const { game_page, loading } = this.props
    const buttons = []
    for (let i = 0; i < game_pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
        <StepButton
        onClick={this.handleChangePage.bind(this, game_pages[i])}
        >{getPageName(game_pages[i])}</StepButton>
        </Step>
      )
    }
    return (
      <div style={{width: '100%',  margin: 'auto'}}>
      <Stepper activeStep={game_pages.indexOf(game_page)} linear={false}>
        {buttons}
      </Stepper>
      {this.renderButtons()}
          <Divider
            style={{
              marginTop: "5%",
              marginBottom: "5%"
            }}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageSteps);
