import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { createProfile } from "../../../actions/profileActions";
import { connect } from "react-redux";
import { message } from "antd";

class addProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bio: "",
      website: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      twitter: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.address.length <= 0) {
      return message.error("Your Address field is required");
    }
    if (this.state.bio.length <= 0) {
      return message.error("Your Bio field is required");
    }

    this.props.createProfile(this.state, this.props.history);
  };

  render() {
    const {
      address,
      bio,
      website,
      facebook,
      twitter,
      linkedin,
      youtube,
      instagram,
    } = this.state;
    return (
      <div>
        <section className="container">
          <h1 className="large text-primary">Create Your Profile</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make
            your profile stand out
          </p>
          <small>* is a required field</small>
          <form className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={address}
                onChange={this.onChange}
              />
              <small className="form-text">
                Give us the address of your company
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={website}
                onChange={this.onChange}
              />
              <small className="form-text">
                Complete if you have a company website
              </small>
            </div>

            <div className="form-group">
              <textarea
                placeholder="A short description of your business"
                name="bio"
                value={bio}
                onChange={this.onChange}
              ></textarea>
              <small className="form-text">
                Tell us a little about busines
              </small>
            </div>

            <div className="my-2">
              <button type="button" className="btn btn-light">
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter Link"
                name="twitter"
                value={twitter}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook Link"
                name="facebook"
                value={facebook}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube Link"
                name="youtube"
                value={youtube}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin Link"
                name="linkedin"
                value={linkedin}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram Link"
                name="instagram"
                value={instagram}
                onChange={this.onChange}
              />
            </div>
            <button className="btn btn-primary my-1" onClick={this.onSubmit}>
              {" "}
              Submit
            </button>
            <Link className="btn btn-light my-1" to="/dashboard/profile">
              <i className="fas fa-undo-alt"></i>Go Back
            </Link>
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(addProfile)
);
