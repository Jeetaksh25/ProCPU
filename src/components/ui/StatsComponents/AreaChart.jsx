import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    AreaSeries,
    Category,
    Tooltip,
    Legend,
  } from "@syncfusion/ej2-react-charts";
  import GlassBox from "../GlassComponents/GlassBox";
  import HeadingText from "../OtherUI/HeadingText";
  import { theme } from "../../../theme/theme";
  
  const AreaChart = ({
    title = "Area Chart",
    data = [],
    xTitle = "",
    yTitle = "",
    seriesName = "Value",
    fill,
    opacity = 0.5,
    chartProps = {},
  }) => {
    const areaFill = fill ?? theme.colors.primary;
  
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
          <Inject services={[AreaSeries, Category, Tooltip, Legend]} />
  
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data}
              xName="x"
              yName="y"
              type="Area"
              fill={areaFill}
              opacity={opacity}
              name={seriesName}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </GlassBox>
    );
  };
  
  export default AreaChart;