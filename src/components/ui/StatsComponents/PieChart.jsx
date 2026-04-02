import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationTooltip,
  AccumulationLegend,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";
import GlassBox from "../GlassComponents/GlassBox";
import HeadingText from "../OtherUI/HeadingText";
import { theme } from "../../../theme/theme";

const PieChart = ({
  title = "Pie Chart",
  data = [],
  showLabels = true,
  labelFormat = "${point.x}",
  chartProps = {},
}) => {
  return (
    <GlassBox flex="1" p={6} minW="300px" flexDir="column" blur="1px">
      <HeadingText title={title} variant="card" />

      <AccumulationChartComponent
        tooltip={{ enable: true }}
        legendSettings={{ visible: true, position: "Bottom" }}
        {...chartProps}
      >
        <Inject
          services={[
            PieSeries,
            AccumulationTooltip,
            AccumulationLegend,
            AccumulationDataLabel,
          ]}
        />

        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={data}
            xName="x"
            yName="y"
            dataLabel={{
              visible: showLabels,
              name: "text",
              position: "Outside",
              connectorStyle: {
                length: "10%",
                type: "Curve",
              },
              font: {
                fontWeight: "600",
                color: theme.colors.textPrimary,
              },
            }}
            pointColorMapping="color"
            explode
            explodeOffset="10%"
            explodeIndex={0}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </GlassBox>
  );
};

export default PieChart;
