import Nav from 'react-bootstrap/Nav';

const BrowserLink = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
        <h1>gssg</h1>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default BrowserLink;