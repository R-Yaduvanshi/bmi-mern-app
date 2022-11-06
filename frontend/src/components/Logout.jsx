import React from "react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
