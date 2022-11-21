export default function CoasterList(props) {
  console.log(props.coasters)
  return (
    <div className="container mt-5">
      {/* If props.coasters is defined, map the values into HTML */}
      {props.coasters ? props.coasters.map((coaster, index) => {
        return (
          <div key={index} className="card mb-3 p-2">
            <h1>{coaster.name}</h1>
            <div className="card-body">
              <ul>
                <li>Location: {coaster.location}</li>
                <li>
                  URL: <a href="{coaster.url}">{coaster.url}</a>
                </li>
              </ul>
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={() => props.deleteCallback(coaster.id)}>Delete</button>
            </div>
          </div>
        );
      }) : null}
    </div>
  );
}
