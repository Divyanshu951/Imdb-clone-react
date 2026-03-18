import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link
        to="/about"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          fontSize: "32px",
        }}
      >
        About
      </Link>
    </>
  );
}

export default Home;
