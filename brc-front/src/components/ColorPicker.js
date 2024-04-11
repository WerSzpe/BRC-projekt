import React, { useMemo } from "react";
import { RgbaStringColorPicker } from "react-colorful";

// Color converter https://github.com/omgovich/colord
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
extend([namesPlugin]);

const ColorPicker = ({ color, ...rest }) => {
  const rgbaString = useMemo(() => {
    return color.startsWith("rgba") ? color : colord(color).toRgbString();
  }, [color]);

  return <RgbaStringColorPicker color={rgbaString} {...rest} />;
};

export default ColorPicker;