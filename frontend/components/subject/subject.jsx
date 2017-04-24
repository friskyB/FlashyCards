import React from 'react';
import { Link, hashHistory } from 'react-router';

class Subject extends React.Component {

  constructor(props){
    super(props);
    this.deleteSubject = this.deleteSubject.bind(this);
    this.state = {name: ""};
    this.createSubject = this.createSubject.bind(this);
  }

  componentDidMount(){
    this.props.fetchSubjects();
  }

  deleteSubject(subject){
    this.props.deleteSubject(subject).then(()=>this.props.fetchSubjects())
  }

  subjectForm(){
    return (
      <li className="subject-form">
        New Subject
        <form onSubmit={this.createSubject}>
          <input placeholder=" e.g. Classy Stuff"
            type="text"
            value={this.state.name}
            onChange={this.update("name")}
            />
          <input type="submit" value="Save"/>
        </form>
      </li>
    )
  }

  createSubject(){
    this.props.createSubject(this.state)
    this.setState({name: ""})
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  reccomended(name){
    if (name === "Civics and History") {
      return <h3>reccomended</h3>
    }
  }
  render() {
    return(
      <div className="subject-container">
        <div className="subject-header">
          <h2 className="subject-title">Subjects</h2>
        </div>
        <ul className="subject-list">
          {
            this.props.subjects.map( subject => (
              <li key={subject.id} onClick={() => hashHistory.push(`library/${subject.id}`)} className="subject-item">
                <h2>{subject.name}</h2>
                { this.reccomended(subject.name)}
                <button onClick={() => this.deleteSubject(subject)}>delete</button>
              </li>
            ))
          }
          {this.subjectForm()}
        </ul>
      </div>
    )
  }
};

export default Subject;
