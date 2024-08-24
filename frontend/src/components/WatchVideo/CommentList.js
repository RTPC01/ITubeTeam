import useFetch from "../../api/useFetch";
import CommentCard from "./CommentCard";
import {useEffect, useState} from "react";

export default function CommentList({ videoId }) {
    const url = `/comment/list/${videoId}`;
    const { data: initialCommentList, loading, error} = useFetch(url);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        if (initialCommentList) {
            setCommentList(initialCommentList);
        }
    }, [initialCommentList]);


    const handleCommentUpdated = (commentId, newDescription) => {
        setCommentList(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, description: newDescription } : comment
            )
        );
    };

    const handleCommentDeleted = (commentId) => {
        setCommentList(prevComments =>
            prevComments.filter(comment => comment.id !== commentId)
        );
    };

    if (commentList?.length === 0) {
        return <p className="mb-6">There are no comment yet...</p>;
    }

    return (
        <>
            {
                commentList && commentList.map(comment => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        onCommentUpdated={handleCommentUpdated}
                        onCommentDeleted={handleCommentDeleted}/>
                ))
            }
        </>
    )
}