import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    ColumnSeries,
    Category,
    Tooltip,
    Legend,
    DataLabel,
  } from "@syncfusion/ej2-react-charts";
  import GlassBox from "../GlassComponents/GlassBox";
  import HeadingText from "../OtherUI/HeadingText";
  import { theme } from "../../../theme/theme";
  
  const BarChart = ({
    title = "Bar Chart",
    data = [],
    xTitle = "",
    yTitle = "",
    seriesName = "Value",
    fill,
    chartProps = {},
  }) => {
    const barFill = fill ?? theme.colors.primary;
  
    return (
      <GlassBox flex="1" p={6} minW="300px" flexDir="column" blur="1px">
        <HeadingText title={title} variant="card" />
  
        <ChartComponent
          primaryXAxis={{ valueType: "Category", title: xTitle }}
          primaryYAxis={{ title: yTitle }}
          tooltip={{ enable: true }}
          legendSettings={{ visible: true }}
          {...chartProps}
        >
          <Inject services={[ColumnSeries, Category, Tooltip, Legend, DataLabel]} />
  
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data}
              xName="x"
              yName="y"
              type="Column"
              fill={barFill}
              name={seriesName}
              marker={{ dataLabel: { visible: false } }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </GlassBox>
    );
  };
  
  export default BarChart;