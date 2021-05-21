const TableData = ({ details }) => {
  return (
    <div className="container">
      <table border="1" className="table-data">
        <tr>
          <th>Browser</th>
          <td>{details?.browserName}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>
            {details.data == null ? (
              ""
            ) : (
              <>
                {details?.data?.city}, {details?.data?.region},
                {details?.country_name}
              </>
            )}
          </td>
        </tr>
        <tr>
          <th>IP</th>
          <td>{details?.data?.ip}</td>
        </tr>
        <tr>
          <th>ISP</th>
          <td>{details?.data?.isp}</td>
        </tr>
      </table>
    </div>
  );
};

export default TableData;
