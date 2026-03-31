import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import GlassBox from "./GlassBox";
import HeadingText from "./HeadingText";
import { useProcessStore } from "../../store/processStore";
import {
  generateGraphData,
  runSchedulingAlgo,
  getRecommendedAlgo,
} from "../../functions/algoRecommend";
import { Flex } from "@chakra-ui/react";

const generateData = (algo) => {
  switch (algo) {
    case "SJF":
      return [
        { x: "0", y: 2 },
        { x: "1", y: 3 },
        { x: "2", y: 5 },
        { x: "3", y: 6 },
      ];
    case "RR":
      return [
        { x: "0", y: 1 },
        { x: "1", y: 4 },
        { x: "2", y: 3 },
        { x: "3", y: 5 },
      ];
    case "Priority":
      return [
        { x: "0", y: 3 },
        { x: "1", y: 6 },
        { x: "2", y: 4 },
        { x: "3", y: 7 },
      ];
    default:
      return [
        { x: "0", y: 2 },
        { x: "1", y: 3 },
        { x: "2", y: 4 },
        { x: "3", y: 6 },
      ];
  }
};

const AlgoPerformance = ({ selectedAlgo }) => {
  const { processes, schedulingType, timeQuantum } = useProcessStore();

  const realData = generateGraphData(
    selectedAlgo,
    processes,
    schedulingType,
    timeQuantum
  );

  const data =
    realData && realData.length > 0 ? realData : generateData(selectedAlgo);

  const result = runSchedulingAlgo(
    selectedAlgo,
    processes,
    schedulingType,
    timeQuantum
  );

  const avgWT = result?.avgWT;

  const recommended = getRecommendedAlgo(
    processes,
    schedulingType,
    timeQuantum
  );

  return (
    <GlassBox flex="1" p={6} minW="320px" direction="column" blur="2px">
      <HeadingText title="Algo Performance" variant="card" />

      <ChartComponent
        key={selectedAlgo}
        primaryXAxis={{
          valueType: "Category",
          title: "Time / Process Index",
        }}
        primaryYAxis={{
          title: "Average Waiting Time",
        }}
      >
        <Inject services={[LineSeries, Category, Tooltip]} />

        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="x"
            yName="y"
            type="Line"
            width={3}
            marker={{ visible: true, height: 8, width: 8 }}
            name={selectedAlgo}
          />
        </SeriesCollectionDirective>
      </ChartComponent>

      <Flex justify="space-around" align="center" flexDir={"row"}>
        <HeadingText
          title={`Avg WT: ${avgWT?.toFixed(2) ?? "--"} ms`}
          variant="card"
        />

        {recommended && (
          <HeadingText
            title={`Best: ${recommended}`}
            variant="card"
            color="green.300"
          />
        )}
      </Flex>
    </GlassBox>
  );
};

export default AlgoPerformance;
