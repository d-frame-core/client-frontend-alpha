import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./DataPool.css";
import AddIcon from "@mui/icons-material/Add";
import Chart from "../../components/chart/Chart";
import { useNavigate } from "react-router-dom";
const DataPool = () => {
  const heading = [
    "Education",
    "Age",
    "Social",
    "Gender",
    "Food",
    "States",
    "News",
    "Finance",
    "Nature",
    "Sports",
    "Crypto",
  ];
  const popularTags = [
    "Bitcoin",
    "Ethereum",
    "Doge",
    "BNB",
    "Solana",
    "Polygon",
    "ADA",
    "Avalanche",
  ];
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
    console.log("clicked add");
    setTags([...tags, input]);
    setInput("");
  };

  const Crypto = [
    { name: "Bitcoin", per: 35, value: 35 },
    { name: "Ethereum", per: 35, value: 35 },
    { name: "Polygon", per: 30, value: 30 },
    { name: "Solana", per: 30, value: 30 },
    { name: "Hyperledger", per: 30, value: 30 },
  ];
  const Education = [
    { name: "Primary School", per: 46, value: 300 },
    { name: "Graduation", per: 26, value: 300 },
    { name: "High School", per: 8, value: 50 },
    { name: "Post Graduation", per: 20, value: 50 },
  ];
  const Details = [
    { name: "Male", per: 46, value: 300 },
    { name: "Female", per: 46, value: 300 },
    { name: "others", per: 8, value: 50 },
  ];
  const Food = [
    { name: "Pizza", per: 16, value: 300 },
    { name: "Biryani", per: 28, value: 300 },
    { name: "Pasta", per: 8, value: 50 },
    { name: "Ice-Cream", per: 8, value: 50 },
    { name: "Kebab", per: 17, value: 50 },
    { name: "Chowmien", per: 9, value: 50 },
    { name: "Burger", per: 8, value: 50 },
    { name: "Sandwich", per: 6, value: 50 },
  ];
  const News = [
    { name: "Finance", per: 17, value: 300 },
    { name: "Politics", per: 28, value: 300 },
    { name: "Cinema", per: 12, value: 50 },
    { name: "Education", per: 12, value: 50 },
    { name: "Technology", per: 20, value: 50 },
    { name: "Crime", per: 11, value: 50 },
  ];
  const States = [
    { name: "Andhra Pradesh", per: 2, value: 300 },
    { name: "Telangana", per: 6, value: 300 },
    { name: "Tamil Nadu", per: 72, value: 50 },
    { name: "Kerala", per: 9, value: 300 },
    { name: "Karnataka", per: 11, value: 300 },
  ];
  const Age = [
    { name: ">18", per: 43, value: 300 },
    { name: "25-40", per: 43, value: 300 },
    { name: "41-60", per: 7, value: 50 },
    { name: "<60", per: 7, value: 50 },
  ];
  const Nature = [
    { name: "Nature1", per: 46, value: 300 },
    { name: "Nature2", per: 36, value: 300 },
    { name: "Nature3", per: 8, value: 50 },
    { name: "Nature4", per: 10, value: 50 },
  ];
  const Sports = [
    { name: "Football", per: 40, value: 300 },
    { name: "Cricket", per: 40, value: 300 },
    { name: "Hockey", per: 7, value: 50 },
    { name: "Kabbadi", per: 7, value: 50 },
    { name: "Badmiton", per: 7, value: 50 },
  ];
  const Social = [
    { name: "Instagram", per: 35, value: 300 },
    { name: "Meta", per: 29, value: 250 },
    { name: "Reddit", per: 24, value: 200 },
    { name: "Linkedin", per: 12, value: 100 },
  ];
  const Finance = [
    { name: "Muthoot", per: 33, value: 33 },
    { name: "Mahindra", per: 33, value: 33 },
    { name: "HDFC", per: 22, value: 22 },
    { name: "EasyLoan", per: 11, value: 11 },
  ];
  var a: any[] = [];

  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index: void | any) => {
    setToggleState(index);
  };
  if (toggleState === 2) {
    a = Social;
  } else if (toggleState === 3) {
    a = Details;
  } else if (toggleState === 4) {
    a = Food;
  } else if (toggleState === 5) {
    a = States;
  } else if (toggleState === 6) {
    a = News;
  } else if (toggleState === 7) {
    a = Finance;
  } else if (toggleState === 0) {
    a = Education;
  } else if (toggleState === 1) {
    a = Age;
  } else if (toggleState === 8) {
    a = Nature;
  } else if (toggleState === 9) {
    a = Sports;
  } else if (toggleState === 10) {
    a = Crypto;
  }
  console.log(input);

  // use effect to logout the user if wallet is disconnected
  const navigate = useNavigate();
  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      navigate("/");
    }
  };
  useEffect(() => {
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);

  return (
    <div>
      <>{Sidebar(3)}</>
      <div className="outerBox">
        <div className="categories">
          {heading.map((item, index) => {
            return (
              <div
                className={
                  toggleState === index ? "categoryActive" : "categoriesTitle"
                }
                onClick={() => toggleTab(index)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="DataPool">
          <Box>
            <div className="DataPoolTitle">Data Pool</div>
            <div className="dataPoolAndTags">
              <div className="left">
                <div className="DataPoolSizeBox">
                  <div>Size of D Frame Data Pool</div>
                  <div>105.91 K</div>
                </div>
                <div className="AddTagsTitle">Add Tags</div>
                <div className="AddTags">
                  <input
                    type="text"
                    className="AddTagsInput"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />

                  <div className="AddTagsIcon" onClick={handleAdd}>
                    <AddIcon />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="chart">{Chart(a, "per")}</div>
              </div>
            </div>

            {/* <button onClick={() => handleAdd()}>Add</button> */}
            <div className="tagsDiv">
              <div className="tagsBoxAboveDiv">
                <p>Custom Tags</p>
                <div className="tagsBox">
                  {tags.map((tag) => {
                    return <div className="tag">{tag}</div>;
                  })}
                </div>
              </div>
              <div className="tagsBoxAboveDiv">
                <p>Popular Tags</p>
                <div className="tagsBox">
                  {popularTags.map((tag) => {
                    return <div className="tag">{tag}</div>;
                  })}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DataPool;
