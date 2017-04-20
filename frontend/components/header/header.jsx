import React from 'react';
import { Link, withRouter } from 'react-router';
import SessionForm from '../session_form/session_form_container';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { formType: 'login', formClass: "form-off"};
    this.setFormLogin = this.setFormLogin.bind(this);
    this.setFormSignup = this.setFormSignup.bind(this);
    this.switchFormType = this.switchFormType.bind(this);
  }

  sessionForm() {
    return( <SessionForm
      className={this.state.formClass}
      formType={this.state.formType}
      switchFormType={this.switchFormType} />
    );
  }

  switchFormType() {
    let nextFormType = this.state.formType === "login" ? "signup" : "login";
    this.setState({formType: nextFormType});
  }

  switchFormShow() {
    let nextFormShow = this.state.formClass === "form-off" ? "form-on" : "form-off";
    this.setState({formClass: nextFormShow});
  }

  setFormLogin() {
    this.switchFormShow();
    this.setState({ formType: "login" });
  }

  setFormSignup() {
    this.switchFormShow();
    this.setState({ formType: "signup" });
  }

  userGreet () {
    if (this.props.currentUser) {
      this.state.formClass = "form-off";
      return (
        <div>
          <h3>{`hey ${this.props.currentUser.username}`}</h3>
          <button onClick={this.props.logout}>LOGOUT</button>
        </div>
      );
    }else{
      return(
        <div className="session-buttons">
          <button onClick={this.setFormLogin}>Login</button>
          <br/>
          <button onClick={this.setFormSignup}>Signup</button>
        </div>
      );
    }
  }

  render() {
    return(
      <div className="header-component">
        <div className="navbar">
          <div className="left-header">
            <h3>~logo~</h3>
            <h3>Flashy Cards</h3>
          </div>
          <div className="right-header">
            { this.userGreet()}
          </div>
        </div>
        {this.sessionForm()}
      </div>
    );
  }

}

export default Header;
