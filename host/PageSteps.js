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
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

import { getPageName, pages } from 'util/index'

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
    var next = pages[0]
    for(let i = 0; i < pages.length - 1; i++){
      if(game_page == pages[i]) {
        next = pages[(i + 1) % pages.length]
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
    let prev = pages[0]
    for(let i = 1; i < pages.length; i++){
      if(game_page == pages[i]) {
        prev = pages[(i - 1) % pages.length]
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
    const { page } = this.props
    return (
      <div style={{margin: '16px 18px'}}>
        <FlatButton
          label="戻る"
          disabled={pages[0] == page}
          onTouchTap={this.handlePrev}
          style={{marginRight: "12px"}}
        />
        <span style={{float: "right"}}>
          <RaisedButton
            label={pages[3] === page ? '実験を続ける' : '次へ'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </span>
      </div>
    );
  }

  render() {
    const { game_page, loading } = this.props
    const buttons = []
    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
        <StepButton
        onClick={this.handleChangePage.bind(this, pages[i])}
        >{getPageName(pages[i])}</StepButton>
        </Step>
      )
    }
    return (
      <div style={{width: '100%',  margin: 'auto'}}>
      <Stepper activeStep={pages.indexOf(game_page)} linear={false}>
        {buttons}
      </Stepper>
      {this.renderButtons()}
      <ExpandTransition loading={loading} open={true} transitionDuration={300}>
        <div style={{margin: '8px 20px'}}>{this.getStepContent(pages.indexOf(game_page))}</div>
      </ExpandTransition>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PageSteps);
