export default function CoasterList(props) {
  return (
    <div className="container mt-5">
      {/* If props.coasters is defined, map the values into HTML */}
      {props.coasters ? props.coasters.map((coaster, index) => {
        return (
          <div key={index} className="card mb-3 p-2">
            <h1>{coaster.name}</h1>
            <ul>
              <li>Location: {coaster.location}</li>
              <li>
                URL: <a href="{coaster.url}">{coaster.url}</a>
              </li>
            </ul>
          </div>
        );
      }) : null}
    </div>
  );
}
