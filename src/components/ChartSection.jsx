import React, {useState, useEffect} from 'react';


import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart, Model } from "@gooddata/react-components";

const ChartSection = ({ projectId,
                        grossProfitMeasure,
                        dateAttributeInMonths,
                        filters
                      }) => {
  const [measures, setMeasures] = useState(null);
  const [viewBy, setViewBy] = useState(null);

  const getMeasures = () => {
    return [
      Model.measure(grossProfitMeasure)
        .localIdentifier("m1")
        .alias("$ Gross Profit"),
    ];
  }

  const getViewBy = () => {
    return Model.attribute(dateAttributeInMonths).localIdentifier("a1");
  }
  
  const getMeasuresRequest = async () => {
    const ressult = await getMeasures();
    setMeasures(ressult);
  }
  
  useEffect(() => {
    setViewBy(getViewBy());
    getMeasuresRequest();
  }, [filters]);
  
  return (
    <div>
      {measures && <ColumnChart
        measures={measures}
        viewBy={viewBy ? viewBy : null}
        projectId={projectId}
        filters={filters ? filters : null}
      />}
    </div>
  );
}

export default ChartSection;
