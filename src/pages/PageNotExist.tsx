import PageNotFound from "../404notfound.jpg";

function PageNotExist() {
  return (
    <div>
      <img src={PageNotFound} alt="Page Not Found" width="100%" height="80%" />
    </div>
  );
}

export default PageNotExist;
