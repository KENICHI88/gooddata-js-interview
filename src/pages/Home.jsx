import React, {useEffect, useState} from 'react';

import "@gooddata/react-components/styles/css/main.css";

import { Model } from "@gooddata/react-components";

import Dropdown from '../components/Dropdown';

// Addition ultils 
import {getLastday} from '../utils';
import ChartSection from '../components/ChartSection';
// End Addition ultils 

export default function Home({projectId, grossProfitMeasure, dateAttributeInMonths, dateAttribute}) {
  const [year, setYear] = useState(2016);
  const [month, setMonth] = useState(1);
  
  const [startDate, setStartDate] = useState("2016-1-1");
  const [endDate, setEndDate] = useState("2016-1-31");
  const [measures, setMeasures] = useState(null);
  const [filters, setFilters] = useState(null);
  
  const getMonthFilter = () => {
    return Model.absoluteDateFilter(dateAttribute, startDate, endDate);
  }
  
  const getMeasures = () => {
    return [
      Model.measure(grossProfitMeasure)
        .localIdentifier("m1")
        .alias("$ Gross Profit"),
    ];
  }
  
  const onMonthChange = async (monthValue) => {
    let lastDay = getLastday(monthValue-1, year);
    setMonth(monthValue);
    
    await setStartDate(`${year}-${monthValue}-01`);
    await setEndDate(`${year}-${monthValue}-${lastDay}`);
    
  }
  
  const getMeasuresRequest = async () => {
    const rs = await getMeasures();
    setMeasures(rs);
  }
  
  useEffect(() => {
    setFilters([getMonthFilter()]);
    getMeasuresRequest();
  }, []);
  
  useEffect(() => {
    getMeasuresRequest();
  },[filters]);
  
  useEffect(() => {
    setFilters([getMonthFilter()]);
  }, [endDate]);
  
  return (
    <div className="App">
      <h1>$ Gross Profit in month <Dropdown onMonthChange={onMonthChange} /> 2016</h1>
      <div>
        <ChartSection 
          projectId={projectId}
          grossProfitMeasure={grossProfitMeasure}
          dateAttributeInMonths={dateAttributeInMonths}
          dateAttribute={dateAttribute}
          year={year}
          month={month}
          day="1"
          filters={filters}
        />
      </div>
      <h1>$ Gross Profit - All months</h1>
      <ChartSection 
        projectId={projectId}
        grossProfitMeasure={grossProfitMeasure}
        dateAttributeInMonths={dateAttributeInMonths}
        dateAttribute={dateAttribute}
        year={year}
        month="1"
        day="1"
      />
    </div>
  );
}
