import logo from '../assets/graphql.png';

export default function Header() {
    return (
        <nav className="navbar bg-light mb-4 p-3">
        <div className="container">
            <a className="navbar-brand" href="/">
            <div className="d-flex">
                <img src={logo} alt="GraphQL logo" className="mr-2" />
                <div>Project & Client</div>
            </div>
            </a>
        </div>
        </nav>
    );
}