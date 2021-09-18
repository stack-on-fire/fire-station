import { Button } from "@chakra-ui/button";
import { ColorMode, useColorMode } from "@chakra-ui/color-mode";
import { Input } from "@chakra-ui/input";
import { HStack, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import styled from "@emotion/styled";
import React from "react";
import { useTable, usePagination } from "react-table";

const Table = ({ setPage, columns, data, currentPage, totalPages }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      useControlledState: (state) => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: currentPage,
          }),
          [state]
        );
      },
      initialState: { pageIndex: currentPage },
      manualPagination: true,
      pageCount: totalPages,
    },
    usePagination
  );

  const { colorMode } = useColorMode();

  return (
    <Styles colorMode={colorMode}>
      <table {...getTableProps()} className="table-fixed">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.slice(0, 1).map((column) => (
                <th
                  key={column.id1}
                  {...column.getHeaderProps()}
                  className="px-1 py-4 bg-red-100 capitalize w-96 text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
              {headerGroup.headers.slice(1).map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="py-4 bg-red-100 capitalize w-1/6 text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps()}
                      className="truncate p-1 border-b-2"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <HStack mt={2}>
        <Button
          size="xs"
          onClick={() => {
            setPage(1);
          }}
          disabled={currentPage === 1}
        >
          first
        </Button>
        <Button
          size="xs"
          onClick={() => {
            setPage((s) => (s === 0 ? 0 : s - 1));
          }}
          disabled={currentPage === 1}
        >
          prev
        </Button>
        <Button
          size="xs"
          onClick={() => {
            setPage((s) => s + 1);
          }}
          disabled={currentPage === totalPages}
        >
          next
        </Button>
        <Button
          size="xs"
          onClick={() => {
            setPage(totalPages);
          }}
          disabled={currentPage === totalPages}
        >
          last
        </Button>
        <HStack>
          <Text>Page</Text>
          <strong>
            {currentPage} of {pageOptions.length}
          </strong>
        </HStack>
        <HStack>
          <Input
            type="number"
            defaultValue={currentPage}
            min="1"
            max={totalPages}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 1;
              setPage(page);
            }}
          />
        </HStack>
      </HStack>
    </Styles>
  );
};

export default Table;

type Props = {
  colorMode: ColorMode;
};

const Styles = styled.div<Props>`
  display: block;
  max-width: 100%;

  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid ${theme.colors.gray[400]};
  }

  table {
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      text-align: left;
      padding-bottom: 8px;
      background: ${({ colorMode }) =>
        colorMode === "light"
          ? theme.colors.gray[200]
          : theme.colors.gray[700]};
      padding: 0.5rem;
      color: ${({ colorMode }) =>
        colorMode === "light"
          ? theme.colors.gray[600]
          : theme.colors.gray[400]};
    }
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid ${theme.colors.gray[400]};

      width: 1%;
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }
`;
