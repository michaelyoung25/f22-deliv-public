import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import EntryModal from './EntryModal';
import { getCategory } from '../utils/categories';
import { useState } from 'react';
import './styles.css';

// Table component that displays entries on home screen

export default function EntryTable({ entries }) {
   const [sorting, setSorting] = useState({ field: 'name', ascending: true });
   const [curClass, setClass] = useState("");
   const [sortedField, setSortedField] = useState(null);
   const [ascending, setAscending] = useState(true);
   let sortedEntries = [...entries];

   function applySorting(field) {
      if (field !== sorting.field) {
         setSorting({ field: field, ascending: true });
      }
      else {
         setSorting({ field: field, ascending: !sorting.ascending })
      }
   }

   if (sorting.ascending) {
      sortedEntries.sort((a, b) => {
         if (a[sorting.field] < b[sorting.field]) {
            return -1;
         }
         if (a[sorting.field] > b[sorting.field]) {
            return 1;
         }
         return 0;
      });
   }
   else {
      sortedEntries.sort((a, b) => {
         if (a[sorting.field] < b[sorting.field]) {
            return 1;
         }
         if (a[sorting.field] > b[sorting.field]) {
            return -1;
         }
         return 0;
      });
   }
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>
                     <div onClick={() => applySorting('name')}>Name</div>
                  </TableCell>
                  <TableCell align="right">
                     <div onClick={() => applySorting('link')}>Link</div>
                  </TableCell>
                  <TableCell align="right">
                     <div onClick={() => applySorting('user')}>User</div>
                  </TableCell>
                  <TableCell align="right">
                     <div onClick={() => applySorting('category')}>Category</div>
                  </TableCell>
                  <TableCell align="right">Open</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {sortedEntries.map((entry) => (
                  <TableRow
                     key={entry.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {entry.name}
                     </TableCell>
                     <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                     <TableCell align="right">{entry.user}</TableCell>
                     <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                     <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                        <EntryModal entry={entry} type="edit" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
