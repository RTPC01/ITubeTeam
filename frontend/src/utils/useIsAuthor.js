import {useContext} from "react";
import AuthContext from "../components/Context/AuthContext";

export default function useIsAuthor(authorId) {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return false;
    }

    if (!authorId) {
        return false;
    }

    return (user.id === authorId);
}