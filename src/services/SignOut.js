
import { useNavigate } from "react-router-dom";

export const SignOut = async (path) => {
    // const navigate = useNavigate();
    localStorage.clear();
    // navigate(path)
}

export default SignOut;