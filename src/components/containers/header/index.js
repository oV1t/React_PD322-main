import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../authContext";
import {useSelector} from "react-redux";

const MainHeader = () => {

    const {isAuth, user, logout} = useContext(AuthContext);
    //console.log("isAuth, user", isAuth, user);

    const count = useSelector((state) => state.counter.value);

    return (
        <>
            <header data-bs-theme="dark">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Carousel</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/pizza/create">Додати</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/novaPoshta">Нова пошта</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/counter">Redux</Link>
                                </li>
                            </ul>

                            {isAuth ?
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/profile">{user.name}</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout" onClick={(e)=>
                                        {
                                            e.preventDefault();
                                            logout();
                                        }}>Вихід</Link>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="#">Вхід</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Реєстрація</Link>
                                    </li>
                                </ul>
                            }

                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default MainHeader;