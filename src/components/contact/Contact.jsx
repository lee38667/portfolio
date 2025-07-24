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
    
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
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
    <div className="contact" ref={ref} onSubmit={sendEmail}>
      <div className="cSection">
        <motion.form
          ref={form}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div style={{ display: "none" }}>
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </div>
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
