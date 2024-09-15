import React from "react";
import NavBar from "@/components/NavBar";

const Layout = ({ children }) => (
  <div>
    <NavBar flag={true}/>
    <main style={{ padding: '1rem' }}>
      {children}
    </main>
  </div>
);

export default Layout;