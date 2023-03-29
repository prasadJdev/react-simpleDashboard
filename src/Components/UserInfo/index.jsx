import Card from "react-bootstrap/Card";

function index({ usersCount, activeUsers, productsCount }) {
  return (
    <div className="dashboardComponents">
      <Card>
        <Card.Header>Users</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">{usersCount}</blockquote>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Categories</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">{activeUsers}</blockquote>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Products</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">{productsCount}</blockquote>
        </Card.Body>
      </Card>
      
    </div>
  );
}

export default index;
