import deneaLogoDark from "@assets/images/logo-denea-dark.svg";
import deneaLogoLight from "@assets/images/logo-denea-light.svg";
import { useTheme } from "@dashboard/theme";
import { Box } from "@saleor/macaw-ui/next";
import React from "react";

export const MountingPoint = () => {
  const { theme } = useTheme();

  return (
    <Box
      display="flex"
      gap={6}
      paddingX={7}
      paddingY={8}
      alignItems="center"
      justifyContent="center"
    >
      {theme === "defaultDark" ? (
        <img src={deneaLogoDark} height={24} />
      ) : (
        <img src={deneaLogoLight} height={24} />
      )}
    </Box>
  );
};
