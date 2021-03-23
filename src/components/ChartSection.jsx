import React, {useState, useEffect, useCallback} from 'react';


import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart, Model } from "@gooddata/react-components";

const ChartSection = ({ projectId,
                        grossProfitMeasure,
                        dateAttributeInMonths,
                        filters
                      }) => {
  const [measures, setMeasures] = useState(null);
  const [viewBy, setViewBy] = useState(null);

  const getMeasures = useCallback(() => {
    return [
      Model.measure(grossProfitMeasure)
        .localIdentifier("m1")
        .alias("$ Gross Profit"),
    ];
  }, [grossProfitMeasure]);

  const getViewBy = useCallback(() => {
    return Model.attribute(dateAttributeInMonths).localIdentifier("a1");
  }, [dateAttributeInMonths])
  
  const getMeasuresRequest = useCallback(async () => {
    const ressult = await getMeasures();
    setMeasures(ressult);
  }, []);
  
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
