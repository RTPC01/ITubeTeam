import useFetch from "../../api/useFetch";
import React, {useEffect, useState} from "react";
import useIsAuthor from "../../utils/useIsAuthor";
import getAuthHeader from "../../utils/getAuthHeader";

export default function CommentCard({ comment, onCommentUpdated, onCommentDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(comment.description);
    const [editTriggerFetch, setEditTriggerFetch] = useState(false);
    const [deleteTriggerFetch, setDeleteTriggerFetch] = useState(false);
    const isAuthor = useIsAuthor(comment.authorId);
    const headers = getAuthHeader({'Content-Type': 'text/plain'});
    const url = `/userInfo/${comment.authorId}`;
    const { data: commentAuthor, loading, error } = useFetch(url);

    const { data: commentEditResponse, commentEditLoading, commentEditError } = useFetch(
        editTriggerFetch ? `/comment/edit/${comment.id}` : null,
        editTriggerFetch ? 'POST' : null,
        editedDescription,
        headers
    );

    const { data: commentDeleteResponse, commentDeleteLoading, commentDeleteError} = useFetch(
        deleteTriggerFetch ? `/comment/delete/${comment.id}` : null,
        deleteTriggerFetch ? 'DELETE' : null,
        null ,
        getAuthHeader()
    );

    useEffect(() => {
        if (commentEditResponse && isEditing) {
            setIsEditing(false);
            onCommentUpdated(comment.id, editedDescription);
        }
    }, [commentEditResponse, isEditing, onCommentUpdated, comment.id, editedDescription]);

    useEffect(() => {
        if (commentDeleteResponse) {
            onCommentDeleted(comment.id);
            setDeleteTriggerFetch(false); // Fetch 트리거 상태 초기화
        }
    }, [commentDeleteResponse, onCommentDeleted, comment.id]);

    useEffect(() => {
        if (commentEditError) {
            console.error("Error editing comment:", commentEditError);
        }
        if (commentDeleteError) {
            console.error("Error deleting comment:", commentDeleteError);
        }
    }, [commentEditError, commentDeleteError]);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setEditTriggerFetch(true);
    };

    const handleCancelClick = () => {
        setEditedDescription(comment.description);
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        console.log(getAuthHeader());
        setDeleteTriggerFetch(true);
    }

    if (loading || error) {
        return (
            <div className="flex items-center mt-4 mb-4">
                <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="border border-gray-200 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mb-6 px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
            <div className="flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                    <img src={commentAuthor.profileImg} className="w-8 h-8 rounded-full border" alt="profileImg"/>
                    <span>{commentAuthor.nickname}</span>
                </div>
                {isAuthor && (
                    <div>
                        {isEditing ? (
                            <>
                                <button type="button"
                                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={handleSaveClick}>
                                    Save
                                </button>
                                <button type="button"
                                        className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                        onClick={handleCancelClick}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button"
                                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={handleEditClick}>
                                    Edit
                                </button>
                                <button type="button"
                                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        onClick={handleDeleteClick}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-3 px-4">
                {isEditing ? (
                    <textarea
                        className="w-full p-2 border rounded"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    <p>{comment.description}</p>
                )}
            </div>
        </div>
    );
}
