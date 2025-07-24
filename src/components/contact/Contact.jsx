import "./contact.css";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ChatKeyboard from "./ChatKeyboard";

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const ref = useRef();
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setError(false);
        form.current.reset();
      } else {
        setError(true);
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setSuccess(false);
    }
  };

  const isInView = useInView(ref, { margin: "-200px" });

  return (
    <div className="contact" ref={ref}>
      <div className="cSection">
        <motion.form
          ref={form}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
          onSubmit={sendEmail}
        >
          <motion.h1 variants={listVariant} className="cTitle">
            Let's work together
          </motion.h1>
          <motion.div variants={listVariant} className="formItem">
            <label>Name / Company</label>
            <input type="text" name="name" placeholder="Your Name" required />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              required
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label>Message</label>
            <textarea
              rows={10}
              name="message"
              placeholder="Tell me about your project or how we can collaborate..."
              required
            ></textarea>
          </motion.div>
          <motion.button variants={listVariant} className="formButton">
            Send
          </motion.button>
          {success && <span>Your message has been sent!</span>}
          {error && <span>Something went wrong!</span>}
        </motion.form>
      </div>
      <div className="cSection"><ChatKeyboard/></div>
    </div>
  );
};

export default Contact;
