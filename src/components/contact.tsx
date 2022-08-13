import { SyntheticEvent, useState } from 'react';

export function Contact() {
  const initialState = { name: '', email: '', message: '' };
  const [formData, setFormData] = useState(initialState);

  function handleChange(ev: SyntheticEvent) {
    const eventTarget = ev.target as HTMLFormElement;
    const newFormData = {
      ...formData,
      [eventTarget.name]: eventTarget.value,
    };
    setFormData(newFormData);
  }

  function handleSend() {
    console.log(formData);
    setFormData(initialState);
  }

  const template = (
    <form>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="name">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="message">Message:</label>
      <textarea
        name="message"
        id="message"
        cols={40}
        rows={6}
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <input type="button" value="Send" onClick={handleSend} />
    </form>
  );
  return template;
}
