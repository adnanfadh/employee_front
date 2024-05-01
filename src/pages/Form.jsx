import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const Form = () => {
  const { id } = useParams();
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [division, setDivision] = useState("")
  const [positionList, setPositionList] = useState([])
  const [divisionList, setDivisionList] = useState([])

  const fetchDataEmployee = async () => {
    const api = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/employees/${id}`);
    const { data } = await api.json();
    setName(data.name)
    setPosition(data.position_id)
    setDivision(data.division_id)
  }

  const fetchDataPosition = async ()=>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/position/`);
      const { data } = await response.json();
      setPositionList(data);
      // console.log(data);
  };

  const fetchDataDivision = async ()=>{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/division/`);
      const { data } = await response.json();
      setDivisionList(data);
      // console.log(data);
  };

  useEffect(() =>{
    if(id){
      fetchDataEmployee();
    }
    fetchDataPosition();
    fetchDataDivision();
  }, [])

  const positionChange = (event) =>{
    setPosition(event.target.value);
  }
  
  const divisionChange = (event) =>{
    setDivision(event.target.value);
  }

  const saveBtn = (e) => {
    e.preventDefault();

    let url = `${import.meta.env.VITE_BACKEND_API}/api/employees`;

    let data = {
      name,
      'position_id': position,
      'division_id': division
    }

    if(id) {
      data['_method'] = 'PUT';
      url = `${import.meta.env.VITE_BACKEND_API}/api/employees/${id}`
    }
    console.log(data, url);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        if(!data.status) alert(data.message)
        console.log(data)
    })
    .catch(error => console.error(error));

  }

  return <div>
    <Link to={`/`}>Back</Link>
    <h1>Form Data Employee</h1>
    <table style={{fontSize: "1.5em"}}>
      <tbody>
        <tr>
          <th>Name</th>
          <th>:</th>
          <td>
            <input 
              name="name"
              id="name"
              value={name}
              onChange={e=> setName(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Position</th>
          <th>:</th>
          <td>
          <select value={position} onChange={positionChange}>
              <option value="">Choose Position</option>

        {positionList.map(position => (
              <option value={position.id} key={position.id} >{position.name}</option>
    
              ))
              }

          </select>
          </td>
        </tr>
        <tr>
          <th>Division</th>
          <th>:</th>
          <td>
            <select value={division} onChange={divisionChange}>
                <option value="">Choose Divison</option>

          {divisionList.map(division => (
                <option value={division.id} key={division.id} >{division.name}</option>
      
                ))
                }

            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <button onClick={saveBtn}>Save</button>
  </div>
}

export default Form