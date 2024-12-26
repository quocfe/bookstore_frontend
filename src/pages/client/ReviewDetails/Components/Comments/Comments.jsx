import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentsApi from '../../../../../api/client/comments';
import reviewApi from '../../../../../api/client/review';
import CommentItem from './../CommentItem/CommentItem';
import { addComments } from '../../../../../redux/commentSlice';
import './Comments.css';
import { fetchComment } from '../../../../../redux/apiRequest';

const Comments = ({ totalComments, idProduct }) => {
	const dispatch = useDispatch();
	const commentsRedux = useSelector((state) => state.comment);
	const [comments, setComments] = useState(commentsRedux?.data || []);

	useEffect(() => {
		fetchComment(idProduct, dispatch);
	}, [idProduct, dispatch]);

	useEffect(() => {
		setComments(commentsRedux?.data || []);
		totalComments(commentsRedux?.data?.length || 0);
	}, [commentsRedux.data, totalComments]);

	return (
		<div className="container" id="comments">
			{_.orderBy(comments, ['createAt'], ['desc'])?.map((comment) => {
				return <CommentItem comment={comment} idProduct={idProduct} />;
			})}
		</div>
	);
};

export default Comments;
