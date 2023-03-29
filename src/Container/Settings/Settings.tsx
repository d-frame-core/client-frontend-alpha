import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState } from "react";
export default function Settings() {
  const [themeToastOpen, setThemeToastOpen] = useState(false);
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
  return (
    <div>
      <>{Sidebar(8)}</>
      <div>
        <Box className="settingsBox">
          <div>
            <p className="settingsTitle">Settings</p>
          </div>

          <table className="table">
            <tr className="">
              <td className="tableData">Theme</td>
              <td className="tableDataColon">:</td>
              <td>
                <FormControlLabel
                  label=""
                  onClick={myFunction}
                  control={<Switch />}
                  className="tableData"
                />
              </td>
            </tr>

            <tr></tr>
            <tr>
              <td className="tableData">Clear Ads History</td>
              <td className="tableDataColon">:</td>
              <td>
                <button className="button">Clear Ads</button>
              </td>
            </tr>

            <tr></tr>
            <tr>
              <td className="tableData">Clear Survey History</td>
              <td className="tableDataColon">:</td>
              <td>
                <button className="button">Clear Survey</button>
              </td>
            </tr>

            <tr></tr>
            <tr>
              <td className="tableData">Clear Notifications</td>
              <td className="tableDataColon">:</td>
              <td>
                {" "}
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label=""
                  className="tableData"
                />
              </td>
            </tr>
          </table>
        </Box>
      </div>
    </div>
  );
}
