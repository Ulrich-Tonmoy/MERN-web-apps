import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import FlexBetween from "@/components/FlexBetween";

const Navbar: FC = () => {
  const { palette } = useTheme();

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      Navbar
    </FlexBetween>
  );
};

export default Navbar;
