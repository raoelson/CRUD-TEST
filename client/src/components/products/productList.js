import React, { useState, useEffect  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import apiService from '../../services/Api';
import { Avatar, Typography } from '@material-ui/core';


function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
            <TableCell align="center">Id </TableCell>
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Prix</TableCell>
            <TableCell align="center">Action</TableCell>
        </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

export default function ProductList(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
      fetchData();
    },[]);

    function fetchData() {
      apiService.fetchProduits()
        .then(res => setProduits(res.data.products))
        .catch(err => console.log(err))
    }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteItem = (id) => {
    if(!confirm('Voulez-vous le supprimer ?')) return;
    apiService.deleteProduit(id).then(res => {
        const { status, data } = res;
        if(status === 201) {
          if(data.msg === 1){
            const newvalues = produits.filter(produit => produit.id !== id);
            setProduits(newvalues);
          }
        }
    })
    .catch(err => console.log(err));
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, produits.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
        Listes des produits
      </Typography>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead/>
            <TableBody>
            {produits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((produit, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={produit.id}
                    >
                      <TableCell align="center">{produit.id}</TableCell> 
                      <TableCell align="center">{produit.nom}</TableCell>
                      <TableCell align="center">{produit.description}</TableCell>
                      <TableCell align="center">{produit.prix}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                            <IconButton aria-label="edit" onClick={() => props.history.push(`/edit/${produit.id}`)}>
                            <EditOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => deleteItem(produit.id)}>
                            <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={produits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
