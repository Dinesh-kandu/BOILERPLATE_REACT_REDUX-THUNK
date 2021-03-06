import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import InlineConfirmButton from 'react-inline-confirm';
import { deleteComment } from '../../redux/post/action';

const textValues = ['Delete', 'Are you sure?', 'Deleting...'];

const CommentItem = ({
  postId,
  comment: {
 _id, text, name, avatar, user, date,
},
  auth,
  deleteComment,
}) => {
  const handleDeleteComment = e => {
    deleteComment(postId, _id);
  };
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on
            {' '}
            <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {user._id === auth.user_id && (
            <InlineConfirmButton
              className="btn btn-danger"
              textValues={textValues}
              showTimer
              isExecuting
              onClick={handleDeleteComment}
            >
              <i className="fa fa-$ fa fa-trash" />
            </InlineConfirmButton>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
  }),
  { deleteComment },
)(CommentItem);
