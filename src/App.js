// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import Home from "./pages/Home";

class App extends Component {

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
    const dateAttributeInMonths =
      "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
    const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";
    return (
      <Home projectId={projectId} 
        grossProfitMeasure={grossProfitMeasure}
        dateAttributeInMonths={dateAttributeInMonths}
        dateAttribute={dateAttribute}
        />
    );
  }
}

export default App;
