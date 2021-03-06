import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chart from '../components/Chart.js'
import PairResult from './PairResult.js'

import { fetchContents } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ id, pair_results, game_point, game_rate }) => ({
  id, pair_results, game_point, game_rate
})

const Result = ({ id, pair_results, game_point, game_rate }) => {
  const results = pair_results.concat()
  return (
    <div>
      <Card initiallyExpanded={true}>
        <CardHeader
          title={ReadJSON().static_text["graph"]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Chart />
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title={ReadJSON().static_text["result"]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {
            results.map((result, i) => (
              <PairResult
                key={i}
                id={id}
                inv={result.inv}
                investor={result.investor}
                res={result.res}
                point={game_point}
                rate={game_rate}
              />
            ))
          }
        </CardText>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps)(Result)
