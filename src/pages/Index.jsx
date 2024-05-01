import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom"


function EmployeeIndex() {

  const [record, setRecord] = useState([]);
  const [filterRecord, setFilterRecord] = useState([]);

  const fetchData = async () => {
    const api = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/employees`);
    const { data } = await api.json();
    setRecord(data)
    setFilterRecord(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Position',
      selector: row => row.position.name,
      sortable: true,
    },
    {
      name: 'Division',
      selector: row => row.division.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: row => (
        <div style={{display:'flex', justifyContent:'space-around'}}>
          <Link to={`/detail/${row.id}`} style={{padding:'0px 5px'}}>Detail</Link>
          |
          <Link to={`/edit/${row.id}`} style={{padding:'0px 5px'}}>Edit</Link>
          |
          <a href="" onClick={() => deleteRecord(row.id)} style={{padding:'0px 5px'}}>Delete</a>
        </div>
      ),
    },
  ];

  const handleFilter = (event) => {
    const newData = filterRecord.filter((row) => 
        row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.division.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.position.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setRecord(newData)
  }

  const deleteRecord = async (id) => {

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(`${import.meta.env.VITE_BACKEND_API}/api/employees/${id}`, options)
      .then(response => response.json())
      .then((data) => {
        if(!data.status) alert(data.message)
        console.log(data)
    })
    .catch(error => console.error(error));

  }


  return (
    <div style={{padding: "50px 10%", backgroundColor:"#f4f4f4"}}>
      <div style={{display:'flex', justifyContent:"space-between", paddingBottom:'10px'}}>
        <Link to={`/create`} style={{padding:'5px', border:'1px solid', borderRadius:'8px'}}>Create</Link>
        <input type='text' placeholder='pencarian....' onChange={handleFilter} style={{padding: "6px 10px"}}/>
      </div>
      <DataTable columns={columns} data={record} pagination>
        
      </DataTable>
    </div>
  )
}

export default EmployeeIndex
