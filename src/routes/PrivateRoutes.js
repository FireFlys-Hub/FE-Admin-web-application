import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoutes = ({ path, component: Component }) =>{
    let history = useHistory();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push('/login');
        }
    }, [history]);

    return (
        <Route
            path={path}
            render={(props) =>
                sessionStorage.getItem('account') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoutes;
