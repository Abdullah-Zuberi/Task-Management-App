import Link from "next/link";
import { useState } from "react"; // Import the useState hook
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

const TaskManagementApp = () => {
  const [fullName, setFullName] = useState(""); // Use state to manage form input
  const [email, setEmail] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // To track form submission

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  };

  const headerStyle = {
    backgroundColor: "#333",
    color: "white",
    padding: "10px",
    marginBottom: "20px",
  };

  const formStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const submitButtonStyle = {
    padding: "10px",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const footerStyle = {
    textAlign: "center",
    padding: "10px",
    marginTop: "20px",
  };

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    if (fullName && email && officeName) {
      // Navigate to the new task page with query parameters
      router.push(
        `/Tasks/new?fullName=${fullName}&email=${email}&officeName=${officeName}`
      );

      setFormSubmitted(true); // Set form submission status
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1>Task Management App</h1>
        </header>

        {formSubmitted ? (
          <div>
            <p>Form submitted! Redirecting...</p>
            <p>
              <Link href="/Tasks/new">Go to New Task Page</Link>
            </p>
          </div>
        ) : (
          <form style={formStyle} onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                style={inputStyle}
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                style={inputStyle}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Office Name:
              <input
                style={inputStyle}
                type="text"
                name="officeName"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
              />
            </label>
            <br />

            <button type="submit" style={submitButtonStyle}>
              Submit
            </button>
          </form>
        )}

        <footer style={footerStyle}>
          &copy; {new Date().getFullYear()} Task Management App
        </footer>
      </div>
    </Fragment>
  );
};

export default TaskManagementApp;
