
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-anime-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-anime-accent transition-colors">
          애니메이션 타임
        </Link>
        <nav className="mt-4 md:mt-0 flex items-center">
          <ul className="flex space-x-6 items-center">
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
            
            {/* 인증 관련 버튼 */}
            {user ? (
              <li>
                <Button onClick={handleSignOut} variant="outline" className="ml-4 bg-transparent border-white text-white hover:bg-white hover:text-anime-primary">
                  로그아웃
                </Button>
              </li>
            ) : (
              <li>
                <Link to="/auth">
                  <Button variant="outline" className="ml-4 bg-transparent border-white text-white hover:bg-white hover:text-anime-primary">
                    로그인/회원가입
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
