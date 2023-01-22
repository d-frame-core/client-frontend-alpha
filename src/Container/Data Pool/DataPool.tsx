import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DataPool.css";
import AddIcon from "@mui/icons-material/Add";
import Chart from "../../components/chart/Chart";
const DataPool = () => {
  const [data, setData] = React.useState([
    { name: "Man", time1: 40, per: "22%", long: "117 minutes", long1: 117 },
    { name: "Child", time1: 32, per: "18%", long: "112 minutes", long1: 112 },
    {
      name: "India",
      time1: 28,
      per: "17%",
      long: "108 minutes",
      long1: 108,
    },
    { name: "NRI", time1: 25, per: "13%", long: "98 minutes", long1: 98 },
    { name: "Woman", time1: 25, per: "12%", long: "74 minutes", long1: 74 },
    { name: "Adult", time1: 18, per: "10%", long: "69 minutes", long1: 69 },
  ]);
  const [tags, setTags] = React.useState(["Men", "Child"]);
  const [input, setInput] = React.useState("");
  const handleAdd = () => {
    setTags([...tags, input]);
    setInput("");
  };
  return (
    <div>
      <>{Sidebar()}</>
      <div className="categories"></div>
      <div className="DataPool">
        <Box>
          <div className="DataPoolTitle">Data Pool</div>
          <div className="DataPoolSizeBox">
            <div>Size of D Frame Data Pool</div>
            <div>105.91 K</div>
          </div>
          <div className="AddTags">
            {/* {tags.length > 0 ? (
              <div className="addtagsItem">
                {tags.map((tag) => {
                  return (
                    <>
                      <div className="">{tag}</div>
                      <div>|</div>
                    </>
                  );
                })}
              </div>
            ) : (
              <div>Add Tags</div>
            )} */}
            <input
              type="text"
              className="AddTagsInput"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>|</div>
            <div className="AddTagsIcon" onClick={() => handleAdd()}>
              <AddIcon />
            </div>
          </div>
          <div className="tagsDiv">
            <div className="tagsBox">
              {tags.map((tag) => {
                return <div className="tag">{tag}</div>;
              })}
            </div>
            <div className="tagsBox"></div>
          </div>
          <div className="chart">{Chart(data, "long1")}</div>
        </Box>
      </div>
    </div>
  );
};

export default DataPool;
