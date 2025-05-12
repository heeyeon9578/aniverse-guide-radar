
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-anime-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-anime-accent transition-colors">
          애니메이션 타임
        </Link>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-anime-accent transition-colors">
                홈
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-anime-accent transition-colors">
                인기 작품
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-anime-accent transition-colors">
                신작 소식
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
