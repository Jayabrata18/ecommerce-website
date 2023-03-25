import React, { Component, Fragment } from "react";
import {
  getProfile,
  createProfile,
  deleteAccount,
} from "../../../actions/profileActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { decodeUser } from "../../../util";
import { Modal, Button, message, Popconfirm } from "antd";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      visible: false,
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
  componentDidMount() {
    this.props.getProfile(decodeUser().user.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.profile && nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        profile,
        address: profile.address,
        bio: profile.bio,
        website: profile.website,
        facebook: profile.socialMedia.facebook,
        linkedin: profile.socialMedia.linkedin,
        youtube: profile.socialMedia.youtube,
        instagram: profile.socialMedia.instagram,
        twitter: profile.socialMedia.twitter,
      });
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  confirm = (e) => {
    e.preventDefault();
    this.props.deleteAccount(this.props.history);
  };

  cancel = (e) => {
    message.error("Nothing has been done to your account");
  };

  displayProfile = (profile) => {
    return (
      <div className="custom-border">
        <div className="container" style={{ marginTop: "2rem" }}>
          <span>
            <label>
              <h4>Address: </h4>
            </label>
            <h4 className="inline-padding">{profile.address}</h4>
          </span>
          <br />
          <span>
            <label>
              <h4>Bio: </h4>
            </label>
            <h4 className="inline-padding">{profile.bio}</h4>
          </span>
          <br />
          <span>
            <label>
              <h4>Website: </h4>
            </label>
            <h4 className="inline-padding">{profile.website}</h4>
          </span>
          <h4>Below are your Socila Media Links</h4>
          <div>
            <ul>
              <li>
                <h5>{profile.socialMedia.facebook}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.instagram}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.twitter}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.youtube}</h5>
              </li>
              <li>
                <h5>{profile.socialMedia.linkedin}</h5>
              </li>
            </ul>
          </div>
          <br />
          <button className="btn btn-primary" onClick={this.showModal}>
            {" "}
            Edit Profile
          </button>
          <Popconfirm
            title="This will delete all your records with eShop. Do yuo want to proceed?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-primary"> Delete your Record</button>
          </Popconfirm>
        </div>
      </div>
    );
  };

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
    window.location.reload();
  };
  render() {
    const { name } = this.props.auth.user;
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
      <div className="container">
        <h2>Welcome {name}</h2>
        {this.state.profile ? (
          <Fragment>
            <h4>This is your present profile</h4>
            {this.displayProfile(this.state.profile)}
          </Fragment>
        ) : (
          <Fragment>
            <span style={{ paddingRight: "2%" }}>
              You currently dont have a Profile
            </span>
            <Link className="btn btn-primary" to="/dashboard/addProfile">
              {" "}
              Create Profile
            </Link>
          </Fragment>
        )}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.onSubmit}>
              Edit Profile
            </Button>,
          ]}
        >
          <form className="form">
            <div className="form-group modal-input">
              <input
                style={{ width: "450px" }}
                type="text"
                name="address"
                value={address}
                onChange={this.onChange}
              />
              <small className="form-text">
                Give us the address of your company
              </small>
            </div>
            <div className="form-group modal-input">
              <input
                style={{ width: "450px" }}
                type="text"
                name="website"
                value={website}
                onChange={this.onChange}
              />
              <small className="form-text">
                Complete if you have a company website
              </small>
            </div>
            <br />
            <div className="form-group">
              <textarea
                style={{ width: "450px" }}
                name="bio"
                value={bio}
                onChange={this.onChange}
              ></textarea>
              <small className="form-text">
                Tell us a little about busines
              </small>
            </div>
            <br />
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="twitter"
                value={twitter}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="facebook"
                value={facebook}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="youtube"
                value={youtube}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="linkedin"
                value={linkedin}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                style={{ width: "380px" }}
                type="text"
                name="instagram"
                value={instagram}
                onChange={this.onChange}
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  createProfile,
  deleteAccount,
})(withRouter(Profile));
