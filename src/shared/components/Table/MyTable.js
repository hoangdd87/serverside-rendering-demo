import React from 'react';
import PropTypes from 'prop-types';
import {
  LinearProgress, makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import classNames from 'classnames';

const styles = {
  tableContainer: {
    position: 'relative',
  },
  loadingModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
    zIndex: -1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingModalHidden: {
    zIndex: -1
  },
  loadingModalVisible: {
    zIndex: 999,
    backgroundColor: 'lightgrey'
  },
  cellRoot: {
    lineHeight: 0.3
  }
};

const useStyles = makeStyles(styles);

const MyTable = ({ rows, columns, isLoading }) => {
  const classes = useStyles();
  return (
    <TableContainer
      component={ Paper }
      className={ classNames(classes.tableContainer) }
    >
      { isLoading && <LinearProgress/> }
      <div
        className={ classNames(
          classes.loadingModal,
          isLoading ? classes.loadingModalVisible : classes.loadingModalHidden)
        }
      />
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map(column => (
                <TableCell key={ column.id }>
                  { column.title }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map(row => (
            <TableRow key={ row.id }>
              { columns.map(column => (
                <TableCell key={ column.id } className={ classes.cellRoot }>
                  { column.render(row) }
                </TableCell>
              )) }
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MyTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  })),
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  })),
  isLoading: PropTypes.bool
}

MyTable.defaultProps = {
  isLoading: false
}


export default React.memo(MyTable);
