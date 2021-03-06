import React, { useState } from "react";
import Toggle from "../Toggle";

// import emojis from "../../utils/emojis";

import { useTheme } from "../../hooks/theme";
import { useAuth } from "../../hooks/auth";

import { Container, Profile, UserName, Logout } from "./styles";

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const { signOut, user } = useAuth();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  // const emoji = useMemo(() => {
  //   const indice = Math.floor(Math.random() * emojis.length);
  //   return emojis[indice];
  // }, []);

  return (
    <Container>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />

      <Profile>
        {/* <Welcome>Olá, {emoji}</Welcome> */}
        <UserName>{user.name}</UserName>
        <Logout onClick={() => signOut()}>SAIR</Logout>
      </Profile>
    </Container>
  );
};

export default MainHeader;
