import  React,{useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import {ShoppingCartOutlined} from '@ant-design/icons'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BuyersNSupliers() {
    const [age, setAge] = React.useState('');
    const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data,setData]=useState([])
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(()=>{
    axios.get(`http://localhost:4000/stock/getbuyersdata`).then(response=>{
        console.log(response.data)
        setData(response["data"].data)
    }
    ).catch(err=>{
        console.log(err)
    })
},[])


const clickhandler=(item)=>{
  console.log(item)
 
    item.quantity=1
    axios.post("http://localhost:4000/customer/",item).then(res=>{
      console.log("data added")
      alert("data Added")
    }).catch(err=>{
      console.log(err)
    })
}
  
  return (
    <>
    <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Sidebar/>
        <Box sx={{backgroundColor:'white',marginTop:'20px',height:'660px'}} flex={4}>
            <div style={{ height:'50px',display:'flex',flexDirection:'row',marginTop:'10px',marginLeft:'100px',justifyContent:'space-between'}}>
    <h2 style={{color:'blue'}}> BUYERS</h2>  
    
    </div>
    
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'20px'}}>
   
    <div style={{marginLeft:'10px',height:'50px'}}>
    <Stack spacing={0} direction="row">
     
    <Button variant="outlined" >STOCK VALUE<br/>25000 </Button>
    
     
    </Stack>
    </div>
    
    </div>
    <div style={{marginTop:'20px'}}>
    <TableContainer component={Paper}>
    
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          
          <TableRow>
            <StyledTableCell align="center">ITEM NAME</StyledTableCell>
            <StyledTableCell align="center">CATEGORY</StyledTableCell>
            <StyledTableCell align="center">QUANTITY</StyledTableCell>
            <StyledTableCell align="center">UNIT</StyledTableCell>
            <StyledTableCell align="center">PRICE</StyledTableCell>
            <StyledTableCell align="center">TYPE</StyledTableCell>
            <StyledTableCell align="center">ACTIONS</StyledTableCell>
            
          </TableRow>
         
        </TableHead>
        <TableBody>
          {data.map((row) => (
            // <StyledTableRow key={row.itemid}>
                    <TableRow>
              
              <StyledTableCell align="center">{row.itemname}</StyledTableCell>
              <StyledTableCell align="center">{row.category}</StyledTableCell>
              <StyledTableCell align="center">1</StyledTableCell>
              <StyledTableCell align="center">{row.unit}</StyledTableCell>
              <StyledTableCell align="center">{row.itemprice}</StyledTableCell>
              <StyledTableCell align="center">{row.itemtype}</StyledTableCell>
              <StyledTableCell align="center">      <Button onClick={()=>clickhandler(row)}>Add to cart</Button> </StyledTableCell>
              </TableRow>
                   ))}
            {/* </StyledTableRow> */}
     
        </TableBody>
      </Table>
      
    </TableContainer>
    
    <div style={{marginLeft:'70%'}}>
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </div>
    </div>
        </Box>
        </Stack>
    
    </>
  );
}