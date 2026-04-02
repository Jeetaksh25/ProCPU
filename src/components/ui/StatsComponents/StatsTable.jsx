import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject as GridInject,
    Page,
    Sort,
  } from "@syncfusion/ej2-react-grids";
  import GlassBox from "../GlassComponents/GlassBox";
  import HeadingText from "../OtherUI/HeadingText";
  
  const DEFAULT_COLUMNS = [
    { field: "pid", headerText: "PID", width: "100" },
    { field: "at",  headerText: "AT",  width: "100" },
    { field: "bt",  headerText: "BT",  width: "100" },
    { field: "ct",  headerText: "CT",  width: "100" },
    { field: "tat", headerText: "TAT", width: "120" },
    { field: "wt",  headerText: "WT",  width: "120" },
  ];
  
  const StatsTable = ({
    title = "Process Table",
    data = [],
    columns = DEFAULT_COLUMNS,
    allowPaging = true,
    allowSorting = true,
    gridProps = {},
  }) => {
    return (
      <GlassBox p={6} mb={6} flexDir="column" blur="2px">
        <HeadingText title={title} variant="card" />
  
        <GridComponent
          dataSource={data}
          allowPaging={allowPaging}
          allowSorting={allowSorting}
          {...gridProps}
        >
          <ColumnsDirective>
            {columns.map((col) => (
              <ColumnDirective
                key={col.field}
                field={col.field}
                headerText={col.headerText}
                width={col.width ?? "120"}
                textAlign={col.textAlign ?? "Center"}
              />
            ))}
          </ColumnsDirective>
          <GridInject services={[Page, Sort]} />
        </GridComponent>
      </GlassBox>
    );
  };
  
  export default StatsTable;