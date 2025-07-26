import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
      <Button onClick={() => navigate("/sign-in")}>Go to Sign In</Button>
    </div>
  );
};

export default Home;