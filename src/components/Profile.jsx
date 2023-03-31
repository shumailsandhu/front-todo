import React, { useContext } from "react";
import { Context } from "..";

const Profile = () => {
  const { user } = useContext(Context);
  return (
    <div style={{width:"100vw",height:"90vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <h1>{user.name}</h1>
      <h4>{user.email}</h4>
    </div>
  );
};

export default Profile;
