import React from 'react';
import { Link, hashHistory } from 'react-router';
import update from 'immutability-helper';
import StudyCard from './study_card';

class Study extends React.Component {

  constructor(props){
    super(props);
    this.state={cardIdx: 0, cardView: "question"}
    this.renderStudyCard = this.renderStudyCard.bind(this);
    this.renderFeedbackBar = this.renderFeedbackBar.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
    this.nextRandomCardIdx = this.nextRandomCardIdx.bind(this);
    this.switchCardView = this.switchCardView.bind(this);
    this.giveScore = this.giveScore.bind(this);
    this.barStyle = this.barStyle.bind(this);
  }

  componentWillMount(){
    this.props.fetchCards(this.props.params.deckId)
    .then(()=>this.props.fetchDeck(this.props.params.deckId))
    .then(()=>this.nextRandomCardIdx());
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.cards.length === 0){
      hashHistory.push("/library")
    }
  }

  renderProgress(){

    const circleStyle = {
      backgroundImage: "linear-gradient(90deg, #4a4a4a 50%, transparent 50%, transparent), linear-gradient(220deg, #29a5dc 50%, #4a4a4a 50%, #4a4a4a)"
    }

    return(
      <div className="study-progress">
        <div className="progress-title">
          <h2 id="studying">Studying:</h2>
          <h2>{this.props.deckName}</h2>
        </div>
        <div className="progress-done">
          <Link to={`/library`}><button>Done</button></Link>
        </div>
        <div className="progress-percent">
          <div className="progress-radial" style={this.circleStyle(this.scoreAverage())}>
            <div className="overlay">
              <div className="score-percent">
                <h5>{this.scoreAverage()}</h5>
                <h6>%</h6>
              </div>
              <div className="mastery">
                Mastery
              </div>
            </div>
          </div>
        </div>
        <div className="progress-mastered">
          <div className="mastered">
            <h2>{`${this.countOf(5)}`}</h2>
            <h3>Cards Mastered</h3>
            <h4>/</h4>
            <h2>{`${this.props.cards.length}`}</h2>
            <h3>Total Cards</h3>
          </div>
        </div>
        {this.renderProgressBars()}
      </div>
    )
  }

  circleStyle(percent) {
    if (percent <= 50 ){
      const x = 3.6 * percent
      return {
        backgroundImage: `linear-gradient(90deg, #4a4a4a 50%, transparent 50%, transparent), linear-gradient(${90+x}deg, #29a5dc 50%, #4a4a4a 50%, #4a4a4a)`
      }
    }else{
      const x = 3.6 * (percent - 50)
      return{
        backgroundImage: `linear-gradient(${(-90+x)}deg, #29a5dc 50%, transparent 50%, transparent), linear-gradient(270deg, #29a5dc 50%, #4a4a4a 50%, #4a4a4a)`
      }
    }
  }

  renderProgressBars(){
    return(
      <div className="progress-bars">
        <div className="score-bar">
          <h4>{this.countOf(1)}</h4>
          <div className="bar" >
            <div style={this.barStyle(1, '#aa0080')}>&nbsp;</div>
          </div>
        </div>
        <div className="score-bar">
          <h4>{this.countOf(2)}</h4>
          <div className="bar" >
            <div style={this.barStyle(2, '#ff8a47')}>&nbsp;</div>
          </div>
        </div>
        <div className="score-bar">
          <h4>{this.countOf(3)}</h4>
          <div className="bar" >
            <div style={this.barStyle(3, '#ffdd00')}>&nbsp;</div>
          </div>
        </div>
        <div className="score-bar">
          <h4>{this.countOf(4)}</h4>
          <div className="bar" >
            <div style={this.barStyle(4, '#7fae2e')}>&nbsp;</div>
          </div>
        </div>
        <div className="score-bar">
          <h4>{this.countOf(5)}</h4>
          <div className="bar" >
            <div style={this.barStyle(5, '#00a8d7')}>&nbsp;</div>
          </div>
        </div>
      </div>
    )
  }

  barStyle(num, color){
     return {
       WebkitTransition: 'all',
       msTransition: 'all',
       background: color,
       borderRadius: '4px',
       width: `${this.numberof(num)}`
     }
  }

  countOf(score){
    var count = 0
    for( var i = 0; i < this.props.scores.length; i++ ){
      if (this.props.scores[i] === score){
        count += 1
      }
    }
    return count
  }

  numberof(score){
    var count = 0
    for( var i = 0; i < this.props.scores.length; i++ ){
      if (this.props.scores[i] === score){
        count += 1
      }
    }
    var avg = count/(this.props.scores.length)*100;
    return `${Math.round(avg)}%`
  }

  scoreAverage(){
    var sum = 0;
    for( var i = 0; i < this.props.scores.length; i++ ){
      sum += parseInt( this.props.scores[i]);
    }
    var avg = sum/(this.props.scores.length*5)*100;
    return Math.round(avg)
  }

  renderStudyCard() {
    if (this.props.cards.length >= 1){
      if(this.state.cardView === "question"){
        return (
          <div id="study-question" className="study-card-container" onClick={this.switchCardView}>
            <h2>Q.</h2>
            <h1>{this.props.cards[this.state.cardIdx].question}</h1>
          </div>
        )
      }else{
        return(
          <div id="study-answer" className="study-card-container" onClick={this.switchCardView}>
            <h2>A.</h2>
            <h1>{this.props.cards[this.state.cardIdx].answer}</h1>
          </div>
        )
      }
    }
  }

  nextRandomCardIdx(){
    if (this.props.cards.length > 1){
      let Idx = Math.floor(Math.random() * this.props.cards.length)
      while (Idx === this.state.cardIdx){
        Idx = Math.floor(Math.random() * this.props.cards.length)
      }
      this.setState({cardIdx: Idx, cardView: "question"})
    }
  }

  switchCardView(){
    if(this.state.cardView === "question"){
      this.setState({cardView: "answer"})
    }else{
      this.setState({cardView: "question"})
    }
  }

  renderFeedbackBar(){
    var card = this.props.cards[this.state.cardIdx];
    if(this.state.cardView === "question"){
      return (
        <div className="feedback"
          onClick={this.switchCardView}>
            <h4>&nbsp;</h4>
            <div className="study-card-reveal">
              <h3>Reveal Answer</h3>
            </div>
        </div>
      )
    }else{
      return(
        <div className="feedback">
          <h4>How well did you know this?</h4>
          <div className="study-card-answer">
            <button
              className="give-1 give-button"
              onClick={(event)=> {this.nextRandomCardIdx(); this.giveScore(card, 1)}}
              >1</button>
            <br/>
            <button
              className="give-2 give-button"
              onClick={(event)=> {this.nextRandomCardIdx(); this.giveScore(card, 2)}}
              >2</button>
            <br/>
            <button
              className="give-3 give-button"
              onClick={(event)=> {this.nextRandomCardIdx(); this.giveScore(card, 3)}}
              >3</button>
            <br/>
            <button
              className="give-4 give-button"
              onClick={(event)=> {this.nextRandomCardIdx(); this.giveScore(card, 4)}}
              >4</button>
            <br/>
            <button
              className="give-5 give-button"
              onClick={(event)=> {this.nextRandomCardIdx(); this.giveScore(card, 5)}}
              >5</button>
          </div>
        </div>
      )
    }
  }

  giveScore(card, score){
    if (card.score){
      this.props.updateScore({card_id: card.id, score: score})
    }else{
      this.props.createScore({card_id: card.id, score: score})
    }
  }

  render () {
    return (
      <div className="study-container group">
        <div className="study-header">
          <Link to={"/library"}>
            <div id="study-logo" className="logo"></div>
          </Link>
          <Link to={"/library"}>
            <i className="fa fa-home fa-lg" aria-hidden="true"></i>
          </Link>
          <Link to={"/library"}>
            <i className="fa fa-th fa-lg" aria-hidden="true"></i>
          </Link>
        </div>
        {this.renderProgress()}
        <div className="study-flash">
          <div className="card">
            <h4>{`${this.state.cardIdx + 1} of ${this.props.cards.length}`}</h4>
            {this.renderStudyCard()}
          </div>
          {this.renderFeedbackBar()}
        </div>
      </div>
    )
  }
}

export default Study;
