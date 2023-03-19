import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Box } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
export default function Settings() {
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
          {/* <div>
            <Box className="settingsDetails">
              <div className="settingsOptions3">
                <p className="updateTheme">Theme</p>
                <p className="themeColon">:</p>
                <FormControlLabel
                  label=""
                  className="themeSwitch"
                  onClick={myFunction}
                  control={<Switch />}
                />
              </div>
              <div className="settingsOptions4">
                <p className="updateAds">Clear Ads History</p>
                <p className="adsColon">:</p>
                <button className="adsButton">Clear Previous Campaigns</button>
              </div>
              <div className="settingsOptions5">
                <p className="updateNotifications">Clear Notifications</p>
                <p className="notificationsColon">:</p>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  className="notificationsSwitch"
                  label=""
                />
              </div>
            </Box>
          </div>
          <div>
            <button className="saveButton">Save</button>
          </div> */}

          <table className="table">
            <tr className="">
              <td className="tableData">Theme</td>
              <td className="tableDataColon">:</td>
              <td>
                {" "}
                <FormControlLabel
                  label=""
                  onClick={myFunction}
                  control={<Switch />}
                  className="tableData"
                />
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td className="tableData">Clear Ads History</td>
              <td className="tableDataColon">:</td>
              <td>
                <button className="button">Clear Ads</button>
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td className="tableData">Clear Survey History</td>
              <td className="tableDataColon">:</td>
              <td>
                <button className="button">Clear Survey</button>
              </td>
            </tr>
            <tr></tr>
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
