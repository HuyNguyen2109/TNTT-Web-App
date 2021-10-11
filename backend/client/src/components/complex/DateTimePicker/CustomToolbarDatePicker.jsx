import React from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";

const CustomToolbar = function (props) {
  const { date, isLandscape, openView, setOpenView, title } = props;

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  return (
    <PickerToolbar
      title={title}
      isLandscape={isLandscape}
    >
      <ToolbarButton
        disabled
        onClick={handleChangeViewClick("year")}
        variant="h6"
        label={date.format("ddd")}
        selected={openView === "date"}
        style={{opacity: '0.54'}}
      />
      <ToolbarButton
        onClick={handleChangeViewClick("date")}
        disabled
        variant="h4"
        selected={openView === "date"}
        label={date.format("MMMM, Do")}
      />
    </PickerToolbar>
  );
};

export default CustomToolbar;
