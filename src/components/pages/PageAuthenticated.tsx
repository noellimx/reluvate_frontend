import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const ResponsiveAppBar = ({
  paneOptions,
  setPaneSelection,
}: {
  paneOptions: PaneOptions[] | null;
  setPaneSelection: React.Dispatch<React.SetStateAction<PaneOptions | null>>;
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.BaseSyntheticEvent) => {
    console.log("[handleCloseNavMenu]");
    setAnchorElNav(null);
  };

  const handleClickPaneOption = (pane: PaneOptions | null) => {
    return (event: React.BaseSyntheticEvent) => {
      setPaneSelection(pane);
      handleCloseNavMenu(event);
    };
  };
  const handleMenuItemChange = (event: any) => {
    console.log("[handleMenuItemChange]");
    console.log("handlemenuitemchange");
    console.log(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              onChange={handleMenuItemChange}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {paneOptions !== null &&
                paneOptions.map((pane) => (
                  <MenuItem
                    key={pane}
                    value={pane}
                    onClick={handleClickPaneOption(pane)}
                  >
                    <Typography textAlign="center">{pane}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GOTTA CATCH 'EM ALL
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

enum PaneOptions {
  myPokemon = "My Pokemons",
  pokedex = "pokedex",
  guessThatPokemon = "Guess That Pokemon",
}

const paneOptions: PaneOptions[] = Object.values(PaneOptions);

const PageAuthenticated = () => {
  const [paneSelection, setPaneSelection] = React.useState<PaneOptions | null>(
    null
  );

  return (
    <>
      <div>
        <ResponsiveAppBar
          paneOptions={paneOptions}
          setPaneSelection={setPaneSelection}
        />
      </div>
      {paneSelection === PaneOptions.myPokemon && <div>My Pokemons</div>}
      {paneSelection === PaneOptions.pokedex && <div>Pokedex</div>}
      {paneSelection === PaneOptions.guessThatPokemon && (
        <div>Guess That Pokemon</div>
      )}
      <div></div>
    </>
  );
};
export default PageAuthenticated;
