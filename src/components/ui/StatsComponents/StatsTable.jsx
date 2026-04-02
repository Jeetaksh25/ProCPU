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
import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { theme } from "../../../theme/theme";

const COLUMN_META = {
  pid: { label: "Process ID", badge: "PID", badgeScheme: "green" },
  at: { label: "Arrival Time", badge: "AT", badgeScheme: "gray" },
  bt: { label: "Burst Time", badge: "BT", badgeScheme: "purple" },
  ct: { label: "Completion Time", badge: "CT", badgeScheme: "blue" },
  tat: { label: "Turnaround Time", badge: "TAT", badgeScheme: "orange" },
  wt: { label: "Waiting Time", badge: "WT", badgeScheme: "red" },
};

const DEFAULT_COLUMNS = [
  { field: "pid", width: "130" },
  { field: "at", width: "130" },
  { field: "bt", width: "130" },
  { field: "ct", width: "130" },
  { field: "tat", width: "140" },
  { field: "wt", width: "140" },
];

const makeHeaderTemplate = (field) => {
  const meta = COLUMN_META[field] ?? {
    label: field,
    badge: null,
  };
  return () => (
    <Flex
      direction="row"
      align="center"
      gap={2}
      py={1}
      mx={"auto"}
      justify={"center"}
    >
      <Text
        fontSize="xs"
        fontWeight={600}
        color={theme.colors.textPrimary}
        letterSpacing="0.09em"
        textAlign={"center"}
      >
        {meta.label}
      </Text>
      {meta.badge && (
        <Badge
          bg={`${meta.badgeScheme}.100`}
          color={`${meta.badgeScheme}.700`}
          variant="subtle"
          fontSize="xs"
          px={1}
          py={0}
          borderRadius="4px"
        >
          {meta.badge}
        </Badge>
      )}
    </Flex>
  );
};

const tableStyles = `
  .stats-grid.e-grid {
    background: transparent !important;
    border: none !important;
    font-family: inherit;
  }

  .stats-grid .e-gridheader {
    background: transparent !important;
    border-bottom: 1.5px solid ${theme.colors.primary ?? "#6366f1"} !important;
  }
  .stats-grid .e-headercell {
    background: transparent !important;
    border-right: 0.5px solid ${theme.colors.border ?? "#e2e8f0"} !important;
    padding: 10px 12px !important;
  }
  .stats-grid .e-headercell:last-child {
    border-right: none !important;
  }
  .stats-grid .e-headertext {
    color: ${theme.colors.textPrimary} !important;
    font-weight: 600 !important;
    font-size: 11px !important;
    letter-spacing: 0.06em !important;
  }

  .stats-grid .e-row td.e-rowcell {
    background: transparent !important;
    border-right: 0.5px solid ${theme.colors.border ?? "#e2e8f0"} !important;
    border-bottom: 0.5px solid ${theme.colors.border ?? "#e2e8f0"} !important;
    color: ${theme.colors.textPrimary} !important;
    font-size: 13px !important;
    padding: 10px 12px !important;
    text-align: center !important;
  }
  .stats-grid .e-row td.e-rowcell:last-child {
    border-right: none !important;
  }

  /* Alternating rows */
  .stats-grid .e-altrow td.e-rowcell {
    background: rgba(99, 102, 241, 0.03) !important;
  }

  /* Hover */
  .stats-grid .e-row:hover td.e-rowcell {
    background: rgba(99, 102, 241, 0.06) !important;
    color: ${theme.colors.textPrimary} !important;
  }

  /* Remove default Syncfusion borders/shadows */
  .stats-grid .e-gridfooter,
  .stats-grid .e-gridcontent,
  .stats-grid .e-table {
    background: transparent !important;
    border: none !important;
  }
  .stats-grid .e-content {
    background: transparent !important;
  }

  /* Pager */
  .stats-grid .e-gridpager {
    background: transparent !important;
    border-top: 0.5px solid ${theme.colors.border ?? "#e2e8f0"} !important;
    padding: 8px 0 !important;
  }
  .stats-grid .e-pagercontainer {
    background: transparent !important;
  }
  .stats-grid .e-numericitem {
    color: ${theme.colors.textSecondary} !important;
    border: 0.5px solid ${theme.colors.border ?? "#e2e8f0"} !important;
    border-radius: 6px !important;
    margin: 0 2px !important;
    min-width: 28px !important;
    font-size: 12px !important;
  }
  .stats-grid .e-numericitem.e-active {
    background: ${theme.colors.primary ?? "#6366f1"} !important;
    color: #fff !important;
    border-color: ${theme.colors.primary ?? "#6366f1"} !important;
  }
  .stats-grid .e-pagerbutton,
  .stats-grid .e-firstpagedisabled,
  .stats-grid .e-lastpagedisabled,
  .stats-grid .e-prevpagedisabled,
  .stats-grid .e-nextpagedisabled {
    color: ${theme.colors.textMuted} !important;
    border: none !important;
    background: transparent !important;
  }
  .stats-grid .e-pagerconstant,
  .stats-grid .e-pagercontainer .e-mfirst,
  .stats-grid .e-pagercontainer .e-mprev,
  .stats-grid .e-pagercontainer .e-mnext,
  .stats-grid .e-pagercontainer .e-mlast {
    color: ${theme.colors.textMuted} !important;
  }

  /* Sort icon */
  .stats-grid .e-sortfilterdiv,
  .stats-grid .e-icon-sortdirect,
  .stats-grid .e-icon-ascending,
  .stats-grid .e-icon-descending {
    color: ${theme.colors.primary ?? "#6366f1"} !important;
  }

  /* Remove focus outline jank */
  .stats-grid .e-grid:focus,
  .stats-grid .e-rowcell:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const StatsTable = ({
  title = "Process Table",
  data = [],
  columns = DEFAULT_COLUMNS,
  allowPaging = true,
  allowSorting = true,
  gridProps = {},
}) => {
  return (
    <>
      <style>{tableStyles}</style>

      <GlassBox py={10} px={20} mb={6} flexDir="column" blur="4px">
        <Flex justify="space-between" align="center" mb={4}>
          <Box flex={1}>
            <HeadingText
              title={title}
              variant="section"
              fontSize="2xl"
              mb="2px"
              align="center"
            />
            <Text
              fontSize="sm"
              color={theme.colors.textMuted}
              textAlign="center"
            >
              {data.length} process{data.length !== 1 ? "es" : ""} · click a
              column header to sort
            </Text>
          </Box>
          <Badge
            bg={"purple.100"}
            variant="subtle"
            borderRadius="8px"
            px={3}
            py={1}
            fontSize="XS"
            color={"purple.700"}
          >
            {data.length} rows
          </Badge>
        </Flex>

        <GridComponent
          dataSource={data}
          allowPaging={allowPaging}
          allowSorting={allowSorting}
          cssClass="stats-grid"
          pageSettings={{ pageSize: 8 }}
          {...gridProps}
        >
          <ColumnsDirective>
            {columns.map((col) => (
              <ColumnDirective
                key={col.field}
                field={col.field}
                headerText={COLUMN_META[col.field]?.label ?? col.field}
                headerTemplate={makeHeaderTemplate(col.field)}
                width={col.width ?? "120"}
                textAlign="Center"
              />
            ))}
          </ColumnsDirective>
          <GridInject services={[Page, Sort]} />
        </GridComponent>
      </GlassBox>
    </>
  );
};

export default StatsTable;
