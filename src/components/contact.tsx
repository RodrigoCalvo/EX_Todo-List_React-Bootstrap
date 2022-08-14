import { SyntheticEvent, useState } from 'react';
import { Button, Container, FloatingLabel, Form, Toast } from 'react-bootstrap';

export function Contact() {
  const initialState = { name: '', email: '', message: '' };
  const [formData, setFormData] = useState(initialState);
  const [showNotification, setShowNotification] = useState(false);
  let notificationAutoCloseTimeout: NodeJS.Timeout;

  function handleChange(ev: SyntheticEvent) {
    const eventTarget = ev.target as HTMLFormElement;
    const newFormData = {
      ...formData,
      [eventTarget.name]: eventTarget.value,
    };
    setFormData(newFormData);
  }

  function handleSend() {
    //save data here
    setFormData(initialState);
    setShowNotification(true);
    clearTimeout(notificationAutoCloseTimeout);
    notificationAutoCloseTimeout = setTimeout(
      () => setShowNotification(false),
      15000
    );
  }

  const template = (
    <Container>
      <Toast
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: '9',
        }}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      >
        <Toast.Header>
          <strong className="me-auto">ToDo-List Web</strong>
          <small>0 mins ago</small>
        </Toast.Header>
        <Toast.Body>Your message has been sent. Thank you!</Toast.Body>
      </Toast>
      <Form>
        <Form.Group controlId="name" className="mb-3">
          <FloatingLabel label="Name">
            <Form.Control
              placeholder="John Doe"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <FloatingLabel label="Email">
            <Form.Control
              placeholder="name@example.com"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="message" className="mb-3">
          <FloatingLabel label="Message">
            <Form.Control
              as={'textarea'}
              maxLength={280}
              placeholder="Write here your message"
              style={{ height: '125px' }}
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Container className="text-center">
          <Button onClick={handleSend} type="button">
            Send
          </Button>
        </Container>
      </Form>
    </Container>
  );
  return template;
}
