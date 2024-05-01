import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const Detail = () => {
  const [record, setRecord] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    const api = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/employees/${id}`);
    const { data } = await api.json();
    setRecord(data)
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return <div>
    <Link to={`/`}>Back</Link>
    <h1>Employee Detail ID {id}</h1>
    <table style={{fontSize: "1.5em"}}>
      <tbody>
        <tr>
          <th>Name</th>
          <th>:</th>
          <td>{record.name}</td>
        </tr>
        <tr>
          <th>Position</th>
          <th>:</th>
          <td>{record.position?.name}</td>
        </tr>
        <tr>
          <th>Division</th>
          <th>:</th>
          <td>{record.division?.name}</td>
        </tr>
      </tbody>
    </table>
  </div>
}

export default Detail