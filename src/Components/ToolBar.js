import React from "react";
import DropDownButton from "./DropDownButton";

function ToolBar() {
  return (
    <div className="mynav">
      <DropDownButton
        list={
          <>
            '<option disabled>Text</option>{" "}
            <option value="Single">Single Line</option>{" "}
            <option value="Multiple">Multiple Line</option>'
          </>
        }
      />

      <DropDownButton
        list={
          <>
            '<option disabled>Select</option>{" "}
            <option value="Single">Radio</option>{" "}
            <option value="Multiple">DropDown</option>{" "}
            <option value="Multiple">CheckBox</option>'
          </>
        }
      />

      <DropDownButton
        list={
          <>
            '<option disabled>Number</option>{" "}
            <option value="Single">Single select</option>{" "}
            <option value="Multiple">Multiple select</option>'
          </>
        }
      />
      <DropDownButton
        list={
          <>
            '<option disabled>File Upload</option>{" "}
            <option value="Single">Single select</option>{" "}
            <option value="Multiple">Multiple select</option>'
          </>
        }
      />
      <button type="button" className="btn btn-outline-secondary" id="mybtn">
        Add Tile
      </button>
    </div>
  );
}

export default ToolBar;
