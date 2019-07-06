import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../redux/profile/action';

const Profile = ({
 match, profile: { profile }, auth, getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);
  return (
    profile && (
      <Fragment>
        <Link to="/profiles" className="btn btn-light">
          Back To Profiles
        </Link>
        {auth.isAuth && auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary"> Experience </h2>
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map(experience => (
                  <ProfileExperience key={experience._id} experience={experience} />
                ))}
              </Fragment>
            ) : (
              <h4> No experience credentials</h4>
            )}
          </div>
          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary"> Education </h2>
            {profile && profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map(education => (
                  <ProfileEducation key={education._id} education={education} />
                ))}
              </Fragment>
            ) : (
              <h4> No education credentials</h4>
            )}
          </div>
          {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
        </div>
      </Fragment>
    )
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    profile: state.profile,
    auth: state.auth,
  }),
  { getProfileById },
)(Profile);