import * as React from "react";

const Header = () => {
  return (
    <header>
      <div className="p-4">
        <h1>Koutou Lottery</h1>
      </div>
    </header>
  );
};

export default React.memo(Header);
