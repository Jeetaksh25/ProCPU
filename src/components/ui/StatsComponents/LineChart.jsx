import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    LineSeries,
    Category,
    Tooltip,
    Legend,
  } from "@syncfusion/ej2-react-charts";
  import GlassBox from "../GlassComponents/GlassBox";
  import HeadingText from "../OtherUI/HeadingText";
  import { theme } from "../../../theme/theme";
  
  const LineChart = ({
    title = "Line Chart",
    data = [],
    xTitle = "",
    yTitle = "",
    seriesName = "Value",
    lineWidth = 3,
    fill,
    markerFill,
    chartProps = {},
  }) => {
    const lineFill = fill ?? theme.colors.accent;
    const dotFill = markerFill ?? theme.colors.primary;
  
    return (
      <GlassBox flex="1" p={6} minW="300px" flexDir="column">
        <HeadingText title={title} variant="card" />
  
        <ChartComponent
          primaryXAxis={{ valueType: "Category", title: xTitle }}
          primaryYAxis={{ title: yTitle }}
          tooltip={{ enable: true }}
          legendSettings={{ visible: true }}
          {...chartProps}
        >
          <Inject services={[LineSeries, Category, Tooltip, Legend]} />
  
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data}
              xName="x"
              yName="y"
              type="Line"
              width={lineWidth}
              fill={lineFill}
              name={seriesName}
              marker={{
                visible: true,
                height: 8,
                width: 8,
                fill: dotFill,
              }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </GlassBox>
    );
  };
  
  export default LineChart;